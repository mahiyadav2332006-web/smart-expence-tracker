import { Lead, Client, Task, TeamMember } from './types';

export const teamMembers: TeamMember[] = [
  {
    name: "Sarah Jenkins",
    role: "Agency Owner",
    avatar: "SJ",
    email: "sarah@apexcraft.studio"
  },
  {
    name: "David Chen",
    role: "Lead UI/UX Designer",
    avatar: "DC",
    email: "david@apexcraft.studio"
  },
  {
    name: "Alex Rivera",
    role: "Lead Full-Stack Developer",
    avatar: "AR",
    email: "alex@apexcraft.studio"
  },
  {
    name: "Elena Rostova",
    role: "Client Success Manager",
    avatar: "ER",
    email: "elena@apexcraft.studio"
  },
  {
    name: "Ryan Patel",
    role: "Growth & SEO Specialist",
    avatar: "RP",
    email: "ryan@apexcraft.studio"
  }
];

export const initialLeads: Lead[] = [
  {
    id: "l1",
    name: "FinTech Landing Page & Brand Refresh",
    company: "Stellar Labs",
    contactName: "Marcus Vance",
    contactEmail: "marcus@stellar-labs.io",
    contactPhone: "+1 (555) 234-5678",
    stage: "proposal",
    value: 12500,
    source: "LinkedIn",
    confidence: 80,
    owner: "Sarah Jenkins",
    notes: "Very interested in moving from outdated Wordpress to React + Tailwind. Timeline is fast (wants to launch by end of next month). Needs complex visual animations for landing pages.",
    createdAt: "2026-06-15",
    lastContacted: "2026-06-28",
    activities: [
      {
        id: "la1_1",
        type: "meeting",
        title: "Initial Discovery Call",
        description: "Discussed agency capabilities, past work in fintech, and custom design expectations. Marcus was highly receptive.",
        date: "2026-06-16",
        createdBy: "Sarah Jenkins"
      },
      {
        id: "la1_2",
        type: "email",
        title: "Follow-up Portfolio Links",
        description: "Sent over past landing page redesigns for WealthTech clients. Marcus loved the micro-interactions.",
        date: "2026-06-17",
        createdBy: "Sarah Jenkins"
      },
      {
        id: "la1_3",
        type: "proposal",
        title: "Proposal Submitted",
        description: "Submitted a 15-page comprehensive proposal detailing design styles, tech stack (React/Vite), and estimated timeline.",
        date: "2026-06-25",
        createdBy: "Sarah Jenkins"
      },
      {
        id: "la1_4",
        type: "call",
        title: "Review Proposal Questions",
        description: "Clarified retainer option details and milestone payout terms. Pricing is accepted; they are doing legal review now.",
        date: "2026-06-28",
        createdBy: "Sarah Jenkins"
      }
    ]
  },
  {
    id: "l2",
    name: "Mobile App Design System Support",
    company: "Helix Health",
    contactName: "Dr. Amanda Ross",
    contactEmail: "amanda@helixhealth.co",
    contactPhone: "+1 (555) 345-6789",
    stage: "contacted",
    value: 24000,
    source: "Referral",
    confidence: 60,
    owner: "David Chen",
    notes: "Requires a unified design token system in Figma to coordinate three separate software portals. David will be the lead designer.",
    createdAt: "2026-06-20",
    lastContacted: "2026-06-26",
    activities: [
      {
        id: "la2_1",
        type: "system",
        title: "Lead Created",
        description: "Inbound referral from client Zenith Systems. Assigned to David Chen.",
        date: "2026-06-20",
        createdBy: "Sarah Jenkins"
      },
      {
        id: "la2_2",
        type: "meeting",
        title: "Figma File Audit",
        description: "Audited their current files. Found high inconsistency, lack of auto-layout, and manual spacing values. Showed how a robust token structure saves 40% engineering time.",
        date: "2026-06-24",
        createdBy: "David Chen"
      },
      {
        id: "la2_3",
        type: "email",
        title: "Draft Estimate Sent",
        description: "Sent custom estimation sheet of hours required to audit, design tokens, build components (50+ widgets), and write documentation.",
        date: "2026-06-26",
        createdBy: "David Chen"
      }
    ]
  },
  {
    id: "l3",
    name: "Direct-to-Consumer E-Commerce Store",
    company: "Bloom & Co",
    contactName: "Chloe Dupont",
    contactEmail: "chloe@bloomcosmetics.com",
    contactPhone: "+33 6 1234 5678",
    stage: "new",
    value: 15000,
    source: "Inbound",
    confidence: 30,
    owner: "Ryan Patel",
    notes: "Organic cosmetics brand looking to migrate from Shopify standard template to headless Shopify + Next.js for better Lighthouse performance scores. Expects extreme speed.",
    createdAt: "2026-06-27",
    lastContacted: "2026-06-27",
    activities: [
      {
        id: "la3_1",
        type: "system",
        title: "Lead Created",
        description: "Contact form submission received via agency website. High intent indicated.",
        date: "2026-06-27",
        createdBy: "System"
      }
    ]
  },
  {
    id: "l4",
    name: "B2B SaaS Branding & Website Overhaul",
    company: "Quantize AI",
    contactName: "Vikram Mehta",
    contactEmail: "vikram@quantize.ai",
    contactPhone: "+1 (555) 890-1234",
    stage: "proposal",
    value: 38000,
    source: "LinkedIn",
    confidence: 75,
    owner: "Sarah Jenkins",
    notes: "Quantize AI raised $4M Series A. They need a premium website that signals institutional stability but highlights cutting-edge LLM security. Includes interactive dashboards screenshots, standard marketing copy, custom iconography.",
    createdAt: "2026-06-10",
    lastContacted: "2026-06-29",
    activities: [
      {
        id: "la4_1",
        type: "meeting",
        title: "Branding Workshop",
        description: "Conducted virtual brand mapping session. Explored color palettes (warm sand, dark slate) and core values.",
        date: "2026-06-12",
        createdBy: "Sarah Jenkins"
      },
      {
        id: "la4_2",
        type: "proposal",
        title: "SOW Sent",
        description: "Sent detailed SOW outlining logo design, brand manual, style guide, copywriting, custom graphics, and 8 unique responsive page layouts.",
        date: "2026-06-18",
        createdBy: "Sarah Jenkins"
      },
      {
        id: "la4_3",
        type: "call",
        title: "Contract Negotiation Call",
        description: "Discussed adding 3 months of post-launch maintenance. Price increased by $3,000 to cover support retainer.",
        date: "2026-06-29",
        createdBy: "Sarah Jenkins"
      }
    ]
  },
  {
    id: "l5",
    name: "Comprehensive SEO Campaign",
    company: "Ascent Ventures",
    contactName: "Greg Harrison",
    contactEmail: "greg@ascentventures.com",
    contactPhone: "+1 (555) 789-0123",
    stage: "contacted",
    value: 4500,
    source: "Inbound",
    confidence: 50,
    owner: "Ryan Patel",
    notes: "Venture firm wanting to boost search visibility for their portfolio companies. Wants monthly SEO reports, custom-designed resource hub, and keyword research.",
    createdAt: "2026-06-22",
    lastContacted: "2026-06-24",
    activities: [
      {
        id: "la5_1",
        type: "email",
        title: "First Email Exchange",
        description: "Responded to inquiry with agency deck. Set up initial meeting for next week.",
        date: "2026-06-23",
        createdBy: "Ryan Patel"
      },
      {
        id: "la5_2",
        type: "call",
        title: "Intro Call with Greg",
        description: "Greg explained their growth goals. They want to rank for 'early-stage SaaS funding' and 'growth equity strategies'.",
        date: "2026-06-24",
        createdBy: "Ryan Patel"
      }
    ]
  },
  {
    id: "l6",
    name: "DeFi Dashboard UI Overhaul",
    company: "NovaPay",
    contactName: "Satoshi Tanaka",
    contactEmail: "satoshi@novapay.network",
    contactPhone: "+81 90 1234 5678",
    stage: "new",
    value: 29000,
    source: "Inbound",
    confidence: 10,
    owner: "Elena Rostova",
    notes: "Requires futuristic, hyper-modern web dashboard displaying real-time node stats, liquidity pools, and complex charts. Elena to run initial triage.",
    createdAt: "2026-06-29",
    lastContacted: "2026-06-29",
    activities: [
      {
        id: "la6_1",
        type: "system",
        title: "Lead auto-assigned",
        description: "Assigned to Elena due to her experience managing Web3 and crypto client portfolios.",
        date: "2026-06-29",
        createdBy: "System"
      }
    ]
  },
  {
    id: "l7",
    name: "Enterprise ERP Portal Styling",
    company: "Loomis Tech",
    contactName: "Arthur Vance",
    contactEmail: "arthur@loomis.tech",
    contactPhone: "+1 (555) 901-2345",
    stage: "lost",
    value: 45000,
    source: "Cold Outreach",
    confidence: 0,
    owner: "Alex Rivera",
    notes: "Lead lost. They decided to stay with their internal bootstrap styling team due to budget cuts in their IT department.",
    createdAt: "2026-05-10",
    lastContacted: "2026-06-12",
    activities: [
      {
        id: "la7_1",
        type: "note",
        title: "Decline Notice",
        description: "Arthur emailed indicating that their internal engineering division voted down external styling help to save budget.",
        date: "2026-06-12",
        createdBy: "Alex Rivera"
      }
    ]
  }
];

export const initialClients: Client[] = [
  {
    id: "c1",
    name: "Acme Corp Core SaaS Application",
    company: "Acme Corp",
    contactName: "Jane Miller",
    contactEmail: "jane.m@acme.com",
    contactPhone: "+1 (555) 987-6543",
    status: "active",
    mrr: 8500,
    projectType: "Full-Stack Web App Development",
    healthScore: "high",
    owner: "Alex Rivera",
    startDate: "2026-01-10",
    notes: "Core SaaS dashboard buildout. 6-month developer retainer. Everything is running smoothly. Major feature rollout (Multi-tenant permissions) is launching next Monday.",
    activities: [
      {
        id: "ca1_1",
        type: "meeting",
        title: "Sprint Demo Meeting",
        description: "Presented completed drag-and-drop dashboard widgets. Jane was delighted. Minor style edits requested for mobile view.",
        date: "2026-06-27",
        createdBy: "Alex Rivera"
      },
      {
        id: "ca1_2",
        type: "email",
        title: "Dev Release Log",
        description: "Sent release logs for version 2.4.0 containing new chart options and security patches.",
        date: "2026-06-25",
        createdBy: "Alex Rivera"
      },
      {
        id: "ca1_3",
        type: "note",
        title: "Client Feedback Call",
        description: "Jane noted that user satisfaction scores bumped by 18% since the last UX refresh we released.",
        date: "2026-06-20",
        createdBy: "Elena Rostova"
      }
    ]
  },
  {
    id: "c2",
    name: "Vapor Wearable Design retainer",
    company: "Vapor Technologies",
    contactName: "Siddharth Roy",
    contactEmail: "sid@vapor.tech",
    contactPhone: "+1 (555) 876-5432",
    status: "onboarding",
    mrr: 6000,
    projectType: "UI/UX & Product Design System",
    healthScore: "high",
    owner: "David Chen",
    startDate: "2026-06-15",
    notes: "Recently signed! Designing iOS and Android companion app for their smart ring project. Establishing core component framework.",
    activities: [
      {
        id: "ca2_1",
        type: "meeting",
        title: "Onboarding Kickoff Session",
        description: "Met the core engineering team. Set up Slack channel syncs, Figma shared libraries, and agreed on a twice-weekly feedback cycle.",
        date: "2026-06-18",
        createdBy: "David Chen"
      },
      {
        id: "ca2_2",
        type: "note",
        title: "Moodboard Approvals",
        description: "Siddharth approved the 'Sleek Obsidian' design theme. Dark gradients, neon blue indicators, and neo-brutalist typography blocks.",
        date: "2026-06-24",
        createdBy: "David Chen"
      }
    ]
  },
  {
    id: "c3",
    name: "Zenith AI Marketing Website",
    company: "Zenith Systems",
    contactName: "Evelyn Sterling",
    contactEmail: "evelyn@zenithai.com",
    contactPhone: "+1 (555) 765-4321",
    status: "completed",
    mrr: 12000,
    projectType: "High-End Webflow Development",
    healthScore: "high",
    owner: "Ryan Patel",
    startDate: "2026-04-01",
    notes: "Successfully deployed project on time. Google Lighthouse scores are 98+ across desktop and mobile. Client requested an SEO maintenance retainer of $2k/mo starting next month.",
    activities: [
      {
        id: "ca3_1",
        type: "system",
        title: "Project Handover Complete",
        description: "Handed over full Figma assets, webflow project ownership, and custom training video tutorials.",
        date: "2026-06-15",
        createdBy: "Ryan Patel"
      },
      {
        id: "ca3_2",
        type: "email",
        title: "SEO Audit Report",
        description: "Sent over post-launch keyword rankings. Zenith is already on page 1 for 'generative AI context routers'.",
        date: "2026-06-26",
        createdBy: "Ryan Patel"
      }
    ]
  },
  {
    id: "c4",
    name: "Prism Education Student Portal",
    company: "Prism Edu Group",
    contactName: "Liam O'Connor",
    contactEmail: "liam@prism.edu",
    contactPhone: "+353 1 496 0123",
    status: "active",
    mrr: 7500,
    projectType: "React Frontend Consulting",
    healthScore: "medium",
    owner: "Alex Rivera",
    startDate: "2026-03-05",
    notes: "Building interactive curriculum portals. Progress is steady, but client is slow at giving copy approvals, delaying some module rollouts. Alex is maintaining constant touch.",
    activities: [
      {
        id: "ca4_1",
        type: "call",
        title: "Status Check-in",
        description: "Reminded Liam that without final curriculum text for Module 4, frontend coding will stall next week. Liam promised copy by Friday.",
        date: "2026-06-27",
        createdBy: "Alex Rivera"
      },
      {
        id: "ca4_2",
        type: "email",
        title: "Weekly Build Demonstration",
        description: "Shared staging URL showing the newly coded student leaderboard module.",
        date: "2026-06-22",
        createdBy: "Alex Rivera"
      }
    ]
  },
  {
    id: "c5",
    name: "Scribe Content Engine Platform",
    company: "Scribe Inc",
    contactName: "Natalie Portman",
    contactEmail: "natalie@scribe.press",
    contactPhone: "+1 (555) 654-3210",
    status: "paused",
    mrr: 4500,
    projectType: "Tailwind UI Components Kit",
    healthScore: "low",
    owner: "David Chen",
    startDate: "2026-02-15",
    notes: "Client is restructuring their internal funding and paused project development for 4 weeks. Contract remains valid; work expected to resume next month.",
    activities: [
      {
        id: "ca5_1",
        type: "meeting",
        title: "Pause Strategy Alignment",
        description: "Met Natalie to freeze development assets. Documented all half-finished UI structures in GitHub so they can be picked up cleanly.",
        date: "2026-06-10",
        createdBy: "Elena Rostova"
      }
    ]
  },
  {
    id: "c6",
    name: "Tidal Logistics Tracking App",
    company: "Tidal Freight Group",
    contactName: "Robert Kowalski",
    contactEmail: "robert@tidal-freight.pl",
    contactPhone: "+48 22 123 45 67",
    status: "active",
    mrr: 9500,
    projectType: "Real-time Dashboard Design",
    healthScore: "high",
    owner: "Elena Rostova",
    startDate: "2026-05-01",
    notes: "Extremely active. Designing a dashboard to monitor freight container ships. High telemetry density UI. Elena handles communications and coordinates developer handoff.",
    activities: [
      {
        id: "ca6_1",
        type: "meeting",
        title: "Developer Handoff Review",
        description: "Reviewed technical feasibility of the live SVG shipping route animation with client developers. Performance metrics approved.",
        date: "2026-06-26",
        createdBy: "Elena Rostova"
      },
      {
        id: "ca6_2",
        type: "call",
        title: "Asset Checkoff",
        description: "Delivered vector export files for 120 custom transport icons.",
        date: "2026-06-23",
        createdBy: "David Chen"
      }
    ]
  }
];

export const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Send updated retainer agreement",
    dueDate: "2026-07-02",
    priority: "high",
    status: "pending",
    assignedTo: "Sarah Jenkins",
    relatedTo: {
      type: "lead",
      id: "l1",
      name: "Stellar Labs"
    }
  },
  {
    id: "t2",
    title: "Finish custom spacing variables & Figma design system audit",
    dueDate: "2026-06-30",
    priority: "medium",
    status: "pending",
    assignedTo: "David Chen",
    relatedTo: {
      type: "lead",
      id: "l2",
      name: "Helix Health"
    }
  },
  {
    id: "t3",
    title: "Setup headless Shopify development branch and API tokens",
    dueDate: "2026-07-05",
    priority: "high",
    status: "pending",
    assignedTo: "Alex Rivera",
    relatedTo: {
      type: "lead",
      id: "l3",
      name: "Bloom & Co"
    }
  },
  {
    id: "t4",
    title: "Schedule Q3 review & retainer expansion pitch",
    dueDate: "2026-07-10",
    priority: "low",
    status: "pending",
    assignedTo: "Elena Rostova",
    relatedTo: {
      type: "client",
      id: "c1",
      name: "Acme Corp"
    }
  },
  {
    id: "t5",
    title: "Upload vector assets pack to client shared Drive folder",
    dueDate: "2026-06-29",
    priority: "medium",
    status: "completed",
    assignedTo: "David Chen",
    relatedTo: {
      type: "client",
      id: "c6",
      name: "Tidal Freight Group"
    }
  },
  {
    id: "t6",
    title: "Check up on copy block approvals and send gentle email nudge",
    dueDate: "2026-07-01",
    priority: "high",
    status: "pending",
    assignedTo: "Elena Rostova",
    relatedTo: {
      type: "client",
      id: "c4",
      name: "Prism Edu Group"
    }
  },
  {
    id: "t7",
    title: "Prepare SEO monthly analytics overview PDF",
    dueDate: "2026-06-30",
    priority: "low",
    status: "pending",
    assignedTo: "Ryan Patel",
    relatedTo: {
      type: "client",
      id: "c3",
      name: "Zenith Systems"
    }
  }
];
