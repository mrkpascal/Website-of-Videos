
import type { Video, JobPosting } from './types';

export const ADMIN_EMAIL = 'pascalproog@gmail.com';
export const ADMIN_PASSWORD = 'Pascal@3881';

export const INITIAL_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Cosmic Journeys: Through the Nebula',
    description: 'A breathtaking exploration of distant nebulae, showcasing stunning visuals captured by the latest space telescopes.',
    thumbnailUrl: 'https://picsum.photos/seed/nebula/600/400',
  },
  {
    id: '2',
    title: 'Ocean Depths: The Hidden World',
    description: 'Dive deep into the Mariana Trench and discover the unique lifeforms that thrive in extreme conditions.',
    thumbnailUrl: 'https://picsum.photos/seed/ocean/600/400',
  },
  {
    id: '3',
    title: 'Metropolis 2077: A Cyberpunk Story',
    description: 'A short film about a dystopian future where technology and humanity collide in unexpected ways.',
    thumbnailUrl: 'https://picsum.photos/seed/cyberpunk/600/400',
  },
];

export const INITIAL_JOB_POSTING: JobPosting = {
  title: 'Lead Actor/Actress',
  description: 'We are seeking a talented and charismatic lead actor or actress for our upcoming flagship sci-fi series, "Chrono Shift". This is a unique opportunity to be part of a groundbreaking project with a global audience.',
  responsibilities: [
    'Portray the lead character with emotional depth and authenticity.',
    'Collaborate with the director and fellow actors to bring the script to life.',
    'Participate in promotional events and interviews for the series.',
    'Memorize lines, blocking, and choreography as required.',
  ],
  qualifications: [
    'Minimum 5 years of professional acting experience in film or television.',
    'A strong portfolio or showreel demonstrating versatile acting skills.',
    'Excellent physical and emotional stamina.',
    'Ability to take direction and adapt performances.',
    'Passion for the sci-fi genre is a plus.',
  ],
};
