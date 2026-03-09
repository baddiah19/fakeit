/**
 * HR office scene hotspots (static image overlay).
 * x and y are percentage coordinates (0–100) for responsive positioning.
 */
export type HRHotspot = {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
};

export const hrHotspots: HRHotspot[] = [
  { id: "resume-screening", title: "AI Resume Screening", description: "AI automatically screens and ranks candidate resumes.", x: 17, y: 67 },
  { id: "interview-assistant", title: "AI Interview Assistant", description: "AI records and analyzes interviews to provide insights and candidate summaries.", x: 36, y: 46 },
  { id: "workforce-analytics", title: "Workforce Analytics", description: "AI dashboards analyzing workforce metrics, hiring performance, and trends.", x: 51, y: 42 },
  { id: "interview-scheduling", title: "AI Interview Scheduling", description: "AI automatically coordinates interview availability across recruiters and candidates.", x: 51, y: 55 },
  { id: "employee-helpdesk", title: "AI Employee Helpdesk", description: "AI assistant integrated with Slack or Teams to answer HR questions instantly.", x: 76, y: 60 },
  { id: "onboarding-automation", title: "AI Onboarding Automation", description: "AI automates employee onboarding tasks, documentation, and welcome processes.", x: 82, y: 63 },
  { id: "policy-search", title: "AI Policy Search / Knowledge AI", description: "Employees can instantly search HR policies and documents using AI.", x: 21, y: 64 },
  { id: "employee-sentiment", title: "Employee Sentiment AI", description: "AI analyzes employee feedback and surveys to detect workplace sentiment and issues.", x: 88, y: 41 },
];
