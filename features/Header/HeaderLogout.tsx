'use client';

import { Button } from '@/components';
import { useLogout } from '@/requests';


const HeaderLogout = () => {
    const { trigger: logout, isMutating } = useLogout();

    return (
        <Button
            aria-label="delete column"
            className="w-full"
            color="ghost"
            isLoading={isMutating}
            onClick={() => logout()}
        >
            LogOut
        </Button>
    );
};

export default HeaderLogout;
