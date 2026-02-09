const db = require('../db/queries');
const {format} = require("date-fns");
const { validationResult } = require('express-validator');

async function getAdminPage(req, res) {
    // get all blogs from the database
    const blogs = await db.getAllBlogs();
    res.render("admin", { blogs });
}

async function getEditPage(req, res) {
    const { id } = req.params;
    const blog = await db.getBlogById(id);
    const formattedDate = format(new Date(blog.publish_date), 'yyyy-MM-dd');
    res.render("editBlog", {blog, formattedDate, errors: []});
}

async function postEditedBlog(req, res) {
    const { id } = req.params;
    const { title, content, type, publish_date } = req.body;
    // validate form inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const originalBlog = await db.getBlogById(id);
        const blog = { ...originalBlog, ...req.body };
        const formattedDate = req.body.publish_date || format(new Date(originalBlog.publish_date), 'yyyy-MM-dd');
        return res.render("editBlog", {
            blog,
            formattedDate,
            errors: errors.array()
        });
    }
    try {
        await db.updateBlog(id, title, content, type, publish_date);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating blog');
    }
}

async function deleteBlog(req, res) {
    const {id} = req.params;
    try {
        await db.deleteBlogById(id);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting blog');
    }
}

async function getAddPage(req, res) {
    res.render("addBlog", {errors: []});
}

async function postAddedBlog(req, res) {
    const { title, content, type, publish_date } = req.body;
    // validate form inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("addBlog", {errors: errors.array()});
    }
    try {
        await db.addBlog(title, content, type, publish_date);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding blog');
    }
}

module.exports = {
    getAdminPage,
    getEditPage,
    postEditedBlog,
    deleteBlog,
    getAddPage,
    postAddedBlog
}