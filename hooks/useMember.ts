import { useProject } from './useProject';


export function useMember() {
    const { member } = useProject(false);

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
