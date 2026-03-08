import { useParams, useNavigate } from "react-router";
import EventForm from "../components/EventForm";
import type { EventData } from "../types/EventData";
import Header from "../components/Header";

interface EditEventProps {
  events: EventData[];
  onUpdateEvent: (updated: EventData) => void;
}

export default function EditEvent({ events, onUpdateEvent }: EditEventProps) {
  const { id } = useParams();
  const navigate = useNavigate();


  const eventToEdit = events.find((e) => String(e.id) === String(id));

  const handleUpdate = (formData: any) => {
    if (eventToEdit) {
      const updated: EventData = {
        ...eventToEdit,
        ...formData
      };
      onUpdateEvent(updated);
      navigate("/home",
        { state: { editSuccess: true } });
    }
  };

  if (!eventToEdit) {
    return (
      <div className="p-10 text-center text-main">
        <h2 className="text-2xl font-oswald uppercase">Event Not Found</h2>
        <button onClick={() => navigate("/")} className="mt-4 underline text-secondary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Header subText="Editing" />

      <div className="max-w-2xl mx-auto p-6">
        {/* --- BACK BUTTON --- */}
        <button
          onClick={() => navigate("/home")}
          className="group flex items-center gap-2 mb-6 text-secondary hover:text-main transition-colors duration-200 cursor-pointer"
        >
          <div className="p-2 rounded-full border border-border-line/50 group-hover:border-main transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18" height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Home</span>
        </button>

        {/* --- TITLE SECTION --- */}
        <h2 className="text-2xl font-oswald uppercase mb-6 text-main">Edit Event</h2>

        <EventForm
          initialData={eventToEdit}
          onSubmit={handleUpdate}
          onClose={() => navigate("/home")}
        />
      </div>
    </>

  );
}