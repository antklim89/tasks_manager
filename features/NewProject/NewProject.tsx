'use client';
import Dialog from '@/components/Dialog/Dialog';


const NewProject = () => {
    return (
        <Dialog
            closeClassName="btn-outline"
            confirmText="confirm"
            openText="New Project"
            title="Create New Project"
            onConfirm={() => null}
        >
            Hello
        </Dialog>
    );
};

export default NewProject;
