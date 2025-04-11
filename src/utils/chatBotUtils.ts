
// Simple response patterns for the chatbot
type ResponsePattern = {
  keywords: string[];
  responses: string[];
};

const responsePatterns: ResponsePattern[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    responses: [
      "Hi there! How can I help you today?",
      "Hello! What can I do for you?",
      "Hey! I'm glad to see you. How can I assist?",
    ],
  },
  {
    keywords: ["how are you", "how's it going", "how do you do"],
    responses: [
      "I'm doing great, thanks for asking! How about you?",
      "I'm just a computer program, but I'm functioning well!",
      "All systems operational! How can I help you today?",
    ],
  },
  {
    keywords: ["bye", "goodbye", "see you", "later"],
    responses: [
      "Goodbye! Have a great day!",
      "See you later! Feel free to return if you have more questions.",
      "Take care! Come back anytime.",
    ],
  },
  {
    keywords: ["thanks", "thank you"],
    responses: [
      "You're welcome!",
      "Happy to help!",
      "Anytime! Is there anything else you need?",
    ],
  },
  {
    keywords: ["name", "who are you", "what are you"],
    responses: [
      "I'm a friendly chatbot built with React and TypeScript.",
      "I'm your virtual assistant, here to chat and help you out!",
      "Just a simple AI assistant created to demonstrate chatbot functionality.",
    ],
  },
  {
    keywords: ["help", "assist", "support"],
    responses: [
      "I'm here to help! What do you need assistance with?",
      "How can I assist you today?",
      "I'd be happy to help. What's on your mind?",
    ],
  },
  {
    keywords: ["weather", "forecast", "temperature"],
    responses: [
      "I'm afraid I can't check the weather for you at the moment. I'm a simple demonstration bot.",
      "I don't have access to real-time weather data, but I hope it's nice wherever you are!",
      "Weather forecasts are beyond my capabilities right now.",
    ],
  },
  {
    keywords: ["joke", "funny", "laugh"],
    responses: [
      "Why don't scientists trust atoms? Because they make up everything!",
      "What did the ocean say to the beach? Nothing, it just waved!",
      "Why did the JavaScript developer wear glasses? Because they couldn't C#!",
    ],
  },
];

// Default responses when no pattern is matched
const defaultResponses = [
  "I'm not sure I understand. Could you rephrase that?",
  "Interesting! Tell me more about that.",
  "I'm still learning. Could you try asking something else?",
  "I don't have an answer for that yet.",
  "Let's talk about something else!",
];

// Function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Main function to process input and return a response
export const getResponseForMessage = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check for matches in response patterns
  for (const pattern of responsePatterns) {
    if (pattern.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return getRandomItem(pattern.responses);
    }
  }
  
  // Return a default response if no patterns match
  return getRandomItem(defaultResponses);
};
