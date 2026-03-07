import { useState } from "react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import Header from "../components/Header";
import type { EventData } from "../types/EventData";
import type { EventFormData } from "../types/EventFormData";

//  props coming from App.
interface MainProps {
  events: EventData[];
  setEvents: React.Dispatch<React.SetStateAction<EventData[]>>;
}

export default function Main({ events, setEvents }: MainProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // --- LOGIC UPDATED TO USE PROPS ---
  const handleAddEvent = (formData: EventFormData): void => {
    const newEntry: EventData = {
      ...formData,
      id: crypto.randomUUID(), 
      createdAt: new Date().toISOString()
    };
    
    setEvents((prev) => [newEntry, ...prev]);
    setIsSidebarOpen(false); 

    // Trigger Success Toast
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteEvent = (id: string): void => {
    setEvents((prev) => prev.filter(event => event.id !== id));
  };

  return (
    <div className="relative bg-background min-h-screen transition-colors duration-500 font-poppins antialiased overflow-x-hidden">
      
      {/* --- SUCCESS TOAST NOTIFICATION --- */}
      <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-none transition-all duration-500 ease-out ${
        showSuccess ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}>
        <div className="bg-far text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20">
          <div className="bg-white/20 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <span className="font-oswald text-lg uppercase">Event updated successfully</span>
        </div>
      </div>

      {/* --- SIDEBAR PANEL --- */}
      <aside 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-card border-l border-border-line/50 z-50 shadow-2xl transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex flex-col">
              <h2 className="text-main font-oswald text-3xl leading-none">Create Event</h2>
              <p className="text-secondary text-[10px] uppercase tracking-widest mt-2 font-bold">New Event Details</p>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-urgent/10 rounded-full text-secondary hover:text-urgent transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <EventForm 
            onClose={() => setIsSidebarOpen(false)} 
            onSubmit={handleAddEvent} 
          />
        </div>
      </aside>

      {/* --- DIM OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- HEADER --- */}
     <Header  onAddClick={() => setIsSidebarOpen(true)}/>
      {/* --- MAIN CONTENT --- */}
      <main className="md:mx-20 mx-10 pb-20 mt-10 sm:mt-0">
        <h2 className="text-secondary uppercase tracking-[0.2em] text-xs font-bold mb-10 italic">
          Upcoming Events ({events.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard 
                key={event.id} 
                data={event} 
                onDelete={handleDeleteEvent} 
              />
            ))
          ) : (
            <div className="col-span-full py-20  rounded-3xl flex flex-col items-center justify-center">
              <p className="text-secondary font-medium opacity-50 text-lg">No events found...</p>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="mt-4 text-primary font-bold uppercase text-[10px] tracking-widest hover:underline"
              >
                Create your first event
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}