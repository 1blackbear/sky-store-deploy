# SKY STORE

**Erick Vinicius Oliveira de Paiva**

**Maria Clara Sales Jabali Maruch**

**Pedro Vítor Felix da Costa**

---

_Curso de Engenharia de Software, Unidade Praça da Liberdade_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

A Sky Store consiste em uma plataforma web que disponibilza artes da cliente em questão para venda,
além de disponibilzar os serviços de design realizados individualmente por ela. Com isso, o objetivo principal desse
projeto é prover uma forma automatizada de realizar o processo completo de compras de artes prontas, e também fazer
encomendas personalizadas de artes digitais. Ademais, a plataforma irá conter, também, todo o portifólio da cliente,
tal como suas artes já realizadas além de suas informações pessoais. Assim, com a implementação em código feita pela
equipe de desenvolvimento, foi possível obter não somente todas as funcionalidades citadas anteriormente, como também
um perfil em que é possível o usuário alterar os dados pessoais de sua conta e visualizar seu histórico de compras,
além da ordem de pedido da encomenda.

---


## 1. Introdução



    1.1 Contextualização

Na **contextualização**, o aluno deve dizer do que se trata o trabalho, em que área ou contexto se insere. 
A **contextualização** deve ser desenvolvida de algo mais genérico para algo mais específico. 
A citação de pesquisas quantitativas é bem aceita aqui (corretamente referenciadas).

    1.2 Problema
    
Há aproximadamente 4 anos, Danyele Fernandes, estudante de Design na FUMEC, tinha um grande problema na venda de seus produtos, 
uma vez que para ser realizada a venda, tudo era feito de maneira manual entre ela e o usuário, seja no processo de compra
de artes pré disponibilizadas ou no processo de encomenda de uma arte personalizada. Além disso, também havia uma dificuldade
para conseguir divulgar seu trabalho, já que seu portifólio não continha todas as informações que era de seu interesse para divulgação.  

    1.3 Objetivo geral

Dessa forma, para proporcionar uma solução para a Danyele, é necessário produzir uma plataforma web em que
haverá um time de desenvolvedores front-end e back-end envolvido, o qual deve prover um sistema agradável visualmente
para os clientes da Danyele.

        1.3.1 Objetivos específicos

   * Realizar metologodia "Design Sprint" como técnica de elicitação para extração de requisitos.
   * Avaliar qual a melhor tecnologia presente no mercado para prover a solução em código.
   * Traçar pontos negativos e positivos sobre a tecnologia utilizada. 


    1.4 Justificativas

Mostre também as **justificativas** para o 
desenvolvimento do seu trabalho e, caso deseje, destaque alguma contribuição do trabalho.


## 2. Stakeholders

De maneira clara, há de se afirmar que há uma necessidade por parte de Danyele, no qual nomeamos de "cliente",
deseja ter uma plataforma para gerenciar todo o seu processo de venda, além da divulgação de suas informações.
Outrossim, do outro lado do negócio em questão, há os usuários, pessoas físicas e jurídicas que desejam
obter algum produto da cliente, por meio de uma plataforma dinâmica de aquisição de compras, de modo a facilitar
o processo de obtenção dos bens desejados.

## 3. Proposta da solução

Deve ser apresentado o escopo da solução proposta. O escopo pode ser descrito por meio de histórias de usuário, 
requisitos do produto, ou necessidades gerais dos envolvidos.


## 4. Projeto da Solução

Deve ser apresentada a descrição técnica da solução proposta. Devem ser incluídas informações que 
permitam caracterizar a arquitetura do software, seus componentes arquiteturais, 
tecnologias envolvidas, frameworks utilizados, etc.

## 5. Artefatos principais

Então, a partir do processo de Design Sprint, da criação do protótipo e escolha das ferramentas para o desenvolvimento, o software destinado a venda e encomenda de artes digitais foi criado.

    5.1. Página Inicial
    
O site inicia na página principal, que exibe um menu para acesso de todas as páginas e um botão principal que leva o usuário ao foco do site, as encomendas.
![Leiaute da pagina incial](Imagens/01-pagina-inicial.png "Leiaute da pagina incial.")

    5.2. Encomendas

Ao clicar no botão citado acima, o sistema exibe uma página que mostra o fluxograma de como realizar uma encomenda e, ao final da página, existe um botão para iniciar o processo.
![Página de encomendas](Imagens/02-encomendas-inicial-01.png "Página de encomendas.")  
![Página de encomendas](Imagens/03-encomendas-inicial-02.png "Página de encomendas.")

Um modal se abre e exibe duas imagens com os textos "Ilustração Digital" e "Arte Digital". O processo de encomenda irá se dividir entre essas duas categorias.
![Passo 1 - processo de encomenda](Imagens/04-encomendas-passo-01.png "Passo 1 - processo de encomenda.")

        5.2.1. Encomendas - Ilustração Digital

No segundo passo, o usuário seleciona o tipo de Ilustração Digital desejado e no terceiro e último passo preenche o formulário com os dados pessoais e a descrição detalhada do produto a ser encomendado.
![Passo 2 Ilustração Digital - processo de encomenda](Imagens/05-encomendas-passo-02-ilust.png "Passo 2 Ilustração Digital - processo de encomenda")
![Passo 3 Ilustração Digital - processo de encomenda](Imagens/07-encomendas-passo-03-ilust.png "Passo 3 Ilustração Digital - processo de encomenda")

        5.2.2. Encomendas - Arte Digital

Os passos para Arte Digital são bem similares com a encomenda de Ilustrações, o que diferencia são os tipos da passo 2 e formulário na última etapa.
![Passo 2 Arte Digital - processo de encomenda](Imagens/06-encomendas-passo-02-arte.png "Passo 2 Arte Digital - processo de encomenda")
![Passo 3 Arte Digital - processo de encomenda](Imagens/08-encomendas-passo-03-arte.png "Passo 3 Arte Digital - processo de encomenda")

    5.3. Prateleira

Além de encomendar uma arte digital, é possível que o usuário adquira produtos prontos que são disponibilizados em formato de ecommerce na Prateleira.
![Página de produtos de prateleira](Imagens/10-prateleira.png "Página de produtos de prateleira")

        5.3.1. Carrinho de Compras

Ao clicar no ícone de carrinho de compras exibido abaixo de cada arte, o sistema abre o modal do carrinho de compras, que também pode ser acessado por um ícone de carrinho no canto direito do menu, similar ao citado anteriormente.
![Carrinho de compras](Imagens/11-carrinho.png "Carrinho de compras")

        5.3.2. Checkout

![Formulário de checkout](Imagens/12-checkout-01.png "Formulário de checkout")

![Pagamento por cartão](Imagens/13-checkout-cartao.png "Pagamento por cartão")

![Pagamento por boleto](Imagens/14-checkout-boleto.png "Pagamento por boleto")

    5.4. Portfólio

![Página do portfólio](Imagens/15-portfolio.png "Página do portfólio")

![Página descrição do portfólio](Imagens/16-portfolio-interno.png "Página descrição do portfólio")

    5.5. Perfil do Usuário

![Página do perfil do usuário](Imagens/18-perfil-usuario.png "Página do perfil do usuário")

        5.5.3. Alteração de dados

![Formulário de alterar dados](Imagens/19-alterar-dados.png "Formulário de alterar dados")

![Formulário de alterar senha](Imagens/20-alterar-senha.png "Formulário de alterar senha")

        5.5.2. Históricos

![Página do histórico de encomendas](Imagens/21-hist-encomendas.png "Página do histórico de encomendas")

![Página do histórico de compras da prateleira](Imagens/22-hist-prateleira.png "Página do histórico de compras da prateleira")

    5.6. Manutenção do Site

![Página de manutenção do portfolio](Imagens/23-manut-portfolio.png "Página de manutenção da prateleira")

![Formulário de manutenção do portfolio](Imagens/24-manut-portfolio-form.png "Formulário de manutenção da portfolio")

![Página de manutenção da prateleira](Imagens/25-manut-prateleira.png "Página de manutenção da prateleira")

![Formulário de manutenção da prateleira](Imagens/26-manut-prateleira-form.png "Página de manutenção da prateleira")

![Página de manutenção do submenu](Imagens/27-manut-submenu-prat.png "Página de manutenção do submenu")

![Página de manutenção das encomendas](Imagens/29-manut-encomendas.png "Página de manutenção das eencomendas")

## 6. Conclusão

Devem ser apresentadas as conclusões do trabalho, resgatando os objetivos e 
apresentando os principais resultados, contribuições e lições aprendidas.


# APÊNDICES

**Repositório:** https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2021-2-ti3-6653100-sky-store

Do vídeo de apresentação.




