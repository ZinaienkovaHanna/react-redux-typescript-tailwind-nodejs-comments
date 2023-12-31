import mongoose, { Schema } from 'mongoose';
import currentUser from '../data/currentUser.json' assert { type: 'json' };
import { CommentType } from '../types/comment.types.ts';

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        score: {
            type: Number,
            default: 0,
        },
        user: {
            image: {
                png: {
                    type: String,
                    default: currentUser.image.png,
                },
                webp: {
                    type: String,
                    default: currentUser.image.webp,
                },
            },
            username: {
                type: String,
                default: currentUser.username,
            },
        },
    },
    { collection: 'comments', versionKey: false }
);

export const Comment = mongoose.model<CommentType>('Comment', commentSchema);
