# Rapport: Mobilvisning og Tailwind CSS – Hawkeye

**Dato:** 16. mars 2025  
**Rolle:** Senior Frontend Engineer (Tailwind & mobiloptimalisering)  
**Omfang:** Alle HTML-sider (index, inspeksjon, prosjekter, panorama, personvern, om-oss, mobile-mapping, laserskanning, landmaling, databehandling, dronekartlegging, kontraktsoppfolging, gis) + index.css.

---

## 1. Kritiske Tailwind-feil (hvor layouten «brekker»)

### 1.1 Hardkodede høyden og bredder som kan skape overflow

| Sted | Klasse / Verdier | Problem |
|------|------------------|--------|
| **Alle undersider (hero)** | `h-[45vh] min-h-[420px]` | På korte mobilskjermer (f.eks. 568px høyde) blir 45vh ≈ 256px, men min-h-[420px] tvinger 420px – hero blir høyere enn skjermen og kan føre til uventet scroll og at CTA havner under fold. |
| **panorama.html:234** | `class="w-[80%] h-[420px] object-cover"` | Bredde 80 % er greit, men **h-[420px]** er fast. På smal skjerm blir bildet veldig høyt i forhold til bredde; risiko for store hvite felter eller dårlig proporsjon. |
| **inspeksjon.html:308** | `max-w-[800px] w-full h-[340px]` | Karusell-container med fast h-[340px]. På smal skjerm kan 340px ta mye av viewport; ingen `min-h`/`max-h` eller responsive h (f.eks. h-48 md:h-[340px]). |
| **Diverse sider** | Bilder med `h-[380px]` (landmaling, dronekartlegging, panorama, mobile-mapping, gis, kontraktsoppfolging) | Fast høyde på alle breakpoints. På mobil kan containeren bli smal mens høyden er stor – bildet kan virke «strekt» eller ta for mye plass. |
| **index.html (AI-chat)** | `#ai-chat-window`: `inset-x-4 bottom-4` + ingen `max-h-[…]` | På mobil kan chat-vinduet teoretisk ta hele høyden; ingen eksplisitt max-h for små skjermer (f.eks. max-h-[85vh]). |

**Anbefaling:** Erstatt faste px-høyder med responsive verdier (f.eks. `h-48 sm:h-64 md:h-[340px]`) eller `min-h-` + `max-h-` der det er behov, og vurder `aspect-ratio` for bilder der det passer.

---

### 1.2 Hero H1 uten responsiv fontstørrelse (index.html)

- **Kode:** `<h1 class="text-brand-dark mb-32 leading-[0.85]">` – ingen `text-*` eller bruk av design-tokens.
- **index.css** definerer `--fs-h1: clamp(3rem, 8vw, 6rem)` i `:root`, men **variabelen brukes ikke** på noen `h1` (ingen `font-size: var(--fs-h1)`).
- **Konsekvens:** H1 får nettleserens standard størrelse. På mobil kan den bli for stor eller for liten, og designet følger ikke den planlagte typografiske skalaen.

**Anbefaling:** Enten bruk `--fs-h1` i CSS på `h1` i hero, eller legg til eksplisitte Tailwind-klasser, f.eks. `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` (eller bruk av en utility som mapper til clamp).

---

### 1.3 Overskrifter uten mobil-first responsivitet

| Fil | Element | Nåværende | Problem |
|-----|---------|-----------|--------|
| **index.html:659** | «Siste Nyheter» | `text-4xl font-bold` | Ingen `sm:`/`md:` – 4xl på mobil kan bli dominerende. |
| **index.html:850** | CTA-boks | `text-4xl lg:text-6xl` | Hopper fra 4xl til 6xl ved lg; **sm/md** har ikke mellomsteg (f.eks. text-3xl på mobil). |
| **personvern.html:97** | Sidetittel | `text-4xl font-bold` | Ingen responsive variant – samme stor størrelse på alle skjermer. |
| **om-oss.html:265** | FAQ-tittel | `text-4xl font-bold` | Samme som over. |

**Anbefaling:** Legg til mobil-first skala, f.eks. `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` der det passer, slik at overskrifter ikke «eksploderer» på små skjermer.

---

### 1.4 Grid med store gaps uten reduksjon på mobil

- **Mønster:** `gap-16` og `gap-24` brukes mye (footer, seksjoner med 2 kolonner).
- **Eksempler:**  
  `grid grid-cols-1 lg:grid-cols-2 gap-24` (index, om-oss),  
  `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24` (footer på alle sider).
- **Problem:** På mobil (grid-cols-1) blir `gap-24` (6rem) veldig stor vertikalt og kan gi unødvendig scroll og «tom» følelse.

**Anbefaling:** Responsive gap, f.eks. `gap-8 md:gap-12 lg:gap-16` eller `gap-8 lg:gap-24`.

---

### 1.5 Panorama: bilde med fast bredde 80 %

- **panorama.html:234:** `w-[80%] h-[420px]` – bildet er sentrert i en flex-container men har ingen max-width eller responsiv bredde.
- **Problem:** På stor skjerm blir 80 % veldig bredt; på mobil kan 80 % + 420px høyde gi dårlige proporsjoner. Samme som under 1.1.

---

## 2. UX-forbedringer (mobilflyt)

### 2.1 Touch-targets (klikkbare elementer)

- **Navigasjon mobilmeny (index):** Lenker har `block text-sm` og wrapper i `space-y-4` – ingen min-høyde. **Anbefaling:** Legg til `py-3` eller `min-h-[44px] flex items-center` på lenkene slik at touch-target er minst ~44px.
- **Dropdown i desktop-nav:** Tjenester vises ved hover. På touch-enheter åpnes ikke dropdown konsekvent. **Anbefaling:** Vurder klikk (focus/click) i tillegg til hover, eller skjul dropdown på mobil (som dere delvis allerede gjør med `hidden md:flex`).
- **Footer-lenker:** `space-y-4` gir grei avstand, men selve lenkene har ikke eksplisitt padding. **Anbefaling:** `py-2` eller tilsvarende for større trykkflate.
- **Sosiale ikoner (footer):** `w-10 h-10` (40px) er like under anbefalt 44px. **Anbefaling:** `w-11 h-11` eller `min-w-[44px] min-h-[44px]` med `flex items-center justify-center`.
- **Share-knapper (inspeksjon, mobile-mapping, laserskanning m.fl.):** `p-3` på rund knapp – ca. 36–40px. **Anbefaling:** Øk til `p-4` eller sørg for minst 44px totalt.
- **AI-chat:** Submit-knapp `p-3` – under 44px. **Anbefaling:** Minst `py-3 px-4` og sikre at hit-området er minst 44px.
- **Mobil CTA-bar (bunn):** «Ring» og «E-post» er `flex flex-col items-center gap-1` med liten tekst (`text-[10px]`). Selve ikonene er `w-10 h-10`. **Anbefaling:** Øk ikon-/touch-område til minst 44px og vurder litt større font på mobil.

### 2.2 Mobilmeny – inkonsistens mellom sider

- **index.html:** `#mobile-menu` har `fixed inset-x-0 top-24 ... backdrop-blur-md ... z-[150]` – tydelig og lesbart.
- **Andre sider (inspeksjon, prosjekter, panorama, personvern, om-oss, mobile-mapping, laserskanning, landmaling, databehandling, dronekartlegging, kontraktsoppfolging, gis):** `#mobile-menu` har `hidden md:hidden ... absolute ... top-24` – **ingen** `backdrop-blur` eller lik styling som på forsiden. Opplevelsen blir ulik.

**Anbefaling:** Samme mobilmeny-styling (fixed, backdrop-blur, z-index, padding) på alle sider.

### 2.3 Lesbarhet og hierarki på mobil

- **Mange `text-xs` og `text-[10px]`** på labels og knapper (nav, CTA-bar, bransjekort, nyhetskort). På mobil kan dette bli vanskelig å lese. **Anbefaling:** Vurder `text-xs` som minimum og `text-[10px]` kun der det er sekundært (f.eks. «Just now» i chat).
- **Hero-paragraf (index):** `text-2xl md:text-3xl` – 2xl på mobil er bra; sjekk at linjelengde ikke blir for lang på smal skjerm (max-w-2xl er ok).

### 2.4 Fast CTA-bar vs. innhold

- Mobil CTA-bar (`md:hidden`) er `fixed bottom-6 left-1/2 -translate-x-1/2` med `w-[90%] max-w-[400px]`. Den dekker alltid bunnen og kan overlappe innhold (footer, knapper). **Anbefaling:** Legg til `padding-bottom` på `main` eller body når baren er synlig (f.eks. via data-attributt eller klasse), slik at siste innhold ikke skjules.

---

## 3. Best practice (elegans / lesbarhet)

### 3.1 Responsive utilities – konsistens

- **Bra:** Grid brukes konsekvent mobil-først: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4`, og flex med `flex-col md:flex-row` / `flex-col sm:flex-row` på de fleste steder.
- **Manglende sm:** Noen steder hopper dere fra base til `md:` uten `sm:`, f.eks. hero-knapper `flex-col sm:flex-row` (bra), mens andre seksjoner kun har `md:`. Ikke feil, men en mer konsekvent bruk av `sm:` der det gir mening vil gjøre breakpoints lettere å forstå.
- **Gap:** Mange bruker `gap-8`, `gap-12`, `gap-16`, `gap-24` uten responsive variant. Som nevnt over: reduser gap på mobil for bedre flyt.

### 3.2 Arbitrary values – når det er nødvendig

- **Akseptabelt:** `max-w-[320px] md:max-w-[450px]` (hero-logo), `w-[90%] max-w-[400px]` (mobil CTA-bar), `rounded-[2rem]` – disse er begrunnet.
- **Unngå der det finnes tokens:** I stedet for mange `h-[380px]`, vurder å standardisere på f.eks. `h-64 md:h-80 lg:h-[380px]` eller en egen komponent/utility for «artikkelbilde» med fast aspect-ratio.

### 3.3 Bilder og object-fit

- **Bra:** De fleste bilder har `object-cover` og `w-full h-full` i container med fast høyde eller aspect-ratio – det unngår strekte bilder i de fleste tilfeller.
- **Unntak:** panorama.html:234 med `w-[80%] h-[420px] object-cover` – proporsjonene styres av containeren, ikke av et standard aspect-ratio; vurder `aspect-video` eller `aspect-[16/10]` med responsiv høyde i stedet for fast 420px.
- **inspeksjon.html:** Ett bilde med `object-contain` i karusell – bevisst valg for å vise hele bildet; OK, men sjekk at containeren ikke får overflow på smal skjerm.

### 3.4 Design tokens (index.css)

- `:root` definerer `--fs-h1`, `--fs-h2`, `--fs-body` med clamp – **de brukes ikke** i noen regel. Enten bør de brukes (f.eks. `h1 { font-size: var(--fs-h1); }`) eller fjernes for å unngå forvirring. Tailwind kan også utvides med disse som custom font-size i `theme.extend`.

### 3.5 Gjenbruk og vedlikehold

- Header, footer og mobilmeny er duplisert på alle sider. Endringer må gjøres mange steder – risiko for at index.html og resten divergerer (som med mobilmeny-styling). **Anbefaling:** Vurder å trekke header/footer/mobilmeny ut til komponenter eller delte partials (f.eks. ved byggesteg eller server-includes) for konsistens og enklere mobil-justeringer.

---

## 4. Prioritert sjekkliste (hva å fikse først)

### P0 – Kritisk (layout/lesbarhet brekker eller er svært dårlig på mobil)

1. **Hero min-h på undersider:** Juster `min-h-[420px]` til noe mindre på mobil (f.eks. `min-h-[280px] sm:min-h-[360px] md:min-h-[420px]`) eller fjern min-h og bruk kun vh, slik at hero ikke blir høyere enn skjermen.
2. **Hero H1 på index:** Gi H1 enten responsiv fontstørrelse (Tailwind-klasser) eller bruk `--fs-h1` i CSS, slik at typografi skalerer fornuftig på mobil.
3. **panorama.html:** Bildet med `w-[80%] h-[420px]` – gjør høyden responsiv (f.eks. `h-48 md:h-80 lg:h-[420px]`) og vurder `max-w-4xl mx-auto` på containeren.
4. **Mobil CTA-bar:** Unngå at den dekker viktig innhold – legg til nok bottom-padding på innhold når baren er synlig.

### P1 – Høy (bedre UX og konsistens)

5. **Touch-targets:** Øk klikkflate til minst ~44px på alle primære knapper og lenker (mobilmeny, footer-ikoner, share-knapper, AI-chat send, mobil CTA-bar).
6. **Mobilmeny styling:** Gjør mobilmenyen lik på alle sider (fixed, backdrop-blur, z-index) som på index.html.
7. **Overskrifter:** Legg til responsive `text-*` der det mangler (index «Siste Nyheter», personvern, om-oss FAQ, CTA-boks).
8. **Gap på mobil:** Reduser `gap-16`/`gap-24` på mobil (f.eks. `gap-8 md:gap-16 lg:gap-24`).

### P2 – Medium (elegans og vedlikehold)

9. **Faste bildehøyder:** Erstatt alle `h-[380px]` med responsive variant (f.eks. `h-56 sm:h-72 md:h-[380px]`) der det passer.
10. **inspeksjon karusell:** Responsiv høyde på karusell-containeren (f.eks. `h-64 md:h-[340px]`).
11. **AI-chat:** `max-h-[85vh]` eller tilsvarende på mobil slik at vinduet ikke tar hele skjermen.
12. **Design tokens:** Enten bruk `--fs-h1`/`--fs-h2` i CSS eller fjern/erstatt med Tailwind theme – unngå «døde» variabler.

### P3 – Lav (nice-to-have)

13. **Konsistent bruk av sm:** Der det gir mening, legg til `sm:` for jevnere overganger mellom breakpoints.
14. **Dropdown på touch:** Vurder klikk/focus for tjenester-meny på tablet/touch.
15. **Komponentisering:** Planlegg deling av header/footer/mobilmeny for enklere mobil-oppdateringer på tvers av sider.

---

**Konklusjon:** Prosjektet har god bruk av Tailwind med mobil-først grid og flex på de fleste steder. De viktigste forbedringene er: (1) fjerne eller tilpasse hardkodede høyden som kan brekke layout på mobil, (2) gi hero-H1 og andre store overskrifter responsiv typografi, (3) øke touch-targets og (4) gjøre mobilmeny og gaps mer mobilvennlige og konsistente på tvers av sider.
