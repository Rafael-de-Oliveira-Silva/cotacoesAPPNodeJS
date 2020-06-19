//DESAFIO
/** Criar um CLI usando Yargs...
 * Receber um parâmetro de entrada que será o código do ativo na bolsa de valores
 * senão receber o código, retornar um erro...
 * se receber, deverá consultar o ativo usando o request
 * devolvendo os seguintes dados:
 * -> Valor de Abertura...
 * -> Valor de Fechamento...
 * -> Maior Alta do dia...
 * -> Menor Baixa do  dia...
 * 
 * Usar o chalk para mostrar os seguintes dados:
 * -> Valores de baixa em vermelho...
 * -> Valores de alta em azul...
 * 
 * Utilizar arrow function
 * Utilizar es6
 * utilizar destruct
 * */

/**----------------------------------------------------------------------------------------- */
const cotacao = require('./util/cotacao');
const chalk = require('chalk');
const yargs = require('yargs');
/**----------------------------------------------------------------------------------------- */

let inforMsg;

// Alterando a versão do CLI
yargs.version('3.0.0');

//Comando para receber o código do ativo
yargs.command(
    {
        command: 'search',
        describe: 'Pesquisa a cotação na bolsa de valores de um ativo',
        builder:{
           symbol:{
                describe: 'Código do ativo na bolsa de valores...',
                demandOption: true, //Informa que campo é obrigatório...
                type: 'string'
           }
        },
        handler: (argv) => {
            inforMsg = chalk.green.inverse('***** Pesquisando cotação de um ativo na bolsa de valores... *****');
            console.log(inforMsg);
            cotacao.pesquisar(argv.symbol.toUpperCase(), (dados) => {
                console.log(dados);
            })
        }    
    }
)

yargs.parse();
