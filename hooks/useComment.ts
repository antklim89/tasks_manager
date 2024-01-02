import { createContext, useContext, useContextSelector } from 'use-context-selector';

import type { CommentType } from '@/schemas';


export const CommentContext = createContext<CommentType|null>(null);


export function useComment(isRequired?: true): CommentType
export function useComment(isRequired: false): CommentType | null

export function useComment(isRequired?: boolean): CommentType | null {
    const commentContext = useContext(CommentContext);
    if (!commentContext) {
        if (isRequired) throw new Error('The useComment is not in the Comment provider.');
        return null;
    }
    return commentContext;
}

export function useCommentSelector<Selected>(selector: (value: CommentType) => Selected): Selected {
    const commentContext = useContextSelector<CommentType | null, Selected>(CommentContext, (value) => {
        if (!value) {
            throw new Error('The useComment is not in the Comment provider.');
        }
        return selector(value);
    });
    return commentContext;
}
