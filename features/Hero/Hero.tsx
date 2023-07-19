import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';


const Hero: FC = () => {
    return (
        <div className="hero h-full bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div>
                    <h1 className="text-5xl font-bold">Manage your tasks!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Link className="btn btn-primary" href="/dashboard">Get Started</Link>
                </div>
                <Image
                    alt="hero"
                    className="w-full rounded-lg shadow-2xl"
                    height={480}
                    src="/hero.jpg"
                    width={720}
                />
            </div>
        </div>
    );
};

export default Hero;
