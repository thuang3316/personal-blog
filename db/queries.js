const pool = require('./pool');

async function getAllBlogs() {
    const {rows} = await pool.query('select * from blogs order by id;');
    return rows;
}

async function getBlogById(id) {
    const {rows} = await pool.query('select * from blogs where id=$1;', [id]);
    return rows[0];
}

async function updateBlog(id, title, content, type, publish_date) {
    await pool.query('update blogs set title=$1, content=$2, type=$3, publish_date=$4 where id=$5;', [title, content, type, publish_date, id]);
}

async function deleteBlogById(id) {
    await pool.query('delete from blogs where id=$1', [id]);
}

async function addBlog(title, content, type, publish_date) {
    await pool.query('insert into blogs (title, content, type, publish_date) values ($1, $2, $3, $4);', [title, content, type, publish_date]);
}

module.exports = {
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlogById,
    addBlog
}