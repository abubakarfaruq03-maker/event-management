import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import Main from "./app/main-app";
import EditEvent from "./app/edit";
import Home from "./app/home";

import type { EventData } from "./types/EventData";

export default function App() {
  const [events, setEvents] = useState<EventData[]>(() => {
    const saved = localStorage.getItem("eventify_data");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever ANY component updates the events
  useEffect(() => {
    localStorage.setItem("eventify_data", JSON.stringify(events));
  }, [events]);

  const handleEditEvent = (updated: EventData) => {
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/home" 
        element={<Main events={events} setEvents={setEvents} />} 
      />
      <Route 
        path="/edit/:id" 
        element={<EditEvent events={events} onUpdateEvent={handleEditEvent} />} 
      />
    </Routes>
  );
}