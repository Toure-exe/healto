export default function Header() {

    return (

        <header class="pb-6 bg-slate-600">
            <div class="mx-auto border-b border-slate-500 mb-6">
                <div class="flex justify-between max-w-screen-xl mx-auto py-2">
                    <div>
                        <a href="" class="text-slate-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="mx-auto max-w-screen-xl flex items-center w-full justify-between">
                <a href="" class="font-bold text-3xl text-white">HealtTo</a>
            </div>
        </header>

    )
}