import { Button, Comment, Modal } from '@/components';
import CommentForm from '@/components/forms/CommentForm';
import { CommentContext } from '@/hooks';
import { useCommentCreate, useCommentsFetch } from '@/request-hooks';

import type { TaskCommentsProps } from './Task.types';


const TaskComments = ({ close, isOpen, commentCount }: TaskCommentsProps) => {
    const { data: comments, isLoading } = useCommentsFetch({ enable: isOpen });
    const { trigger: createComment, isMutating } = useCommentCreate();

    return (
        <Modal isOpen={isOpen} size="2xl" onClose={close}>
            <Modal.Title className="text-2xl">
                Comments
            </Modal.Title>
            <Modal.Body>
                <CommentForm className='mb-2 md:mb-8' onSubmit={createComment}>
                    <div className="flex justify-end mt-2">
                        <Button
                            className='ml-auto' 
                            isLoading={isMutating}
                            type='submit'
                        >
                            Send
                        </Button>
                    </div>
                </CommentForm>
                {comments?.map((comment) => (
                    <CommentContext.Provider key={comment.id} value={comment}>
                        <Comment />
                    </CommentContext.Provider>
                ))}
                {(commentCount && isLoading)
                    ? Array.from({ length: commentCount }, (_,i) => i).map(i => (
                        <div className='skeleton h-14 mb-2' key={i} />
                    ))
                    : null}
            </Modal.Body>
        </Modal>
    );
};

export default TaskComments;
