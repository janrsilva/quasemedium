import React, { useState } from "react";
import Page from '../../components/page'
import Editor from "rich-markdown-editor";
import { DBFactory } from "../../src/factories/db-factory";
import { ArticleRepository } from "../../src/repositories/article-repository";
import { ArticleService } from "../../src/services/article-service";
import { GetServerSideProps } from "next";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { getSession } from "next-auth/client";
import Comments from '../../components/comments'
import * as moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

export default function ReadArticle({user, article}) {
  article.text = unescape(article.text);
  const [comments, setComments] = useState(article.comments || []);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    width: '90vw',
    minWidth: '60vw',
    margin: '0 auto',
  } as CSSProperties;

  const styleItem = {
    flexGrow: 1,
    margin: '5px',
    fontSize: '1.5em',
  } as CSSProperties;

  const onComment = (comment) => {
    setComments([comment, ...comments]);
  }

  return (
    <Page justifyContent="flex-start">
      <div style={style}>
        <div style={styleItem}>
          <Editor
            readOnly={true}
            dark={false}
            defaultValue={article.text}/>
        </div>
        <hr/>
        <div style={styleItem}>
          <Comments onCreate={onComment} articleId={article._id} user={user} items={comments || sampleComments}/>
        </div>
      </div>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
  const {user} = await getSession({req});
  const name = params.name as string;

  const db = DBFactory.build(process.env.DB_DRIVER);
  await db.connect();
  const service = new ArticleService(new ArticleRepository(db));
  // @todo Error: Error serializing `.user._id` returned from `getServerSideProps` in "/account".
  // Reason: `object` ("[object Object]") cannot be serialized as JSON. Please only return JSON serializable data types.
  const article = await service.getByName(name);
  article.text = escape(article.text);
  return {
    props: {
      user,
      article: JSON.parse(JSON.stringify(article))
    },
  }
}

export const sampleComments = [
  {
    user: {
      name: 'Ada'
    },
    text: 'Excelente! Me ajudou muito!!!!'
  },
  {
    user: {
      name: 'Grace'
    },
    text: 'Acho que falta pimenta.'
  },
  {
    user: {
      name: 'Turing'
    },
    text: 'Estou ansioso para ler o próximo!'
  },
  {
    user: {
      name: 'Bill'
    },
    text: 'Vou copiar! hahahahhahahhaahha'
  }
];