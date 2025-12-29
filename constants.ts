
import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How did you hear about ETHMumbai?",
    keyword: "Presence Check",
    options: [
      { text: "Through friends / community groups", points: 10 },
      { text: "Twitter / X", points: 8 },
      { text: "Discord / Telegram", points: 6 },
      { text: "Random post / website", points: 4 },
      { text: "What is ETHMumbai? 👀", points: 0 }
    ]
  },
  {
    id: 2,
    text: "Have you attended ETHMumbai (or an ETHMumbai-side event)?",
    keyword: "Attendance",
    options: [
      { text: "Yes, in person 🔥", points: 10 },
      { text: "Online / livestream", points: 7 },
      { text: "Planned to, but couldn’t", points: 5 },
      { text: "Heard about it after it happened", points: 2 },
      { text: "Never attended", points: 0 }
    ]
  },
  {
    id: 3,
    text: "When did you first get into Ethereum / Web3?",
    keyword: "Time in the Game",
    options: [
      { text: "Before 2020", points: 10 },
      { text: "2020–2021", points: 8 },
      { text: "2022", points: 6 },
      { text: "2023–2024", points: 4 },
      { text: "Still exploring", points: 2 }
    ]
  },
  {
    id: 4,
    text: "Which best describes you?",
    keyword: "Builder Energy",
    options: [
      { text: "Actively building / shipping projects", points: 10 },
      { text: "Hackathon regular", points: 8 },
      { text: "Learning & experimenting", points: 6 },
      { text: "Mostly reading & observing", points: 4 },
      { text: "Just here for vibes", points: 2 }
    ]
  },
  {
    id: 5,
    text: "How do you engage with the ecosystem?",
    keyword: "Community Contribution",
    options: [
      { text: "Organize events / mentor others", points: 10 },
      { text: "Contribute to open source", points: 8 },
      { text: "Write / speak / share insights", points: 6 },
      { text: "Lurk but stay updated", points: 4 },
      { text: "Only consume content", points: 2 }
    ]
  },
  {
    id: 6,
    text: "What matters most to you about ETHMumbai?",
    keyword: "Culture Check",
    options: [
      { text: "Community & people", points: 10 },
      { text: "Builders & ideas", points: 8 },
      { text: "Learning & exposure", points: 6 },
      { text: "Networking & opportunities", points: 4 },
      { text: "Free swag 👀", points: 2 }
    ]
  },
  {
    id: 7,
    text: "How do you feel about Ethereum long-term?",
    keyword: "Conviction",
    options: [
      { text: "Ethereum is inevitable 🐂", points: 10 },
      { text: "Strongly bullish", points: 8 },
      { text: "Cautiously optimistic", points: 6 },
      { text: "Neutral", points: 4 },
      { text: "Still unsure", points: 2 }
    ]
  },
  {
    id: 8,
    text: "ETHMumbai feels like…",
    keyword: "Identity",
    options: [
      { text: "Home 🏠", points: 10 },
      { text: "My kind of crowd", points: 8 },
      { text: "Inspiring community", points: 6 },
      { text: "Interesting event", points: 4 },
      { text: "Just another conference", points: 0 }
    ]
  },
  {
    id: 9,
    text: "Pick a vibe that matches you best",
    keyword: "Mumbai Energy",
    options: [
      { text: "Build → break → rebuild", points: 10 },
      { text: "Ship first, polish later", points: 8 },
      { text: "Learn deeply, move steadily", points: 6 },
      { text: "Observe & absorb", points: 4 },
      { text: "Go with the flow", points: 2 }
    ]
  },
  {
    id: 10,
    text: "Would you recommend ETHMumbai to others?",
    keyword: "The Ultimate Question",
    options: [
      { text: "Already did 🚀", points: 10 },
      { text: "100% yes", points: 8 },
      { text: "Probably", points: 6 },
      { text: "Maybe", points: 4 },
      { text: "Not sure", points: 2 }
    ]
  }
];
