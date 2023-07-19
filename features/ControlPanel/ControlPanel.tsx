import { ReactNode } from 'react';


const ControlPanel = ({ children }: {children: ReactNode}) => {
    return (
        <div className="flex bg-secondary py-4 px-2">
            {children}
        </div>
    );
};

export default ControlPanel;
