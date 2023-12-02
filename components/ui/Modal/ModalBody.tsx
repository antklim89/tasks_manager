import { ReactNode } from 'react';


const ModalBody = ({ children }: { children: ReactNode }) => {
    return (
        <div className="mb-4">
            {children}
        </div>
    );
};

export default ModalBody;
