class LivroDao {
  constructor (db) {
    this._db = db
  }

  lista () {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM livros',
        (erro, results) => {
          if (erro) return reject(new Error('Não foi possivel conectar ao banco!'))

          return resolve(results)
        })
    })
  }
}

module.exports = LivroDao
