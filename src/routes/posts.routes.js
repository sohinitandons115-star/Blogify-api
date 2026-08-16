const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const postController = require('../controllers/postController');

const postValidationRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('content').trim().notEmpty().withMessage('Content is required').isLength({ min: 10 }).withMessage('Content must be at least 10 characters')
];

router.get('/', postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.post('/', postValidationRules, postController.createPost);
router.put('/:postId', postValidationRules, postController.updatePost);
router.delete('/:postId', postController.deletePost);

module.exports = router;
