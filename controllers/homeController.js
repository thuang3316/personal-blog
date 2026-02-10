const db = require('../db/queries');
const {format} = require("date-fns");

async function getHomePage(req, res) {
    // get all blogs from the database
    const blogs = await db.getAllBlogs();
    res.render("home", { blogs });
}

async function getSingleBlog(req, res) {
    const {id} = req.params;
    const blog = await db.getBlogById(id);
    const formattedDate = format(new Date(blog.publish_date), 'MMM dd, yyyy')
    res.render("blog", {blog, formattedDate});
}

async function getSearchResults(req, res) {
    const query = req.query.title;
    if (!query) {
        return res.redirect("/home");
    }
    try {
        const blogs = await db.searchBlogByTitle(query);
        res.render("home",{
            blogs,
            query
        })
    } catch(error) {
        console.error(error);
        res.status(500).send('Error searching blogs');
    }
}

module.exports = {
    getHomePage,
    getSingleBlog,
    getSearchResults
}