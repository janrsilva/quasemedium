import React from "react";
import { Divider } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import NewComment from "./new-comment";
import Comment from "./comment";

export default function Comments(props) {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '0 auto',
    } as CSSProperties;

    return <div style={style}>
        <NewComment onCreate={props.onCreate} articleId={props.articleId} user={props.user} />
        <Divider />
        {props.items.map(
            (item, index) => <Comment key={index} item={item}/>
        )}
    </div>
}