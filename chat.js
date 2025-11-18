const ChatQuiz = (() => {
  const chatFlow = [
{
  prompt: "What type of energy represents you best?",
  options: [
    "I might seem cold at first, but I'm actually very warm and I laugh a lot.",
    "My energy is calm but firm, like when I practice in silence and suddenly get serious without warning.",
    "Active; when I do something, I do it with all my energy.",
    "Super energetic with my friends! And with a very powerful laugh. But I also have my calm moments.",
    "Pure energy! I'm hyperactive, playful, and the life of the party.",
    "I look calm, but when I'm comfortable I have a 4D personality and I'm very playful.",
  ],
},
{
  prompt: "How do you behave in a relationship or friendship?",
  options: [
    "I'm the one who listens, smiles with you, and gives you strength without you even realizing it.",
    "I'm not a direct person, so I try to say things subtly to my friends... And I get a bit pouty sometimes~",
    "I try to give encouragement and support to my friends, especially by making them laugh and saying nice things to them.",
    "I'm like the mom of my friend group; I'm always looking out for their well-being.",
    "Playful; I'm always hugging my friends or looking to play with them.",
    "In friendship I'm the one who takes care, makes bad jokes, remembers details... but also the one who trips first.",
  ],
},
{
  prompt: "What plan makes you happy on a Sunday?",
  options: [
    "Going out to a café to talk with a friend for hours!",
    "Planning my next trip to a majestic city like LA or similar.",
    "A perfect Sunday is good food, a nice drama, playing with keropi... and resting at home in pajamas.",
    "Video games, anime, consuming k-pop content.",
    "Anything related to animals! They're adorable... Maybe going to a cat café?",
    "Dramas, candy crush, sweet snacks...",
  ],
},
{
  prompt: "What things can't be missing from your world?",
  options: [
    "Music, a good coffee, shopping, friends... and STAYC ♡.",
    "My favorite k-pop group, my video games, my favorite snacks, my friends, and STAYC ♡.",
    "The important people in my life, animals, and STAYC ♡.",
    "My headphones, organization, and STAYC's music ♡.",
    "In my world there's Girl's Generation music, delicious food, a little bit of adorable chaos... and STAYC ♡",
    "Fantasy! Series, books, movies... and STAYC ♡",
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
        "I might seem cold at first, but I'm actually very warm and I laugh a lot.": "I identify so much with you... I think we'd get along really well♡",
        "I'm like the mom of my friend group; I'm always looking out for their well-being.": "We need more people like you in the world... I'm sure you're someone very special to those around you",
        "Going out to a café to talk with a friend for hours!": "That plan sounds perfect, we should do it together someday! SWITH and I!",
        "Music, a good coffee, shopping, friends... and STAYC ♡.": "Really?! We're so alike, SWITH! What kind of music do you listen to? I love R&B!",
      },
      "assets/avatars/j.webp": {
        "Super energetic with my friends! And with a very powerful laugh. But I also have my calm moments.": "Waaaah, just like me! I like you so much already~ It seems like we're soulmates!",
        "I try to give encouragement and support to my friends, especially by making them laugh and saying nice things to them.": "I'm one of those who always gives encouragement and support to my friends~ Like when I tell Sieun that she does look tall hahaha. I like making people feel good!",
        "Anything related to animals! They're adorable... Maybe going to a cat café?": "Oh! Me too! Should we go together next time, SWITH? I'll treat you to BHC Bburing Chicken hahaha.",
        "The important people in my life, animals, and STAYC ♡.": "Waaah I identify so much with you! I think we'd be best friends in real life hahaha You have such great taste!",
      },
      "assets/avatars/seeun.webp": {
        "I look calm, but when I'm comfortable I have a 4D personality and I'm very playful.": "I seem calm at first but when you get to know me I'm super 4D and playful... although I also like staying home watching dramas like '별에서 온 그대' ♡.",
        "I'm not a direct person, so I try to say things subtly to my friends... And I get a bit pouty sometimes~": "They also say I'm pouty! But in a cute way... Or so they say. I'm sure we'd understand each other perfectly without needing words!",
        "Dramas, candy crush, sweet snacks...": "For me the perfect plan is staying home watching my favorite dramas, eating garlic bread and not going out at all... literally I only go out three times a year hahaha.",
        "Fantasy! Series, books, movies... and STAYC ♡": "Aww ~ For me STAYC can't be missing, my SWITH, mint choco (I'm the captain of team민초단), Crayon Shin-chan, romance dramas, and being able to stay home 🦊.",
      },
      "assets/avatars/sumin.webp": {
        "My energy is calm but firm, like when I practice in silence and suddenly get serious without warning.": "Ah, so we're alike... that calm that seems soft but works hard inside, 맞지?",
        "In friendship I'm the one who takes care, makes bad jokes, remembers details... but also the one who trips first.": "That sounds just like me... taking care and joking while tripping a bit, I like your vibe.",
        "A perfect Sunday is good food, a nice drama, playing with keropi... and resting at home in pajamas.": "You like keropi? Me too! There's nothing I like more than keropi! Except SWITH, hehe.",
        "In my world there's Girl's Generation music, delicious food, a little bit of adorable chaos...": "Ah, so our worlds are alike... that makes me feel closer to you, SWITH.",
      },
      "assets/avatars/sieun.webp": {
        "Active; when I do something, I do it with all my energy.": "Ah ~ I think we'd understand each other very well... Although I'm actually quite calm and tranquil; I reflect on things a lot.",
        "Direct and clear, I don't beat around the bush.": "That's right! Honesty is something I value a lot. I also think I tend to be very responsible and organized in my relationships with other people; I like doing things well.",
        "Planning my next trip to a majestic city like LA or similar.": "Ohhh, I love Los Angeles ~ It's definitely one of my favorite cities in the world.",
        "My headphones, organization, and STAYC's music ♡.": "For me... STAYC, SWITH, IU... And also music and organization, haha 🐩",
      },
      "assets/avatars/yoon.webp": {
        "Pure energy! I'm hyperactive, playful, and the life of the party.": "Wooow you're just like me! My members always laugh with me.",
        "Playful; I'm always hugging my friends or looking to play with them.": "You're adorable! I'm sure it's impossible to get bored with you.",
        "Video games, anime, consuming k-pop content.": "WHAT! Really? We have to play together someday, this is destiny! What do you play?",
        "My favorite k-pop group, my video games, my favorite snacks, my friends, and STAYC ♡.": "OMG you have INCREDIBLE taste! I think you just became my favorite person hahaha",
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

  const addBotMessage = (text, withTyping = true, onDisplayed) => {
    const handleDisplayed = () => {
      if (typeof onDisplayed === "function") {
        onDisplayed();
      }
    };

    if (!withTyping) {
      addBotBubble(text);
      handleDisplayed();
      return;
    }

    const indicator = showTypingIndicator();
    schedule(() => {
      indicator.remove();
      addBotBubble(text);
      handleDisplayed();
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
    addBotMessage("¡Listo! Gracias por jugar. ¿Quieres reiniciar?", true, () => {
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
    });
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
    addBotMessage("Entendido. Cuando quieras empezar a jugar, aquí estaré. ✨", true, () => {
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
    });
  };

  const askCurrentStep = () => {
    const step = chatFlow[stepIndex];
    if (!step) {
      renderCompletion();
      return;
    }

    addBotMessage(step.prompt, true, () => {
      renderOptions(step.options);
    });
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
    addBotMessage(introMessage, true, () => {
      renderStartOptions();
    });
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