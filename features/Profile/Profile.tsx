'use client';
import { useProfileFetch } from '@/requests';


const Profile = () => {
    const { data } = useProfileFetch();

    return (
        <div>Profile {data?.email}</div>
    );
};

export default Profile;
