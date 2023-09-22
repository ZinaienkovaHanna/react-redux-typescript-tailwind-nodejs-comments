//src/services/comment.service.ts

import {
    getCommentsFromDB,
    getCommentFromDB,
    addCommentToDB,
} from '../repositories/comment.repository.ts';
import {
    RequestType,
    ResponseType,
    CommentType,
} from '../types/comment.types.ts';
// import { newCommentSchema } from '../models/validate.model.ts';

function handleError(res: ResponseType, error: any): void {
    res.status(500).json({ error: error.message });
}

export async function getComments(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const comments = await getCommentsFromDB();
        res.status(200).json(comments);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getComment(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const id = req.params.id;
        const comment = await getCommentFromDB(id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
        } else {
            res.status(200).json(comment);
        }
    } catch (error) {
        handleError(res, error);
    }
}

export async function addComment(
    req: RequestType,
    res: ResponseType
): Promise<void> {
    try {
        const newCommentData: CommentType = req.body;
        // console.log(newCommentData);
        // await newCommentSchema.validate(newCommentData, { abortEarly: false });
        const newComment = await addCommentToDB(newCommentData);
        res.status(201).json(newComment);
    } catch (error) {
        handleError(res, error);
    }
}