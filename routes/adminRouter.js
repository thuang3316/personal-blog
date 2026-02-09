const {Router} = require("express");
const authMiddleware = require('../auth');
const controller = require('../controllers/adminController');
const { blogValidationRules } = require('../validators/blogValidator')

const adminRouter = Router();

adminRouter.use(authMiddleware);

adminRouter.get('/', controller.getAdminPage);
adminRouter.get('/edit/:id', controller.getEditPage);
adminRouter.post('/edit/:id', blogValidationRules, controller.postEditedBlog);
adminRouter.get('/delete/:id', controller.deleteBlog);
adminRouter.get('/new', controller.getAddPage);
adminRouter.post('/new', blogValidationRules, controller.postAddedBlog);

module.exports = adminRouter;

