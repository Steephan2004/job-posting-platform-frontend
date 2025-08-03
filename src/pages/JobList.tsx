import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  location?: string;
  type?: string;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/jobs').then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* 🌟 Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900">
            Discover Meaningful Careers
          </h1>
          <p className="text-slate-500 text-lg">
            Fresh roles. Trusted companies. Your next move starts here.
          </p>
          <Link
            to="/add"
            className="inline-block px-6 py-3 text-white bg-rose-500 hover:bg-rose-600 rounded-lg text-sm font-semibold shadow-md transition"
          >
            + Post a Job
          </Link>
        </section>

        {/* 🔢 Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-indigo-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-rose-600">{jobs.length}</h2>
            <p className="text-slate-600">Active Jobs</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-rose-600">120+</h2>
            <p className="text-slate-600">Hiring Companies</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-rose-600">500+</h2>
            <p className="text-slate-600">Job Seekers</p>
          </div>
        </section>

        {/* 🌍 Why Choose Us */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-indigo-900">Why Choose Our Platform?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div className="bg-indigo-50 rounded-xl p-5 shadow-md">
              <h3 className="text-xl font-semibold text-indigo-900 mb-1">🚀 Instant Visibility</h3>
              <p className="text-slate-600 text-sm">
                Your job post reaches thousands of job seekers instantly.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-5 shadow-md">
              <h3 className="text-xl font-semibold text-indigo-900 mb-1">🔍 Smart Matching</h3>
              <p className="text-slate-600 text-sm">
                We help connect the right candidates to the right jobs using tags and type filters.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-5 shadow-md">
              <h3 className="text-xl font-semibold text-indigo-900 mb-1">🧰 Hassle-Free Posting</h3>
              <p className="text-slate-600 text-sm">
                Post a job in seconds. No account or login required.
              </p>
            </div>
          </div>
        </section>

        {/* 🧠 Featured Jobs */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-900">Featured Jobs</h2>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center text-slate-500 text-lg mt-20">
              🚫 No jobs posted yet. Be the first to{' '}
              <Link to="/add" className="text-rose-600 underline">add one</Link>.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-md hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold text-indigo-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-slate-500 mb-2">{job.company}</p>

                  {/* Location & Type badges */}
                  <div className="flex flex-wrap gap-2 mb-3 text-xs">
                    {job.location && (
                      <span className="bg-white text-indigo-700 px-2 py-1 rounded-full border border-indigo-200">
                        📍 {job.location}
                      </span>
                    )}
                    {job.type && (
                      <span className="bg-white text-rose-600 px-2 py-1 rounded-full border border-rose-200">
                        🧾 {job.type}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="text-rose-600 hover:underline text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
