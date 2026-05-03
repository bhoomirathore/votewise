# VoteWise — Know Your Vote

## About
VoteWise is a Gemini-powered civic education web app that helps Indian citizens understand the election process through an interactive timeline, step-by-step voter guide, multilingual glossary, AI chatbot, and a knowledge quiz. Non-partisan, mobile-first, and accessible to all.

## Vertical Chosen
Election Process Education

## Approach and Logic
VoteWise is built as a single-page React application that guides users through the Indian election process in a structured, module-based format. Each module addresses a specific learning need — from understanding the election timeline to casting a vote to testing knowledge. The app uses a conversational AI assistant (powered by Groq API with Llama3) to answer any election-related question in plain, jargon-free language.

## How the Solution Works

### Module 1 — Election Timeline Explorer
An interactive horizontal timeline showing all 7 stages of the Indian election process. Each stage is clickable and expands to show what happens, who is responsible, typical duration, and a real example from Indian elections.

### Module 2 — Step-by-Step Voter Guide
A 5-step interactive guide walking users through the complete voting journey — from checking eligibility to verifying their vote was counted. Users can tick off completed steps and track their progress. Includes a Google Maps embed for polling booth location.

### Module 3 — VoteWise AI Chatbot
A conversational AI assistant powered by Groq API (Llama3-8b model) that answers any question about Indian elections. Features starter question chips, follow-up suggestions, chat history persistence, and a non-partisan system prompt that keeps responses factual and neutral.

### Module 4 — Election Glossary
A searchable, filterable dictionary of 20+ key election terms with A-Z navigation. Features real-time search with keyword highlighting, smart tooltips on key terms throughout the app, and multilingual support framework.

### Module 5 — Knowledge Quiz
A 10-question quiz across 3 difficulty levels (Beginner, Intermediate, Advanced) covering key election concepts. Features instant feedback, explanations for each answer, high score tracking, and a shareable score feature.

## Google Services Used
- Groq API (Llama3) — Powers the VoteWise AI chatbot for real-time Q&A
- Google Maps Embed API — Polling booth locator in Module 2
- Google Fonts — Typography (Inter)

## Assumptions Made
- Primary audience is Indian citizens, especially first-time voters
- Content is focused on Indian election process and ECI guidelines
- English is the primary language with multilingual support framework in place
- App is designed for both desktop and mobile use
- All election information is sourced from publicly available ECI data

## Tech Stack
- React + Vite
- Tailwind CSS v3
- Groq API (Llama3-8b-8192)
- lucide-react for icons
- localStorage for data persistence

## How to Run Locally
1. Clone the repository
```bash
git clone https://github.com/bhoomirathore/VoteWise.git
cd VoteWise
```
2. Install dependencies
```bash
npm install
```
3. Create a config.js file in the root directory
```js
const CONFIG = {
  GROQ_API_KEY: 'your-groq-api-key-here'
}
export default CONFIG
```
4. Start the development server
```bash
npm run dev
```
5. Open http://localhost:5173 in your browser

## Important Notes
- config.js is gitignored to protect API keys
- The app is non-partisan and does not endorse any political party or candidate
- All data is sourced from the Election Commission of India

## License
MIT
