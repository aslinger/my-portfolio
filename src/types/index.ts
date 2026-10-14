export interface Repository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    isFeatured?: boolean;
    impactPoints?: string[];
    customTech?: string[];
    customTitle?: string;
}

export interface ExperienceHighlight {
    title: string;
    description: string;
}

export interface ExperienceItem {
    role: string;
    company: string;
    location?: string;
    period: string;
    highlights: ExperienceHighlight[];
    environment: string[];
}

export interface EducationItem {
    degree: string;
    institution: string;
    details: string;
}