# Projeto E-commerce

Projeto realizado, na trilha de back-end, como desafio final da 1ª fase de imersão do ioasys Camp 2022.

## Tecnologias Utilizadas

- NestJS (framework do NodeJS)
- PostgreSQL (bando de dados relacional)
- Postman (cliente de API)

## Descrição

O objetivo dessa aplicação foi construir um e-commerce do ramo da moda, permitindo que usuários se cadastrem, autentiquem-se e realizem seus pedidos (caso os produtos estejam disponíveis). Por conta isso, foi criado um gerenciamento de estoque para contabilizar a quantidade de produtos cadastrados pelo admin e a quantidade de produtos solicitados pelo usuários.

É importante destacar que foi estabelecida três funções para essa aplicação: user, admin e manager. O user representa o usuário propriamente dito, que faz os pedidos de produtos. O admin pode registrar produtos e descontos e gerenciar o estoque de produtos. Enquanto que o manager é responsável pela criação dos admin's. Esse último foi criado com a intenção de controlar o número de admin's no gerenciamento do e-commerce. Ou seja, para um admin ser criado, precisa-se de autorização do manager.

Obs.: é necessário ter um banco de dados criado para rodar a aplicação.

## Variáveis de Ambiente

Por questões de segurança, foi definido algumas variáveis de ambiente:

```bash
# Porta da API (caso o campo não seja preenchido, a aplicação rodará na porta 3000). Para evitar ter que ficar alterando a porta no Postman, recomenda-se deixar esse campo sem valor.
PORT=                             

# Conexão com o banco de dados
DB_CONNECTION=                  
DB_HOST=                         
DB_PORT=                         
DB_USERNAME=                     
DB_PASSWORD=                     
DB_DATABASE_NAME=                      

# JWT token secret para autenticação
JWT_SECRET_KEY=      

# Informações para o seed de admin
ADMIN_FIRST_NAME=                 
ADMIN_LAST_NAME=                  
ADMIN_EMAIL=                      
ADMIN_PASSWORD=
ADMIN_CPF=
ADMIN_TELEPHONE=
ADMIN_GENDER=

# Informações para o seed de manager
MANAGER_FIRST_NAME=
MANAGER_LAST_NAME=
MANAGER_EMAIL=
MANAGER_PASSWORD=
MANAGER_CPF=
MANAGER_TELEPHONE=
MANAGER_GENDER=

# Criptografia AES
AES_KEY=
AES_ALGORITHM=
AES_IV_LENGTH=
AES_IV=
```

## Instalação

Após o git clone do repositório, é necessário instalar as dependências. Para isso, faça:

```bash
$ npm install
```

## Migrations e Seeds

Antes de fazer a aplicação rodar, é importante gerar as migrations porque elas contêm as criações das tabelas (users, addresses, stocks, orders, discounts, products, orders_products e comments). ALém disso, também foram colocadas triggers nas migrations. Triggers são gatilhos que permitem realizar uma ação ao acionar determinado evento. O gerenciamento do estoque, por exemplo, foi implementado através dessa técnica. Portanto, execute o comando no terminal:

```bash
$ npm run typeorm migration:run
```

Em seguida, os seeds devem ser implementados porque já permitem a criação prévia de um manager, um admin e um stock. A criação prévia do manager é essencial para o funcionamento do projeto porque é a partir dele que se torna possível a criação do admin que, por sua vez, gerencia o e-commerce. Tanto a criação do seed do admin quanto a do seed do stock foram realizadas para facilitar os testes de validações. Logo, execute o seguinte comando:  

```bash
$ npm run seed:run
```

## Rodando a aplicação

Finalmente, rode a aplicação com o comando abaixo:

```bash
$ npm run start:dev
```

## Diagrama do E-commerce

Antes de apresentar o fluxo do projeto, é necessário destacar como foi diagramado o banco de dados do e-commerce:

![ECOMMERCE_DIAGRAM!](https://user-images.githubusercontent.com/91624733/155892194-0ef023dd-dfca-4d96-b733-1d9790aa4d48.png)

Para mais detalhes, consulte o arquivo 'ecommerce_diagram.pdf', que apresenta, por exemplo, as opções contidas nos enum's.

## Funcionamento do E-commerce

Depois de rodar a aplicação, importe o arquivo 'ecommerce.postman_collection.json' no Postman para visualizar todos os métodos HTTP com seus respectivos títulos. 

É importante ressaltar que nem todas as rotas estão bloqueadas. Isso foi feito porque os usuários que ainda não conhecem o e-commerce terão a oportunidade de visualizar os produtos, os descontos e os comentários para que avaliem e sintam-se seguros em realizar um cadastro e, posteriormente, uma compra. 

Para começar a movimentação do e-commerce, o manager, criado através do seed mencionado anteriormente, deve criar um admin em uma rota específica para isso (register/admin). A função do manager se resume em criar admin's e/ou manager's. Feito isso, o admin deverá criar um estoque, cadastrar os produtos nesse estoque e, caso seja desejado pelo e-commerce, registrar os descontos nos produtos. Além de criar, os admin's também são responsáveis por atualizar e deletar esses registros. A cada produto cadastrado, a coluna quantidade disponível em estoque aumentará em mais 1.

Seguindo o fluxo, os usuário que se registrarem receberão um token. A partir disso, poderão fazer seus pedidos, vê-los em seus devidos perfis e tecer comentários para darem o seu feedback. Além disso, user's, admin's e manager's poderão cadastrar seus endereços em uma rota apropriada, atualizar seus perfis e deletá-los, conforme o desejo de cada um. 

Um ponto que deve ser observado é a quantidade de produtos pedidos pelos usuários. Existem dois cenários. Se a quantidade pedida for maior que a quantidade disponível em estoque, uma mensagem de indisponibilidade será exibida. Caso contrário, o pedido será aceito e ocorrerá o aumento em mais 1 na coluna de pedidos feitos dos usuários. 

Obs.1: Previamente, já há um seed criado de admin para facilitar o processo de testes. Porém, é um seed opcional. Com o seed do manager já é possível seguir todo o fluxo do projeto.

Obs.2: A utilização do 'id' de cada registro é muito importante para realizar as operações nesse e-commerce. 

## Segurança

Inicialmente, vale ressaltar que a aplicação contém uma limitação de taxa na rota de registro do usuário (apenas para a função user) e na rota de login. Isso quer dizer que se ocorrer mais de 10 solicitações em 60 segundos, o IP será bloqueado. A ideia por trás disso foi proteger a aplicação de ataques de força bruta.  

Além disso, foi implementado um helmet na API para que pudesse ser adicionado cabeçalhos especiais nas respostas HTTP. O intuito disso foi evitar ataques 'man-in-the-middle', em que o usuário é redirecionado para um clone do site real. Essa biblioteca, por exemplo, permite ocultar qual a tecnologia que a aplicação está utilizando e permite também exigir que um site seja acessado apenas por HTTPS. 

Em relação à criptografia, foi utilizado o bcrypt para criptografar a senha de todos os usuários, enquanto que os dados que podem identificar uma pessoa (primeiro nome, último nome, email, cpf, telefone, gênero, estado, cidade, endereços e código postal) foram criptografados com a Criptografia AES. Diferentemente da senha que sempre permanece criptografada, os demais dados apenas ficam criptografados no banco de dados. Ou seja, caso o banco de dados seja hackeado, os dados estarão com uma 'cobertura' de proteção.

## Licença

Nest é [MIT licensed](LICENSE).
