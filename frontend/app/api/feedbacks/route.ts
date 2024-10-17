import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiapikey } from "../constants";
// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(geminiapikey);

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: "Invalid feedback data" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Provide an overall summary of the following feedback responses. Consider both the ratings and the feedback text. Include key points, trends, and any notable insights.

Feedback responses:
${data.map((item, index) => `${index + 1}. Name: ${item.Name}, Rating: ${item["Ratings out of 5"]}, Feedback: ${item.Feedback}`).join('\n')}

Please format your response as a JSON object with the following structure:
{
  "overallSummary": "...",
  "averageRating": "...",
  "keyPoints": [
    "...",
    "...",
    "..."
  ],
  "recommendations": [
    "...",
    "...",
    "..."
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Remove any markdown formatting or unexpected characters
    text = text.replace(/```json\n?|\n?```/g, '').trim();

    // Attempt to parse the JSON response
    let feedbackSummary;
    try {
      feedbackSummary = JSON.parse(text);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      console.log("Raw AI response:", text);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    // Validate the parsed response structure
    if (!feedbackSummary.overallSummary || !feedbackSummary.keyPoints || !feedbackSummary.recommendations) {
      console.error("Invalid response structure:", feedbackSummary);
      return NextResponse.json({ error: "Invalid AI response structure" }, { status: 500 });
    }

    return NextResponse.json(feedbackSummary, { status: 200 });
  } catch (err) {
    console.error("Error in feedback summary:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}