import ThemeToggle from "../components/ThemeToggle"
import { Link } from "react-router"

export default function Home() {
    return (
        <div className="min-h-screen bg-background bg-pattern bg-fixed transition-colors duration-500 p-8">
            <div className="max-w-3xl sm:max-w-4xl mx-auto">
                <header className="flex justify-end items-center mb-12">
                    <ThemeToggle />
                </header>

                <main className="flex justify-center mt-30 sm:mt-0 items-start gap-4 flex-col">
                    <p className='text-7xl font-share text-main tracking-tighter'>Eventify</p>
                    <p className='text-secondary text-lg max-w-md'>
                        Start planning and scheduling your plans with eventify...
                    </p>
                    <Link to={"/home"}>
                        <button className='px-8 py-3 border-2 border-border-line text-main rounded-full mt-2 hover:bg-card transition-all cursor-pointer font-semibold'>
                            Get Started
                        </button>
                    </Link>

                </main>
            </div>
        </div>
    )
}