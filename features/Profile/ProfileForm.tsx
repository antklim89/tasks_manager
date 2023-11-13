import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components';
import { useProfileUpdate } from '@/request-hooks/useProfileUpdate';
import { ProfileType, ProfileUpdateType, profileUpdateSchema } from '@/schemas';


const ProfileForm = ({ profile }: { profile: ProfileType }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<ProfileUpdateType>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: profile,
    });

    const { trigger: updateProfile, isMutating } = useProfileUpdate({ userId: profile.id }, {
        onSuccess(newProfile) {
            reset(newProfile, { keepDirty: false });
        },
    });

    const handleUpdateProfile = handleSubmit(async (data) => {
        if (isDirty) await updateProfile(data);
    });

    return (
        <form className="card-body" onSubmit={handleUpdateProfile}>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                <Input
                    {...register('firstName')}
                    errorMessage={errors.firstName?.message}
                    label="First name"
                />
                <Input
                    {...register('lastName')}
                    errorMessage={errors.lastName?.message}
                    label="Last name"
                />
            </div>
            <Input
                {...register('description')}
                as="textarea"
                errorMessage={errors.description?.message}
                label="Description"
                rows={10}
            />
            <div className="flex justify-end mt-4">
                <Button
                    outline
                    isLoading={isMutating}
                    type="button"
                    onClick={() => reset(profile)}
                >
                    Cancel
                </Button>
                <Button isLoading={isMutating} type="submit">Save</Button>
            </div>
        </form>
    );
};

export default ProfileForm;
