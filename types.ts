
export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export interface ChatMessage {
  id: string;
  user: 'You' | 'Gemini Bot' | string;
  text: string;
  timestamp: string;
}

export interface JobPosting {
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}
