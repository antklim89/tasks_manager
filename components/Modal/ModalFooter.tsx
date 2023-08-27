import { ReactNode } from 'react';


const ModalFooter = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex justify-end gap-2">
            {children}
        </div>
    );
};

export default ModalFooter;
