import { Link } from "react-router";
import { useState, useEffect } from "react";
import type { EventData } from "../types/EventData";
import TimeUnit from "./TimeUnit";

interface EventCardProps {
    data: EventData;
    onDelete?: (id: string) => void;
}

export default function EventCard({ data, onDelete }: EventCardProps) {
    //  CONFIRMATION STATE ---
    const [isConfirming, setIsConfirming] = useState(false);

    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        progress: 0,
        isExpired: false,
    });

    const progress = timeLeft.progress;
    const currentStatus = progress > 70 ? "urgent" : progress > 50 ? "upcoming" : "far";

    useEffect(() => {
        const calculateTime = () => {
            const target = new Date(`${data.date}T${data.time}`).getTime();
            const start = new Date(data.createdAt).getTime();
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                setTimeLeft((prev) => ({ ...prev, isExpired: true, progress: 100 }));
                return;
            }

            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);

            const totalDuration = target - start;
            const elapsed = now - start;
            const progressPercent = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

            setTimeLeft({
                days: d.toString().padStart(2, "0"),
                hours: h.toString().padStart(2, "0"),
                minutes: m.toString().padStart(2, "0"),
                seconds: s.toString().padStart(2, "0"),
                progress: progressPercent,
                isExpired: false,
            });
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [data]);

    const getProgressBarColor = () => {
        if (timeLeft.progress > 70) return "bg-urgent";
        if (timeLeft.progress > 50) return "bg-upcoming";
        return "bg-far";
    };

    return (
        <div className={`bg-card shadow-xl rounded-3xl overflow-hidden border border-border-line/40 
                    transition-all duration-300 ease-in-out
                    hover:shadow-2xl hover:shadow-primary/10 
                    hover:-translate-y-1 group cursor-default relative 
                    ${timeLeft.isExpired ? "border-urgent/50" : ""}
                    ${timeLeft.progress > 70 && !timeLeft.isExpired ? "animate-pulse" : "animate-none"}`}>

            {/* 1. TOP PROGRESS TRACKER */}
            <div className="h-1.5 w-full bg-border-line/20">
                <div
                    className={`h-full transition-all duration-1000 ease-linear ${getProgressBarColor()}`}
                    style={{ width: `${timeLeft.progress}%` }}
                ></div>
            </div>

            <div className="p-8">
                {/* 2. TIMER AREA */}
                <div className="mb-8">
                    <span className="text-secondary text-[10px] uppercase font-black tracking-widest mb-3 block">
                        {timeLeft.isExpired ? "Status" : "Time Remaining"}
                    </span>

                    <div className="flex gap-2 min-h-16">
                        {timeLeft.isExpired ? (
                            <div className="flex-1 flex items-center justify-between bg-urgent/10 border border-urgent/30 rounded-2xl px-5 py-3 animate-in fade-in zoom-in duration-500">
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-urgent opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-urgent"></span>
                                    </span>
                                    <p className="text-urgent font-oswald text-xl uppercase tracking-wider">Event Started</p>
                                </div>
                                {onDelete && (
                                    <button
                                        onClick={() => setIsConfirming(true)}
                                        className="text-[10px] font-black uppercase text-urgent hover:underline tracking-tighter cursor-pointer"
                                    >
                                        Dismiss
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <TimeUnit value={timeLeft.days} label="Days" variant="normal" />
                                <TimeUnit value={timeLeft.hours} label="Hrs" variant="normal" />
                                <TimeUnit value={timeLeft.minutes} label="Min" variant="normal" />
                                <TimeUnit value={timeLeft.seconds} label="Sec" variant={currentStatus} />
                            </>
                        )}
                    </div>
                </div>

                {/* 3. TEXT CONTENT */}
                <div className="mb-8 min-h-25">
                    <h3 className="text-main text-2xl font-oswald mb-2 uppercase truncate">
                        {data.name}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed line-clamp-3">
                        {data.description || "No description provided for this event."}
                    </p>
                </div>

                {/* 4. FOOTER / ACTION AREA */}
                <div className="flex justify-between items-center pt-6 border-t border-border-line/30">
                    <div className="flex flex-col">
                        <span className="text-secondary text-[10px] uppercase font-bold">Deadline</span>
                        <span className="text-main font-share text-sm tracking-wide">
                            {new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <div className="flex items-center">
                        {!isConfirming ? (
                            <div className="flex gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                                {onDelete && (
                                    <button
                                        onClick={() => setIsConfirming(true)}
                                        className="p-2 rounded-xl border border-border-line hover:bg-urgent/10 hover:text-urgent transition-colors cursor-pointer"
                                        title="Delete Event"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                )}
                                <Link to={`/edit/${data.id}`}>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-line font-bold text-xs transition-all duration-200 hover:bg-main hover:text-background cursor-pointer">
                                        Details
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </button>
                                </Link>

                            </div>
                        ) : (
                            // --- CONFIRMATION UI ---
                            <div className="flex items-center gap-3 animate-in zoom-in-95 fade-in duration-200">
                                <span className="text-urgent font-black text-[10px] uppercase tracking-tighter">Are you sure?</span>
                                <button
                                    onClick={() => onDelete?.(data.id)}
                                    className="bg-urgent text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:opacity-90 transition-all cursor-pointer"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setIsConfirming(false)}
                                    className="text-secondary hover:text-main text-[10px] font-bold uppercase cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}