import { Groq } from "groq-sdk";

export const getGroq = () => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY environment variable. Please add it to your Vercel project settings.");
  }
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
};
