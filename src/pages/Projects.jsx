import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Projects() {
  return (

    <main className="min-h-screen px-4 py-12">
      <div className="surface-card fade-in-up mx-auto max-w-2xl rounded-2xl p-6 md:p-8">
      <h1 className="display-font mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Projects</h1>
      <p className="mb-6 text-gray-600">Choose a mini project and open it inside DevNest.</p>

    
      <ul className="space-y-3">
        {projects.map((project) => (
          <li key={project.id}>
           
            <Link
              to={`/projects/${project.id}`}
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-gray-800 transition hover:-translate-y-0.5 hover:border-teal-500 hover:bg-teal-50"
            >
              <span className="font-medium">{project.name}</span>
              <span className="text-sm text-slate-400 transition group-hover:text-teal-700">Open</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/" className="mt-7 inline-block text-sm font-semibold text-teal-700 underline-offset-4 hover:underline">
        Back to Home
      </Link>
      </div>
    </main>
  );
}
