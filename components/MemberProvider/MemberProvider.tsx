'use client';
import { ReactNode } from 'react';

import { MemberContext } from '@/hooks';
import { useMemberFetch } from '@/request-hooks';
import { MemberType } from '@/schemas';


const MemberProvider = ({
    children,
    defaultMember,
}: {
    children: ReactNode,
    defaultMember: MemberType,
}) => {
    const { data: member = defaultMember } = useMemberFetch({ member: defaultMember });
    
    return (
        <MemberContext.Provider value={member}>{children}</MemberContext.Provider>
    );
};

export default MemberProvider;
