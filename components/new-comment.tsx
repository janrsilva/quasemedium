import React, { useState } from "react";
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { firtName } from "./account-menu";
import moment from 'moment';
import axios from 'axios';

export default function NewComment (props) {
    const [text, setText] = useState('');

    const postComment = async () => {
        if (!props.articleId) return;
        const {data} = await axios.post(`/api/articles/${props.articleId}/comments`, {
            text
        });
        onCreate(data);
        setText('');
    }

    const onChange = (event) => {
        setText(event.target.value);
    }

    const onCreate = comment => {
        props.onCreate && props.onCreate(comment);
    }

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
            <ListItemText primary={firtName(props.user.name)} secondary={moment().format('MMM DD, Y')} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
            <TextField
                id="outlined-multiline-static"
                label="comentário"
                multiline
                rows={4}
                fullWidth
                onChange={onChange}
                value={text}
                variant="outlined"/>
            </ListItem>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Button disabled={text == ''} onClick={postComment} color="primary">Comentar</Button>
            </div>
        </List>
    );
}