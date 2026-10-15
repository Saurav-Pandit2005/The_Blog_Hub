const { fail } = require('../utils/helpers');

const REQUEST_TIMEOUT_MS = 30000;

const systemPromptFor = (type) =>
  type === 'blog'
    ? 'You are a professional blogger. Output only the blog content in HTML format.'
    : 'You are a creative writer. Be concise.';

const askGroq = async (system, userPrompt) => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY.trim()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userPrompt },
      ],
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content;
};

const askGemini = async (system, userPrompt) => {
  const model = process.env.GEMINI_MODEL || 'gemini-flash-latest';
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY.trim(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    }
  );

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text).join('');
};

/**
 * @desc    Generate content with Groq first, Gemini as backup
 * @route   POST /api/v1/ai/generate
 * @access  Private (Author/Admin)
 */
exports.generateContent = async (req, res) => {
  const { prompt, type } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return fail(res, 400, 'Please provide a topic');
  }

  const system = systemPromptFor(type);
  const userPrompt = `Topic: ${prompt}. Type: ${type || 'general'}`;

  const providers = [];
  if (process.env.GROQ_API_KEY) providers.push(['Groq', askGroq]);
  if (process.env.GEMINI_API_KEY) providers.push(['Gemini', askGemini]);

  for (const [name, ask] of providers) {
    try {
      const text = await ask(system, userPrompt);
      if (text) return res.status(200).json({ success: true, data: text });
      console.error(`${name} returned no content`);
    } catch (err) {
      console.error(`${name} failed: ${err.message}`);
    }
  }

  fail(res, 503, 'AI service is unavailable right now. Please try again later.');
};
