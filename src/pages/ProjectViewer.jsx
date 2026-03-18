import { Link, useParams } from "react-router-dom";
import PrayerTimeFinder from "../projects/PrayerTimeFinder";
import DailyHadith from "../projects/DailyHadith";

export default function ProjectViewer() {

  const { id } = useParams();

  // This is a simple dynamic loader.
  // It chooses which mini project component to render based on id.
  if (id === "prayer-time-finder") {
    return (
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-2xl fade-in-up">
        <Link to="/projects" className="mb-6 inline-block text-sm font-semibold text-teal-700 underline-offset-4 hover:underline">
          Back to Projects
        </Link>
        <PrayerTimeFinder />
        </div>
      </main>
    );
  }

  if (id === "daily-hadith") {
    return (
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-2xl fade-in-up">
        <Link to="/projects" className="mb-6 inline-block text-sm font-semibold text-teal-700 underline-offset-4 hover:underline">
          Back to Projects
        </Link>
        <DailyHadith />
        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen px-4 py-12">
      <div className="surface-card fade-in-up mx-auto max-w-2xl rounded-2xl p-6">
      <h2 className="display-font text-2xl font-semibold text-gray-900">Project Not Found</h2>
      <Link to="/projects" className="mt-4 inline-block font-semibold text-teal-700 underline-offset-4 hover:underline">
        Go to Projects
      </Link>
      </div>
    </main>
  );
}
