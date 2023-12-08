import { ReactNode } from 'react';


const ModalBody = ({ children }: { children: ReactNode }) => {
    return (
        <div className="p-4">
            {children}
        </div>
    );
};

export default ModalBody;
