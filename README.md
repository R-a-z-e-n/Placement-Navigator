

# AI-Powered Placement Navigator 🚀

An AI-first platform designed to help Tier 3 college students prepare for placements with **resume scoring, mock interviews, and recruiter insights**.  
Built using **Google AI Studio, Lovable, Bolt.new, Trae.ai, Supabase/MySQL, Claude, Perplexity, Visily, Miro, Jira, Postman, Mixpanel, Zapier**.

---

## 🌐 Live Demo
View your app in AI Studio:  
[Placement Navigator App](https://ai.studio/apps/baa6c10e-942f-4372-b9d4-3fa445d79865)

---

## 📋 Features
- **Resume Builder** → Upload resumes, get AI score + feedback.
- **Mock Interview** → AI interviewer (Claude) asks 5 questions, gives feedback.
- **Company Insights** → Recruiter/company data powered by Perplexity AI.
- **Automation** → Daily workflows via n8n/Make.com.
- **Analytics** → Mixpanel dashboards for engagement, conversion, retention.
- **Collaboration** → Miro/Whimsical boards for personas, flows, prioritization.
- **Testing** → Postman collections for API validation.
- **Tracking** → Jira roadmap for sprints and backlog.

---

## 🛠️ Tech Stack
- **Frontend:** Lovable, Bolt.new, Emergent, Google AI Studio  
- **Backend:** Trae.ai (API orchestration), Supabase/MySQL  
- **AI Layer:** OpenAI, Claude, Perplexity, HuggingFace  
- **Workflows:** n8n, Make.com, Zapier  
- **Analytics:** Mixpanel, Posthog  
- **Design:** Visily, Google Stitch  
- **Collaboration:** Miro, Whimsical  
- **Testing:** Postman  
- **Tracking:** Jira  

---

## 🚀 Run Locally

**Prerequisites:** Node.js, Supabase/MySQL instance, Gemini API key

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set environment variables in `.env.local`:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=placement_navigator
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

---

## 📊 Dashboards & Roadmaps
- **Jira Roadmap:** [View Roadmap](https://sfcollab.atlassian.net/jira/software/projects/KAN/boards/1?atlOrigin=eyJpIjoiZTY1N2RjY2IzMzBkNDNjYzkwNTgxZDNmZjkyN2I3MjIiLCJwIjoiaiJ9)  
- **Miro Dashboard:** [View Miro Board](https://miro.com/app/board/uXjVG4nKD-A=/?share_link_id=288581807765)  

---

## 📂 Database Schema
Tables:
- `users` → student profiles  
- `resumes` → resume text + AI scores  
- `mock_interviews` → interview Q&A + feedback  
- `company_insights` → recruiter/company data  
- `analytics_events` → logs for Mixpanel sync  

(SQL scripts included in `/db/schema.sql`)

---

## 🔗 API Endpoints (Trae.ai)
- `POST /resume` → Upload + score resume  
- `GET /interview` → Fetch interview Qs + feedback  
- `GET /insights` → Recruiter/company insights  

Test endpoints with Postman collections in `/postman`.

---

## 📈 Analytics (Posthog)
Tracked events:
- `resume_uploaded`
- `resume_scored`
- `mock_interview_started`
- `mock_interview_completed`
- `company_insight_viewed`

Dashboards:
- Funnel: Resume → Interview → Placement  
- Retention: Weekly active users  
- Engagement: Feature usage breakdown  

---

## 🎨 Design
- **Visily/Google Stitch** → High-fidelity dashboard mockups  
- **Miro/Whimsical** → Personas, journey maps, prioritization matrix  

---

## ✅ Testing
- Postman collections for API validation  
- Automated tests for `/resume`, `/interview`, `/insights` endpoints  

---

## 📅 Tracking
- Jira board with sprints:
  - Sprint 1: Frontend + Resume API
  - Sprint 2: Interview + Insights
  - Sprint 3: Workflows + Analytics
  - Sprint 4: Testing + Final polish

---



---

## 🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

---

## 📜 License
MIT License © 2026 Mohammad Razeen Iqbal
```

---

