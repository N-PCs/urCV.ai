// Soft Skills Practice Section - Content Data
// Categories: Communication, Leadership & Teamwork, Problem-Solving, Time Management, Emotional Intelligence, Professional Conduct

// ============= TYPE DEFINITIONS =============

export interface QuizQuestion {
    id: string;
    question: string;
    scenario?: string;
    options: {
        id: string;
        text: string;
        score: number; // 1-4 points based on quality of response
    }[];
    category: SkillCategory;
    subcategory: string;
    explanation: string;
}

export interface LearningModule {
    id: string;
    title: string;
    description: string;
    category: SkillCategory;
    subcategory: string;
    content: string;
    keyTakeaways: string[];
    practicalExercises: string[];
    estimatedTime: number; // in minutes
    difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    requirement: {
        type: "quiz_complete" | "module_complete" | "score_threshold" | "streak" | "category_mastery";
        value: number;
        categoryId?: SkillCategory;
    };
}

export interface SkillCategoryData {
    id: SkillCategory;
    name: string;
    icon: string;
    color: string;
    description: string;
    subcategories: string[];
}

export type SkillCategory =
    | "communication"
    | "leadership"
    | "problem-solving"
    | "time-management"
    | "emotional-intelligence"
    | "professional-conduct";

// ============= SKILL CATEGORIES =============

export const skillCategories: SkillCategoryData[] = [
    {
        id: "communication",
        name: "Communication Skills",
        icon: "MessageSquare",
        color: "blue",
        description: "Master the art of effective verbal and written communication",
        subcategories: ["Active Listening", "Verbal Communication", "Written Communication", "Presentation Skills"],
    },
    {
        id: "leadership",
        name: "Leadership & Teamwork",
        icon: "Users",
        color: "purple",
        description: "Develop leadership qualities and excel in team environments",
        subcategories: ["Team Collaboration", "Conflict Resolution", "Delegation", "Motivation"],
    },
    {
        id: "problem-solving",
        name: "Problem-Solving & Critical Thinking",
        icon: "Lightbulb",
        color: "yellow",
        description: "Enhance analytical reasoning and creative problem-solving abilities",
        subcategories: ["Analytical Reasoning", "Creative Solutions", "Decision Making", "Root Cause Analysis"],
    },
    {
        id: "time-management",
        name: "Time Management & Organization",
        icon: "Clock",
        color: "green",
        description: "Master productivity techniques and organizational skills",
        subcategories: ["Prioritization", "Planning", "Goal Setting", "Productivity Techniques"],
    },
    {
        id: "emotional-intelligence",
        name: "Emotional Intelligence",
        icon: "Heart",
        color: "pink",
        description: "Develop self-awareness and interpersonal skills",
        subcategories: ["Self-Awareness", "Empathy", "Stress Management", "Social Skills"],
    },
    {
        id: "professional-conduct",
        name: "Professional Conduct",
        icon: "Briefcase",
        color: "indigo",
        description: "Build strong professional ethics and workplace behaviors",
        subcategories: ["Work Ethics", "Networking", "Professional Growth", "Workplace Etiquette"],
    },
];

// ============= QUIZ QUESTIONS =============

export const quizQuestions: QuizQuestion[] = [
    // Communication Skills
    {
        id: "comm-1",
        question: "During a team meeting, a colleague is explaining a complex project issue. What's the most effective approach?",
        scenario: "Your colleague is presenting a problem they've encountered with a client project.",
        category: "communication",
        subcategory: "Active Listening",
        options: [
            { id: "a", text: "Immediately suggest solutions based on your experience", score: 2 },
            { id: "b", text: "Listen attentively, take notes, and ask clarifying questions before responding", score: 4 },
            { id: "c", text: "Check your emails while listening since you can multitask", score: 1 },
            { id: "d", text: "Wait for them to finish without engagement, then give your opinion", score: 2 },
        ],
        explanation: "Active listening involves fully concentrating, understanding, and responding thoughtfully. Taking notes and asking clarifying questions shows engagement and helps you provide more relevant input.",
    },
    {
        id: "comm-2",
        question: "You need to deliver bad news about a project delay to a client. How do you approach this?",
        category: "communication",
        subcategory: "Verbal Communication",
        options: [
            { id: "a", text: "Send an email to avoid direct confrontation", score: 2 },
            { id: "b", text: "Be direct but empathetic, explain the situation clearly, and present solutions", score: 4 },
            { id: "c", text: "Minimize the issue to keep the client calm", score: 1 },
            { id: "d", text: "Wait until asked about the project status", score: 1 },
        ],
        explanation: "Clear, honest, and solution-oriented communication builds trust. Being proactive about challenges while offering alternatives demonstrates professionalism.",
    },
    {
        id: "comm-3",
        question: "You're writing an important email to a senior executive. What's your approach?",
        category: "communication",
        subcategory: "Written Communication",
        options: [
            { id: "a", text: "Write a detailed email covering all aspects of the topic", score: 2 },
            { id: "b", text: "Keep it brief with key points upfront, use bullet points, and include a clear call-to-action", score: 4 },
            { id: "c", text: "Use informal language to appear friendly and approachable", score: 1 },
            { id: "d", text: "Copy multiple people to ensure visibility", score: 2 },
        ],
        explanation: "Executive communication should be concise and action-oriented. Leading with key points respects their time and increases the likelihood of a response.",
    },
    {
        id: "comm-4",
        question: "A team member seems confused during your presentation. What do you do?",
        category: "communication",
        subcategory: "Presentation Skills",
        options: [
            { id: "a", text: "Continue as planned to stay on schedule", score: 1 },
            { id: "b", text: "Pause, check for understanding, and offer to clarify", score: 4 },
            { id: "c", text: "Speed up to finish quickly and address questions later", score: 1 },
            { id: "d", text: "Assume they'll figure it out from the slides later", score: 1 },
        ],
        explanation: "Effective presenters read the room and adapt. Checking understanding shows you value your audience and ensures your message is received.",
    },

    // Leadership & Teamwork
    {
        id: "lead-1",
        question: "Your team is divided on a major decision. How do you handle this as the project lead?",
        category: "leadership",
        subcategory: "Team Collaboration",
        options: [
            { id: "a", text: "Make the decision yourself to move forward quickly", score: 2 },
            { id: "b", text: "Facilitate a structured discussion where all perspectives are heard, then work toward consensus", score: 4 },
            { id: "c", text: "Let the team vote and go with the majority", score: 3 },
            { id: "d", text: "Escalate to your manager to decide", score: 1 },
        ],
        explanation: "Effective leaders create space for diverse perspectives while guiding the team toward alignment. This builds buy-in and leverages collective wisdom.",
    },
    {
        id: "lead-2",
        question: "Two team members are in conflict affecting team morale. What's your approach?",
        category: "leadership",
        subcategory: "Conflict Resolution",
        options: [
            { id: "a", text: "Let them work it out themselves", score: 1 },
            { id: "b", text: "Take sides with whoever seems right", score: 1 },
            { id: "c", text: "Meet with each privately first, then facilitate a constructive conversation together", score: 4 },
            { id: "d", text: "Report them to HR immediately", score: 2 },
        ],
        explanation: "Understanding both perspectives privately first helps you mediate effectively. A facilitated conversation focuses on resolution rather than blame.",
    },
    {
        id: "lead-3",
        question: "You have a high-priority task but also need to support your team. How do you balance this?",
        category: "leadership",
        subcategory: "Delegation",
        options: [
            { id: "a", text: "Do everything yourself to ensure quality", score: 1 },
            { id: "b", text: "Identify tasks to delegate, provide clear instructions, and schedule check-ins", score: 4 },
            { id: "c", text: "Tell the team to wait until you're available", score: 1 },
            { id: "d", text: "Delegate randomly to whoever is free", score: 2 },
        ],
        explanation: "Effective delegation involves matching tasks to team members' strengths, providing context, and maintaining oversight without micromanaging.",
    },
    {
        id: "lead-4",
        question: "A team member is struggling with motivation after a project setback. How do you help?",
        category: "leadership",
        subcategory: "Motivation",
        options: [
            { id: "a", text: "Give them space and hope they recover", score: 1 },
            { id: "b", text: "Acknowledge their feelings, discuss what was learned, and help them see their value", score: 4 },
            { id: "c", text: "Assign them easier tasks to boost confidence", score: 2 },
            { id: "d", text: "Remind them that setbacks happen to everyone", score: 2 },
        ],
        explanation: "Empathetic leadership involves acknowledging emotions while helping team members find meaning and growth in challenges.",
    },

    // Problem-Solving & Critical Thinking
    {
        id: "prob-1",
        question: "You discover a recurring bug in production. What's your first step?",
        category: "problem-solving",
        subcategory: "Root Cause Analysis",
        options: [
            { id: "a", text: "Apply a quick fix to stop the immediate issue", score: 2 },
            { id: "b", text: "Gather data, analyze patterns, and identify the root cause before implementing a fix", score: 4 },
            { id: "c", text: "Blame the person who wrote the code", score: 1 },
            { id: "d", text: "Document it and add it to the backlog", score: 2 },
        ],
        explanation: "Systematic root cause analysis prevents recurring issues. Understanding the 'why' leads to more effective and lasting solutions.",
    },
    {
        id: "prob-2",
        question: "Your team is stuck on a complex problem with no clear solution. What do you suggest?",
        category: "problem-solving",
        subcategory: "Creative Solutions",
        options: [
            { id: "a", text: "Keep trying the same approaches harder", score: 1 },
            { id: "b", text: "Propose a brainstorming session with diverse perspectives and no judgment", score: 4 },
            { id: "c", text: "Ask management to decide", score: 1 },
            { id: "d", text: "Research how others solved similar problems", score: 3 },
        ],
        explanation: "Creative problem-solving benefits from diverse perspectives and psychological safety. Brainstorming sessions can unlock innovative approaches.",
    },
    {
        id: "prob-3",
        question: "You need to make a decision with incomplete information. How do you proceed?",
        category: "problem-solving",
        subcategory: "Decision Making",
        options: [
            { id: "a", text: "Wait until you have all the information", score: 2 },
            { id: "b", text: "Assess available data, consider risks, make a reversible decision if possible, and plan for contingencies", score: 4 },
            { id: "c", text: "Go with your gut immediately", score: 1 },
            { id: "d", text: "Ask someone else to decide", score: 1 },
        ],
        explanation: "Effective decision-making under uncertainty involves assessing what you know, understanding risks, and building in flexibility to adapt.",
    },
    {
        id: "prob-4",
        question: "A project is significantly over budget. How do you analyze the situation?",
        category: "problem-solving",
        subcategory: "Analytical Reasoning",
        options: [
            { id: "a", text: "Cut features immediately to reduce costs", score: 2 },
            { id: "b", text: "Break down costs by category, identify variances, and analyze contributing factors systematically", score: 4 },
            { id: "c", text: "Request more budget without analysis", score: 1 },
            { id: "d", text: "Blame scope creep and move on", score: 1 },
        ],
        explanation: "Analytical reasoning requires breaking complex problems into components and examining each systematically to identify actionable insights.",
    },

    // Time Management & Organization
    {
        id: "time-1",
        question: "You have multiple urgent tasks all due today. How do you approach this?",
        category: "time-management",
        subcategory: "Prioritization",
        options: [
            { id: "a", text: "Work on whatever catches your attention first", score: 1 },
            { id: "b", text: "Assess impact and urgency of each task, communicate with stakeholders, and tackle highest-priority items first", score: 4 },
            { id: "c", text: "Work extra hours to complete everything", score: 2 },
            { id: "d", text: "Ask your manager to prioritize for you", score: 2 },
        ],
        explanation: "Effective prioritization requires evaluating tasks objectively and sometimes negotiating deadlines. The Eisenhower Matrix (urgent/important) is a useful framework.",
    },
    {
        id: "time-2",
        question: "You're planning a complex project. What's your approach?",
        category: "time-management",
        subcategory: "Planning",
        options: [
            { id: "a", text: "Start working and figure out details as you go", score: 1 },
            { id: "b", text: "Break down into milestones, identify dependencies, allocate buffer time, and create a timeline", score: 4 },
            { id: "c", text: "Copy a plan from a similar past project", score: 2 },
            { id: "d", text: "Plan only the first few steps in detail", score: 2 },
        ],
        explanation: "Comprehensive planning with milestones and buffer time sets realistic expectations and helps identify risks early. Flexibility within structure is key.",
    },
    {
        id: "time-3",
        question: "You keep getting interrupted while working on deep focus tasks. What do you do?",
        category: "time-management",
        subcategory: "Productivity Techniques",
        options: [
            { id: "a", text: "Accept interruptions as part of the job", score: 1 },
            { id: "b", text: "Block focused time on your calendar, communicate availability, and batch similar tasks", score: 4 },
            { id: "c", text: "Come in early or stay late when it's quiet", score: 2 },
            { id: "d", text: "Ask to work from home permanently", score: 2 },
        ],
        explanation: "Protecting focus time through communication and calendar blocking, combined with batching similar tasks, significantly improves productivity.",
    },
    {
        id: "time-4",
        question: "You're setting goals for the quarter. What makes goals effective?",
        category: "time-management",
        subcategory: "Goal Setting",
        options: [
            { id: "a", text: "Set ambitious stretch goals for motivation", score: 2 },
            { id: "b", text: "Make goals Specific, Measurable, Achievable, Relevant, and Time-bound (SMART)", score: 4 },
            { id: "c", text: "Keep goals flexible to adapt to changes", score: 2 },
            { id: "d", text: "Focus only on metrics your manager tracks", score: 1 },
        ],
        explanation: "SMART goals provide clarity and enable progress tracking. The best goals balance ambition with achievability and align with broader objectives.",
    },

    // Emotional Intelligence
    {
        id: "ei-1",
        question: "You receive critical feedback on your work that feels unfair. What's your response?",
        category: "emotional-intelligence",
        subcategory: "Self-Awareness",
        options: [
            { id: "a", text: "Defend your work immediately", score: 1 },
            { id: "b", text: "Take time to process emotions, then objectively assess the feedback for valid points", score: 4 },
            { id: "c", text: "Dismiss the feedback as the person doesn't understand", score: 1 },
            { id: "d", text: "Accept all feedback without question", score: 2 },
        ],
        explanation: "Self-awareness involves recognizing emotional reactions and separating them from objective assessment. This enables learning from feedback constructively.",
    },
    {
        id: "ei-2",
        question: "A colleague seems stressed and withdrawn lately. How do you approach this?",
        category: "emotional-intelligence",
        subcategory: "Empathy",
        options: [
            { id: "a", text: "Give them space and don't interfere", score: 2 },
            { id: "b", text: "Check in privately, express genuine concern, and offer support without prying", score: 4 },
            { id: "c", text: "Report your concerns to their manager", score: 1 },
            { id: "d", text: "Assume it's personal and not work-related", score: 1 },
        ],
        explanation: "Empathetic colleagues check in while respecting boundaries. Offering support creates psychological safety and strengthens team bonds.",
    },
    {
        id: "ei-3",
        question: "You're facing a high-pressure deadline and feeling overwhelmed. What's your strategy?",
        category: "emotional-intelligence",
        subcategory: "Stress Management",
        options: [
            { id: "a", text: "Push through with caffeine and long hours", score: 1 },
            { id: "b", text: "Break work into smaller tasks, take short breaks, and communicate if you need support", score: 4 },
            { id: "c", text: "Complain to colleagues about the unrealistic deadline", score: 1 },
            { id: "d", text: "Lower your quality standards to finish on time", score: 2 },
        ],
        explanation: "Effective stress management involves breaking overwhelming tasks into manageable chunks, maintaining self-care, and seeking support when needed.",
    },
    {
        id: "ei-4",
        question: "You're in a meeting where tensions are rising between participants. How do you help?",
        category: "emotional-intelligence",
        subcategory: "Social Skills",
        options: [
            { id: "a", text: "Stay quiet and let them work it out", score: 1 },
            { id: "b", text: "Acknowledge the tension, suggest a short break, or redirect focus to shared goals", score: 4 },
            { id: "c", text: "Side with the person you agree with", score: 1 },
            { id: "d", text: "Change the subject to something lighter", score: 2 },
        ],
        explanation: "Socially intelligent intervention acknowledges emotions while redirecting energy toward productive outcomes. Sometimes a brief reset helps everyone recalibrate.",
    },

    // Professional Conduct
    {
        id: "prof-1",
        question: "You discover a colleague taking credit for your work. How do you handle this?",
        category: "professional-conduct",
        subcategory: "Work Ethics",
        options: [
            { id: "a", text: "Confront them publicly in the next meeting", score: 1 },
            { id: "b", text: "Address it privately first, then document your contributions going forward", score: 4 },
            { id: "c", text: "Let it go to avoid conflict", score: 1 },
            { id: "d", text: "Start taking credit for others' work in return", score: 1 },
        ],
        explanation: "Professional conduct involves addressing issues directly but privately, giving the person a chance to correct course while protecting your interests.",
    },
    {
        id: "prof-2",
        question: "You're at a networking event and feel uncomfortable approaching strangers. What's your approach?",
        category: "professional-conduct",
        subcategory: "Networking",
        options: [
            { id: "a", text: "Stay near the food table and wait for others to approach you", score: 1 },
            { id: "b", text: "Set a goal to meet 3-5 people, prepare conversation starters, and focus on genuine connection", score: 4 },
            { id: "c", text: "Leave early since networking isn't your strength", score: 1 },
            { id: "d", text: "Stick with colleagues you already know", score: 2 },
        ],
        explanation: "Effective networking involves preparation and setting manageable goals. Focusing on genuine connection rather than transactions leads to better relationships.",
    },
    {
        id: "prof-3",
        question: "You want to grow into a senior role. How do you approach your development?",
        category: "professional-conduct",
        subcategory: "Professional Growth",
        options: [
            { id: "a", text: "Wait for your manager to recommend training", score: 1 },
            { id: "b", text: "Identify skill gaps, seek feedback, create a learning plan, and find mentors", score: 4 },
            { id: "c", text: "Apply for senior roles and learn on the job", score: 2 },
            { id: "d", text: "Focus only on technical skills", score: 2 },
        ],
        explanation: "Proactive professional development involves self-assessment, seeking diverse feedback, and creating structured learning paths. Mentorship accelerates growth.",
    },
    {
        id: "prof-4",
        question: "You accidentally reply-all with an inappropriate comment. What do you do?",
        category: "professional-conduct",
        subcategory: "Workplace Etiquette",
        options: [
            { id: "a", text: "Hope no one noticed and say nothing", score: 1 },
            { id: "b", text: "Send an immediate apology, take responsibility, and learn from the mistake", score: 4 },
            { id: "c", text: "Blame it on autocorrect or a technical error", score: 1 },
            { id: "d", text: "Delete the email and pretend it didn't happen", score: 1 },
        ],
        explanation: "Professional conduct means owning mistakes promptly. A genuine apology demonstrates maturity and usually mitigates damage effectively.",
    },
];

// ============= LEARNING MODULES =============

export const learningModules: LearningModule[] = [
    // Communication Skills
    {
        id: "learn-comm-1",
        title: "The Art of Active Listening",
        description: "Master techniques for truly understanding others in workplace conversations",
        category: "communication",
        subcategory: "Active Listening",
        content: `Active listening is more than just hearing words—it's about fully engaging with the speaker to understand their complete message, including emotions and underlying concerns.

**The HEAR Framework:**
- **H**alt: Stop what you're doing and give full attention
- **E**ngage: Use body language to show interest (nodding, eye contact)
- **A**nticipate: Focus on understanding, not on forming your response
- **R**eplay: Summarize and confirm understanding before responding

**Common Barriers to Active Listening:**
1. Preparing your response while others speak
2. Making assumptions based on limited information
3. Getting distracted by phones or other stimuli
4. Letting emotions color your interpretation

**Body Language Signals:**
- Maintain appropriate eye contact (60-70% of conversation)
- Lean slightly forward to show engagement
- Use encouraging nods and verbal cues ("I see", "Go on")
- Keep an open posture (uncrossed arms)`,
        keyTakeaways: [
            "Active listening requires conscious effort and practice",
            "Remove distractions before important conversations",
            "Summarize understanding before responding",
            "Body language communicates as much as words",
        ],
        practicalExercises: [
            "Practice the 3-second pause before responding in conversations",
            "In your next meeting, take notes on what others say rather than your thoughts",
            "Ask clarifying questions before offering opinions",
            "Practice summarizing others' points before adding your perspective",
        ],
        estimatedTime: 15,
        difficulty: "beginner",
    },
    {
        id: "learn-comm-2",
        title: "Powerful Presentation Skills",
        description: "Deliver compelling presentations that engage and persuade",
        category: "communication",
        subcategory: "Presentation Skills",
        content: `Great presentations combine clear structure, engaging delivery, and audience awareness.

**The 10-20-30 Rule:**
- 10 slides maximum
- 20 minutes or less
- 30-point minimum font size

**Structure Your Presentation:**
1. **Hook** (10%): Start with a story, surprising fact, or question
2. **Problem** (20%): Clearly define the challenge or opportunity
3. **Solution** (50%): Present your main content
4. **Call to Action** (20%): Define clear next steps

**Handling Nerves:**
- Prepare thoroughly—confidence comes from preparation
- Practice deep breathing before presenting
- Arrive early to test technology and get comfortable
- Focus on the audience's needs, not your performance

**Engaging Your Audience:**
- Ask rhetorical questions to maintain attention
- Use the "turn to your neighbor" technique for engagement
- Include relevant stories and examples
- Make eye contact with different sections of the room`,
        keyTakeaways: [
            "Less is more—focus on key messages",
            "Stories are more memorable than data alone",
            "Practice reduces anxiety significantly",
            "Engagement is more important than perfection",
        ],
        practicalExercises: [
            "Record yourself giving a 5-minute presentation and review",
            "Practice presenting to a friend and ask for feedback",
            "Time your presentation and cut it by 20%",
            "Create a presentation with no bullet points—only images and keywords",
        ],
        estimatedTime: 20,
        difficulty: "intermediate",
    },

    // Leadership & Teamwork
    {
        id: "learn-lead-1",
        title: "Building High-Performing Teams",
        description: "Essential strategies for creating and maintaining effective teams",
        category: "leadership",
        subcategory: "Team Collaboration",
        content: `High-performing teams share specific characteristics that can be deliberately cultivated.

**Tuckman's Stages of Team Development:**
1. **Forming**: Team members get to know each other
2. **Storming**: Conflicts arise as roles are established
3. **Norming**: Team develops working agreements
4. **Performing**: Team operates at full effectiveness
5. **Adjourning**: Team completes work and disbands

**Google's Project Aristotle Findings:**
The most important factor for team success is **psychological safety**—the belief that you won't be punished for mistakes.

**Creating Psychological Safety:**
- Model vulnerability by admitting your own mistakes
- Respond constructively to bad news
- Encourage questions and alternative viewpoints
- Celebrate learning, not just success

**Effective Team Meetings:**
- Always have an agenda shared in advance
- Define clear outcomes for each discussion
- Assign action items with owners and deadlines
- Rotate facilitation to build leadership skills`,
        keyTakeaways: [
            "Psychological safety is the foundation of team performance",
            "Conflict in 'storming' phase is normal and necessary",
            "Clear expectations prevent misunderstandings",
            "Regular check-ins catch issues early",
        ],
        practicalExercises: [
            "At your next team meeting, ask: 'What did we learn this week?'",
            "Share a mistake you made and what you learned",
            "Create explicit working agreements with your team",
            "Implement a weekly 15-minute retrospective",
        ],
        estimatedTime: 25,
        difficulty: "intermediate",
    },
    {
        id: "learn-lead-2",
        title: "Conflict Resolution Mastery",
        description: "Transform disagreements into opportunities for growth",
        category: "leadership",
        subcategory: "Conflict Resolution",
        content: `Conflict is inevitable in any team. The key is managing it constructively.

**Thomas-Kilmann Conflict Modes:**
1. **Competing**: High assertiveness, low cooperation
2. **Collaborating**: High assertiveness, high cooperation
3. **Compromising**: Medium assertiveness, medium cooperation
4. **Avoiding**: Low assertiveness, low cooperation
5. **Accommodating**: Low assertiveness, high cooperation

**The DESC Method for Difficult Conversations:**
- **D**escribe: State the facts objectively
- **E**xpress: Share your feelings using "I" statements
- **S**pecify: Request specific changes
- **C**onsequences: Explain positive outcomes of change

**De-escalation Techniques:**
- Lower your voice rather than raising it
- Use names—it personalizes the conversation
- Find a private space for difficult discussions
- Acknowledge emotions: "I can see this is frustrating"
- Look for underlying shared interests`,
        keyTakeaways: [
            "Different situations call for different conflict styles",
            "Focus on interests, not positions",
            "Addressing conflict early prevents escalation",
            "Most conflicts stem from unmet needs or miscommunication",
        ],
        practicalExercises: [
            "Identify your default conflict style and practice others",
            "Script a DESC conversation for an ongoing issue",
            "In your next disagreement, explicitly seek the other person's underlying interest",
            "Practice de-escalation phrases in low-stakes situations",
        ],
        estimatedTime: 20,
        difficulty: "advanced",
    },

    // Problem-Solving & Critical Thinking
    {
        id: "learn-prob-1",
        title: "Structured Problem-Solving",
        description: "Apply systematic approaches to complex challenges",
        category: "problem-solving",
        subcategory: "Analytical Reasoning",
        content: `Great problem-solvers follow systematic processes rather than jumping to solutions.

**The 5 Whys Technique:**
Ask "Why?" five times to get to the root cause.

Example:
- Problem: Website is down
- Why? Server crashed
- Why? Memory exceeded
- Why? Traffic spike wasn't handled
- Why? Auto-scaling wasn't configured
- Why? It wasn't in the original requirements

**Root cause: Requirements didn't include scalability considerations**

**The MECE Principle:**
Mutually Exclusive, Collectively Exhaustive—ensure your analysis covers everything without overlap.

**Decision Matrix:**
1. List all options
2. Identify criteria that matter
3. Weight criteria by importance
4. Score each option against criteria
5. Calculate weighted totals
6. Validate with judgment—numbers inform, not decide`,
        keyTakeaways: [
            "Don't solve the symptom—find the root cause",
            "Structure your thinking with frameworks",
            "Data informs decisions but doesn't make them",
            "The best solution isn't always the most obvious one",
        ],
        practicalExercises: [
            "Apply the 5 Whys to a recent problem you solved",
            "Create a decision matrix for a current choice you're facing",
            "Practice breaking down a complex issue into MECE categories",
            "Keep a problem-solving journal documenting your approaches",
        ],
        estimatedTime: 20,
        difficulty: "intermediate",
    },

    // Time Management
    {
        id: "learn-time-1",
        title: "Mastering Prioritization",
        description: "Focus on what matters most to maximize impact",
        category: "time-management",
        subcategory: "Prioritization",
        content: `Effective prioritization is the foundation of productivity.

**The Eisenhower Matrix:**
| | Urgent | Not Urgent |
|---|--------|------------|
| **Important** | DO: Crises, deadlines | SCHEDULE: Planning, development |
| **Not Important** | DELEGATE: Interruptions | ELIMINATE: Time-wasters |

**The MIT Method (Most Important Tasks):**
Each day, identify 3 MITs that must be completed. Work on these first before checking email or attending to smaller tasks.

**Time Boxing:**
- Assign fixed time slots to tasks
- Work focused during the box
- When time's up, stop and move on
- Review what got done at day's end

**The Pareto Principle (80/20 Rule):**
80% of results come from 20% of efforts. Identify and focus on your high-impact activities.`,
        keyTakeaways: [
            "Not everything urgent is important",
            "Protect time for important-not-urgent work",
            "Decisions about what NOT to do are as important as what to do",
            "Your best energy should go to your highest priorities",
        ],
        practicalExercises: [
            "Map your current tasks to the Eisenhower Matrix",
            "Identify your 3 MITs for tomorrow before leaving work today",
            "Track your time for a week to find your 20% high-impact activities",
            "Block 2 hours for deep work on your calendar this week",
        ],
        estimatedTime: 15,
        difficulty: "beginner",
    },

    // Emotional Intelligence
    {
        id: "learn-ei-1",
        title: "Developing Self-Awareness",
        description: "Understand your emotions, triggers, and their impact on others",
        category: "emotional-intelligence",
        subcategory: "Self-Awareness",
        content: `Self-awareness is the foundation of emotional intelligence. It's understanding your emotions, strengths, weaknesses, and how you affect others.

**The Johari Window:**
| | Known to Self | Unknown to Self |
|---|--------------|-----------------|
| **Known to Others** | Open Area | Blind Spot |
| **Unknown to Others** | Hidden Area | Unknown |

**Expanding Self-Awareness:**
- Seek feedback regularly from trusted sources
- Keep a reflection journal
- Notice physical sensations tied to emotions
- Observe patterns in your reactions

**Emotional Triggers:**
Common workplace triggers include:
- Feeling disrespected or unheard
- Uncertainty or lack of control
- Criticism of your work
- Unfair treatment

**The STOP Technique:**
When triggered:
- **S**top: Pause before reacting
- **T**ake a breath: Activate your parasympathetic system
- **O**bserve: Notice what you're feeling and thinking
- **P**roceed: Choose your response mindfully`,
        keyTakeaways: [
            "Emotions are data, not directives",
            "Self-awareness is a skill that can be developed",
            "Feedback from others reveals blind spots",
            "Physical awareness helps emotional awareness",
        ],
        practicalExercises: [
            "Ask 3 colleagues what they see as your strengths and growth areas",
            "Keep an emotion journal for one week",
            "Identify your top 3 emotional triggers at work",
            "Practice the STOP technique when you feel triggered",
        ],
        estimatedTime: 20,
        difficulty: "intermediate",
    },

    // Professional Conduct
    {
        id: "learn-prof-1",
        title: "Strategic Networking",
        description: "Build meaningful professional relationships that advance your career",
        category: "professional-conduct",
        subcategory: "Networking",
        content: `Networking isn't about collecting contacts—it's about building genuine relationships.

**The Networking Mindset:**
- Focus on giving value, not extracting it
- Quality connections matter more than quantity
- Every interaction is a potential relationship
- Follow up is where networking happens

**The 5-5-5 Rule:**
Each week:
- Reach out to 5 existing connections
- Meet 5 new people
- Spend 5 minutes on LinkedIn profile/content

**Conversation Starters:**
- "What are you working on that you're excited about?"
- "What's the biggest challenge in your role right now?"
- "How did you get into your field?"
- "What do you wish you knew starting out?"

**Following Up Effectively:**
- Send a follow-up within 24-48 hours
- Reference something specific from your conversation
- Offer value—an article, introduction, or resource
- Suggest a specific next step if appropriate`,
        keyTakeaways: [
            "Networking is relationship-building, not transaction-making",
            "Be genuinely curious about others",
            "Consistent small efforts beat occasional big pushes",
            "Your network is an asset you build over years",
        ],
        practicalExercises: [
            "Reach out to 3 people you haven't spoken to in 6+ months",
            "After your next event, send personalized follow-ups within 24 hours",
            "Share an article with a comment tagging someone who'd find it valuable",
            "Schedule one 'coffee chat' with someone in a role you aspire to",
        ],
        estimatedTime: 15,
        difficulty: "beginner",
    },
];

// ============= ACHIEVEMENTS =============

export const achievements: Achievement[] = [
    // Quiz-based achievements
    {
        id: "first-steps",
        title: "First Steps",
        description: "Complete your first skill assessment",
        icon: "🎯",
        requirement: { type: "quiz_complete", value: 1 },
    },
    {
        id: "quiz-explorer",
        title: "Quiz Explorer",
        description: "Complete assessments in 3 different categories",
        icon: "🧭",
        requirement: { type: "quiz_complete", value: 3 },
    },
    {
        id: "assessment-master",
        title: "Assessment Master",
        description: "Complete all 6 category assessments",
        icon: "🏆",
        requirement: { type: "quiz_complete", value: 6 },
    },

    // Score-based achievements
    {
        id: "rising-star",
        title: "Rising Star",
        description: "Score 7+ in any skill category",
        icon: "⭐",
        requirement: { type: "score_threshold", value: 7 },
    },
    {
        id: "high-achiever",
        title: "High Achiever",
        description: "Score 8+ in any skill category",
        icon: "🌟",
        requirement: { type: "score_threshold", value: 8 },
    },
    {
        id: "skill-master",
        title: "Skill Master",
        description: "Score 9+ in any skill category",
        icon: "💫",
        requirement: { type: "score_threshold", value: 9 },
    },

    // Module-based achievements
    {
        id: "curious-learner",
        title: "Curious Learner",
        description: "Complete your first learning module",
        icon: "📚",
        requirement: { type: "module_complete", value: 1 },
    },
    {
        id: "knowledge-seeker",
        title: "Knowledge Seeker",
        description: "Complete 5 learning modules",
        icon: "🎓",
        requirement: { type: "module_complete", value: 5 },
    },
    {
        id: "lifelong-learner",
        title: "Lifelong Learner",
        description: "Complete all learning modules",
        icon: "🏅",
        requirement: { type: "module_complete", value: 8 },
    },

    // Category mastery achievements
    {
        id: "communication-pro",
        title: "Communication Pro",
        description: "Score 8+ in Communication and complete all related modules",
        icon: "💬",
        requirement: { type: "category_mastery", value: 8, categoryId: "communication" },
    },
    {
        id: "leader-in-making",
        title: "Leader in the Making",
        description: "Score 8+ in Leadership and complete all related modules",
        icon: "👑",
        requirement: { type: "category_mastery", value: 8, categoryId: "leadership" },
    },
    {
        id: "problem-solver",
        title: "Problem Solver",
        description: "Score 8+ in Problem-Solving and complete all related modules",
        icon: "🧩",
        requirement: { type: "category_mastery", value: 8, categoryId: "problem-solving" },
    },
    {
        id: "time-master",
        title: "Time Master",
        description: "Score 8+ in Time Management and complete all related modules",
        icon: "⏰",
        requirement: { type: "category_mastery", value: 8, categoryId: "time-management" },
    },
    {
        id: "empathy-expert",
        title: "Empathy Expert",
        description: "Score 8+ in Emotional Intelligence and complete all related modules",
        icon: "❤️",
        requirement: { type: "category_mastery", value: 8, categoryId: "emotional-intelligence" },
    },
    {
        id: "true-professional",
        title: "True Professional",
        description: "Score 8+ in Professional Conduct and complete all related modules",
        icon: "💼",
        requirement: { type: "category_mastery", value: 8, categoryId: "professional-conduct" },
    },
];

// ============= HELPER FUNCTIONS =============

export const getQuestionsByCategory = (category: SkillCategory): QuizQuestion[] => {
    return quizQuestions.filter((q) => q.category === category);
};

export const getModulesByCategory = (category: SkillCategory): LearningModule[] => {
    return learningModules.filter((m) => m.category === category);
};

export const calculateCategoryScore = (answers: { questionId: string; optionId: string }[]): number => {
    let totalScore = 0;
    let maxScore = 0;

    answers.forEach(({ questionId, optionId }) => {
        const question = quizQuestions.find((q) => q.id === questionId);
        if (question) {
            const selectedOption = question.options.find((o) => o.id === optionId);
            if (selectedOption) {
                totalScore += selectedOption.score;
            }
            maxScore += 4; // Max score per question is 4
        }
    });

    if (maxScore === 0) return 0;
    // Convert to 1-10 scale
    return Math.round((totalScore / maxScore) * 10 * 10) / 10;
};

export const getCategoryColor = (category: SkillCategory): string => {
    const categoryData = skillCategories.find((c) => c.id === category);
    return categoryData?.color || "gray";
};
