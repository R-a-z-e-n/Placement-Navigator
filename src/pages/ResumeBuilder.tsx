import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, FileText, CheckCircle2, AlertCircle, Loader2, 
  BarChart, Plus, Trash2, Download, Eye, Edit3, 
  User, Briefcase, GraduationCap, Code, Folder, Sparkles, Layout
} from 'lucide-react';
import { getResumeScore, generateResumeSummary, improveBulletPoint } from '../services/gemini';
import { resume_evaluation } from '../data/mockData';
// @ts-ignore
import html2pdf from 'html2pdf.js';

type Section = 'personal' | 'education' | 'experience' | 'skills' | 'projects';
type Template = 'modern' | 'classic' | 'minimal';

interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    role: string;
  };
  education: { school: string; degree: string; year: string }[];
  experience: { company: string; role: string; duration: string; desc: string }[];
  skills: string[];
  projects: { name: string; tech: string; desc: string }[];
}

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'build'>('build');
  const [template, setTemplate] = useState<Template>('modern');
  
  // Analyzer State
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [resumeText, setResumeText] = useState("");

  // Builder State
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: { fullName: "", email: "", phone: "", location: "", summary: "", role: "" },
    education: [{ school: "", degree: "", year: "" }],
    experience: [{ company: "", role: "", duration: "", desc: "" }],
    skills: [""],
    projects: [{ name: "", tech: "", desc: "" }]
  });
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (!resumeText) return;
    setLoading(true);
    try {
      if (resumeText.trim() === "[PASTE RESUME HERE]") {
        setResult(resume_evaluation);
        return;
      }
      const data = await getResumeScore(resumeText);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!resumeData.personal.role) {
      alert("Please enter your Target Role first.");
      return;
    }
    setAiLoading('summary');
    try {
      const summary = await generateResumeSummary(resumeData.personal.role, resumeData.personal.summary || "entry level");
      if (summary) updatePersonal('summary', summary);
    } catch (error) {
      console.error(error);
    } finally {
      setAiLoading(null);
    }
  };

  const handleImproveBullet = async (index: number) => {
    const text = resumeData.experience[index].desc;
    if (!text) return;
    setAiLoading(`exp-${index}`);
    try {
      const improved = await improveBulletPoint(text);
      if (improved) updateListItem('experience', index, 'desc', improved);
    } catch (error) {
      console.error(error);
    } finally {
      setAiLoading(null);
    }
  };

  const handleExportPDF = () => {
    const element = resumeRef.current;
    if (!element) return;

    const opt = {
      margin: 0,
      filename: `${resumeData.personal.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addListItem = (section: 'education' | 'experience' | 'projects' | 'skills') => {
    setResumeData(prev => {
      const newData = { ...prev };
      if (section === 'education') newData.education.push({ school: "", degree: "", year: "" });
      if (section === 'experience') newData.experience.push({ company: "", role: "", duration: "", desc: "" });
      if (section === 'projects') newData.projects.push({ name: "", tech: "", desc: "" });
      if (section === 'skills') newData.skills.push("");
      return newData;
    });
  };

  const removeListItem = (section: 'education' | 'experience' | 'projects' | 'skills', index: number) => {
    setResumeData(prev => {
      const newData = { ...prev };
      if (section === 'education') newData.education.splice(index, 1);
      if (section === 'experience') newData.experience.splice(index, 1);
      if (section === 'projects') newData.projects.splice(index, 1);
      if (section === 'skills') newData.skills.splice(index, 1);
      return newData;
    });
  };

  const updateListItem = (section: 'education' | 'experience' | 'projects' | 'skills', index: number, field: string, value: string) => {
    setResumeData(prev => {
      const newData = { ...prev };
      if (section === 'skills') {
        newData.skills[index] = value;
      } else {
        (newData[section] as any)[index][field] = value;
      }
      return newData;
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Resume Hub</h1>
        <p className="text-slate-600">Build a professional resume or analyze your existing one with AI.</p>
      </header>

      <div className="flex justify-center mb-10">
        <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200 flex gap-1">
          <button 
            onClick={() => setActiveTab('build')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'build' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Edit3 className="w-4 h-4" /> Build Resume
          </button>
          <button 
            onClick={() => setActiveTab('analyze')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'analyze' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BarChart className="w-4 h-4" /> Analyze Resume
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'analyze' ? (
          <motion.div
            key="analyze"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="glass-card p-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Resume Content</label>
              <textarea
                className="w-full h-64 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none bg-slate-50/50"
                placeholder="Paste your resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !resumeText}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BarChart className="w-5 h-5" />}
                  Analyze Resume
                </button>
              </div>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 text-center">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Overall Score</span>
                    <div className="text-5xl font-display font-bold text-indigo-600 mt-2">{result.score}</div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-indigo-600" style={{ width: `${result.score}%` }} />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 glass-card p-6">
                    <h3 className="font-display font-bold text-slate-900 mb-2">Detailed Analysis</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {result.clarity_score !== undefined && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-xs text-slate-500 mb-1">Clarity</p>
                          <p className="text-lg font-bold text-slate-900">{result.clarity_score}/10</p>
                        </div>
                      )}
                      {result.skills_score !== undefined && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-xs text-slate-500 mb-1">Skills</p>
                          <p className="text-lg font-bold text-slate-900">{result.skills_score}/10</p>
                        </div>
                      )}
                      {result.achievements_score !== undefined && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-xs text-slate-500 mb-1">Achievements</p>
                          <p className="text-lg font-bold text-slate-900">{result.achievements_score}/10</p>
                        </div>
                      )}
                      {result.relevance_score !== undefined && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-xs text-slate-500 mb-1">Relevance</p>
                          <p className="text-lg font-bold text-slate-900">{result.relevance_score}/10</p>
                        </div>
                      )}
                    </div>
                    {result.feedback && <p className="text-slate-600 leading-relaxed mt-4">{result.feedback}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card p-6 border-l-4 border-l-green-500">
                    <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" /> Key Strengths
                    </h3>
                    <ul className="space-y-3">
                      {result.strengths.map((s: string, i: number) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card p-6 border-l-4 border-l-amber-500">
                    <h3 className="font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" /> Areas for Improvement
                    </h3>
                    <ul className="space-y-3">
                      {result.improvements.map((s: string, i: number) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="build"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Form Section */}
            <div className="lg:col-span-5 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
              {/* Template Selection */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-indigo-600" /> Select Template
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['modern', 'classic', 'minimal'] as Template[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setTemplate(t)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${template === t ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Info */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      placeholder="John Doe"
                      value={resumeData.personal.fullName}
                      onChange={(e) => updatePersonal('fullName', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Role</label>
                    <input 
                      type="text" 
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      placeholder="Senior Frontend Engineer"
                      value={resumeData.personal.role}
                      onChange={(e) => updatePersonal('role', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      placeholder="john@example.com"
                      value={resumeData.personal.email}
                      onChange={(e) => updatePersonal('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                    <input 
                      type="text" 
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      placeholder="+1 234 567 890"
                      value={resumeData.personal.phone}
                      onChange={(e) => updatePersonal('phone', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Summary</label>
                      <button 
                        onClick={handleGenerateSummary}
                        disabled={aiLoading === 'summary'}
                        className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:underline disabled:opacity-50"
                      >
                        {aiLoading === 'summary' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        AI GENERATE
                      </button>
                    </div>
                    <textarea 
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm h-24 resize-none"
                      placeholder="Brief professional summary..."
                      value={resumeData.personal.summary}
                      onChange={(e) => updatePersonal('summary', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" /> Education
                  </h3>
                  <button onClick={() => addListItem('education')} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 relative group">
                      <button 
                        onClick={() => removeListItem('education', i)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          className="col-span-2 p-2 rounded-lg border border-slate-200 text-sm outline-none"
                          placeholder="School / University"
                          value={edu.school}
                          onChange={(e) => updateListItem('education', i, 'school', e.target.value)}
                        />
                        <input 
                          className="p-2 rounded-lg border border-slate-200 text-sm outline-none"
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateListItem('education', i, 'degree', e.target.value)}
                        />
                        <input 
                          className="p-2 rounded-lg border border-slate-200 text-sm outline-none"
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => updateListItem('education', i, 'year', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-600" /> Experience
                  </h3>
                  <button onClick={() => addListItem('experience')} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 relative group">
                      <button 
                        onClick={() => removeListItem('experience', i)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          className="p-2 rounded-lg border border-slate-200 text-sm outline-none"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateListItem('experience', i, 'company', e.target.value)}
                        />
                        <input 
                          className="p-2 rounded-lg border border-slate-200 text-sm outline-none"
                          placeholder="Role"
                          value={exp.role}
                          onChange={(e) => updateListItem('experience', i, 'role', e.target.value)}
                        />
                        <input 
                          className="col-span-2 p-2 rounded-lg border border-slate-200 text-sm outline-none"
                          placeholder="Duration (e.g. 2021 - Present)"
                          value={exp.duration}
                          onChange={(e) => updateListItem('experience', i, 'duration', e.target.value)}
                        />
                        <div className="col-span-2">
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                            <button 
                              onClick={() => handleImproveBullet(i)}
                              disabled={aiLoading === `exp-${i}`}
                              className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:underline disabled:opacity-50"
                            >
                              {aiLoading === `exp-${i}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                              AI IMPROVE
                            </button>
                          </div>
                          <textarea 
                            className="w-full p-2 rounded-lg border border-slate-200 text-sm outline-none h-20 resize-none"
                            placeholder="Key responsibilities..."
                            value={exp.desc}
                            onChange={(e) => updateListItem('experience', i, 'desc', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                    <Code className="w-5 h-5 text-indigo-600" /> Skills
                  </h3>
                  <button onClick={() => addListItem('skills')} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-1 py-1">
                      <input 
                        className="bg-transparent text-sm outline-none w-24"
                        placeholder="Skill"
                        value={skill}
                        onChange={(e) => updateListItem('skills', i, '', e.target.value)}
                      />
                      <button onClick={() => removeListItem('skills', i)} className="p-1 text-slate-400 hover:text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                    <Folder className="w-5 h-5 text-indigo-600" /> Projects
                  </h3>
                  <button onClick={() => addListItem('projects')} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.projects.map((proj, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 relative group">
                      <button 
                        onClick={() => removeListItem('projects', i)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          className="p-2 rounded-lg border border-slate-200 text-sm outline-none"
                          placeholder="Project Name"
                          value={proj.name}
                          onChange={(e) => updateListItem('projects', i, 'name', e.target.value)}
                        />
                        <input 
                          className="p-2 rounded-lg border border-slate-200 text-sm outline-none"
                          placeholder="Tech Stack"
                          value={proj.tech}
                          onChange={(e) => updateListItem('projects', i, 'tech', e.target.value)}
                        />
                        <textarea 
                          className="col-span-2 p-2 rounded-lg border border-slate-200 text-sm outline-none h-20 resize-none"
                          placeholder="Project description..."
                          value={proj.desc}
                          onChange={(e) => updateListItem('projects', i, 'desc', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-7 lg:sticky lg:top-24 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-slate-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-600" /> Live Preview
                </h3>
                <button 
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all"
                >
                  <Download className="w-4 h-4" /> Export PDF
                </button>
              </div>
              
              <div 
                ref={resumeRef}
                className={`bg-white shadow-2xl rounded-2xl p-10 border border-slate-100 min-h-[800px] print:shadow-none print:border-none print:p-0 ${template === 'classic' ? 'font-serif' : 'font-sans'}`}
              >
                {/* Header */}
                <div className={`mb-8 ${template === 'modern' ? 'text-center border-b-2 border-slate-100 pb-8' : template === 'minimal' ? 'text-left' : 'text-center'}`}>
                  <h2 className={`font-display font-bold text-slate-900 mb-2 ${template === 'modern' ? 'text-4xl' : 'text-3xl'}`}>{resumeData.personal.fullName || "Your Name"}</h2>
                  <p className="text-indigo-600 font-bold tracking-wider uppercase text-xs mb-3">{resumeData.personal.role || "Target Job Role"}</p>
                  <div className={`flex flex-wrap gap-4 text-xs text-slate-500 ${template === 'minimal' ? 'justify-start' : 'justify-center'}`}>
                    <span>{resumeData.personal.email || "email@example.com"}</span>
                    <span>•</span>
                    <span>{resumeData.personal.phone || "+1 234 567 890"}</span>
                    <span>•</span>
                    <span>{resumeData.personal.location || "City, Country"}</span>
                  </div>
                </div>

                {/* Summary */}
                {resumeData.personal.summary && (
                  <div className="mb-8">
                    <h4 className={`text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 ${template === 'classic' ? 'border-b border-slate-200 pb-1' : ''}`}>Professional Summary</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{resumeData.personal.summary}</p>
                  </div>
                )}

                <div className={template === 'minimal' ? 'grid grid-cols-12 gap-8' : 'space-y-8'}>
                  <div className={template === 'minimal' ? 'col-span-8 space-y-8' : 'space-y-8'}>
                    {/* Experience */}
                    <div>
                      <h4 className={`text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 ${template === 'classic' ? 'border-b border-slate-200 pb-1' : ''}`}>Experience</h4>
                      <div className="space-y-6">
                        {resumeData.experience.map((exp, i) => (
                          <div key={i}>
                            <div className="flex justify-between items-start mb-1">
                              <h5 className="font-bold text-slate-900">{exp.role || "Role Name"}</h5>
                              <span className="text-[10px] text-slate-400 font-bold uppercase">{exp.duration || "Duration"}</span>
                            </div>
                            <p className="text-sm text-indigo-600 font-medium mb-2">{exp.company || "Company Name"}</p>
                            <p className="text-sm text-slate-600 leading-relaxed">{exp.desc || "Description of your work..."}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h4 className={`text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 ${template === 'classic' ? 'border-b border-slate-200 pb-1' : ''}`}>Projects</h4>
                      <div className="space-y-4">
                        {resumeData.projects.map((proj, i) => (
                          <div key={i}>
                            <div className="flex justify-between items-center mb-1">
                              <h5 className="font-bold text-slate-900">{proj.name || "Project Name"}</h5>
                              <span className="text-[10px] text-indigo-500 font-bold uppercase">{proj.tech}</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{proj.desc || "Project details..."}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={template === 'minimal' ? 'col-span-4 space-y-8' : 'space-y-8'}>
                    {/* Education */}
                    <div>
                      <h4 className={`text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 ${template === 'classic' ? 'border-b border-slate-200 pb-1' : ''}`}>Education</h4>
                      <div className="space-y-4">
                        {resumeData.education.map((edu, i) => (
                          <div key={i}>
                            <h5 className="font-bold text-slate-900 text-sm">{edu.school || "University Name"}</h5>
                            <p className="text-xs text-slate-600">{edu.degree || "Degree Name"}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">{edu.year || "Year"}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className={`text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 ${template === 'classic' ? 'border-b border-slate-200 pb-1' : ''}`}>Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.filter(s => s).map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-50 text-slate-700 rounded-md text-[10px] font-bold border border-slate-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
