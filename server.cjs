const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const knowledgeHub = require('./data/knowledge-hub.json');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const PHONE = "+47 917 53 145"; 
const EMAIL = "rune@hawkeye.no";

// 1. SØKEFUNKSJON
const retrieveContext = (query) => {
  // 1. Definer 'q' med en gang så den er tilgjengelig i hele funksjonen
  const q = String(query || "").toLowerCase().trim();
  console.log(`\n--- Søker etter: "${q}" ---`);
  
  let context = "";

  if (!knowledgeHub.entities) return "";

  // Sjekk Services
  if (knowledgeHub.entities.services) {
      knowledgeHub.entities.services.forEach(s => {
          const searchableText = [
              s.title, s.description, s.id,
              ...(s.tags || []), ...(s.methods || []), 
              ...(s.use_cases || []), ...(s.capabilities || []),
              s.equipment || ""
          ].filter(Boolean).map(t => String(t).toLowerCase());

          // Her bruker vi 'q'
          const isMatch = searchableText.some(text => text.includes(q)) || 
                          q.split(' ').some(word => word.length > 3 && searchableText.some(text => text.includes(word)));

          if (isMatch) {
              console.log(`[MATCH] Tjeneste: ${s.title}`);
              context += `\nTJENESTE: ${s.title}\nBeskrivelse: ${s.description}\n`;
          }
      });
  }

  // Sjekk FAQ (Det er ofte her 'q' mangler i loopen)
  if (knowledgeHub.entities.faqs) {
      knowledgeHub.entities.faqs.forEach(f => {
          const faqQuestion = String(f.question || "").toLowerCase();
          const faqAnswer = String(f.answer || "").toLowerCase();
          
          // Her bruker vi 'q' igjen - sjekker både spørsmål og svar
          if (q.includes("v770") || faqQuestion.includes(q) || faqAnswer.includes(q)) {
              console.log(`[MATCH] FAQ: ${f.question}`);
              context += `\nFAQ: ${f.question}\nSvar: ${f.answer}\n`;
          }
      });
  }

  return context;
};

// 2. CHAT ENDPOINT
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log(`\n--- Ny melding fra frontend: "${message}" ---`);
        
        if (!message) return res.status(400).json({ error: "Ingen melding" });

        const contextData = retrieveContext(message);
        
        // Logg nøyaktig hva som sendes til AI-modellen
        console.log("--- Kontekst sendt til Gemini ---");
        console.log(contextData || "(Tom kontekst)");
        console.log("---------------------------------");

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash-lite" 
        });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: message }] }],
            systemInstruction: `Du er teknisk rådgiver for Hawkeye AS. 
            Svar profesjonelt og kortfattet på norsk. 
            Bruk kun denne informasjonen hvis relevant: ${contextData}
            Hvis du ikke finner svar i informasjonen, henvis til Rune på ${PHONE}.`
        });

        const response = await result.response;
        const aiResponse = response.text();
        
        console.log(`[AI SVAR]: ${aiResponse.substring(0, 50)}...`);
        res.json({ text: aiResponse });

    } catch (error) {
        console.error("SERVER KRASJ:", error.message);
        res.status(500).json({ error: "Serverfeil", details: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend kjører på http://localhost:${PORT}`));