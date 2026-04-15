const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * @desc    Generate content using Groq (Primary) or Gemini (Secondary)
 * @route   POST /api/v1/ai/generate
 * @access  Private (Author/Admin)
 */
exports.generateContent = async (req, res) => {
  const { prompt, type } = req.body;

  if (!prompt) {
    return res.status(400).json({ success: false, error: "Please provide a topic" });
  }

  // 🧠 THE SMART FALLBACK (Last Resort)
  const getFallback = () => {
    let text = "";
    if (type === 'blog') text = `<h2>The Smart Tech Era</h2><p>In the evolving world of <strong>${prompt}</strong>, staying updated is the key to success. We are witnessing a shift towards smarter, more efficient systems that redefine how we interact with technology.</p><ul><li>Faster processing</li><li>AI-driven insights</li><li>Seamless integration</li></ul>`;
    else if (type === 'description') text = `A detailed look into ${prompt}, exploring its impact on the modern digital landscape.`;
    else text = `1. Unleashing the Power of ${prompt}\n2. The Future is ${prompt}\n3. Mastering ${prompt}`;
    return text;
  };

  // --- OPTION 1: TRY GROQ (Super Fast & Reliable) ---
  if (process.env.GROQ_API_KEY) {
    try {
      console.log("⚡ Trying Groq AI...");
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY.trim()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { 
              role: "system", 
              content: type === 'blog' ? "You are a professional blogger. Output only the blog content in HTML format." : "You are a creative writer. Be concise." 
            },
            { role: "user", content: `Topic: ${prompt}. Type: ${type}` }
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0].message.content) {
        console.log("✅ Groq Success!");
        return res.status(200).json({
          success: true,
          data: data.choices[0].message.content
        });
      }
    } catch (err) {
      console.error("⚠️ Groq Failed, falling back to Gemini...");
    }
  }

  // --- OPTION 2: TRY GEMINI (Backup) ---
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log("📡 Trying Gemini AI...");
      const apiKey = process.env.GEMINI_API_KEY.trim();
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const geminiRes = await result.response;
      const text = geminiRes.text();

      if (text) {
        console.log("✅ Gemini Success!");
        return res.status(200).json({
          success: true,
          data: text
        });
      }
    } catch (err) {
      console.error("⚠️ Gemini Failed too...");
    }
  }

  // --- OPTION 3: FINAL FALLBACK ---
  console.log("🧱 Both APIs failed. Using Hardcoded Fallback.");
  res.status(200).json({
    success: true,
    data: getFallback(),
    isSimulated: true
  });
};
