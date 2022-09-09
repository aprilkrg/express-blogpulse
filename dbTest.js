const db = require('./models')

// db.comment.create({
//   name: 'Paul Allen',
//   content: 'This is really neat! Thanks for posting.',
//   articleId: 1
// })
// .then(comment => {
//   console.log(comment.get())
// })

const createComment = async () => {
  try {
    const newComment = await db.comment.create({
      name: 'Ada Lovelace',
      content: 'So excited for this!',
      articleId: 2
    })
    console.log(newComment)
  } catch (err) {
    console.log(err)
  }
}
// createComment()

// TESTING ARTICLES

db.article.findOne({
  where: { id: 1 },
  include: [db.comment]
}).then(article => {
  // by using eager loading, the article model should have a comments key
  console.log(article.comments)
})

const readArticles = async () => {
  try {
    const article = await db.article.findOne({
      where: { id: 2},
      include: [db.author, db.comment]
    })
    console.log(article.comments)
  } catch (err) {
    console.log(err)
  }
}

readArticles()