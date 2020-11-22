## Esse projeto é um desafio para uma vaga de Fullstack Developer

Objetivo proposto foi criar um clone do [Medium](https://medium.com) com três funcionalidades:
- [x] Autenticacão
  - [x] Cadastro ou alteração de informações do usuário
  - [x] Login
- [ ] Artigos
  - [ ] Cadastro
  - [ ] Leitura
- [ ] Interação
  - [ ] Comentários nos artigos

###### se sobrar tempo

- Exibir qualquer artigo do Medium dentro da plataforma

##### Escolhas de tecnologia

Entende-se que um projeto de leitura de artigos deve ser indexado pelo Google, portanto, sabe-se que a renderização das telas deve ser feita no servidor, pensando nisso, a tecnologia escolhida para construir esse projeto foi o [Next.js](https://nextjs.com)

# run

Como rodar esse projeto?

- se você prefere usar docker
```bash
$ docker-compose up # use a opção -d para liberar o terminal
```

- se você tem o Node 10+ instalado
```bash
$ npm run dev
```


# abaixo, documentação do próprio Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
