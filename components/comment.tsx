import React from "react";
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import { firtName } from "./account-menu";
import moment from 'moment';

export default function Comment(props) {
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
                <ListItemText
                    primary={firtName(props.item.user.name)}
                    secondary={props.item.createdAt ? moment(props.item.createdAt).format('MMM DD, Y') : "Jan 9, 2014"} />
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