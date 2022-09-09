let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment]
  })
  .then((article) => {
    if (!article) throw Error()
    console.log(article.author)
    res.render('articles/show', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// POST :3000/articles/:id/comments - route to save comment to db
router.post("/:id/comments", async (req, res) => {
  try {
    // get the data from req.body
    console.log("req dot body", req.body)
    // create a new comment from data ^
    // console that new comment
    // re render the page so user can see comment
    const newComment = await db.comment.create({
      name: req.body.name,
      content: req.body.content,
      articleId: req.params.id
    })
    // 3000/articles/1
    res.redirect(`/articles/${req.params.id}`)
  } catch(err) {
    console.log(err)
  }
})

module.exports = router
