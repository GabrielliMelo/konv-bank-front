# konv-bank-front

## Sobre o Projeto

    Frontend criado para fazer integracão com a API - Konv-back-api - interface de um caixa eletronico para realizar transacoes, de saque, deposito e transferência, e extrato.
# Instruções para rodar a aplicação
    
- Primeiro: clone o repositorio:

```shell
$ git clone git@github.com:GabrielliMelo/konv-bank-front
```

- Segundo: va para a pasta src
```
$ cd ./konv-bank
```

- Terceiro: instale as dependencias

```shell
$ yarn 
```
Or:

```shell
$ npm install
```
- Para iniciar a execução do aplicativo:
```shell
$ yarn start
```
Or:
```
$ npm start
```
##
- Imprescindivel que a api - https://github.com/GabrielliMelo/Konv-back-api - esteja rodando localmente ou fazer deploy da api e utilizar a URL gerada nos fetchs da aplicação frontend.
##
- Tu ok para fazer os testes da funcionalidades.

- A aplicação será iniciada na porta 3000

http://localhost:3000

# Funcionalidades

- Deposito -> Ao clicar no botao deposito abre um modal -> Se ja existir o cpf no banco de dados ele irá somar o valor do deposito ao saldo no banco, se não, irá cadastrar automaticamente um novo cliente no banco 😀

- Saque ->  Ao clicar no botao saque abre um modal -> Se ja existir o cpf no banco de dados ele irá subtrair o valor do deposito ao saldo no banco, se não, irá cadastrar automaticamente um novo cliente no banco 😀 

- Extrato ->  Ao clicar no botao extrato redireciona para uma outra pagina -> Se ja existir o cpf no banco de dados ele irá mostrar todas as transações referentes ao tipi - saque ou deposito -  relacionadas a aquele cpf, se não, irá cadastrar automaticamente um novo cliente no banco 😀

- Tranferencia ->  Ao clicar no botao transferir abre um modal -> Se ja existir o cpf no banco de dados ele irá mostrar todas as transações referentes ao tipi - saque ou deposito -  relacionadas a aquele cpf, se não, irá cadastrar automaticamente um novo cliente no banco 😀

- Transações ->  Ao clicar no botao transações redireciona para uma outra pagina -> Se ja existir o cpf no banco de dados ele irá mostrar todas as transações relacionadas a aquele cpf, se não, irá cadastrar automaticamente um novo cliente no banco 😀

## Tecnologias

- ReactJs
- JavaScript
- react-input-mask
- React-router-dom
- Nodemon

## Pontos de melhoria
- Testes automatizados.
- Autenticação.
- Utilizar Toastyfy
- Utilizar variaveis de ambiente.
## extra
- Mostrando as transferencias no extrato.

## Desenvolvedora 

``` js
{
nome: "Gabrielli Melo da silva Borges",
Idade: 23,
Nivel Atual: "Júnior",
Competências: [
	"HTLM", "CSS","JavaScript", "NodeJs", 
	"ReactJs", "Java", "Spring Boot", 
	"Docker", "AWS", "PostgreSQL", 
	"MySQL", "Redis", "API Rest", 
	"Scrum", "Kanbam", "Git/GitFlow"
],
Habilidades: [
	"Comunicação", "Empatia", "Trabalho em equipe", 
	"Positividade", "Proatividade", 
	"Resolução de problemas", "...etc"
],
Linkdln: "https://www.linkedin.com/in/gabriellimeloborges/",
GitHub: "https://github.com/GabrielliMelo/"
}
```
