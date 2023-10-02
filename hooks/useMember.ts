import { useProject } from './useProject';


export function useMember() {
    const { member } = useProject(false);

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
