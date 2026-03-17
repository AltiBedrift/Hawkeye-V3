/**
 * Denne filen snakker med Express-serveren din.
 * Lagt til logger for å feilsøke kommunikasjonen i nettleser-konsollen.
 */
export const askAI = async (userMessage: string): Promise<string> => {
  console.log(`%c[Frontend] Sender melding til backend: "${userMessage}"`, 'color: #007bff; font-weight: bold');
  
  try {
    const response = await fetch('http://localhost:5000/api/chat', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    console.log(`[Frontend] Mottok HTTP-status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[Frontend] Backend returnerte en feil:", errorData);
      throw new Error(errorData.details || 'Kunne ikke kontakte backend-serveren.');
    }
    
    const data = await response.json();
    
    if (data.text) {
      console.log("%c[Frontend] Vellykket svar fra AI mottatt!", 'color: #28a745; font-weight: bold');
      return data.text;
    } else {
      console.warn("[Frontend] Responsen var tom eller manglet 'text'-feltet.");
      return "Beklager, jeg fikk ikke generert et svar.";
    }

  } catch (error: any) {
    console.error("%c[Frontend Error]", 'color: #dc3545; font-weight: bold', error);
    
    // Gir litt mer spesifikk info i chatten om det er nettverk eller serverfeil
    if (error.message.includes('Failed to fetch')) {
      return "Systemet er utilgjengelig. Er server.cjs startet på port 5000?";
    }
    
    return `Det oppstod en feil: ${error.message}`;
  }
};