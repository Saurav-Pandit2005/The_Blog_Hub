const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function list() {
    console.log("🔍 Checking available models for your API Key...");
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Use native fetch if available (Node 18+)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        
        if (data.models) {
            console.log("✅ Models found:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods.includes("generateContent")) {
                   console.log(" - " + m.name);
                }
            });
        } else {
            console.log("❌ No models found. Response:", JSON.stringify(data));
        }
    } catch (err) {
        console.error("❌ Error listing models:", err);
    }
}

list();
