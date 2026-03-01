import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, User, Bot, Loader2, Award, RefreshCw, Mic, MicOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { getInterviewQuestion, getInterviewFeedback } from '../services/gemini';
import { trackEvent } from '../services/analytics';
import { product_management_interview } from '../data/mockData';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

export default function MockInterview() {
  const [jobRole, setJobRole] = useState("Software Engineer");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [isSample, setIsSample] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = async () => {
    setStarted(true);
    setLoading(true);
    trackEvent('Interview Started', { jobRole });
    try {
      const question = await getInterviewQuestion([], jobRole);
      setMessages([{ role: 'assistant', text: question || "Hello! Let's start the interview. Can you tell me about yourself?" }]);
      setQuestionCount(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startPMSampleInterview = () => {
    setJobRole("Product Manager");
    setStarted(true);
    setIsSample(true);
    setLoading(true);
    trackEvent('Sample PM Interview Started');
    
    // Load the first question from mock data
    const firstQuestion = product_management_interview.questions_and_feedback[0].question;
    setMessages([{ role: 'assistant', text: firstQuestion }]);
    setQuestionCount(1);
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    
    trackEvent('Message Sent', { 
      role: 'user', 
      questionNumber: questionCount,
      messageLength: input.length 
    });

    if (questionCount >= 5) {
      setLoading(true);
      try {
        if (isSample) {
          // Calculate an overall score and extract feedback from mock data
          const totalScore = 75; // Pre-calculated or mock
          const strengths = product_management_interview.questions_and_feedback.map(q => q.feedback.product_thinking).filter(s => s !== "N/A");
          const tips = product_management_interview.questions_and_feedback.map(q => q.feedback.tip);
          
          setFeedback({
            overallScore: totalScore,
            strengths: [strengths[0], strengths[1]],
            weaknesses: ["Add more data points", "Consider broader user segments"],
            tips: tips
          });
        } else {
          const feedbackData = await getInterviewFeedback(newMessages.map(m => ({ role: m.role, text: m.text })));
          setFeedback(feedbackData);
        }
        trackEvent('Interview Completed', {
          jobRole,
          isSample
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      if (isSample) {
        const nextQuestion = product_management_interview.questions_and_feedback[questionCount].question;
        setMessages([...newMessages, { role: 'assistant', text: nextQuestion }]);
        setQuestionCount(prev => prev + 1);
      } else {
        const nextQuestion = await getInterviewQuestion(newMessages.map(m => ({ role: m.role, text: m.text })), jobRole);
        setMessages([...newMessages, { role: 'assistant', text: nextQuestion || "Interesting. Let's move to the next topic." }]);
        setQuestionCount(prev => prev + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const jobRoles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Product Manager",
    "UX Designer"
  ];

  if (!started) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 max-w-lg w-full text-center"
        >
          <div className="w-16 h-16 bg-pastel-green rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-slate-800" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">AI Mock Interview</h1>
          <p className="text-slate-600 mb-8">Practice with our adaptive AI. We'll ask 5 targeted questions and provide detailed feedback at the end.</p>
          
          <div className="mb-8 text-left">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Target Job Role</label>
            <input 
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
              placeholder="e.g. Frontend Developer"
            />
            <div className="flex flex-wrap gap-2">
              {jobRoles.map(role => (
                <button
                  key={role}
                  onClick={() => setJobRole(role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    jobRole === role 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={startInterview} className="btn-primary w-full">
              Start AI Interview
            </button>
            <button onClick={startPMSampleInterview} className="w-full py-3 px-6 rounded-xl border border-indigo-200 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Load PM Sample Interview
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (feedback) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-200">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Interview Complete!</h1>
            <p className="text-slate-600">Here's how you performed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 text-center">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Overall Performance</span>
              <div className="text-6xl font-display font-bold text-indigo-600 mt-2">{feedback.overallScore}%</div>
            </div>
            <div className="md:col-span-2 glass-card p-8">
              <h3 className="font-display font-bold text-slate-900 mb-4">Key Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {feedback.strengths.map((s: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {s}
                  </span>
                ))}
              </div>
              <h3 className="font-display font-bold text-slate-900 mb-4 mt-6">Areas to Improve</h3>
              <div className="flex flex-wrap gap-2">
                {feedback.weaknesses.map((w: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="font-display font-bold text-slate-900 mb-4">Expert Tips</h3>
            <ul className="space-y-4">
              {feedback.tips.map((tip: string, i: number) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {isSample && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-slate-900 text-xl">Detailed Question Feedback</h3>
              {product_management_interview.questions_and_feedback.map((qf, i) => {
                const userMsg = messages[i * 2 + 1];
                return (
                  <div key={i} className="glass-card p-6 border-l-4 border-indigo-600">
                    <p className="font-bold text-slate-900 mb-2">{qf.question}</p>
                    <div className="p-3 bg-slate-50 rounded-xl mb-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Your Answer</p>
                      <p className="text-sm text-slate-700">{userMsg?.text || "No answer recorded."}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Expert Feedback</p>
                          <p className="text-sm text-slate-600">{qf.feedback.overall}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Product Thinking Tip</p>
                          <p className="text-sm text-slate-600">{qf.feedback.product_thinking}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center">
            <button onClick={() => window.location.reload()} className="btn-secondary flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Try Another Session
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">{jobRole} Interview</h2>
          <p className="text-sm text-slate-500">Question {questionCount} of 5</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Live Session</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 custom-scrollbar"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-white border border-slate-200'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-indigo-600" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 shadow-sm rounded-tl-none'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span className="text-sm text-slate-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="glass-card p-4 flex items-center gap-4">
        <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors">
          <Mic className="w-6 h-6" />
        </button>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your response..."
          className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
