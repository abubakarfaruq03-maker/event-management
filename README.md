# Eventify — Minimalist Event Countdown

A simple, reactive countdown timer app built to help users keep track of upcoming deadlines, launches, and personal milestones. It focuses on a clean UI and high-density information without the clutter of a full calendar suite.

---

## 🛠 What was built & Design Choices

The goal was to create a "set and forget" dashboard for events. I chose a **grid-style** for the layout because it allows each event to breathe while maintaining a structured look on both desktop and mobile.

 **Time & Progress Visualization**
One of the core features of Eventify is how it visualizes the passage of time. Instead of just showing a static date, I implemented a dynamic "Countdown Progress" system:
Visual Urgency: Each event card includes a progress-style indicator that calculates the gap between the creation date and the target deadline. This gives users a "heat map" of which events are approaching fastest and how close they are to getting to that date.

Precision Countdowns: The display automatically toggles between "Days" for long-term goals and "Minutes/Seconds" as the deadline nears, ensuring the information remains relevant to the user's current context and very easy to understand to almost every users.

**The "Traffic Light" Urgency System**
To prevent "information overload," I implemented a dynamic color-coding system that updates in real-time based on how much time is left for an event. This allows the user to prioritize their day without reading a single number if they dont want to.

🟢 Green (Safe): Displayed when more than 60% of the total time remains. This indicates the event is still in its early stages and requires minimal immediate attention.

🟡 Yellow (Soon): Triggered when the event passes the halfway mark (less than 50% of time left). This serves as a subtle visual nudge that the deadline is approaching the "active" phase.

🔴 Red (Urgent): When the countdown enters the final 30% of its duration, the UI shifts to a high-contrast red. I added a subtle "pulse" animation to these cards to draw the eye immediately to the most pressing tasks.

---

## 🚀 Future Improvements

With more time, I’d move this from a "utility" to a "platform":

1. **Persistent Database:** Transitioning from `localStorage` to **Supabase or Firebase** so users can access their countdowns across multiple devices.
2. **Push Notifications:** Using the Web Push API to send a browser notification 10 minutes before an event expires.
3. **Category Filtering:** Adding tags (Work, Personal, Social) to help organize the dashboard when the event list gets long.
4. **Drag-and-Drop:** Implementing `dnd-kit` to allow users to manually reorder cards rather than just relying on the chronological sort.

---

## 🚧 Challenges Faced

* **The "Insecure Context" Bug:** A major hurdle was discovering that `crypto.randomUUID()` fails on mobile devices if the site isn't served over HTTPS. This led to a "silent crash" during mobile testing that was difficult to debug without a remote console. I had to implement a fallback ID generator for development.
* **Timezone Math:** Calculating the "Time Remaining" accurately across different browser locales was trickier than expected. Standardizing everything to UTC strings before doing the math was the eventual fix.
* **UI Decisions:** Before finalizing on the event card structure and the layout of the app. I had to think from the perspective of a user and also did some mini gumshoe research

---

## ⏱ Time Spent

* **Core Logic & State:** ~2 hours (Handling the countdown math and sorting).
* **UI/UX & Tailwind Styling:** ~3 hours (Polishing the animations and responsive grid).
* **Mobile Debugging & Fixes:** ~1 hours (Specifically hunting down the UUID and 24h time bugs).
* **Total:** **~6 hours** of active development.

---

**Would you like me to add a "How to Install" section to this README so others can run it locally?**
```
