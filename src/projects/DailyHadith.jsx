import { useMemo, useState } from "react";
import hadithCollection from "../data/hadithCollection.json";

const getTodayISO = () => new Date().toISOString().split("T")[0];
const DAY_MS = 24 * 60 * 60 * 1000;

export default function DailyHadith() {
  const [selectedDate, setSelectedDate] = useState(getTodayISO());

  const selectedDateObj = useMemo(() => {
    const parsed = new Date(`${selectedDate}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [selectedDate]);

  const isWeekend = useMemo(() => {
    const day = selectedDateObj.getDay();
    return day === 0 || day === 6;
  }, [selectedDateObj]);

  const selectedHadith = useMemo(() => {
    const dayOfMonth = selectedDateObj.getDate();
    const mappedIndex = (dayOfMonth - 1) % hadithCollection.length;
    return {
      dayOfMonth,
      mappedIndex,
      item: hadithCollection[mappedIndex],
    };
  }, [selectedDateObj]);

  const formattedDate = useMemo(() => {
    return selectedDateObj.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [selectedDateObj]);

  const shiftDate = (days) => {
    const next = new Date(selectedDateObj.getTime() + days * DAY_MS);
    setSelectedDate(next.toISOString().split("T")[0]);
  };

  const setToday = () => {
    setSelectedDate(getTodayISO());
  };

  const setRandomHadith = () => {
    const randomIndex = Math.floor(Math.random() * hadithCollection.length);
    const dayForIndex = randomIndex + 1;
    const randomDate = new Date(selectedDateObj);
    randomDate.setDate(dayForIndex);
    setSelectedDate(randomDate.toISOString().split("T")[0]);
  };

  return (
    <section className="space-y-5">
      <div className="surface-card rounded-2xl p-6">
        <h2 className="display-font text-3xl font-bold text-gray-900">Daily Hadith</h2>
        <p className="mt-3 text-gray-600">
          Select any date from the calendar to view the mapped hadith for that day.
        </p>
      </div>

      <div className="surface-card rounded-2xl p-6">
        <label
          htmlFor="hadith-date"
          className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-700"
        >
          Choose Date
        </label>
        <input
          id="hadith-date"
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />

        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          <button
            type="button"
            onClick={() => shiftDate(-1)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-amber-400 hover:bg-amber-50"
          >
            Previous Day
          </button>
          <button
            type="button"
            onClick={() => shiftDate(1)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-amber-400 hover:bg-amber-50"
          >
            Next Day
          </button>
          <button
            type="button"
            onClick={setToday}
            className="rounded-lg border border-teal-300 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
          >
            Today
          </button>
          <button
            type="button"
            onClick={setRandomHadith}
            className="rounded-lg border border-purple-300 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
          >
            Random Hadith
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Mapping rule: day {selectedHadith.dayOfMonth} maps to hadith #{selectedHadith.mappedIndex + 1}.
        </p>
      </div>

      <div className="surface-card rounded-2xl p-6">
        <p className={`text-sm font-semibold ${isWeekend ? "text-indigo-700" : "text-amber-700"}`}>
          {formattedDate} {isWeekend ? "(Weekend)" : "(Weekday)"}
        </p>
        <h3 className="mt-2 text-xl font-bold text-gray-900">Today's Hadith</h3>
        <p className="mt-1 text-sm text-gray-500">Topic: {selectedHadith.item.title}</p>

        <blockquote className="mt-4 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          "{selectedHadith.item.text}"
        </blockquote>

        <p className="mt-3 text-xs font-medium text-gray-600">Reference: {selectedHadith.item.source}</p>
      </div>
    </section>
  );
}