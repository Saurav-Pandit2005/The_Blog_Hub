const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function test() {
    console.log("🔍 Testing Gemini with Key:", process.env.GEMINI_API_KEY ? "Present (Starts with " + process.env.GEMINI_API_KEY.substring(0,5) + ")" : "MISSING");
    
    if (!process.env.GEMINI_API_KEY) return;

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        console.log("📡 Sending request to Google AI...");
        const result = await model.generateContent("Hello, say 'AI is active' in 3 words.");
        const text = result.response.text();
        console.log("✅ SUCCESS! AI says:", text);
    } catch (err) {
        console.error("❌ FAILED! Error details:");
        console.error(err);
    }
}

test();
