'use client';

import { Button, Modal } from '@/components';
import Members from '@/features/Members';
import { useDisclosure } from '@/hooks';


const ProjectPanelMembers = ({ projectId }: { projectId: number }) => {
    const { isOpen, close, open } = useDisclosure();

    return (
        <>
            <Button
                aria-label="members"
                color="ghost"
                onClick={open}
            >
                Members
            </Button>

            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Title>
                    Project members
                </Modal.Title>
                <Modal.Body>
                    <Members projectId={projectId} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ProjectPanelMembers;
