const express = require('express');
const router = express.Router();
const { formatDate } = require('../utils'); // Importing the formatDate function

let posts = [];  // Temporary storage for blog posts

// Route to display all posts
router.get('/', (req, res) => {
    res.render('index', { posts });
});

// Route to show the form to create a new post
router.get('/new', (req, res) => {
    res.render('new');
});

// Route to handle the creation of a new post
router.post('/new', (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        id: Date.now(),
        title,
        content,
        date: formatDate(new Date())  // Format the date when creating a new post
    };
    posts.push(newPost);
    res.redirect('/');
});

// Route to show the form to edit a post
router.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.sendStatus(404);
    res.render('edit', { post });
});

// Route to handle updating a post
router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id == id);
    if (postIndex === -1) return res.sendStatus(404);
    posts[postIndex] = {
        id: Number(id),
        title,
        content,
        date: posts[postIndex].date // Keep the original date
    };
    res.redirect('/');
});

// Route to handle deleting a post
router.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});
// Route to render the about page
router.get('/about', (req, res) => {
    res.render('about');
});

// Route to render the contact page
router.get('/contact', (req, res) => {
    res.render('contact');
});

// Route to handle the contact form submission
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    // Here, you would handle the form submission (e.g., send an email)
    console.log(`Contact form submitted by ${name} (${email}): ${message}`);
    res.redirect('/contact');
});
module.exports = router;
