
import React, { useState, useEffect } from 'react';
import type { JobPosting } from '../types';
import { INITIAL_JOB_POSTING } from '../constants';

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
    </svg>
);


const HiringPage: React.FC = () => {
  const [job, setJob] = useState<JobPosting | null>(null);

  useEffect(() => {
    const storedJob = localStorage.getItem('jobPosting');
    if (storedJob) {
      setJob(JSON.parse(storedJob));
    } else {
      setJob(INITIAL_JOB_POSTING);
      localStorage.setItem('jobPosting', JSON.stringify(INITIAL_JOB_POSTING));
    }
  }, []);

  if (!job) {
    return <div className="text-center p-8">Loading job opportunity...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-surface rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">{job.title}</h1>
        <p className="text-lg text-text-secondary mb-8">{job.description}</p>
        
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-primary pb-2">Responsibilities</h2>
            <ul className="space-y-2">
                {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-green-400 mr-2 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                </li>
                ))}
            </ul>
        </div>

        <div>
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-primary pb-2">Qualifications</h2>
            <ul className="space-y-2">
                {job.qualifications.map((item, index) => (
                <li key={index} className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-green-400 mr-2 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                </li>
                ))}
            </ul>
        </div>

        <div className="mt-12 text-center">
            <button className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
                Apply Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default HiringPage;
