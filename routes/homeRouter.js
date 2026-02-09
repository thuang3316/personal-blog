const {Router} = require("express");
const controller = require('../controllers/homeController');

const homeRouter = Router();

homeRouter.get('/', controller.getHomePage);
homeRouter.get('/:id', controller.getSingleBlog);

module.exports = homeRouter;