import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  location?: string;
  type?: string;
  postedAt?: string;
  salary?: string;
}

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  if (!job) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center text-slate-500 text-lg">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 rounded-xl p-8 shadow-md">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-3">{job.title}</h1>
          <p className="text-slate-600 text-lg mb-1 font-medium">{job.company}</p>
          <div className="text-sm text-slate-500 mb-6">
            {job.location || 'Remote'} • {job.type || 'Full-Time'} • Posted on{' '}
            {job.postedAt || 'August 3, 2025'}
          </div>

          <div className="text-slate-700 leading-relaxed whitespace-pre-line text-[15px]">
            {job.description}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <Link
              to="/"
              className="text-rose-600 hover:text-rose-700 font-semibold text-sm"
            >
              ← Back to Jobs
            </Link>
            <a
              href="#apply"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-2 rounded-md shadow transition"
            >
              Apply Now
            </a>
          </div>
        </div>

        {/* Sidebar / Extra Details */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-md space-y-5">
          <h2 className="text-xl font-bold text-indigo-900 mb-3">Job Highlights</h2>
          <ul className="text-slate-700 space-y-2 text-sm">
            <li>📍 <strong>Location:</strong> {job.location || 'Remote'}</li>
            <li>💼 <strong>Type:</strong> {job.type || 'Full-Time'}</li>
            <li>💰 <strong>Salary:</strong> {job.salary || 'Not disclosed'}</li>
            <li>📅 <strong>Posted:</strong> {job.postedAt || 'Today'}</li>
          </ul>

          <div className="mt-6">
            <h3 className="text-md font-semibold text-indigo-900 mb-2">Perks & Benefits</h3>
            <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
              <li>Flexible work hours</li>
              <li>Remote-friendly culture</li>
              <li>Health insurance</li>
              <li>Learning budget</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Apply Section */}
      <div id="apply" className="mt-20 max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Apply for this job</h2>
        <p className="text-slate-600 mb-4">Send your updated resume and brief introduction to:</p>
        <p className="font-mono text-rose-600 text-lg mb-4">hr@{job.company.toLowerCase().replace(/\s+/g, '')}.com</p>
        <a
          href={`mailto:hr@${job.company.toLowerCase().replace(/\s+/g, '')}.com`}
          className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-md font-semibold transition shadow"
        >
          📤 Send Application
        </a>
      </div>
    </div>
  );
}
