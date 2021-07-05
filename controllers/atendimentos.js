const Atendimento = require('../models/Atendimento')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimento usando o método GET'))
    
    app.post('/atendimentos', (req, res) => {

        const atendimento = req.body

        Atendimento.adiciona(atendimento)

        res.send('Você está na rota de atendimento usando o método POST')
    })

    
}