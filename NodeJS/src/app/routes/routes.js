const livroRotas = require('./rotasLivro')
const baseRotas = require('./rotasBase')

module.exports = (app) => {
  baseRotas(app)
  livroRotas(app)
}
