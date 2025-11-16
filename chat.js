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
    {
      prompt: "¿Qué cosas no pueden faltar en tu mundo?",
      options: [
        "Los bolsos",
        "Las cámaras desechables",
        "Los vinilos",
        "Los coleccionables kawaii",
        "Los tenis",
        "Los stickers",
      ],
    },
  ];

  const VISITOR_COOKIE = "stayc_chat_visitor";
  const COMPLETED_COOKIE = "stayc_chat_completed";
  const FIRST_TIME_MESSAGE = "¡Bienvenida! ¿Quieres empezar a jugar y descubrir tu vibra STAYC? 💖";
  const RETURNING_MESSAGE = "¡Hola de nuevo! Ya hiciste el test, ¿quieres volver a jugar?";
  let stepIndex = 0;
  const avatarChoices = [
    "assets/avatars/isa.webp",
    "assets/avatars/j.webp",
    "assets/avatars/seeun.webp",
    "assets/avatars/sumin.webp",
    "assets/avatars/sieun.webp",
    "assets/avatars/yoon.webp",
  ];

  const avatarMatchReplies = {
    "assets/avatars/isa.webp": {
      "Sofisticada y elegante, siempre impecable": "¡Ese estilo sofisticado es super Isa vibra!",
      "Romántica y soñadora, creo en el amor verdadero": "También creo en esos romances de película.",
      "Salir a un café bonito y tomar fotos": "Los cafecitos lindos son mi plan favorito.",
      "Los bolsos": "¡A mí también me gustan los bolsos!",
    },
    "assets/avatars/j.webp": {
      "Misteriosa y profunda, con múltiples capas": "Me encanta esa aura misteriosa, te queda perfecta.",
      "Leal y protectora, siempre presente": "La lealtad lo es todo, ¡gracias por tenerla!",
      "Maratón de series con snacks infinitos": "Una buena serie y botanas es mi tarde ideal.",
      "Las cámaras desechables": "Siempre llevo una cámara para capturar recuerdos.",
    },
    "assets/avatars/seeun.webp": {
      "Explosiva y brillante, llena de vida": "¡Esa energía brillante me inspira muchísimo!",
      "Coqueta y juguetona, me gusta el misterio": "Un poco de coqueteo siempre mantiene la chispa.",
      "Crear playlists y bailar en casa": "Yo también vivo armando playlists interminables.",
      "Los stickers": "Decoro todo con stickers, ¡son lo máximo!",
    },
    "assets/avatars/sumin.webp": {
      "Dulce y reconfortante, como un abrazo": "Esa dulzura reconfortante me representa un montón.",
      "Digital y moderna, conectamos online": "Las conexiones online también pueden ser especiales.",
      "Día creativo: journaling, dibujo o collages": "Un día creativo es mi terapia favorita.",
      "Los vinilos": "El sonido en vinilo tiene una vibra única, ¿cierto?",
    },
    "assets/avatars/sieun.webp": {
      "Fresca y juvenil, siempre renovándome": "Renovarse y mantenerlo fresco es la clave.",
      "Intensa y directa, voy tras lo que quiero": "Me encanta esa determinación para ir por todo.",
      "Reunión tranquila con amigos cercanos": "Un plan chill con amigxs es justo lo que amo.",
      "Los tenis": "Unos buenos tenis te acompañan a todas partes.",
    },
    "assets/avatars/yoon.webp": {
      "Intensa y apasionada, sin términos medios": "Esa pasión a tope me hace sentir super viva.",
      "Energética y divertida, nunca me aburro": "¡La diversión sin pausa es la mejor manera de vivir!",
      "Spa casero con mascarillas y velas": "Los spas caseros son mi ritual de amor propio.",
      "Los coleccionables kawaii": "Todo lo kawaii me hace feliz, ¡somos dos!",
    },
  };

  const chatToggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const chatClose = document.getElementById("chat-close");
  const messages = document.getElementById("chat-messages");
  const optionsContainer = document.getElementById("chat-options");
  const activeTimeouts = new Set();
  let shouldStartNewSession = true;
  let currentAvatar = null;

  if (!chatToggle || !chatbox || !chatClose || !messages || !optionsContainer) {
    return {};
  }

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return undefined;
  };

  const setCookie = (name, value, days = 365) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  };

  const ensureVisitorId = () => {
    if (!getCookie(VISITOR_COOKIE)) {
      const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      setCookie(VISITOR_COOKIE, id);
    }
  };

  const hasCompletedQuiz = () => getCookie(COMPLETED_COOKIE) === "true";

  const markQuizCompleted = () => {
    ensureVisitorId();
    setCookie(COMPLETED_COOKIE, "true");
  };

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
    markQuizCompleted();
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

  const renderStartOptions = () => {
    optionsContainer.innerHTML = "";

    const yesOption = document.createElement("button");
    yesOption.type = "button";
    yesOption.className = "chat-option";
    yesOption.textContent = "Sí";
    yesOption.addEventListener("click", () => {
      addUserMessage("Sí");
      optionsContainer.innerHTML = "";
      schedule(() => {
        askCurrentStep();
      }, 320);
    });

    const noOption = document.createElement("button");
    noOption.type = "button";
    noOption.className = "chat-option";
    noOption.textContent = "No";
    noOption.addEventListener("click", () => {
      addUserMessage("No");
      optionsContainer.innerHTML = "";
      schedule(() => {
        renderEarlyExit();
      }, 280);
    });

    optionsContainer.appendChild(yesOption);
    optionsContainer.appendChild(noOption);
  };

  const renderEarlyExit = () => {
    addBotMessage("Entendido. Cuando quieras empezar a jugar, aquí estaré. ✨");
    optionsContainer.innerHTML = "";

    const restart = document.createElement("button");
    restart.type = "button";
    restart.className = "chat-option";
    restart.textContent = "Empezar quiz";
    restart.addEventListener("click", startConversation);

    const close = document.createElement("button");
    close.type = "button";
    close.className = "chat-option";
    close.textContent = "Cerrar chat";
    close.addEventListener("click", closeChat);

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
    const avatarReactions = avatarMatchReplies[currentAvatar] || {};
    const reactionReply = avatarReactions[choice];

    if (reactionReply) {
      schedule(() => {
        addBotMessage(reactionReply);
      }, 280);
    }

    const delayBeforeNext = reactionReply ? 1000 : 450;
    stepIndex += 1;

    if (stepIndex < chatFlow.length) {
      schedule(() => {
        askCurrentStep();
      }, delayBeforeNext);
    } else {
      schedule(() => {
        renderCompletion();
      }, delayBeforeNext);
    }
  };

  const pickAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarChoices.length);
    const chosenAvatar = avatarChoices[randomIndex];
    currentAvatar = chosenAvatar;
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
    const introMessage = hasCompletedQuiz() ? RETURNING_MESSAGE : FIRST_TIME_MESSAGE;
    ensureVisitorId();
    addBotMessage(introMessage);
    renderStartOptions();
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