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