// src/repositories/comment.repository.ts
import { Comment } from '../models/comment.model.ts';
import { CommentType } from '../types/comment.types.ts';

export async function getCommentsFromDB(): Promise<CommentType[]> {
    try {
        return await Comment.find().exec();
    } catch (err) {
        console.error(err);
        throw new Error('Error getting data');
    }
}

export async function getCommentFromDB(
    id: string
): Promise<CommentType | null> {
    try {
        return await Comment.findById(id).exec();
    } catch (err) {
        console.error(err);
        throw new Error('Error getting comment');
    }
}

export async function addCommentToDB(
    commentData: CommentType
): Promise<CommentType> {
    try {
        const newComment = new Comment(commentData);
        await newComment.save();
        return newComment.toObject();
    } catch (err) {
        console.error(err);
        throw new Error('Error adding record');
    }
}
