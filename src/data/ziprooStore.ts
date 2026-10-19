import { useState, useEffect } from 'react';

export interface CompanySettings {
  companyName: string;
  slogan: string;
  tagline: string;
  introQuote: string;
  introDescription: string;
  logoUrl: string;
  heroBackgroundUrl: string;
  visionText: string;
  missionText: string;
  companyDescription: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
}

export interface BranchData {
  id: string;
  name: string;
  tagline: string;
  category?: string;
  description: string;
  fullDescription?: string;
  offerings: string[];
  image: string;
  badge: string;
  websiteUrl?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  sector: string;
  description: string;
  metrics: string;
  year: string;
  image: string;
  status?: 'Live & Operational' | 'In Production' | 'R&D Phase' | 'Enterprise Pilot';
  launchDate?: string;
  demoUrl?: string;
  published?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  role: string;
  image: string;
  bio: string;
  department: string;
  email?: string;
  published: boolean;
  order: number;
}

export interface CompanyUpdate {
  id: string;
  title: string;
  date: string;
  category: 'Branch Launch' | 'New Project' | 'Company Announcement' | 'Business Update' | 'Future Milestone' | 'Innovation' | 'Fashion';
  description: string;
  content: string;
  image: string;
  readTime: string;
  published?: boolean;
}

export interface SocialMediaLinks {
  instagram: string;
  youtube: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export interface SocialMediaItem {
  id: string;
  platform: 'YouTube' | 'Instagram' | 'LinkedIn' | 'X (Twitter)' | 'WhatsApp' | 'Other';
  handle: string;
  url: string;
  published: boolean;
}

export interface ViewerFeedback {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: 'Website' | 'Branches' | 'Projects' | 'Suggestions' | 'Other';
  rating: number; // 1-5
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'resolved';
  adminNotes?: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'archived';
}

export interface AdminAccount {
  username: string;
  email: string;
  name: string;
  role: string;
  password: string;
  createdAt: string;
  isPrimary?: boolean;
}

export interface ViewerUser {
  id: string;
  name: string;
  email: string;
  provider: 'google' | 'email';
  avatar?: string;
  emailVerified: boolean;
}

const DEFAULT_SETTINGS: CompanySettings = {
  companyName: 'ZIPROO',
  slogan: 'CREATE YOUR IDENTITY',
  tagline: 'Wear. Innovate. Belong.',
  introQuote: 'A next-generation brand built on innovation, creativity, and endless possibilities across fashion, technology, and future industries.',
  introDescription: 'Bridging boundary-pushing contemporary luxury apparel with transformative cloud, artificial intelligence, and enterprise digital infrastructure worldwide.',
  logoUrl: '', // empty means use original vector mark
  heroBackgroundUrl: '/src/assets/images/white_green_corporate_atrium_1792338681741.jpg',
  visionText: 'To build an internationally recognized multi-sector company that creates meaningful businesses, drives innovation and empowers the next generation of entrepreneurs.',
  missionText: 'To build and grow innovative businesses across multiple industries through creativity, quality, technology and collaboration while creating opportunities for people and communities.',
  companyDescription: 'ZIPROO is an ambitious multi-sector company built on creativity, innovation and entrepreneurial thinking. Our vision is to establish and grow businesses across different industries, develop meaningful projects and create opportunities for future generations. We believe in building our own identity, exploring new possibilities and creating a lasting global impact.',
  companyEmail: 'ziproo2026@gmail.com',
  companyPhone: '+1 (800) 947-7660',
  companyAddress: 'ZIPROO Global Campus, Horizon Boulevard, Innovation District',
};

const DEFAULT_ADMINS: AdminAccount[] = [
  {
    username: 'admin',
    email: 'ziproo2026@gmail.com',
    name: 'Chief Executive Officer',
    role: 'Super Administrator',
    password: 'ziproo2026',
    createdAt: '2026-01-01',
    isPrimary: true,
  },
];

const DEFAULT_BRANCHES: BranchData[] = [
  {
    id: 'clothing',
    name: 'ZIPROO CLOTHING',
    tagline: 'Fashion Beyond Limits',
    category: 'Haute Fashion & Streetwear',
    description: 'Fashion beyond limits. Premium clothing designed to help every individual express their identity.',
    fullDescription: 'ZIPROO Clothing redefines contemporary identity through structured silhouettes, heavyweight organic textiles, and sustainable on-demand garment fabrication. Sourced from high-density Japanese weaves and finished with discreet identity accents.',
    offerings: [
      'Premium Apparel',
      'Streetwear',
      'Oversized T-Shirts',
      'Hoodies',
      'Casual Wear',
      'Future Fashion Collections',
    ],
    image: '/src/assets/images/luxury_fashion_flagship_1792336067401.jpg',
    badge: 'Luxury Textile & Haute Streetwear',
    websiteUrl: 'https://ziproo.com/clothing',
    published: true,
    createdAt: '2026-01-15',
    updatedAt: '2026-10-18',
  },
  {
    id: 'it-solutions',
    name: 'ZIPROO IT SOLUTIONS',
    tagline: 'Innovating With Technology',
    category: 'Enterprise Software & Artificial Intelligence',
    description: 'Innovating with technology. Building smart digital solutions for individuals and businesses.',
    fullDescription: 'Engineering next-generation digital architectures, mission-critical cloud pipelines, neural computing models, and high-performance bespoke enterprise applications with sub-second execution.',
    offerings: [
      'Website Development',
      'Application Development',
      'Artificial Intelligence',
      'Software Development',
      'Digital Solutions',
    ],
    image: '/src/assets/images/futuristic_it_technology_1792336067869.jpg',
    badge: 'Enterprise Intelligence & Cloud Tech',
    websiteUrl: 'https://ziproo.com/it-solutions',
    published: true,
    createdAt: '2026-01-20',
    updatedAt: '2026-10-18',
  },
];

const DEFAULT_PROJECTS: ProjectData[] = [
  {
    id: 'proj-1',
    title: 'Aura-Mesh Generative Apparel Atelier',
    sector: 'ZIPROO Clothing',
    description: 'On-demand zero-waste custom garment tailoring powered by generative fit algorithms and sustainable Japanese weave.',
    metrics: '100% Recycled Cotton',
    year: '2026',
    image: '/src/assets/images/luxury_fashion_flagship_1792336067401.jpg',
    status: 'Live & Operational',
    launchDate: 'October 2026',
    demoUrl: 'https://ziproo.com/projects/aura-mesh',
    published: true,
  },
  {
    id: 'proj-2',
    title: 'Synapse Core Enterprise AI Pipeline',
    sector: 'ZIPROO IT Solutions',
    description: 'Sub-millisecond machine intelligence orchestration suite deployed for real-time logistics and predictive supply chains.',
    metrics: '<12ms Latency',
    year: '2026',
    image: '/src/assets/images/futuristic_it_technology_1792336067869.jpg',
    status: 'Enterprise Pilot',
    launchDate: 'September 2026',
    demoUrl: 'https://ziproo.com/projects/synapse-core',
    published: true,
  },
  {
    id: 'proj-3',
    title: 'Unified Corporate Identity Protocol',
    sector: 'Multi-Sector Infrastructure',
    description: 'Cross-platform digital passport uniting e-commerce authentication with member loyalty ecosystems.',
    metrics: 'Global Deployment',
    year: '2026',
    image: '/src/assets/images/ziproo_tech_innovation_1792336085977.jpg',
    status: 'Live & Operational',
    launchDate: 'August 2026',
    demoUrl: 'https://ziproo.com/projects/identity-protocol',
    published: true,
  },
];

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'founder',
    name: 'Rohith Sharma',
    position: 'Founder & Strategic Leadership',
    role: 'Founder & Executive Chairman',
    image: '/src/assets/images/executive_founder_portrait_1792336068434.jpg',
    bio: 'Leading the vision, strategy, and long-term multi-sector growth of ZIPROO globally.',
    department: 'Executive Governance',
    email: 'ziproo2026@gmail.com',
    published: true,
    order: 1,
  },
  {
    id: 'cofounder-1',
    name: 'Elena Rostova',
    position: 'Co-Founder & Innovation',
    role: 'Co-Founder & Chief Product Officer',
    image: '/src/assets/images/executive_cofounder_portrait_1792336084248.jpg',
    bio: 'Developing innovative ideas, driving high-fashion aesthetics, and building new technological opportunities.',
    department: 'Design & Creative Strategy',
    email: 'innovation@ziproo.com',
    published: true,
    order: 2,
  },
  {
    id: 'cofounder-2',
    name: 'Marcus Vance',
    position: 'Co-Founder & Enterprise Solutions',
    role: 'Co-Founder & Chief Technology Officer',
    image: '/src/assets/images/executive_manager_portrait_1792336085264.jpg',
    bio: 'Directing IT solutions, artificial intelligence research, and scalable cloud software execution.',
    department: 'Technology & Global Operations',
    email: 'tech@ziproo.com',
    published: true,
    order: 3,
  },
];

const DEFAULT_UPDATES: CompanyUpdate[] = [
  {
    id: 'up-1',
    title: 'ZIPROO Unveils Fall 2026 Architectural Streetwear Line',
    date: 'October 16, 2026',
    category: 'Branch Launch',
    description: 'Featuring structured oversized cuts, heavyweight Japanese terry cotton, and discreet biometric identity tags.',
    content: 'ZIPROO Clothing today previewed its flagship autumn collection, redefining luxury streetwear through sculptural tailoring and sustainable organic fiber sourcing. Each silhouette encapsulates the brand slogan "Create Your Identity" by delivering adaptable, versatile statements designed for modern pioneers.',
    image: '/src/assets/images/luxury_fashion_flagship_1792336067401.jpg',
    readTime: '3 min read',
    published: true,
  },
  {
    id: 'up-2',
    title: 'ZIPROO IT Launches Enterprise AI Automation Architecture',
    date: 'October 10, 2026',
    category: 'New Project',
    description: 'Proprietary enterprise cloud integration engine delivering sub-second inference and real-time workflow orchestration.',
    content: 'Our IT Solutions division has deployed its premier neural computing framework for multi-sector enterprises. By uniting scalable microservices with secure local model orchestration, ZIPROO empowers organizations to modernize legacy infrastructure without compromising security or sovereignty.',
    image: '/src/assets/images/ziproo_tech_innovation_1792336085977.jpg',
    readTime: '4 min read',
    published: true,
  },
  {
    id: 'up-3',
    title: 'Global Expansion: Tokyo & London Innovation Hubs Inaugurated',
    date: 'September 30, 2026',
    category: 'Company Announcement',
    description: 'New international facilities connecting textile research ateliers with European digital systems engineering.',
    content: 'Bringing together multi-disciplinary creators under one roof, our newly unveiled headquarters features state-of-the-art fabric stress analysis labs, high-throughput server testing bays, and creative exhibition salons open to international partners.',
    image: '/src/assets/images/modern_corporate_headquarters_1792336069158.jpg',
    readTime: '5 min read',
    published: true,
  },
];

const DEFAULT_SOCIAL: SocialMediaItem[] = [
  {
    id: 'soc-yt',
    platform: 'YouTube',
    handle: '@ziprooofficial',
    url: 'https://youtube.com/@ziprooofficial',
    published: true,
  },
  {
    id: 'soc-ig',
    platform: 'Instagram',
    handle: '@_ziproo',
    url: 'https://instagram.com/_ziproo',
    published: true,
  },
  {
    id: 'soc-li',
    platform: 'LinkedIn',
    handle: 'ZIPROO Global',
    url: 'https://linkedin.com/company/ziproo',
    published: true,
  },
  {
    id: 'soc-x',
    platform: 'X (Twitter)',
    handle: '@ziproo_brand',
    url: 'https://x.com/ziproo_brand',
    published: true,
  },
];

const DEFAULT_FEEDBACK: ViewerFeedback[] = [
  {
    id: 'fb-1',
    userId: 'user-sample',
    userName: 'Alexander Wright',
    userEmail: 'alex.wright@venturepartners.com',
    category: 'Projects',
    rating: 5,
    message: 'The dual integration between architectural fashion and scalable AI infrastructure is exceptionally visionary. Would like to explore B2B partnership options.',
    createdAt: '2026-10-17 14:32',
    status: 'reviewed',
    adminNotes: 'Forwarded to Executive Leadership for prospective partnership discussion.',
  },
];

export const useZiprooStore = () => {
  // Settings
  const [settings, setSettings] = useState<CompanySettings>(() => {
    try {
      const saved = localStorage.getItem('ziproo_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Admins
  const [admins, setAdmins] = useState<AdminAccount[]>(() => {
    try {
      const saved = localStorage.getItem('ziproo_admins');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_ADMINS;
    } catch {
      return DEFAULT_ADMINS;
    }
  });

  // Active Admin
  const [currentAdmin, setCurrentAdmin] = useState<AdminAccount | null>(() => {
    try {
      const saved = localStorage.getItem('ziproo_current_admin');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Viewer User
  const [user, setUser] = useState<ViewerUser | null>(() => {
    try {
      const saved = localStorage.getItem('ziproo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Branches
  const [branches, setBranches] = useState<BranchData[]>(() => {
    try {
      const saved = localStorage.getItem('ziproo_branches');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_BRANCHES;
    } catch {
      return DEFAULT_BRANCHES;
    }
  });

  // Projects
  const [projects, setProjects] = useState<ProjectData[]>(() => {
    try {
      const saved = localStorage.getItem('ziproo_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  // Team
  const [team, setTeam] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('ziproo_team');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_TEAM;
    } catch {
      return DEFAULT_TEAM;
    }
  });

  // Updates
  const [updates, setUpdates] = useState<CompanyUpdate[]>(() => {
    try {
      const saved = localStorage.getItem('ziproo_updates');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_UPDATES;
    } catch {
      return DEFAULT_UPDATES;
    }
  });

  // Social (Ensuring Array.isArray and gracefully migrating any legacy dictionary format)
  const [socialLinks, setSocialLinks] = useState<SocialMediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('ziproo_social');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
        // If legacy dictionary format { instagram: string, youtube: string, ... }
        if (parsed && typeof parsed === 'object') {
          return [
            {
              id: 'soc-yt',
              platform: 'YouTube',
              handle: '@ziprooofficial',
              url: parsed.youtube || 'https://youtube.com/@ziprooofficial',
              published: true,
            },
            {
              id: 'soc-ig',
              platform: 'Instagram',
              handle: '@_ziproo',
              url: parsed.instagram || 'https://instagram.com/_ziproo',
              published: true,
            },
            {
              id: 'soc-li',
              platform: 'LinkedIn',
              handle: 'ZIPROO Global',
              url: parsed.linkedin || 'https://linkedin.com/company/ziproo',
              published: true,
            },
            {
              id: 'soc-x',
              platform: 'X (Twitter)',
              handle: '@ziproo_brand',
              url: parsed.twitter || 'https://x.com/ziproo_brand',
              published: true,
            },
          ];
        }
      }
      return DEFAULT_SOCIAL;
    } catch {
      return DEFAULT_SOCIAL;
    }
  });

  // Feedback
  const [feedbackList, setFeedbackList] = useState<ViewerFeedback[]>(() => {
    try {
      const saved = localStorage.getItem('ziproo_feedback');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return DEFAULT_FEEDBACK;
    } catch {
      return DEFAULT_FEEDBACK;
    }
  });

  // Contact Enquiries
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem('ziproo_enquiries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('ziproo_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('ziproo_admins', JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem('ziproo_current_admin', JSON.stringify(currentAdmin));
  }, [currentAdmin]);

  useEffect(() => {
    localStorage.setItem('ziproo_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ziproo_branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem('ziproo_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ziproo_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('ziproo_updates', JSON.stringify(updates));
  }, [updates]);

  useEffect(() => {
    localStorage.setItem('ziproo_social', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('ziproo_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    localStorage.setItem('ziproo_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  // Settings
  const updateSettings = (partial: Partial<CompanySettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  // Admin Auth
  const verifyAdminLogin = (usernameOrEmail: string, pass: string): boolean => {
    const found = admins.find(
      (a) =>
        (a.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
          a.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
        a.password === pass
    );
    if (found) {
      setCurrentAdmin(found);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('ziproo_current_admin');
  };

  const createNewAdmin = (newAdmin: Omit<AdminAccount, 'createdAt'>): boolean => {
    if (admins.some((a) => a.username.toLowerCase() === newAdmin.username.toLowerCase())) {
      return false;
    }
    const fullAccount: AdminAccount = {
      ...newAdmin,
      createdAt: new Date().toISOString().split('T')[0],
      isPrimary: false,
    };
    setAdmins((prev) => [...prev, fullAccount]);
    return true;
  };

  const revokeAdmin = (username: string): boolean => {
    if (username.toLowerCase() === 'admin') return false; // Prevent removing root admin
    setAdmins((prev) => prev.filter((a) => a.username.toLowerCase() !== username.toLowerCase()));
    if (currentAdmin?.username.toLowerCase() === username.toLowerCase()) {
      logoutAdmin();
    }
    return true;
  };

  // Viewer Auth
  const loginWithGoogle = (name: string, email: string) => {
    const u: ViewerUser = {
      id: `usr-${Date.now()}`,
      name: name || 'Google Member',
      email: email || 'user@gmail.com',
      provider: 'google',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      emailVerified: true,
    };
    setUser(u);
  };

  const loginWithEmail = (name: string, email: string) => {
    const u: ViewerUser = {
      id: `usr-${Date.now()}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      provider: 'email',
      emailVerified: true,
    };
    setUser(u);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('ziproo_user');
  };

  // Branch CRUD
  const addBranch = (b: Omit<BranchData, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newB: BranchData = {
      ...b,
      id: `branch-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setBranches((prev) => [...prev, newB]);
  };

  const updateBranch = (id: string, updated: Partial<BranchData>) => {
    const now = new Date().toISOString().split('T')[0];
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated, updatedAt: now } : b))
    );
  };

  const deleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBranchPublish = (id: string) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, published: !b.published } : b))
    );
  };

  // Project CRUD
  const addProject = (p: Omit<ProjectData, 'id'>) => {
    const newP: ProjectData = {
      ...p,
      id: `proj-${Date.now()}`,
    };
    setProjects((prev) => [newP, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<ProjectData>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProjectPublish = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  // Leadership CRUD
  const updateTeamMember = (id: string, updated: Partial<TeamMember>) => {
    setTeam((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const addTeamMember = (m: Omit<TeamMember, 'id'>) => {
    const newM: TeamMember = {
      ...m,
      id: `member-${Date.now()}`,
    };
    setTeam((prev) => [...prev, newM]);
  };

  const deleteTeamMember = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  // Updates CRUD
  const addUpdate = (u: Omit<CompanyUpdate, 'id'>) => {
    const newU: CompanyUpdate = {
      ...u,
      id: `up-${Date.now()}`,
    };
    setUpdates((prev) => [newU, ...prev]);
  };

  const updateCompanyUpdate = (id: string, updated: Partial<CompanyUpdate>) => {
    setUpdates((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
    );
  };

  const deleteUpdate = (id: string) => {
    setUpdates((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleUpdatePublish = (id: string) => {
    setUpdates((prev) =>
      prev.map((u) => (u.id === id ? { ...u, published: !u.published } : u))
    );
  };

  // Social CRUD
  const addSocialLink = (s: Omit<SocialMediaItem, 'id'>) => {
    const item: SocialMediaItem = {
      ...s,
      id: `soc-${Date.now()}`,
    };
    setSocialLinks((prev) => [...prev, item]);
  };

  const updateSocialLink = (id: string, updated: Partial<SocialMediaItem>) => {
    setSocialLinks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const deleteSocialLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((s) => s.id !== id));
  };

  // Viewer Feedback
  const submitFeedback = (fb: Omit<ViewerFeedback, 'id' | 'createdAt' | 'status' | 'adminNotes'>) => {
    const newFeedback: ViewerFeedback = {
      ...fb,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'new',
    };
    setFeedbackList((prev) => [newFeedback, ...prev]);
  };

  const updateFeedbackStatus = (id: string, status: ViewerFeedback['status'], adminNotes?: string) => {
    setFeedbackList((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, status, ...(adminNotes !== undefined ? { adminNotes } : {}) }
          : f
      )
    );
  };

  const deleteFeedback = (id: string) => {
    setFeedbackList((prev) => prev.filter((f) => f.id !== id));
  };

  // Contact Enquiries
  const submitEnquiry = (enquiry: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnq: ContactEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'new',
    };
    setEnquiries((prev) => [newEnq, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: ContactEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  // Reset to initial factory defaults
  const resetToFactoryDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setAdmins(DEFAULT_ADMINS);
    setBranches(DEFAULT_BRANCHES);
    setProjects(DEFAULT_PROJECTS);
    setTeam(DEFAULT_TEAM);
    setUpdates(DEFAULT_UPDATES);
    setSocialLinks(DEFAULT_SOCIAL);
    setFeedbackList(DEFAULT_FEEDBACK);
    setEnquiries([]);
    localStorage.clear();
  };

  const socialList = Array.isArray(socialLinks) ? socialLinks : DEFAULT_SOCIAL;

  const socialLinksObject: SocialMediaLinks = {
    instagram: socialList.find((s) => s.platform === 'Instagram')?.url || 'https://instagram.com/_ziproo',
    youtube: socialList.find((s) => s.platform === 'YouTube')?.url || 'https://youtube.com/@ziprooofficial',
    linkedin: socialList.find((s) => s.platform === 'LinkedIn')?.url || 'https://linkedin.com/company/ziproo',
    twitter: socialList.find((s) => s.platform === 'X (Twitter)')?.url || 'https://x.com/ziproo_brand',
    email: settings.companyEmail || 'ziproo2026@gmail.com',
  };

  const updateSocialLinks = (updated: Partial<SocialMediaLinks>) => {
    if (updated.instagram) {
      const item = socialList.find((s) => s.platform === 'Instagram');
      if (item) updateSocialLink(item.id, { url: updated.instagram });
    }
    if (updated.youtube) {
      const item = socialList.find((s) => s.platform === 'YouTube');
      if (item) updateSocialLink(item.id, { url: updated.youtube });
    }
    if (updated.linkedin) {
      const item = socialList.find((s) => s.platform === 'LinkedIn');
      if (item) updateSocialLink(item.id, { url: updated.linkedin });
    }
    if (updated.twitter) {
      const item = socialList.find((s) => s.platform === 'X (Twitter)');
      if (item) updateSocialLink(item.id, { url: updated.twitter });
    }
    if (updated.email) {
      updateSettings({ companyEmail: updated.email });
    }
  };

  return {
    settings,
    updateSettings,
    admins,
    currentAdmin,
    isAdmin: !!currentAdmin,
    verifyAdminLogin,
    logoutAdmin,
    createNewAdmin,
    revokeAdmin,
    user,
    loginWithGoogle,
    loginWithEmail,
    logoutUser,
    branches,
    addBranch,
    updateBranch,
    deleteBranch,
    toggleBranchPublish,
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectPublish,
    team,
    updateTeamMember,
    addTeamMember,
    deleteTeamMember,
    updates,
    addUpdate,
    updateCompanyUpdate,
    deleteUpdate,
    toggleUpdatePublish,
    socialLinks,
    socialLinksObject,
    updateSocialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    feedbackList,
    submitFeedback,
    updateFeedbackStatus,
    deleteFeedback,
    enquiries,
    submitEnquiry,
    updateEnquiryStatus,
    deleteEnquiry,
    resetToFactoryDefaults,
  };
};
