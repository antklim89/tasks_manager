'use client';
import { useProfileFetch } from '@/requests';

import ProfileForm from './ProfileForm';


const Profile = () => {
    const { data: profile } = useProfileFetch();

    if (!profile) return null;
    return (
        <div className="card container max-w-3xl">
            <div className="card-title">
                Profile {profile.email}
            </div>
            <div className="card-body">
                <ProfileForm profile={profile} />
            </div>
        </div>
    );
};

export default Profile;
