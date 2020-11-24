import React from "react";
import axios from 'axios';
import Page from '../../components/page'
import { RiSave3Fill } from 'react-icons/ri';
import { BiWorld } from 'react-icons/bi';
import Editor from "rich-markdown-editor";
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { NextRouter, useRouter } from 'next/router';
import useSWR from "swr";

export default function MyEditor() {
  const getArticleIdFromPath = (router: NextRouter) : string => {
    const { id } = router.query
    if (id == 'new') {
      return null;
    }
    return id as string;
  }

  const router = useRouter();
  const articleId = getArticleIdFromPath(router);
  const getArticle = async () => {
    if (articleId) {
      return axios.get(`/api/articles/${articleId}`);
    }

    return Promise.resolve(null);
  }

  const {data, error} = useSWR(
    '/editor/item',
    getArticle
  );


  const article = data ? data.data : {};

  const initialState = {
    text: '',
    name: '',
    loading: false,
    ...article,
  };

  const [state, setState] = React.useState(initialState);

  // useEffect(()=>{
  //   let mounted = true
  //   if (!article.name && state.name && mounted) {
  //     setState(state => {
  //       return {...state, name: article.name, text: article.text};
  //     });
  //   }
  //   return function cleanup() {
  //     mounted = false
  //   }
  // }, [article]);

  const onChangeName = (event) => {
    setState(state => {
      return {...state, name: event.target.value.replace(' ', '-')};
    });
  }

  const onChangeEdit = (getValue) => {
    setState(state => {
      return {...state, text: getValue()};
    });
  }

  const onSave = async () => {

    const article = {
      text: state.text,
      name: state.name,
    };

    if (articleId) {
      const {data} = await axios.patch(`/api/articles/${articleId}`, article);
    } else {
      const {data} = await axios.post('/api/articles', article);
      router.push(`/editor/${data._id}`);
    }
  }

  const onPublish = async () => {
    const {data} = await axios.put(`/api/articles/${articleId}/published`, {});
  }

  if (error) return <Page><div>Erro</div></Page>;
  if (!data && articleId) return <Page><div>carregando...</div></Page>;
  return (
    <Page justifyContent="flex-start">
      <div style={{padding: '1rem 0', width: '100%'}}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <TextField
              onChange={onChangeName}
              value={state.name}
              label="URL do seu artigo"
              id="standard-start-adornment"
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  https://localhost/article/
                </InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="flex-end" alignItems="center" spacing={3}>
              <Button>
                <RiSave3Fill onClick={onSave}/>
              </Button>
              <Button>
                <BiWorld onClick={onPublish}/>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Editor
        onChange={onChangeEdit}
        dark={false}
        onSave={console.log}
        placeholder={"tell me something boy... 🎵"} defaultValue={state.text}/>
    </Page>
  );
}
