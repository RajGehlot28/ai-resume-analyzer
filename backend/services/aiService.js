import openai from "../config/openaiConfig.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("@cedrugs/pdf-parse");

export const analyzeWithAI = async (fileBuffer, jobDescription) => {
  let resumeText = "";
  try {
    const pdfData = await pdf(fileBuffer);
    resumeText = pdfData.text ? pdfData.text.trim() : "";
  } catch(error) {
    console.error("PDF extraction failed:", error);
    throw new Error("Could not extract text from the PDF.");
  }

  if(!resumeText || resumeText.length < 50) {
    throw new Error("The resume appears to be empty or an image-based PDF.");
  }

  const analysisPrompt = `
    You are an ATS expert. Compare the following Resume against the Job Description (JD).
    
    Instructions:
    1. Provide concise but informative feedback. Avoid one-word answers, but do not write long paragraphs.
    2. Aim for roughly 1 to 2 clear sentences for each point. 
    3. For 'strengths' and 'weaknesses', briefly explain the reasoning based on the Resume and JD requirements.
    4. Ensure the 'score' is a realistic match percentage.

    JD: ${jobDescription}
    Resume: ${resumeText}

    Output ONLY valid JSON with:
    - score: (number)
    - matched_skills: (Array of strings - brief mention of matching skills)
    - missing_skills: (Array of strings - key requirements missing)
    - recommended_keywords: (Array of strings - essential keywords to add)
    - strengths: (Array of strings - clear, 1-2 sentence points on why the candidate fits)
    - weaknesses: (Array of strings - clear, 1-2 sentence points on what is missing)
    - suggestions: (Array of strings - actionable, medium-length advice for improvement)
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional ATS system providing concise, balanced feedback in JSON format." },
        { role: "user", content: analysisPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1 // Keeping less temperature for consistency and precision
    });

    return response.choices[0].message.content;
  } catch(err) {
    console.error("OpenAI Error:", err.message);
    throw new Error("The AI failed to analyze the resume.");
  }
};