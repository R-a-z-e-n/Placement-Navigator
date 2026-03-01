export const resume_evaluation = { 
   "score": 30, 
   "clarity_score": 8, 
   "skills_score": 6, 
   "achievements_score": 6, 
   "relevance_score": 10, 
   "feedback": "Your resume is currently just a placeholder. To get a real evaluation, please paste your actual resume content. Based on your target of Product Management, you'll need to focus heavily on quantifiable impact and product-specific tools.",
   "strengths": [ 
     "Template placeholder submitted — evaluation based on generic Tier 3 PM candidate profile", 
     "Assuming candidate has basic academic background with some project exposure", 
     "Willingness to pursue PM roles shows career intent" 
   ], 
   "improvements": [ 
     "Paste actual resume text — current input contains only placeholder '[PASTE RESUME HERE]'", 
     "Quantify achievements with metrics: revenue impact, user growth, cost savings", 
     "Add product-relevant experience: internships, case competitions, product teardowns", 
     "Include tools: Figma, Jira, Google Analytics, SQL, Mixpanel", 
     "Structure resume as: Summary → Skills → Experience → Projects → Education", 
     "Add a 2–3 line PM-focused summary highlighting problem-solving and business acumen", 
     "Replace generic project descriptions with outcome-driven bullet points" 
   ] 
 };

 export const product_management_interview = { 
   "questions_and_feedback": [ 
     { 
       "question": "Q1: Tell me about a product you use daily. What is one problem it has and how would you fix it?", 
       "answer": "[Candidate Answer not provided]", 
       "feedback": { 
         "overall": "No answer provided. Expected approach: Pick a familiar product (e.g., Swiggy, YouTube). Identify a specific pain point backed by user empathy. Propose a solution with tradeoffs. Mention success metrics.", 
         "clarity": "N/A", 
         "product_thinking": "Strong answers name a target user segment, describe the friction clearly, and propose a prioritized solution using a framework like CIRCLES or a simple problem-solution-metric arc.", 
         "tip": "Structure: Product + User Segment → Problem → Root Cause → Solution → Metrics to track success" 
       } 
     }, 
     { 
       "question": "Q2: How would you prioritize features for a food delivery app targeting college students?", 
       "answer": "[Candidate Answer not provided]", 
       "feedback": { 
         "overall": "No answer provided. Expected approach: Define user needs first (affordability, speed, group orders). Use a prioritization framework like RICE or MoSCoW. Distinguish between must-have vs nice-to-have features.", 
         "clarity": "N/A", 
         "prioritization_thinking": "Ideal answer segments users, lists 4–6 features, applies a scoring model, and justifies top 2 picks with business and user impact reasoning.", 
         "tip": "Always state your prioritization framework explicitly. Interviewers care about your reasoning process, not just the output." 
       } 
     }, 
     { 
       "question": "Q3: A key metric (Daily Active Users) drops by 20% overnight. Walk me through your diagnosis.", 
       "answer": "[Candidate Answer not provided]", 
       "feedback": { 
         "overall": "No answer provided. Expected approach: Follow a structured root cause analysis. Check if it's a data/tracking issue first, then segment by platform, geography, user cohort, and feature. Rule out external factors.", 
         "clarity": "N/A", 
         "metrics_focus": "Top answers follow: Is the data accurate? → Is it internal or external? → Which segment is affected? → What changed recently (release, campaign, competitor)? → Propose short-term fix and long-term prevention.", 
         "tip": "Never jump to conclusions. Interviewers reward structured thinking and hypothesis-driven diagnosis over guessing." 
       } 
     }, 
     { 
       "question": "Q4: Design a product for rural farmers in India to improve crop yield.", 
       "answer": "[Candidate Answer not provided]", 
       "feedback": { 
         "overall": "No answer provided. Expected approach: Start with user research — who is the farmer, what constraints exist (literacy, connectivity, device access). Define the core job-to-be-done. Propose an MVP. Address distribution and adoption challenges.", 
         "clarity": "N/A", 
         "product_thinking": "Strong answers show empathy for low-tech users, propose offline-first or IVR/SMS solutions, cite real-world analogues (e.g., mKisan, DeHaat), and define a go-to-market plan.", 
         "tip": "For social impact product questions, always address accessibility, language, trust, and monetization — not just features." 
       } 
     }, 
     { 
       "question": "Q5: How would you measure the success of a newly launched in-app chat feature?", 
       "answer": "[Candidate Answer not provided]", 
       "feedback": { 
         "overall": "No answer provided. Expected approach: Define the goal of the feature first (support, engagement, retention). Then propose a metric hierarchy: North Star Metric → Supporting Metrics → Guardrail Metrics.", 
         "clarity": "N/A", 
         "metrics_focus": "Example strong answer: North Star = Messages sent per active user per week. Supporting = % users who initiate chat, response rate, session length post-chat. Guardrail = app load time, crash rate, notification opt-out rate.", 
         "tip": "Always separate output metrics (what users do) from outcome metrics (what the business gains). Avoid vanity metrics like total messages sent without context." 
       } 
     } 
   ] 
 };

 export const tier3_college_recruiter_insights = [ 
   { 
     "company_name": "Infosys BPM", 
     "role": "Business Analyst / Associate Product Analyst", 
     "salary_range_lpa": "3.5 – 5.5", 
     "hiring_timeline": "August–October (Final Year, Semester 7)" 
   }, 
   { 
     "company_name": "Wipro", 
     "role": "Project Engineer / Junior BA", 
     "salary_range_lpa": "3.5 – 5.0", 
     "hiring_timeline": "September–November (On-campus, Semester 7)" 
   }, 
   { 
     "company_name": "Capgemini", 
     "role": "Analyst / Associate Consultant", 
     "salary_range_lpa": "4.0 – 6.0", 
     "hiring_timeline": "October–December (Semester 7–8)" 
   }, 
   { 
     "company_name": "Mphasis", 
     "role": "Associate Product Manager (Off-campus)", 
     "salary_range_lpa": "5.0 – 7.5", 
     "hiring_timeline": "January–March (Post-graduation or Final Semester)" 
   }, 
   { 
     "company_name": "Zoho Corporation", 
     "role": "Product Analyst / Junior PM", 
     "salary_range_lpa": "5.0 – 8.0", 
     "hiring_timeline": "Year-round; bulk hiring March–May" 
   }, 
   { 
     "company_name": "Freshworks", 
     "role": "Associate Product Manager (APM Program)", 
     "salary_range_lpa": "8.0 – 12.0", 
     "hiring_timeline": "February–April (Off-campus applications open)" 
   }, 
   { 
     "company_name": "Juspay / Razorpay (Fintech)", 
     "role": "Product Analyst / Growth PM Intern → Full-time", 
     "salary_range_lpa": "6.0 – 10.0", 
     "hiring_timeline": "Internship: Nov–Jan; Full-time conversion: April–June" 
   }, 
   { 
     "company_name": "BYJU'S / Unacademy (EdTech)", 
     "role": "Associate Product Manager / Business Analyst", 
     "salary_range_lpa": "5.0 – 9.0", 
     "hiring_timeline": "Rolling hiring; peak: January–March and July–August" 
   } 
 ];
