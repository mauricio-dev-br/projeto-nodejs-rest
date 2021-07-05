const conexao = require('../insfraestrutura/conexao')

class Atendimento {
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimento, (erro, resultados) => {
            if(erro){
                console.error(erro)
            } else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimento