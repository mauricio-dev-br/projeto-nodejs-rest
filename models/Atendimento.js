const conexao = require('../insfraestrutura/conexao')
const moment = require('moment')

class Atendimento {
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, "DD/MM/YYYY").format('YYYY-MM-DD HH:MM:SS')

        const atendimentoDatado = {...atendimento, dataCriacao, data}

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >=5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else { 
            const sql = 'INSERT INTO Atendimentos SET ?'  
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimentoDatado)
                }
            })
        }

        
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscarPorId(res, id){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado[0])
            }
        })
    }

    altera(res, id, valores){
        if(valores.data){
            valores.data = moment(valores.data, "DD/MM/YYYY").format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(...valores)
            }
        })
    }

    deleta(res, id){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id: id})
            }
        })
    }
}

module.exports = new Atendimento