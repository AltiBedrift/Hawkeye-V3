/* 
© 2026 Hawkeye AS – Levert av Haut Forvalting AS.
Main Logic (Vanilla JS)
*/

document.addEventListener('DOMContentLoaded', () => {
  console.log('Hawkeye Growth Engine Initialized');

  // --- Event Tracking Logic ---
  const trackEvent = (category: string, action: string, label?: string) => {
    console.log(`[Analytics] Event: ${category} | Action: ${action} | Label: ${label}`);
  };

  // Attach listeners to all elements with data-event attributes
  document.querySelectorAll('[data-event]').forEach(el => {
    const element = el as HTMLElement;
    const eventType = element.dataset.event;
    const category = element.dataset.eventCategory || 'engagement';
    const label = element.dataset.eventLabel || 'unknown';

    if (eventType === 'click') {
      element.addEventListener('click', () => trackEvent(category, 'click', label));
    } else if (eventType === 'submit') {
      element.addEventListener('submit', () => trackEvent(category, 'submit', label));
    } else if (eventType === 'view') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackEvent(category, 'view', label);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(element);
    }
  });

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation
      const inputs = contactForm.querySelectorAll('input, textarea, select');
      let isValid = true;
      inputs.forEach(input => {
        if ((input as HTMLInputElement).required && !(input as HTMLInputElement).value) {
          isValid = false;
        }
      });

      if (!isValid) {
        alert('Vennligst fyll ut alle påkrevde felt.');
        return;
      }

      // Simulate API call
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sender...';
        (submitBtn as HTMLButtonElement).disabled = true;

        setTimeout(() => {
          alert('Takk for din henvendelse! Rune Samnøy tar kontakt med deg for en vurdering av oppdraget.');
          (contactForm as HTMLFormElement).reset();
          submitBtn.textContent = originalText;
          (submitBtn as HTMLButtonElement).disabled = false;
        }, 1500);
      }
    });
  }

  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('py-2', 'bg-white/95', 'shadow-lg');
      header?.classList.remove('bg-white/80');
    } else {
      header?.classList.remove('py-2', 'bg-white/95', 'shadow-lg');
      header?.classList.add('bg-white/80');
    }
  });

  // --- AI Chat Logic ---
  const chatToggle = document.getElementById('ai-chat-toggle');
  const chatWindow = document.getElementById('ai-chat-window');
  const chatClose = document.getElementById('ai-chat-close');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-input') as HTMLInputElement;
  const chatMessages = document.getElementById('ai-messages');

  const toggleChat = () => {
    const isOpen = !chatWindow?.classList.contains('opacity-0');
    if (isOpen) {
      chatWindow?.classList.add('translate-y-10', 'opacity-0', 'pointer-events-none');
    } else {
      chatWindow?.classList.remove('translate-y-10', 'opacity-0', 'pointer-events-none');
      chatInput?.focus();
    }
  };

  chatToggle?.addEventListener('click', toggleChat);
  chatClose?.addEventListener('click', toggleChat);

  const addMessage = (text: string, isAI: boolean) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex gap-4 ' + (isAI ? '' : 'flex-row-reverse');
    
    const avatar = document.createElement('div');
    if (isAI) {
      avatar.className = 'w-10 h-10 rounded-xl bg-brand-dark text-brand-primary flex-shrink-0 flex items-center justify-center shadow-lg border border-white/10';
      avatar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>';
    } else {
      avatar.className = 'w-10 h-10 rounded-xl bg-brand-primary text-white flex-shrink-0 flex items-center justify-center shadow-lg border border-white/10';
      avatar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.className = `flex flex-col gap-1.5 max-w-[85%] ${isAI ? '' : 'items-end'}`;

    const content = document.createElement('div');
    content.className = `p-4 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.03] text-sm leading-relaxed ${isAI ? 'bg-white rounded-tl-none text-gray-800' : 'bg-brand-dark text-white rounded-tr-none'}`;
    
    // Simple formatting for bold and lists
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    
    content.innerHTML = formattedText;

    const meta = document.createElement('span');
    meta.className = 'text-[10px] text-gray-700 font-medium px-1';
    meta.textContent = isAI ? 'Hawkeye AI • Just now' : 'Du • Just now';

    contentWrapper.appendChild(content);
    contentWrapper.appendChild(meta);
    
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(contentWrapper);
    chatMessages?.appendChild(msgDiv);
    
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  };

  // Handle Suggestions
  document.querySelectorAll('.chat-suggestion').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent || '';
      if (chatInput) {
        chatInput.value = text;
        chatForm?.dispatchEvent(new Event('submit'));
      }
    });
  });

  chatForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, false);
    chatInput.value = '';

    // Add loading indicator
    const loadingId = 'loading-' + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.id = loadingId;
    loadingDiv.className = 'flex gap-4';
    loadingDiv.innerHTML = `
      <div class="w-10 h-10 rounded-xl bg-brand-dark text-brand-primary flex-shrink-0 flex items-center justify-center shadow-lg border border-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
      </div>
      <div class="bg-white p-4 rounded-[1.5rem] rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.03] text-sm flex gap-1.5 items-center">
        <span class="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></span>
        <span class="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span class="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    `;
    chatMessages?.appendChild(loadingDiv);
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const { askAI } = await import('./services/geminiService');
      const response = await askAI(message);
      
      // Remove loading
      document.getElementById(loadingId)?.remove();
      
      // Add AI response
      addMessage(response, true);
    } catch (error) {
      console.error('Chat Error:', error);
      document.getElementById(loadingId)?.remove();
      addMessage('Beklager, det oppstod en teknisk feil i kommunikasjonen. Vennligst prøv igjen senere.', true);
    }
  });
});
