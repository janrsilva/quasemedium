## Esse projeto é um desafio para uma vaga de Fullstack Developer

Objetivo proposto foi criar um clone do [Medium](https://medium.com) com três funcionalidades:
- [x] Autenticacão
  - [x] Cadastro ou alteração de informações do usuário
  - [x] Login
- [x] Artigos
  - [x] Cadastro
  - [x] Leitura
- [x] Interação
  - [x] Comentários nos artigos


##### A escolha de tecnologia

Esse projeto foi criado utilizando o [Next.js](https://nextjs.com), mas por quê?

Entende-se que um projeto de leitura de artigos deve ser indexado para aperecer nas buscas do Google ou outros buscadores, portanto, sabe-se que a renderização das telas deve ser feita no servidor, diferentemente de aplicações SPA, pensando nisso, a tecnologia escolhida para construir esse projeto foi o [Next.js](https://nextjs.com), que permite construir páginas de renderização no servidor, no browser ou em tempo de build (híbridas).

# run

Como rodar esse projeto?


### Configurações
- Crie um arquivo `.env` para configurar o banco e o serviço de e-mail
  - o banco pode estar onde você prefererir, mas aqui já temos uma imagem docker, você pode usá-la isoladamente com `$ docker-compose up -d mongo`
  - o email foi usado para fazer a autenticação, outros provedores de acesso poderiam ter sido adicionados, como login com Google. Crie ou use uma conta [Mailtrap](https://mailtrap.io) para simular o envio sem sujar sua caixa real.

```env
DB_DRIVER=mongo
MONGO_HOST=localhost
MONGO_DATABASE=quasemedium
DATABASE_URL=mongodb://localhost:27017/quasemedium

# utilize o [Mailtrap](https://mailtrap.io)
EMAIL_FROM=Billy <billy@quasemedium.com>
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=smtp.mailtrap.io
EMAIL_SERVER_PORT=2525

NEXTAUTH_URL=http://localhost:3000
```

### Iniciando

- se você prefere usar docker
```bash
$ docker-compose up # use a opção -d para liberar o terminal
```

- se você tem o Node 10+ instalado
```bash
$ npm i
```
```bash
$ npm run dev
```

---
A documentação do próprio Next.js pode ser [vista aqui](https://nextjs.org/docs)
