
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
    onAddClick?: () => void;
    subText?: string //  sidebar
}

export default function Header({ onAddClick }: HeaderProps) {
    return (
        <header className="flex justify-between items-center mt-4 sm:mt-0 md:mx-20 mx-8 p-4 sm:p-8 gap-4 sm:gap-0">
            <div className="flex flex-col">
                <p className="text-main text-4xl font-share tracking-tighter leading-none">
                    Eventify
                </p>
                <span className="text-[10px] text-secondary uppercase tracking-[0.3em] mt-1 font-bold">
                    Start planning now
                </span>
            </div>

            <div className="flex items-center gap-6">

                {onAddClick && (
                    <button
                        onClick={onAddClick}
                        className="bg-primary text-white  sm:px-6 sm:py-2.5 rounded-full font-semibold hover:opacity-90 transition-all cursor-pointer shadow-lg flex items-center justify-center"
                    >
                        <span className="hidden sm:inline">+ Add Event</span>

                        <span className="inline sm:hidden py-2 px-6 text-xl">+</span>
                    </button>
                )}
                <ThemeToggle />
            </div>
        </header>
    );
}