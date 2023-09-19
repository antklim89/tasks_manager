'use client';

import { Button, Confirm } from '@/components';
import { useDisclosure } from '@/hooks';
import { useLogout } from '@/requests';


const HeaderLogout = () => {
    const { isOpen, close, open } = useDisclosure();
    const { trigger: logout, isMutating } = useLogout();

    return (
        <>
            <Button
                aria-label="delete column"
                className="w-full"
                color="ghost"
                isLoading={isMutating}
                onClick={open}
            >
                LogOut
            </Button>
            <Confirm
                confirmButtonText="Log out"
                isLoading={isMutating}
                isOpen={isOpen}
                text="Are you sure you want to log out!"
                onClose={close}
                onConfirm={logout}
            />
        </>
    );
};

export default HeaderLogout;
