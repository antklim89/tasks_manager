'use client';
import { FaTrash } from 'react-icons/fa6';

import { Button, Confirm } from '@/components';
import { useCommentSelector, useDisclosure, useMember } from '@/hooks';
import { useCommentDelete } from '@/request-hooks';
import { formatDate } from '@/utils';


const Comment = () => {
    const { trigger: deleteComment, isMutating: isDeleting } = useCommentDelete();
    const { isOpen, close, open } = useDisclosure();
    const { isAdmin } = useMember();
    const { member } = useMember();

    const commentText = useCommentSelector(comment => comment.text);
    const commentCreatedAt= useCommentSelector(comment => comment.createdAt);
    const commentAuthorId= useCommentSelector(comment => comment.author?.id);
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
            <div className='flex justify-between'>
                <p className='p-1'>{commentText}</p>
                {(isAdmin || member.userId === commentAuthorId)
                    ? (
                        <>
                            <Confirm
                                isLoading={isDeleting}
                                isOpen={isOpen}
                                text="Are you sure you want to delete this comment?"
                                onClose={close}
                                onConfirm={() => deleteComment()}
                            />
                            <Button
                                aria-label='delete comment'
                                color='error' 
                                isLoading={isDeleting} 
                                size='xs' 
                                onClick={open}
                            >
                                <FaTrash />
                            </Button>
                        </>
                    )
                    : null}
            </div>
        </div>
    );
};

export default Comment;
