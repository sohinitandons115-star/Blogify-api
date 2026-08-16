const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const postRouter = require('./posts.routes');
const { generateBlogInsights } = require('../services/aiService');

router.get('/about', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to the Blogify AI About page' });
});

router.get('/error-test', (req, res, next) => {
  next(new Error('This is a test error'));
});

router.post('/ai/generate', async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const aiResult = await generateBlogInsights({ title, content });

    res.status(200).json({ success: true, data: aiResult });
  } catch (error) {
    next(error);
  }
});

router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;