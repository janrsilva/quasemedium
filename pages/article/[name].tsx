import React from "react";
import Page from '../../components/page'
import Editor from "rich-markdown-editor";
import { DBFactory } from "../../src/factories/db-factory";
import { ArticleRepository } from "../../src/repositories/article-repository";
import { ArticleService } from "../../src/services/article-service";
import { GetServerSideProps } from "next";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Avatar, Button, Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import { GoThumbsdown, GoThumbsup } from 'react-icons/go';

export default function ReadArticle({article}) {
  article.text = unescape(article.text);

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
          <Comments items={[
            {
              name: 'Ada',
              text: 'Excelente! Me ajudou muito!!!!'
            },
            {
              name: 'Grace',
              text: 'Acho que falta pimenta.'
            },
            {
              name: 'Turing',
              text: 'Estou ansioso para ler o próximo!'
            },
            {
              name: 'Bill',
              text: 'Vou copiar! hahahahhahahhaahha'
            }
          ]}/>
        </div>
      </div>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {

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
      article: JSON.parse(JSON.stringify(article))
    },
  }
}

function Comments(props) {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    width: '100$',
    margin: '0 auto',
  } as CSSProperties;

  return <div style={style}>
    {props.items.map(
      (item) => <Comment item={item}/>
    )}
  </div>
}

function Comment(props) {
  const avatar = {
    float: 'right',
    margin: '10px',
  } as CSSProperties;

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={avatar} src={'https://i.pravatar.cc/300?u=' + Date.now()} />
        </ListItemAvatar>
        <ListItemText primary={props.item.name} secondary="Jan 9, 2014" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <Typography variant="body1" gutterBottom>
          {props.item.text}
        </Typography>
      </ListItem>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <Button color="primary"><GoThumbsup/></Button>
        <Button color="primary"><GoThumbsdown/></Button>
      </div>
    </List>
  );
}