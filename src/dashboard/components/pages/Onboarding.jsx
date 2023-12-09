import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

import OnboardingLayout from '../layout/OnboardingLayout';
import { NavLink } from 'react-router-dom'

const tiers = [
    {
        name: 'Starter',
        id: 'tier-starter',
        href: '#',
        price: { monthly: '$15', annually: '$12' },
        description: 'Everything necessary to get started.',
        features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    },
    {
        name: 'Plus',
        id: 'tier-plus',
        href: '#',
        price: { monthly: '$30', annually: '$24' },
        description: 'Everything in Starter, plus essential tools for growing your business.',
        features: [
            '25 products',
            'Up to 10,000 subscribers',
            'Advanced analytics',
            '24-hour support response time',
            'Marketing automations',
        ],
    },
    {
        name: 'Pro',
        id: 'tier-Pro',
        href: '#',
        price: { monthly: '$60', annually: '$48' },
        description: 'Everything in Plus, plus collaboration tools and deeper insights.',
        features: [
            'Unlimited products',
            'Unlimited subscribers',
            'Advanced analytics',
            '1-hour, dedicated support response time',
            'Marketing automations',
            'Custom reporting tools',
        ],
    },
]

const steps = [
    { id: '01', name: '01. Configuration', href: '#/getting-started', status: 'complete' },
    { id: '02', name: '02. Plan', href: '#/getting-started', status: 'current' },
    { id: '03', name: '03. Take Off', href: '#/getting-started', status: 'upcoming' },
]
const Onboarding = () => {
    return (
        <OnboardingLayout>
            <div className="mb-6 text-center">
                <NavLink
                    to="/dashboard"
                    className="text-gray-500 hover:text-gray-800 inline-flex items-center px-1 pt-1 text-base shadow-none"
                >
                    Skip to Dashboard
                </NavLink>
            </div>
            <div className="bg-white rounded-lg">
                <div className="bg-white pt-20 pb-10 rounded-lg">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl sm:text-center">
                            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Hi there 👋
                            </p>
                        </div>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">
                            MayaWP is an AI SaaS and you'll need an API key to continue using this plugin, you can get a free account to try our features.
                            <span className="block text-sm">(MayaWP is still in an Early Preview at the moment, you can stay tuned on <a href="https://twitter.com/lushkant" className="text-brand underline hover:no-underline" target="_blank">X/Twitter</a> for new features and updates.)</span>
                        </p>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mt-8 flex flex-col justify-center gap-8 items-center">
                            <div>
                                <NavLink
                                    to="/settings"
                                    className="rounded-lg bg-brand px-4 py-3 text-base font-semibold text-white hover:bg-brand-static/90 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >Already have an API key?</NavLink>
                            </div>
                            <p className="text-xl text-gray-500 leading-8">Or follow the below super quick step to get one for free.</p>

                        </div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mt-8 flow-root">
                            <div className="overflow-hidden bg-white py-10 sm:py-10">
                                <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-1 lg:items-start">
                                        <div className="text-center">
                                            <div className="mx-auto max-w-2xl lg:max-w-lg space-y-6">
                                                <div>
                                                    <h2 className="text-base font-semibold leading-7 text-brand">Easy Peezy MayaWPyy, <span className="text-sm italic">alright we tried!</span></h2>
                                                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sign up for an API key</p>
                                                </div>
                                                <p className="text-lg leading-8 text-gray-600">
                                                    It's really simple, you just register for an account at <a href="https://mayawp.com" target="_blank" className="font-medium text-brand underline hover:no-underline">mayawp.com</a>. That's it and you get a key, everyone gets a key, from the <span className="font-medium">API Keys</span> page. <br/> Let's go 🚀
                                                </p>
                                                <div>
                                                    <a
                                                        href="https://mayawp.com"
                                                        target="_blank"
                                                        className="rounded-lg bg-gray-900 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-900/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >Let's get my API key</a>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className="sm:px-6 lg:px-0">*/}
                                        {/*    <div className="relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">*/}
                                        {/*        <div*/}
                                        {/*            className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"*/}
                                        {/*            aria-hidden="true"*/}
                                        {/*        />*/}
                                        {/*        <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">*/}
                                        {/*            <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900 ring-1 ring-white/10">*/}
                                        {/*                <p>Add a gif here.</p>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div*/}
                                        {/*            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"*/}
                                        {/*            aria-hidden="true"*/}
                                        {/*        />*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    )
}

export default Onboarding;