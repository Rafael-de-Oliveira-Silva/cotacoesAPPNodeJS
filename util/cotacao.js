const request = require("request");
const chalk = require('chalk');

const token_api = '2QGT53RDXI7EMA4C';
const url_api_cotacao_global = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE';

const pesquisar = (symbolAtivo, callback) => {
    
    if(symbolAtivo === ''){
        throw new Error(chalk.red.inverse('Código do ativo não informado...'))
    }

    const url = `${url_api_cotacao_global}&symbol=${symbolAtivo}&apikey=${token_api}`

    request({url: url, json: true}, (err, response) => {
        if (err){
            throw new Error(`Algo deu errado: ${err}`)
        } 

        const bodyJSON = response.body
         
        const dados = {
            symbol: bodyJSON['Global Quote']['01. symbol'],
            price:  bodyJSON['Global Quote']['05. price'],
            open:   bodyJSON['Global Quote']['02. open'],
            high:   bodyJSON['Global Quote']['03. high'],
            low:    bodyJSON['Global Quote']['04. low'],
            close:  bodyJSON['Global Quote']['08. previous close']
        }

        const saida = () => {
            const baixa = chalk.red(dados.low);
            const alta = chalk.blue(dados.high);
            console.log(`Código do ativo: ${dados.symbol} \nPreço: ${dados.price} \nAbertura: ${dados.open} \nAlta: ${alta} \nBaixa: ${baixa} \nPrevisão de Fechamento: ${dados.close}`)
        }

        callback(saida());
    });
}

module.exports = {
    pesquisar
}