const LivroDAO = require('../infra/livro-dao')
const db = require('../../config/database')

module.exports = (app) => {
  app.get('/', function (req, resp) {
    resp.send(
      `
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <h1> Casa do Código </h1>
        </body> 
      </html>
    `)
  })

  app.get('/livros/form/:id', function (req, resp) {
    const id = req.params.id
    const livroDao = new LivroDAO(db)

    livroDao.buscaPorId(id)
      .then(livro => resp.marko(require('../views/books/form/form.marko'),
        {
          livro: livro
        }))
      .catch(erro => console.log(erro))
  })

  app.get('/livros', function (req, resp) {
    const livrodao = new LivroDAO(db)
    livrodao.lista()
      .then(livros => resp.marko(require('../views/books/list/lista.marko'),
        {
          livros: livros
        }))
      .catch(erro => console.log(erro))
  })

  app.get('/livros/form', function (req, resp) {
    resp.marko(require('../views/books/form/form.marko'),
      { livro: {} })
  })

  app.post('/livros', function (req, resp) {
    const livrodao = new LivroDAO(db)
    livrodao.adiciona(req.body)
      .then(resp.redirect('/livros'))
      .catch(erro => console.log(erro))
  })

  app.put('/livros', function (req, resp) {
    const livrodao = new LivroDAO(db)
    livrodao.atualiza(req.body)
      .then(resp.redirect('/livros'))
      .catch(erro => console.log(erro))
  })

  app.delete('/livros/:id', function (req, resp) {
    const id = req.params.id
    const livroDao = new LivroDAO(db)
    livroDao.remove(id)
      .then(() => resp.status(200).end())
      .catch(erro => console.log(erro))
  })
}
