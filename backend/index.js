const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

const app = express();
const port = process.env.PORT || 5000;

// AI Configuration
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const geminiModel = "gemini-3-flash-preview";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Helper function to check/create tables
async function initializeDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS resumes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content TEXT,
                score INT,
                feedback JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS interviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(255),
                transcript JSON,
                feedback JSON,
                overall_score INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS companies (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) UNIQUE,
                recruiter_info JSON,
                culture TEXT,
                interview_process TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Database tables initialized");
    } catch (err) {
        console.error("Database initialization failed:", err.message);
    }
}

initializeDB();

// 1. /resume → POST resume → store in DB → forward to AI scoring
app.post('/resume', async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Resume content is required" });

    try {
        // AI Scoring
        const prompt = `Analyze this resume and provide a score out of 100, along with strengths and areas for improvement in JSON format. Resume text: ${content}`;
        const result = await ai.models.generateContent({
            model: geminiModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        const aiResponse = result.text;
        
        // Clean AI response if needed (Gemini sometimes adds markdown backticks)
        const cleanJson = aiResponse.replace(/```json|```/g, '').trim();
        const scoreData = JSON.parse(cleanJson);

        // Store in DB
        const [rows] = await pool.query(
            'INSERT INTO resumes (content, score, feedback) VALUES (?, ?, ?)',
            [content, scoreData.score, JSON.stringify(scoreData)]
        );

        res.json({ id: rows.insertId, ...scoreData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

// 2. /interview → GET → fetch interview Qs → AI generates feedback
app.get('/interview', async (req, res) => {
    const { role } = req.query;
    if (!role) return res.status(400).json({ error: "Job role is required" });

    try {
        // Fetch/Generate Question
        const prompt = `You are an expert interviewer for a ${role} position. Provide 5 challenging technical or behavioral questions in JSON format.`;
        const result = await ai.models.generateContent({
            model: geminiModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        const aiResponse = result.text;
        const cleanJson = aiResponse.replace(/```json|```/g, '').trim();
        const questions = JSON.parse(cleanJson);

        res.json({ role, questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 3. /insights → GET → query company DB → return recruiter info
app.get('/insights', async (req, res) => {
    const { company } = req.query;
    if (!company) return res.status(400).json({ error: "Company name is required" });

    try {
        // Check DB first
        const [rows] = await pool.query('SELECT * FROM companies WHERE name = ?', [company]);
        
        if (rows.length > 0) {
            return res.json(rows[0]);
        }

        // If not in DB, fetch from AI and store
        const prompt = `Provide recruiter insights, typical interview process, and company culture for ${company} in JSON format.`;
        const result = await ai.models.generateContent({
            model: geminiModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        const aiResponse = result.text;
        const cleanJson = aiResponse.replace(/```json|```/g, '').trim();
        const insightsData = JSON.parse(cleanJson);

        await pool.query(
            'INSERT INTO companies (name, recruiter_info, culture, interview_process) VALUES (?, ?, ?, ?)',
            [company, JSON.stringify(insightsData.recruiter_info), insightsData.culture, insightsData.interview_process]
        );

        res.json({ name: company, ...insightsData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Placement Navigator API running on port ${port}`);
});
