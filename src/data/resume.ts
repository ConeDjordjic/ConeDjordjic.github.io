export interface Job {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: string[];
}

export interface Project {
  id: string;
  kicker: string;
  name: string;
  url?: string;
  description: string;
  bg: "violet" | "acid" | "hot" | "ink";
}

export interface Chip {
  label: string;
}

export interface SkillCategory {
  name: string;
  type: "chips" | "text";
  items: Chip[] | { language: string; level: string }[];
}

export interface ResumeData {
  personal: {
    nameFirst: string;
    nameLast: string;
    tagline: string;
    taglineEmphasis: string;
    email: string;
    phone: string;
    phoneHref: string;
    location: string;
    status: string;
  };
  work: Job[];
  projects: Project[];
  skills: SkillCategory[];
  education: {
    degree: string;
    school: string;
    expected: string;
    location: string;
    coursework: string;
  };
  social: {
    github: string;
  };
}

export const resume: ResumeData = {
  personal: {
    nameFirst: "Nemanja",
    nameLast: "Djordjic",
    tagline: "Software engineer focused on",
    taglineEmphasis: "backend systems, reverse engineering & security",
    email: "cone.djordjic@gmail.com",
    phone: "+381 65 209 7466",
    phoneHref: "tel:+381652097466",
    location: "Novi Sad / Remote",
    status: "Open to software engineering & security roles",
  },

  work: [
    {
      company: "Self-employed",
      role: "Freelance software engineer & security researcher",
      startDate: "Aug 2023",
      endDate: "Now",
      location: "Remote",
      highlights: [
        "Built browser-automation tools in Python/Selenium and Go/Rod for dynamic, JavaScript-heavy sites, including authenticated stateful flows.",
        "Developed backend services and internal tools, from API design through Linux deployment.",
        "Analyzed Windows malware samples in sandboxed environments: identified anti-analysis tricks, unpacked obfuscated payloads, and traced process injection chains to document indicators of compromise and evasion techniques.",
        "Performed black-box penetration tests on web applications and network services: chained vulnerabilities from initial foothold through privilege escalation to deliver actionable remediation reports.",
      ],
    },
    {
      company: "Early-stage startup",
      role: "Full-stack engineer",
      startDate: "Nov 2023",
      endDate: "Jun 2026",
      location: "Novi Sad",
      highlights: [
        "Built a client-facing booking and product platform in React, TypeScript, and Next.js.",
        "Designed and deployed Go microservices for client-data pipelines and internal tooling.",
        "Cut a 500M+ records/day data workload from 18 minutes to under 3 with a performance-critical Rust component.",
      ],
    },
  ],

  projects: [
    {
      id: "01",
      kicker: "Open-source infrastructure",
      name: "miru",
      url: "https://github.com/ConeDjordjic/miru",
      description:
        "A Rust MCP server that lets LLM agents query Grafana Loki logs and Prometheus metrics in natural language.",
      bg: "violet",
    },
    {
      id: "02",
      kicker: "Signal detection",
      name: "tripwire",
      url: "https://tripwire1.duckdns.org/",
      description:
        "A web-change monitor for dynamic and authenticated pages, with a React dashboard, browser workers, and meaningful-change alerts.",
      bg: "acid",
    },
    {
      id: "03",
      kicker: "Rust CLI",
      name: "kz",
      url: "https://github.com/ConeDjordjic/kz",
      description:
        "A fast wc replacement for large text files. Up to 90× faster for pattern matching on 1GB files.",
      bg: "ink",
    },
    {
      id: "04",
      kicker: "Reverse engineering tooling",
      name: "unpack",
      description:
        "A collection of custom static and dynamic analysis utilities for Windows malware triage: PE parsing, import-table reconstruction, DLL proxy generation for API interception, and process-injection tracing via `CreateRemoteThread` hooking.",
      bg: "hot",
    },
  ],

  skills: [
    {
      name: "Technical",
      type: "chips",
      items: [
        { label: "Go" },
        { label: "Rust" },
        { label: "Python" },
        { label: "C#" },
        { label: "TypeScript" },
        { label: "React" },
        { label: "PostgreSQL" },
        { label: "Redis" },
        { label: "Docker" },
        { label: "NGINX" },
        { label: "gRPC" },
        { label: "Linux" },
        { label: "OpenTelemetry" },
        { label: "MCP" },
        { label: "Ghidra" },
        { label: "x64dbg" },
        { label: "Wireshark" },
        { label: "Burp Suite" },
        { label: "x86/x64 Asm" },
      ],
    },
    {
      name: "Languages",
      type: "text",
      items: [
        { language: "English", level: "fluent" },
        { language: "Serbian", level: "native" },
      ],
    },
  ],

  education: {
    degree: "Bachelor's degree in Electrical Engineering & Computer Science",
    school: "Fakultet Tehnickih Nauka",
    expected: "Expected October 2027",
    location: "Novi Sad, Serbia",
    coursework:
      "Relevant coursework: data structures and algorithms, operating systems, computer architecture, and computer networks.",
  },

  social: {
    github: "ConeDjordjic",
  },
};
