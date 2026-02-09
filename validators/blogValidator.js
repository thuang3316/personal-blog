const { body } = require('express-validator');

const blogValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 20 }).withMessage('Title must be between 3 and 20 characters'),
  
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  
  body('publish_date')
    .notEmpty().withMessage('Publish date is required')
    .isDate().withMessage('Invalid date format')
];

module.exports = { blogValidationRules };