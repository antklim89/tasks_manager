import Image from 'next/image';
import Link from 'next/link';


const Hero = () => {
    return (
        <div className="hero h-full">
            <div className="hero-content max-w-7xl flex-col md:flex-row">
                <div className="flex-1">
                    <h1 className="text-5xl font-bold">Manage your tasks!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Link className="btn btn-primary" href="/dashboard">Get Started</Link>
                </div>
                <div className="flex-1">
                    <Image
                        alt="hero"
                        className=" rounded-lg shadow-2xl"
                        height={480}
                        src="/hero.jpg"
                        width={720}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
