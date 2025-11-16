const ChatQuiz = (() => {
  const chatFlow = [
    {
      prompt: "¿Qué tipo de energía te representa mejor?",
      options: [
        "Sofisticada y elegante, siempre impecable",
        "Misteriosa y profunda, con múltiples capas",
        "Explosiva y brillante, llena de vida",
        "Dulce y reconfortante, como un abrazo",
        "Fresca y juvenil, siempre renovándome",
        "Intensa y apasionada, sin términos medios",
      ],
    },
    {
      prompt: "¿Cómo te comportas en una relación o amistad?",
      options: [
        "Romántica y soñadora, creo en el amor verdadero",
        "Leal y protectora, siempre presente",
        "Coqueta y juguetona, me gusta el misterio",
        "Digital y moderna, conectamos online",
        "Intensa y directa, voy tras lo que quiero",
        "Energética y divertida, nunca me aburro",
      ],
    },
    {
      prompt: "¿Qué plan te hace feliz un domingo?",
      options: [
        "Maratón de series con snacks infinitos",
        "Salir a un café bonito y tomar fotos",
        "Crear playlists y bailar en casa",
        "Día creativo: journaling, dibujo o collages",
        "Reunión tranquila con amigos cercanos",
        "Spa casero con mascarillas y velas",
      ],
    },
  ];

  const introMessage = "¡Vamos a empezar de nuevo! 💖";
  let stepIndex = 0;
  const avatarChoices = [
    "assets/avatars/isa.webp",
    "assets/avatars/j.webp",
    "assets/avatars/seeun.webp",
    "assets/avatars/sumin.webp",
    "assets/avatars/sieun.webp",
    "assets/avatars/yoon.webp",
  ];

  const chatToggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const chatClose = document.getElementById("chat-close");
  const messages = document.getElementById("chat-messages");
  const optionsContainer = document.getElementById("chat-options");
  const activeTimeouts = new Set();
  let shouldStartNewSession = true;

  if (!chatToggle || !chatbox || !chatClose || !messages || !optionsContainer) {
    return {};
  }

  const scrollToBottom = () => {
    messages.scrollTop = messages.scrollHeight;
  };

  const schedule = (fn, delay) => {
    const id = setTimeout(() => {
      activeTimeouts.delete(id);
      fn();
    }, delay);
    activeTimeouts.add(id);
    return id;
  };

  const clearScheduledResponses = () => {
    activeTimeouts.forEach((id) => clearTimeout(id));
    activeTimeouts.clear();
  };

  const removeTypingIndicators = () => {
    messages.querySelectorAll(".typing-indicator").forEach((node) => node.remove());
  };

  const addBotBubble = (text) => {
    const wrapper = document.createElement("div");
    wrapper.className = "chat-message bot";

    const avatar = document.createElement("div");
    avatar.className = "chat-avatar-small";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = text;

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    scrollToBottom();
  };

  const showTypingIndicator = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "chat-message bot typing-indicator";

    const avatar = document.createElement("div");
    avatar.className = "chat-avatar-small";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble typing-bubble";

    const dots = document.createElement("div");
    dots.className = "typing-dots";

    [0, 1, 2].forEach((index) => {
      const dot = document.createElement("span");
      dot.className = "typing-dot";
      dot.style.animationDelay = `${index * 0.12}s`;
      dots.appendChild(dot);
    });

    bubble.appendChild(dots);
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    scrollToBottom();
    return wrapper;
  };

  const addBotMessage = (text, withTyping = true) => {
    if (!withTyping) {
      addBotBubble(text);
      return;
    }

    const indicator = showTypingIndicator();
    schedule(() => {
      indicator.remove();
      addBotBubble(text);
    }, 650);
  };

  const addUserMessage = (text) => {
    const wrapper = document.createElement("div");
    wrapper.className = "chat-message user";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    scrollToBottom();
  };

  const renderOptions = (options) => {
    optionsContainer.innerHTML = "";

    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chat-option";
      button.textContent = option;
      button.addEventListener("click", () => handleOption(option));
      optionsContainer.appendChild(button);
    });
  };

  const renderCompletion = () => {
    addBotMessage("¡Listo! Gracias por jugar. ¿Quieres reiniciar?");
    optionsContainer.innerHTML = "";

    const restart = document.createElement("button");
    restart.type = "button";
    restart.className = "chat-option";
    restart.textContent = "Volver a empezar";
    restart.addEventListener("click", startConversation);

    const close = document.createElement("button");
    close.type = "button";
    close.className = "chat-option";
    close.textContent = "Cerrar chat";
    close.addEventListener("click", () => {
      closeChat();
    });

    optionsContainer.appendChild(restart);
    optionsContainer.appendChild(close);
  };

  const askCurrentStep = () => {
    const step = chatFlow[stepIndex];
    if (!step) {
      renderCompletion();
      return;
    }

    addBotMessage(step.prompt);
    renderOptions(step.options);
  };

  const handleOption = (choice) => {
    addUserMessage(choice);
    stepIndex += 1;

    if (stepIndex < chatFlow.length) {
      schedule(() => {
        askCurrentStep();
      }, 450);
    } else {
      schedule(() => {
        renderCompletion();
      }, 380);
    }
  };

  const pickAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarChoices.length);
    const chosenAvatar = avatarChoices[randomIndex];
    chatbox.style.setProperty("--chat-avatar-url", `url("${chosenAvatar}")`);
  };

  const startConversation = () => {
    clearScheduledResponses();
    removeTypingIndicators();
    pickAvatar();
    messages.innerHTML = "";
    optionsContainer.innerHTML = "";
    stepIndex = 0;
    shouldStartNewSession = false;
    addBotMessage(introMessage);
    schedule(() => {
      askCurrentStep();
    }, 400);
  };

  const openChat = () => {
    chatbox.classList.add("open");
    chatToggle.setAttribute("aria-expanded", "true");
    if (shouldStartNewSession) {
      startConversation();
    }
  };

  const closeChat = () => {
    clearScheduledResponses();
    removeTypingIndicators();
    chatbox.classList.remove("open");
    chatToggle.setAttribute("aria-expanded", "false");
    messages.innerHTML = "";
    optionsContainer.innerHTML = "";
    shouldStartNewSession = true;
  };

  chatToggle.addEventListener("click", () => {
    if (chatbox.classList.contains("open")) {
      closeChat();
    } else {
      openChat();
    }
  });

  chatClose.addEventListener("click", closeChat);

  return {
    open: openChat,
    close: closeChat,
  };
})();