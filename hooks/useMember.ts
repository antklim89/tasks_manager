import { useFetchMember } from '@/requests';


export function useMember() {
    const { data: member } = useFetchMember();

    const isAdmin = member?.role === 'admin';
    const isMember = member?.role === 'member';
    const isReadonly = member?.role === 'read-only';
    const isAdminOrMember = isAdmin || isMember;

    return {
        member,
        isAdmin,
        isMember,
        isReadonly,
        isAdminOrMember,
    };
}
