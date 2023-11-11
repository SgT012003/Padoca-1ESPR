# Padoca-1ESPR
Este Projeto foi desenvolvido pelo Victor Didoff da turma ESPR-1 de Enegenharia de Software

## Sobre o Projeto
o Projeto da Padoca-ESPR foi proposto pelo professor Thiago de `Web Development` e `Front-end` e tinha como objetivo do projeto refatorar o JS e tornar o site mais frendily to user. ele pode ser encontrado atravez desse [link](https://sgt012003.github.io/Padoca-1ESPR/) ou atravez da aba [Deployments](https://github.com/SgT012003/Padoca-1ESPR/deployments) logo ao lado ou no link.

## Requisitos do Projeto [ copiado da aba de requisitos ]

* Leia o código e do jeito que está, escreva comentários dizendo o que está acontecendo em cada função.
* Refatore (melhore) o código criando funções para códigos repetidos, padronizando o nome de variáveis e funções e organizando de forma lógica, entre outras coisas.
* Implemente CSS ao projeto deixando ele mais amigável para o usuário final.
* Suba a página para o Github Pages.

## Features e Addons do meu Projeto

[ Codigo Original ]
* Função para Criar um Novo Produto na Lista:
* Função para Deletar um Produto da Lista:
* Função para Visualizar os Produtos da Lista. (chamada sempre que qualquer valor fosse adicionado ou retirado.)
* Função para definir o `<Form>` com `display: none;` ou `display: flex;` fazendo assim com que ele possa aparecer e sumir.

[ Codigo Refatorado ]
* Todas as Funções original se mantiveram. [apesar de todas terem sido reescrita.]
* Criação de uma classe para o produto assim seguindo o OOP | POO.
* Adicionei um metodo para editar os produtos já na `table`. [tanto o metodo de criação original quanto a edição utilizam a mesma `table`.]
* Criação de um metodo de `regex` para fazer a validação de entrada, porem de forma syncrona e somente apos o click em `submit`.
* Criação de um metodo de notificação utilizando o `Notification`.
* Modificações no arquivo `index.html` para um integração mais facil com o css e js.
* Modificação do arquivo `style.css` para cumprir o requisito de inteface.

## Informações Adicionais

[ Async ]
* Algumas funçoes foram setadas como assincronas para uma execução menos limitada do codigo.

[ notifyClient ]
* Essa foi uma função criada a mais, para deixar o codigo rodar de forma mais livre, pois caso se utilizasse o `alert(...);` a execução do codigo fica pausado até a que o usuario leia e aceite a "caixa de dialogo".
