'use client';
import { useCommentSelector } from '@/hooks';
import { formatDate } from '@/utils';


const Comment = () => {
    const commentText = useCommentSelector(comment => comment.text);
    const commentCreatedAt= useCommentSelector(comment => comment.createdAt);
    const commentFirstName= useCommentSelector(comment => comment.author?.firstName);
    const commentLastName= useCommentSelector(comment => comment.author?.lastName);

    return (
        <div className='divide-x-2 mb-2'>
            <div className='text-sm italic'>
                <span>{formatDate(commentCreatedAt)}</span>
                {(commentFirstName || commentLastName)
                    ? (
                        <>
                            <span> by</span>
                            <span> {commentFirstName}</span>
                            <span> {commentLastName}</span>
                        </>
                    )
                    : null}
            </div>
            <p className='p-1'>{commentText}</p>
            <div className=" m-0" />
        </div>
    );
};

export default Comment;
