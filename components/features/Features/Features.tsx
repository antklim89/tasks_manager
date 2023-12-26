import Image from 'next/image';


const Features = () => {
    return (
        <section className='container grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-1 md:gap-4'>
            <div className='card border border-primary rounded-lg'>
                <div className='card-body'>
                    <p className='leading-6 text-justify'>
                        The app also enables collaboration and seamless communication
                        among team members. Team members can leave comments, update
                        task statuses, and even mention specific users to ensure
                        everyone is on the same page.
                    </p>
                </div>
                <figure>
                    <Image
                        alt="feature"
                        className='h-48 md:h-full w-full object-cover'
                        height={720}
                        quality={90}
                        src="/feature-1.jpg"
                        width={1024}
                    />
                </figure>
            </div>

            <div className='card card-side border border-primary rounded-lg'>
                <div className='card-body flex-[2]'>
                    <p className='leading-6 text-justify'>
                        In summary, the online task manager app with a kanban board
                        is a robust and user-friendly tool designed to streamline
                        task management, enhance collaboration, and improve productivity.
                        With its visual interface, task customization, and rich
                        feature set, this app is ideal for individuals, teams,
                        and businesses looking to stay organized, meet deadlines,
                        and achieve their goals efficiently.
                    </p>
                </div>
                <figure className='flex-[1]'>
                    <Image
                        alt="feature"
                        className='h-full w-full object-cover'
                        height={640}
                        quality={90}
                        src="/feature-2.jpg"
                        width={320}
                    />
                </figure>
            </div>

            <div className='card border border-primary rounded-lg col-span-1 md:col-span-2'>
                <div className='card-body'>
                    <p className='leading-6 text-justify'>
                        The app&apos;s kanban board allows users to visually track
                        the progress of their tasks and projects using customizable
                        columns, such as &quot;To Do,&quot; &quot;In Progress,&quot; and &quot;Completed.&quot;
                        With an easy-to-use drag and drop interface, users can
                        quickly move tasks from one column to another, ensuring
                        a clear view of what needs to be done, what is in progress,
                        and what has been completed.
                    </p>
                </div>
                <figure>
                    <Image
                        alt="feature"
                        className='w-full object-cover h-48'
                        height={256}
                        quality={90}
                        src="/feature-3.jpg"
                        width={1024}
                    />
                </figure>
            </div>
        </section>
    );
};

export default Features;
