import { useState } from "react";
import Typewriter from 'typewriter-effect';

interface EventFormProps {
    onClose: () => void;
    onSubmit: (data: { name: string; description: string; date: string; time: string }) => void;
    initialData?: { name: string; description: string; date: string; time: string };
}

export default function EventForm({ onClose, onSubmit, initialData }: EventFormProps) {
    const today = new Date().toISOString().split('T')[0];

    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [date, setDate] = useState(initialData?.date || today);
    const [time, setTime] = useState(initialData?.time || "14:00");
    const [isFocused, setIsFocused] = useState(false);

    const [error, setError] = useState(false);
    const [timeError, setTimeError] = useState(false);

    const placeholders = ["Launches", "Birthdays", "Deadlines", "Meetings", "Dates", "Festival", "Movie Release"];

    // Standardized parser to handle 24h mobile input
    const getTargetDateTime = () => {
        //  the YYYY-MM-DDTHH:mm format for mobile browsers
        return new Date(`${date}T${time}:00`);
    };

    const isPast = () => {
        const target = getTargetDateTime().getTime();
        const now = new Date().getTime();
        if (isNaN(target)) return false; 
        return target - now <= 0;
    };

    const getCountdownPreview = () => {
        const target = getTargetDateTime();
        const now = new Date();
        const diff = target.getTime() - now.getTime();

        if (isNaN(target.getTime()) || diff <= 0) return "Event has already started or passed";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        return `${days} days, ${hours} hours, and ${mins} minutes`;
    };

    const handleSubmit = (e: React.MouseEvent | React.FormEvent) => {
        e.preventDefault();
        
        let hasError = false;

        // 1. Validate Name
        if (!name.trim()) {
            setError(true);
            hasError = true;
        }

        const target = getTargetDateTime().getTime();
        const now = new Date().getTime();
        
        if (isNaN(target) || (target - now < -60000)) {
            setTimeError(true);
            hasError = true;
        }

        if (hasError) {
            setTimeout(() => {
                setError(false);
                setTimeError(false);
            }, 600);
            return;
        }

        onSubmit({ name, description, date, time });
        
        if (!initialData) {
            setName("");
            setDescription("");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500 pb-10">
            {/* 1. TITLE SECTION */}
            <div className={`group ${error ? "animate-shake" : ""}`}>
                <div className="flex justify-between items-center mb-2">
                    <label className={`text-[10px] uppercase font-black tracking-[0.2em] block transition-colors ${error ? "text-urgent" : "text-secondary group-focus-within:text-primary"}`}>
                        Event Name
                    </label>
                    {error && <span className="text-[9px] font-bold text-urgent uppercase animate-pulse">Required Field</span>}
                </div>
                <div className="relative flex items-center">
                    <input
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError(false);
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`w-full bg-background border-2 rounded-2xl p-4 text-main outline-none transition-all text-xl z-10 bg-transparent ${error ? "border-urgent shadow-[0_0_15px_rgba(255,68,68,0.1)]" : "border-border-line focus:border-primary"}`}
                    />
                    {!name && (
                        <div className="absolute left-5 text-secondary/30 text-xl pointer-events-none">
                            {isFocused ? "Event Title..." : <Typewriter options={{ strings: placeholders, autoStart: true, loop: true, cursor: "|" }} />}
                        </div>
                    )}
                </div>
            </div>

            {/* 2. DESCRIPTION */}
            <div className="group">
                <label className="text-[10px] uppercase font-black text-secondary tracking-[0.2em] mb-2 block group-focus-within:text-primary transition-colors">
                    Event Description
                </label>
                <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's the plan?..."
                    className="w-full bg-background border-2 border-border-line rounded-2xl p-5 text-main text-base leading-relaxed outline-none focus:border-primary transition-all resize-none placeholder:opacity-30"
                />
            </div>

            {/* 3. DATE & TIME PICKERS */}
            <div className={`space-y-4 ${timeError ? "animate-shake" : ""}`}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                        <label className="text-[10px] uppercase font-black text-secondary tracking-[0.2em] mb-2 block group-focus-within:text-primary transition-colors">
                            Select Date
                        </label>
                        <input
                            type="date"
                            min={today}
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                setTimeError(false);
                            }}
                            className={` sm:w-full w-[90%] bg-background border-2 rounded-xl p-4 text-main font-oswald outline-none transition-all cursor-pointer ${timeError ? "border-urgent" : "border-border-line focus:border-primary"}`}
                        />
                    </div>
                    <div className="group">
                        <label className="text-[10px] uppercase font-black text-secondary tracking-[0.2em] mb-2 block group-focus-within:text-primary transition-colors">
                            Select Time
                        </label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => {
                                setTime(e.target.value);
                                setTimeError(false);
                            }}
                            className={`sm:w-full w-[90%] bg-background border-2 rounded-xl p-4 text-main font-oswald outline-none transition-all cursor-pointer ${timeError ? "border-urgent" : "border-border-line focus:border-primary"}`}
                        />
                    </div>
                </div>

                {/* PREVIEW BOX */}
                <div className="px-4 py-3 rounded-xl border bg-primary/5 border-primary/10 transition-all">
                    <p className="text-[11px] font-medium italic text-secondary">
                        {isPast() ? "" : "This event is in:"}
                        <span className="not-italic font-bold tracking-wider ml-2 uppercase text-main">
                            {getCountdownPreview()}
                        </span>
                    </p>
                </div>
            </div>

            {/* 4. ACTIONS */}
            <div className="pt-6 flex flex-col gap-3">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-4 rounded-full font-bold text-white bg-primary hover:scale-[1.01] active:scale-95 transition-all cursor-pointer text-lg uppercase tracking-widest shadow-lg shadow-primary/20 touch-manipulation"
                >
                    {initialData ? "Save Changes" : "Add Event"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 rounded-xl font-bold text-secondary hover:text-urgent transition-colors cursor-pointer text-sm"
                >
                    {initialData ? "Cancel" : "Discard Draft"}
                </button>
            </div>
        </div>
    );
}