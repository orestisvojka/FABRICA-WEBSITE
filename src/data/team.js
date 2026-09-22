export const teamMembers = [
  {
    id: "lauren",
    slug: "lauren-thompson",
    aliases: ["lauren", "lauren-thompson"],
    name: "Lauren Thompson",
    role: "Digital Strategy & Visual Direction",
    company: "QuolyTech",
    subtext: "Digital Product Strategy",
    tagline: "Structuring Digital Strategy & Brand Direction",
    avatar: "/team-lauren.png",
    fallbackAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    heroImage: "/team-lauren.png",
    bio: "Digital strategist focused on structuring user experiences and visual direction for web applications.",
    overview: "Lauren contributes to digital product strategy, project planning, and visual direction at QuolyTech in Tiranë, Albania. She works closely with clients to define project scopes, outline user requirements, and ensure digital products align with business goals.",
    experience: "Digital Products",
    industry: "Web Development & Digital Strategy",
    specialization: "Project Scoping, User Experience Planning, Visual Direction",
    location: "Tiranë, Albania",
    connectUrl: "https://quolytech.com/contact",
    philosophy: "Effective digital tools solve real operational problems. We prioritize clear visual hierarchy and intuitive workflows.",
    approach: "Translating business goals into structured project roadmaps and accessible website interfaces.",
    stats: [
      { label: "Core Services", value: "Web & Apps" },
      { label: "Focus", value: "Usability" },
      { label: "Location", value: "Tiranë, AL" }
    ],
    featuredProjects: ["boltshift", "ephemeral"],
    gallery: [
      "/team-lauren.png",
      "/about-thumb-1.png",
      "/studio-team-collab.png"
    ]
  },
  {
    id: "michael",
    slug: "michael-wilson",
    aliases: ["michael", "michael-wilson"],
    name: "Michael Wilson",
    role: "Full Stack & Web Engineering",
    company: "QuolyTech",
    subtext: "Software & Web Development",
    tagline: "Building Web Applications, APIs & Frontend Interfaces",
    avatar: "/team-michael.png",
    fallbackAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    heroImage: "/team-michael.png",
    bio: "Full-stack developer building responsive web applications, backend APIs, and performant user interfaces.",
    overview: "Michael develops frontend interfaces and backend services at QuolyTech. He focuses on building fast React applications, clean HTML/CSS markup, custom API integrations, and database architectures.",
    experience: "Software Development",
    industry: "Software Engineering & Web Architecture",
    specialization: "React, JavaScript, HTML5/CSS3, Node.js, REST APIs",
    location: "Tiranë, Albania",
    connectUrl: "https://quolytech.com/contact",
    philosophy: "Clean code, semantic markup, and optimized assets ensure fast load times and accessible web experiences.",
    approach: "Writing modular, scalable JavaScript and HTML focused on performance and maintainability.",
    stats: [
      { label: "Stack", value: "React & Node" },
      { label: "Architecture", value: "REST APIs" },
      { label: "Location", value: "Tiranë, AL" }
    ],
    featuredProjects: ["powersurge", "warpspeed"],
    gallery: [
      "/team-michael.png",
      "/studio-hero-laptop.png",
      "/about-thumb-2.png"
    ]
  },
  {
    id: "sarah",
    slug: "sarah-johnson",
    aliases: ["sarah", "sarah-johnson"],
    name: "Sarah Johnson",
    role: "UI/UX & Brand Design",
    company: "QuolyTech",
    subtext: "Brand Systems & UI Design",
    tagline: "Designing Modern UI Systems & Brand Assets",
    avatar: "/team-sarah.png",
    fallbackAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    heroImage: "/team-sarah.png",
    bio: "UI designer crafting clean visual layouts, brand assets, and structured design tokens.",
    overview: "Sarah oversees visual design systems, brand identity kits, and component layouts at QuolyTech. She focuses on clean typography, responsive layout grids, and consistent visual branding.",
    experience: "Brand & UI Design",
    industry: "Visual Identity & Digital Design",
    specialization: "Visual Identity, Design Tokens, Typography, Layout Systems",
    location: "Tiranë, Albania",
    connectUrl: "https://quolytech.com/contact",
    philosophy: "Visual identity should communicate authority and clarity through structured layout and clean typography.",
    approach: "Combining modern typography guidelines and functional grid alignment to build clear digital identity systems.",
    stats: [
      { label: "Design System", value: "Modular" },
      { label: "Focus", value: "Brand & UI" },
      { label: "Location", value: "Tiranë, AL" }
    ],
    featuredProjects: ["mastermail", "cloudwatch"],
    gallery: [
      "/team-sarah.png",
      "/about-thumb-3.png",
      "/studio-team-group.png"
    ]
  }
];

export const getTeamMember = (slugOrId) => {
  if (!slugOrId) return teamMembers[0];
  const normalized = slugOrId.toLowerCase();
  return teamMembers.find(
    (m) =>
      m.id.toLowerCase() === normalized ||
      m.slug.toLowerCase() === normalized ||
      (m.aliases && m.aliases.includes(normalized))
  ) || teamMembers[0];
};
