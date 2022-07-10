# konv-bank-front

## Sobre o Projeto

    Frontend criado para fazer integracão com a API - Konv-back-api - interface de um caixa eletronico para realizar transacoes, de saque e deposito, e extrato.
# Instruções para rodar a aplicação
    
    - Clone o repositório 
    - Abra-o no vsCode
    - Instale as dependencias-> No terminal -> npm i
    - Start o projeto -> npm start 
    - Imprescindivel que a api - https://github.com/GabrielliMelo/Konv-back-api - esteja rodando localmente ou fazer deploy da api e utilizar a URL gerada nos fetchs da aplicação frontend.
    - Tu ok para fazer os testes da funcionalidades.

    - A aplicação será iniciada na porta 3000

# Funcionalidades

    - Deposito -> Ao clicar no botao deposito abre um modal -> Se ja existir o cpf no banco de dados ele irá somar o valor do deposito ao saldo no banco, se não, irá cadastrar automaticamente um novo cliente no banco 😀

    - Saque ->  Ao clicar no botao saque abre um modal -> Se ja existir o cpf no banco de dados ele irá subtrair o valor do deposito ao saldo no banco, se não, irá cadastrar automaticamente um novo cliente no banco 😀 

    - Extrato ->  Ao clicar no botao extrato redireciona para uma outra pagina -> Se ja existir o cpf no banco de dados ele irá mostrar todas as transações referentes ao tipi - saque ou deposito -  relacionadas a aquele cpf, se não, irá cadastrar automaticamente um novo cliente no banco 😀

    - Transações ->  Ao clicar no botao transações redireciona para uma outra pagina -> Se ja existir o cpf no banco de dados ele irá mostrar todas as transações relacionadas a aquele cpf, se não, irá cadastrar automaticamente um novo cliente no banco 😀

## Tecnologias

    - ReactJs
    - JavaScript
    - react-input-mask
    - React-router-dom


