import Image from 'next/image';


const Features = () => {
    return (
        <section className='container '>
            <div className='flex flex-row flex-wrap gap-1 md:gap-4 mb-1 md:mb-4'>
                <div className='w-full basis-96 flex-[2] md:flex-[3] border border-primary rounded-lg p-4'>
                    <div className='mb-8'>
                        <p>
                            The app&apos;s kanban board allows users to visually track
                            the progress of their tasks and projects using customizable
                            columns, such as &quot;To Do,&quot; &quot;In Progress,&quot; and &quot;Completed.&quot;
                            With an easy-to-use drag and drop interface, users can
                            quickly move tasks from one column to another, ensuring
                            a clear view of what needs to be done, what is in progress,
                            and what has been completed.
                        </p>
                    </div>
                    <div>
                        <Image
                            alt="feature"
                            height={720}
                            quality={90}
                            src="/project_page.png"
                            width={1024}
                        />
                    </div>
                </div>

                <div className='w-full basis-48 flex-1 border border-primary rounded-lg p-4'>
                    <div className='mb-8'>
                        <p>
                            The app also enables collaboration and seamless communication
                            among team members. Team members can leave comments, update
                            task statuses, and even mention specific users to ensure
                            everyone is on the same page.
                        </p>
                    </div>
                    <div>
                        <Image
                            alt="feature"
                            height={720}
                            quality={90}
                            src="/members_page.png"
                            width={1024}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:flex-row border border-primary rounded-lg p-4'>
                <div className='mb-8 flex-[2]'>
                    <p>
                        In summary, the online task manager app with a kanban board
                        is a robust and user-friendly tool designed to streamline
                        task management, enhance collaboration, and improve productivity.
                        With its visual interface, task customization, and rich
                        feature set, this app is ideal for individuals, teams,
                        and businesses looking to stay organized, meet deadlines,
                        and achieve their goals efficiently.
                    </p>
                </div>
                <div className='flex-1'>
                    <Image
                        alt="feature"
                        height={720}
                        quality={90}
                        src="/edit_modal.png"
                        width={1024}
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
