export interface ServiceData {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  problem: string; // "Hvem dette er for" + "situasjonen nå"
  questions: string[]; // 6-10 questions
  solution: string; // "Hvordan vi løser det"
  steps: { title: string; desc: string }[]; // How-to steps
  benefits: string[]; // 5-7 benefits
  results: string; // "Hva resultatet betyr for kunden"
  usp: string[]; // 3-5 USPs
  proof: {
    experience: string;
    method: string;
    risk: string;
  };
  qa: { q: string; a: string }[]; // 20 Q&A pairs
}

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  date: string;
  type: 'Trendrapport' | 'Forskning' | 'Metodikk' | 'Fagartikkel';
  content: string;
}

export enum EventCategory {
  NAVIGATION = 'navigation',
  ENGAGEMENT = 'engagement',
  CONVERSION = 'conversion',
  INTENT = 'intent',
  SYSTEM = 'system',
}

export interface NavItem {
  label: string;
  href: string;
  type: 'anchor' | 'page';
  children?: NavItem[];
}