
import { ServiceData, InsightArticle, NavItem } from './types';

// GLOBAL PLACEHOLDERS
export const COMPANY_NAME = "Hawkeye AS";
export const INDUSTRY = "Geomatikk, Landmåling & Teknisk Dokumentasjon";
export const LOCATION = "Holmefjord";
export const CITY = "Holmefjord";
export const PHONE = "+47 957 03 645";
export const EMAIL = "rune@hawkeye.as";
export const COPYRIGHT_YEAR = "2026";

// AI KNOWLEDGE BASE EXTRAS
export const COMPANY_INFO = {
  founded: "2014",
  vision: "Levere presisjonsdata som fjerner usikkerhet i komplekse infrastrukturprosjekter.",
  philosophy: "Millimeterpresisjon, teknisk autoritet og operasjonell sikkerhet.",
  certifications: "RO3/Specific (Luftfartstilsynet), Leica Certified Partner.",
  target_audience: "Statlige etater (SVV, Avinor), kraftselskap, entreprenører, rådgivende ingeniører.",
  coverage: `Vestland (Bergen, Bjørnafjorden, Hardanger) og nasjonalt i Norge.`,
  guarantee: "Garantert nøyaktighet iht. V770 og bransjestandarder."
};

export const METHODOLOGY = [
  { step: 1, title: "Planlegging", desc: "Innhenting av tillatelser og planlegging av måleoppdrag for optimal dekning." },
  { step: 2, title: "Datainnsamling", desc: "Innsamling av feltdata med laserskanning, drone eller totalstasjon." },
  { step: 3, title: "Prosessering", desc: "Behandling av rådata til punktskyer, modeller og ortofoto." },
  { step: 4, title: "Leveranse", desc: "Kvalitetssikrede data levert i formater som SOSI, DXF, IFC og E57." }
];

// INTERNAL SERVICES (Core Deliverables)
export const INTERNAL_SERVICES = [
  "Strategi (Prioritering)",
  "Web (PWA)",
  "AI-rådgivning",
  "Google Bedriftsprofil",
  "Innhold & konvertering",
  "Drift & forbedring"
];

// CORE SERVICES (Hawkeye AS)
export const SERVICES: ServiceData[] = [
  {
    id: "s1",
    slug: "landmaling",
    name: "Landmåling & Stikking",
    shortDesc: "Presisjonsmåling og teknisk stikking for vei, tunnel og bygg.",
    problem: "Unøyaktig plassering fører til kostbare feilbygginger og forsinkelser.",
    questions: [
      "Hvor nøyaktig er deres landmåling?",
      "Leverer dere data til maskinstyring?",
      "Hva er V770?"
    ],
    solution: "Bruk av Leica Totalstasjon og GNSS med mm-presisjon for garantert riktig plassering.",
    steps: [
      { title: "Etablering", desc: "Etablering av fastmerkenett og kontrollgrunnlag." },
      { title: "Utsetting", desc: "Løpende stikking av akser og høyder." },
      { title: "Kontroll", desc: "Uavhengig kontrollmåling av utført arbeid." },
      { title: "Dokumentasjon", desc: "As-built dokumentasjon iht. V770." }
    ],
    benefits: ["Millimeterpresisjon", "Redusert risiko", "Komplett dokumentasjon"],
    results: "Feilfri plassering av infrastruktur og bygg.",
    usp: ["Leica 1\" instrumenter", "V770-ekspertise", "Rask mobilisering"],
    proof: { experience: "20+ år i bransjen.", method: "Leica Captivate.", risk: "Ansvarsforsikret." },
    qa: [
      { q: "Hvilke instrumenter bruker dere?", a: "Vi bruker utelukkende Leica-instrumenter (GPS og Totalstasjoner) med 1\" nøyaktighet." },
      { q: "Kan dere levere data til maskinstyring?", a: "Ja, vi klargjør data for Leica, Topcon og Trimble." },
      { q: "Hva gjør dere ved avvik?", a: "Vi varsler umiddelbart og utarbeider avviksrapport med tiltak." }
    ]
  },
  {
    id: "s2",
    slug: "laserskanning",
    name: "3D Laserskanning",
    shortDesc: "Digital tvilling og punktsky av bygg, anlegg og terreng.",
    problem: "Mangelfull dokumentasjon av eksisterende forhold skaper uforutsette utfordringer i prosjektering.",
    questions: ["Hva er en punktsky?", "Hvor detaljert er skanningen?", "Kan dere skanne skip?"],
    solution: "Høyoppløselig laserskanning med Leica P40 som fanger millioner av punkter med mm-presisjon.",
    steps: [
      { title: "Skanning", desc: "Innsamling av punktskydata i felt." },
      { title: "Registrering", desc: "Sammensetting av skann til en helhetlig punktsky." },
      { title: "Modellering", desc: "Utarbeidelse av 3D-modell (BIM) fra punktsky." },
      { title: "Leveranse", desc: "Punktsky levert i E57, LAS eller RCP." }
    ],
    benefits: ["Fullstendig dokumentasjon", "Ingen glemte mål", "Grunnlag for BIM"],
    results: "En nøyaktig digital kopi av virkeligheten.",
    usp: ["Leica P40 High-End", "Erfaring med industri", "Sømløs BIM-integrasjon"],
    proof: { experience: "Store industriprosjekter.", method: "Terrestriell skanning.", risk: "Presisjonsgaranti." },
    qa: [
      { q: "Hvor nøyaktig er skanningen?", a: "Vi oppnår en nøyaktighet på under 2 mm på korte avstander." },
      { q: "Hva kan punktskyen brukes til?", a: "Prosjektering, kollisjonskontroll, volumoppmåling og dokumentasjon." },
      { q: "Kan dere skanne i mørket?", a: "Ja, laserskanning er uavhengig av lysforhold." }
    ]
  },
  {
    id: "s3",
    slug: "dronekartlegging",
    name: "Dronekartlegging",
    shortDesc: "Effektiv kartlegging av store områder med ortofoto og 3D-modeller.",
    problem: "Tradisjonell måling av store områder er tidkrevende og ofte utilgjengelig.",
    questions: ["Hvor nøyaktig er dronekartlegging?", "Kan dere fly i regnvær?", "Hva er GSD?"],
    solution: "Fotogrammetri med RTK-droner gir rask og komplett oversikt med 1-3 cm nøyaktighet.",
    steps: [
      { title: "Planlegging", desc: "Flyruteplanlegging og tillatelser." },
      { title: "Flyvning", desc: "Datainnsamling med RTK-støtte." },
      { title: "Prosessering", desc: "Behandling til ortofoto og 3D-modeller." },
      { title: "Leveranse", desc: "Data levert i TIFF, DXF eller LAS." }
    ],
    benefits: ["Rask innsamling", "Komplett oversikt", "Tryggere utførelse"],
    results: "Høyoppløselige kart og terrengmodeller for prosjektering.",
    usp: ["RO3/Specific sertifisert", "RTK/PPK teknologi", "Urbane flytillatelser"],
    proof: { experience: "1500+ flyoperasjoner.", method: "Fotogrammetri.", risk: "Sertifisert operatør." },
    qa: [
      { q: "Hvor nøyaktig er det?", a: "1-3 cm i plan og høyde ved bruk av RTK og GCP." },
      { q: "Hva er leveringstiden?", a: "Normalt 2-3 arbeidsdager etter flyvning." },
      { q: "Kan dere fly i byer?", a: "Ja, vi har RO3-sertifisering for komplekse operasjoner." }
    ]
  }
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: "i1",
    slug: "v770-standard",
    title: "V770: Krav til dokumentasjon",
    summary: "Hva du må vite om Statens Vegvesens krav til as-built data.",
    date: "2025-02-15",
    type: "Fagartikkel",
    content: "V770 setter strenge krav til nøyaktighet og format for alle vegprosjekter."
  }
];

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Hjem', href: '/', type: 'page' },
  { label: 'Tjenester', href: '/prosjekter.html', type: 'page' },
  { label: 'Om oss', href: '/om-oss.html', type: 'page' },
  { label: 'Prosjekter', href: '/prosjekter.html', type: 'page' },
  { label: 'Kontakt', href: '#kontakt', type: 'anchor' }
];
