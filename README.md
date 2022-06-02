
# Desafio Enafood
o  EnaFood é um sistema de dedlivary, considerando que seja muito parecido com o iFood.

## Tecnologias Utilizadas
* Nestjs
* MongoDB

## Porque usar NestJS
Os frameworks facilitam a nossa vida ao permitirem a reutilização de códigos com poucas alterações, poupando, assim, o tempo e energia investidos na hora de criar projetos. Atualmente existem diversos tipos de frameworks no mercado, com funcionalidades muito específicas. Desse modo, para aproveitar ao máximo as capacidades dessa tecnologia, é importante conhecer a função de cada um deles. Entre os mais utilizados temos, por exemplo, o pessoal que prefere o Framework Express.js, mas também existem aqueles grupos que não dispensam as facilidades que o Framework NestJS promove. NestJS tem uma outra proposta: facilitar o desenvolvimento de aplicações web, independente do protocolo de comunicação que elas utilizem. Por padrão, o NestJS trás o Express.js por baixo, ou seja, é um framework em cima de um outro framework. Além de fornecer uma estrutura de arquivos específica, o NestJS introduz alguns conceitos de arquitetura como: módulos (modules), controladores (controllers) e serviços (services), conectando todos esses pedaços através de um mecanismo chamado injeção de dependência, além de utilizar conceitos mais avançados da arquitetura de sistemas como inversão de controle (inversion of control), fazer com que os arquivos sejam mais independentes e conter integração com várias outras tecnologias. Além de criar possibilidades de usar o conceito de Clean Architecture.

## Implementações
As escolhas de implementações foram por deixar o padrão do framework e também como gosto de deixar, sepadados por modulos no caso Cart, Product e User, dentro deles tenho o Service(regras de negocio) e Controller(somente o controle de rotas, parametros, etc.)