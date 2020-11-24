import { User } from "next-auth";

export interface Article {
    _id: string;
    name: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[]
}

export interface Comment {
    _id: string;
    user: User;
    text: string;
    likes: string[];
    dislikes: string[];
    createdAt: Date;
}
