const OpenAI = require('openai');

const getClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  const isPlaceholder = typeof apiKey === 'string' && apiKey.trim() !== '' && /your_openai_api_key_here|placeholder|replace_me/i.test(apiKey);

  if (!apiKey || isPlaceholder) {
    return null;
  }

  return new OpenAI({ apiKey });
};

const getFallbackInsights = ({ title, content }) => ({
  summary: `Draft summary for "${title || 'Untitled post'}": ${content?.slice(0, 120) || ''}`,
  keywords: ['ai', 'blogging', 'content'],
  tone: 'informative'
});

const generateBlogInsights = async ({ title, content }) => {
  const client = getClient();

  if (!client) {
    return getFallbackInsights({ title, content });
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are an expert blog assistant. Return valid JSON only with fields: summary, keywords, tone.'
        },
        {
          role: 'user',
          content: `Title: ${title}\n\nContent: ${content}`
        }
      ]
    });

    const raw = completion.choices[0]?.message?.content;

    if (!raw) {
      throw new Error('No content returned from AI model');
    }

    return JSON.parse(raw);
  } catch (error) {
    console.warn('AI generation failed, using fallback summary:', error?.message || error);
    return getFallbackInsights({ title, content });
  }
};

module.exports = { generateBlogInsights };
