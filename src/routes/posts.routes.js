const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const postController = require('../controllers/postController');
const { authenticate } = require('../middleware');

const postValidationRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('content').trim().notEmpty().withMessage('Content is required').isLength({ min: 10 }).withMessage('Content must be at least 10 characters')
];

router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.post('/', authenticate, postValidationRules, postController.createPost);
router.put('/:postId', authenticate, postValidationRules, postController.updatePost);
router.delete('/:postId', authenticate, postController.deletePost);

module.exports = router;
