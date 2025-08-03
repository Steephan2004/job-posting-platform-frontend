import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function JobForm() {
  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    type: 'Full-Time',
    salary: '',
    postedAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:3000/jobs', form).then(() => navigate('/'));
  };

  return (
    <div className="min-h-screen bg-orange-50 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-indigo-50 border border-indigo-100 rounded-xl p-8 shadow-md">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 text-center">
          Post a New Job
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-slate-600 font-medium">Job Title</label>
            <input
              name="title"
              required
              className="w-full px-4 py-2 border border-indigo-200 rounded-md bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              placeholder="e.g. Frontend Developer"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-600 font-medium">Company</label>
            <input
              name="company"
              required
              className="w-full px-4 py-2 border border-indigo-200 rounded-md bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              placeholder="e.g. Tech Corp Ltd"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-600 font-medium">Location</label>
            <input
              name="location"
              required
              className="w-full px-4 py-2 border border-indigo-200 rounded-md bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              placeholder="e.g. Bengaluru, India"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-600 font-medium">Job Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-indigo-200 rounded-md bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              required
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-slate-600 font-medium">Salary Range</label>
            <input
              name="salary"
              required
              className="w-full px-4 py-2 border border-indigo-200 rounded-md bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              placeholder="e.g. ₹8,00,000 - ₹12,00,000 / year"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-600 font-medium">Job Description</label>
            <textarea
              name="description"
              required
              rows={5}
              className="w-full px-4 py-2 border border-indigo-200 rounded-md bg-white resize-none focus:ring-2 focus:ring-rose-500 focus:outline-none"
              placeholder="Write a short job description..."
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 rounded-md shadow transition"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
