const test = require('node:test');
const assert = require('node:assert/strict');

const { generateBlogInsights } = require('../src/services/aiService');

test('generateBlogInsights falls back when the OpenAI key is a placeholder', async () => {
  const previousKey = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = 'your_openai_api_key_here';

  try {
    const result = await generateBlogInsights({
      title: 'AI in Blogging',
      content: 'AI helps people write better content faster.'
    });

    assert.equal(result.tone, 'informative');
    assert.ok(Array.isArray(result.keywords));
    assert.match(result.summary, /Draft summary/);
  } finally {
    if (previousKey === undefined) {
      delete process.env.OPENAI_API_KEY;
    } else {
      process.env.OPENAI_API_KEY = previousKey;
    }
  }
});
