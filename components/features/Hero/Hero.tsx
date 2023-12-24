import Image from 'next/image';
import Link from 'next/link';


const Hero = () => {
    return (
        <div className="container hero h-full mb-8 md:mb-32">
            <div className="hero-content p-0 max-w-7xl flex-col md:flex-row">
                <div className="flex-1">
                    <h1 className="text-5xl font-bold">Manage your tasks!</h1>
                    <p className="py-6">The online task manager app with a kanban
                        board is a powerful and intuitive tool 
                        designed to help individuals and teams 
                        efficiently manage their tasks and projects.
                        This comprehensive app combines the benefits 
                        of a task manager with the visual organization of
                        a kanban board, providing users with a seamless
                        and flexible task management experience.
                    </p>
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
