const express = require('express')
const app = express()

app.listen(3000, () => console.log('Ouvindo por 3000'))

app.get('/atendimentos', (req, res) => res.send('Acesso a página de atendimentos e teste de Nodemon'))