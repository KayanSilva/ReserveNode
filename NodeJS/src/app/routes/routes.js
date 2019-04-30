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
  app.get('/livros', function (req, resp) {
    const livrodao = new LivroDAO(db)
    livrodao.lista()
      .then(livros => resp.marko(require('../views/books/list/lista.marko'),
        {
          livros: livros
        }).catch(erro => console.log(erro)))
  })
}
