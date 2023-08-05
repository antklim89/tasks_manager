'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components';
import Alert from '@/components/Alert/Alert';
import { useAuth } from '@/requests/useAuth';

import { authSchema } from './Auth.schema';
import { AuthFotmInput } from './Auth.types';


const Auth = () => {
    const [type, setType] = useState<'login'|'register'>('login');
    const { trigger, isMutating, error, reset } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<AuthFotmInput>({
        resolver: zodResolver(authSchema),
    });

    const handleAuthentication = handleSubmit(async (data) => {
        if (type === 'register' && data.password !== data.confirm) {
            setError('confirm', { message: 'Passwords should be the same.', type: 'validate' });
        }
        reset();
        await trigger({ email: data.email, password: data.password, type });
    });

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full flex-col lg:flex-row">
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-5xl font-bold">{{ login: 'Login', register: 'Register' }[type]}</h1>
                    <p className="py-6">
                        {{
                            login: 'Please log in to use our app. If you don\'t have an account, ',
                            register: 'Please register to use our app. If you already have an account, ',
                        }[type]}
                        <Button
                            className="p-0"
                            variant="link"
                            onClick={() => setType((prevType) => (prevType === 'login' ? 'register' : 'login'))}
                        >
                            {{ login: 'register', register: 'login' }[type]}
                        </Button>
                    </p>
                </div>
                <div className="card flex-1 shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleAuthentication}>
                        <Alert message={error?.message} type="error" />
                        <Input
                            {...register('email')}
                            autoComplete="username"
                            errorMessage={errors.email?.message}
                            label="Email"
                            placeholder="example@mail.com"
                            type="email"
                        />
                        <Input
                            {...register('password')}
                            autoComplete="current-password"
                            errorMessage={errors.password?.message}
                            label="Password"
                            placeholder="password..."
                            type="password"
                        />
                        {type === 'register' && (
                            <Input
                                {...register('confirm')}
                                autoComplete="current-password"
                                errorMessage={errors.confirm?.message}
                                label="Confirm password"
                                placeholder="confirm password..."
                                type="password"
                            />
                        )}
                        <div className="form-control mt-6">
                            <Button isLoading={isMutating} type="submit">Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
