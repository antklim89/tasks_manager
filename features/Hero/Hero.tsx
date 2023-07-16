import Image from 'next/image';
import { FC } from 'react';

import Button from '@/components/Button';


const Hero: FC = () => {
    return (
        <div className="hero h-full bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div>
                    <h1 className="text-5xl font-bold">Manage your tasks!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Button className="btn btn-primary">Get Started</Button>
                </div>
                <Image
                    alt="hero"
                    className="max-w-sm rounded-lg shadow-2xl"
                    height={480}
                    src="/hero.jpg"
                    width={720}
                />
            </div>
        </div>
    );
};

export default Hero;
