'use client';
import { useProfileFetch } from '@/request-hooks';

import ProfileForm from './ProfileForm';


const Profile = () => {
    const { data: profile } = useProfileFetch();

    if (!profile) return null;
    return (
        <div className="card border my-6 border-base-200 container">
            <div className="card-title justify-center mt-6">
                {profile.email}&apos;s profile
            </div>
            <div className="card-body">
                <ProfileForm profile={profile} />
            </div>
        </div>
    );
};

export default Profile;
