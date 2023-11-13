import { createContext, useContext } from 'use-context-selector';

import { MemberType } from '@/schemas';


interface MemberRoles {
    isAdmin: boolean
    isUser: boolean
    isGuest: boolean
    isAdminOrUser: boolean
}

export const MemberContext = createContext<MemberType | undefined>(undefined);


export function useMember(isRequired?: true): MemberRoles & { member: MemberType }
export function useMember(isRequired: false): MemberRoles & { member?: MemberType }

export function useMember(isRequired = true): MemberRoles & { member?: MemberType } {
    const member = useContext(MemberContext);
    if (!member) {
        if (isRequired) throw new Error('You are not on the project page');
        else return { isAdmin: false, isAdminOrUser: false, isGuest: false, isUser: false };
    }

    const isAdmin = member?.role === 'admin';
    const isUser = member?.role === 'user';
    const isGuest = member?.role === 'guest';
    const isAdminOrUser = isAdmin || isUser;

    return {
        member,
        isAdmin,
        isUser,
        isGuest,
        isAdminOrUser,
    };
}
