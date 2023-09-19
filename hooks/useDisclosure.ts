import { useState } from 'react';


export function useDisclosure() {
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen((p) => !p);
    }

    function close() {
        setIsOpen(false);
    }

    function open() {
        setIsOpen(true);
    }

    return { isOpen, toggle, close, open };
}
