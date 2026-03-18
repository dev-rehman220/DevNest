import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-4xl font-bold p-4 shadow-xl"><span className="text-teal-800">Dev</span><span className="text-black">Nest</span></h1>
      <main className="px-8 py-29 flex items-center justify-center">
        <section className="surface-card fade-in-up w-full max-w-2xl rounded-2xl p-7 text-center md:p-12">
          <p className="mb-4 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            DevNest Workspace
          </p>

          <h1 className="display-font text-4xl font-bold text-gray-900 md:text-6xl">
            My Project Lab
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-600 md:text-base">
            A single React app containing many mini-projects. Learn routing, components, and scalable folder structure in one place.
          </p>

          <Link
            to="/projects"
            className="mt-8 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal-800"
          >
            Go to Projects
          </Link>
        </section>
      </main>
      <footer className="mt-auto">
        <div className="flex justify-center gap-6 py-8 px-4">
          <a href="https://www.linkedin.com/in/ranarehman/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700 transition" aria-label="LinkedIn">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.811 0-9.728h3.554v1.375c.427-.659 1.191-1.594 2.897-1.594 2.117 0 3.704 1.385 3.704 4.362v5.585zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.768-1.71 1.958-1.71 1.191 0 1.915.751 1.932 1.71 0 .951-.741 1.71-1.975 1.71zm1.582 11.597H3.754V9.724h3.165v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
          </a>
          <a href="https://github.com/dev-rehman220" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700 transition" aria-label="GitHub">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://ranarehman.me" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700 transition" aria-label="Website">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><path d="M12 13c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
