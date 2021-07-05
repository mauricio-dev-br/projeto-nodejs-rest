const customExpress = require('./config/customExpress')
const conexao = require('./insfraestrutura/conexao')
const Tabelas = require('./insfraestrutura/tabelas')

conexao.connect(error => {
    if(error){
        console.error('Falha na conexão com DataBase')
    } else {
        console.log('Conexão com DataBase efetuada com sucesso')

        Tabelas.init(conexao)

        const app = customExpress()

        app.listen(3000, () => console.log('Ouvindo por 3000'))
    }
})

