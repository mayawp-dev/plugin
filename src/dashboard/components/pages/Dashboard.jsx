import Layout from '../layout/Layout';
const Dashboard = () => {
    return (
        <Layout>
            <div className="overflow-hidden bg-white py-10 rounded-lg">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
                        <div className="lg:pr-8">
                            <h2 className="text-base font-semibold leading-7 text-gray-600">Hi again 👋,</h2>
                            <p className="mt-2 text-3xl font-bold tracking-loose text-gray-900 sm:text-4xl">Thank you for trying <a href="https://mayawp.com" target="_blank" className="text-brand underline hover:no-underline">MayaWP AI</a></p>
                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                MayaWP is an AI SaaS for your WordPress site/s, so you can do all of the things you already did on WordPress in a much more automated and efficient way.
                            </p>
                            <p className="mt-4 text-lg leading-8 text-gray-600">This is a project made and run by <a href="https://x.com/lushkant" target="_blank" className="text-brand underline hover:no-underline">@lushkant</a>, I'm a solopreneur building in public.</p>
                            <p className="mt-4 text-lg leading-8 text-gray-600">At MayaWP, I'm building and tightly integrating AI features in WordPress to save you hours if not days and weeks of work. While I build these awesome tools for you, if you have any suggestions and feedback for MayaWP, I'd love to hear it.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;