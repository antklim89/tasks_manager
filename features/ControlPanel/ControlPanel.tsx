import { ReactNode } from 'react';


const ControlPanel = ({ children }: {children: ReactNode}) => {
    return (
        <div className="container m-auto flex py-4 bpx-2">
            {children}
        </div>
    );
};

export default ControlPanel;
