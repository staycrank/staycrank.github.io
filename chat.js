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
    {
      prompt: "¿Qué estilo visual encaja mejor contigo?",
      options: [
        "Cute, colorido y con una vibra alegre",
        "Elegante y minimalista, con detalles sofisticados",
        "Oscuro/edgy, con un punto rebelde",
        "Retro pop, con un toque nostálgico",
      ],
    },
    {
      prompt: "¿Qué tipo de música te imaginas para tu comeback ideal?",
      options: [
        "Un himno veraniego y refrescante",
        "Un sonido powerful y girl crush",
        "Algo juguetón y pegadizo para subir el ánimo",
        "Una balada/medio tiempo emotiva",
      ],
    },
  ];

  const VISITOR_COOKIE = "stayc_chat_visitor";
  const COMPLETED_COOKIE = "stayc_chat_completed";
  const FIRST_TIME_MESSAGE = "¡Bienvenida! ¿Quieres empezar a jugar y descubrir tu vibra STAYC? 💖";
  const RETURNING_MESSAGE = "¡Hola de nuevo! Ya hiciste el test, ¿quieres volver a jugar?";
  let stepIndex = 0;
  const memberScores = {
    isa: 0,
    j: 0,
    seeun: 0,
    sumin: 0,
    sieun: 0,
    yoon: 0,
  };
  const preferredAlbums = new Set();
  const avatarChoices = [
    "assets/avatars/isa.webp",
    "assets/avatars/j.webp",
    "assets/avatars/seeun.webp",
    "assets/avatars/sumin.webp",
    "assets/avatars/sieun.webp",
    "assets/avatars/yoon.webp",
  ];

  const albumLabels = {
    sobad: "SO BAD era",
    stereotype: "STEREOTYPE era",
    asap: "ASAP era",
    weneedlove: "WE NEED LOVE era",
    teenfresh: "TEENFRESH era",
    metamorphic: "METAMORPHIC era",
  };

  const memberLabels = {
    isa: "Isa",
    j: "J",
    seeun: "Seeun",
    sumin: "Sumin",
    sieun: "Sieun",
    yoon: "Yoon",
  };

  const optionMemberMap = {
    "I might seem cold at first, but I'm actually very warm and I laugh a lot.": "isa",
    "My energy is calm but firm, like when I practice in silence and suddenly get serious without warning.": "sumin",
    "Active; when I do something, I do it with all my energy.": "sieun",
    "Super energetic with my friends! And with a very powerful laugh. But I also have my calm moments.": "j",
    "Pure energy! I'm hyperactive, playful, and the life of the party.": "yoon",
    "I look calm, but when I'm comfortable I have a 4D personality and I'm very playful.": "seeun",
    "I'm the one who listens, smiles with you, and gives you strength without you even realizing it.": "isa",
    "I'm not a direct person, so I try to say things subtly to my friends... And I get a bit pouty sometimes~": "seeun",
    "I try to give encouragement and support to my friends, especially by making them laugh and saying nice things to them.": "j",
    "I'm like the mom of my friend group; I'm always looking out for their well-being.": "isa",
    "Playful; I'm always hugging my friends or looking to play with them.": "yoon",
    "In friendship I'm the one who takes care, makes bad jokes, remembers details... but also the one who trips first.": "sumin",
    "Going out to a café to talk with a friend for hours!": "isa",
    "Planning my next trip to a majestic city like LA or similar.": "sieun",
    "A perfect Sunday is good food, a nice drama, playing with keropi... and resting at home in pajamas.": "sumin",
    "Video games, anime, consuming k-pop content.": "yoon",
    "Anything related to animals! They're adorable... Maybe going to a cat café?": "j",
    "Dramas, candy crush, sweet snacks...": "seeun",
    "Music, a good coffee, shopping, friends... and STAYC ♡.": "isa",
    "My favorite k-pop group, my video games, my favorite snacks, my friends, and STAYC ♡.": "yoon",
    "The important people in my life, animals, and STAYC ♡.": "j",
    "My headphones, organization, and STAYC's music ♡.": "sieun",
    "In my world there's Girl's Generation music, delicious food, a little bit of adorable chaos... and STAYC ♡": "sumin",
    "Fantasy! Series, books, movies... and STAYC ♡": "seeun",
  };

  const optionAlbumMap = {
    "Cute, colorido y con una vibra alegre": ["teenfresh", "asap"],
    "Elegante y minimalista, con detalles sofisticados": ["stereotype", "weneedlove"],
    "Oscuro/edgy, con un punto rebelde": ["metamorphic", "sobad"],
    "Retro pop, con un toque nostálgico": ["sobad", "asap"],
    "Un himno veraniego y refrescante": ["teenfresh", "weneedlove", "asap"],
    "Un sonido powerful y girl crush": ["metamorphic", "stereotype"],
    "Algo juguetón y pegadizo para subir el ánimo": ["sobad", "asap", "teenfresh"],
    "Una balada/medio tiempo emotiva": ["weneedlove", "stereotype"],
  };

  const photocardPool = {
    sobad: {
      isa: {
        base: [
          "assets/photocards/sobad/isad.jpg",
          "assets/photocards/sobad/isal.png",
        ],
        special: "assets/photocards/sobad/isas.png",
      },
      j: {
        base: [
          "assets/photocards/sobad/jd.jpg",
          "assets/photocards/sobad/jl.jpg",
        ],
        special: "assets/photocards/sobad/js.png",
      },
      seeun: {
        base: [
          "assets/photocards/sobad/seeund.jpg",
          "assets/photocards/sobad/seeunl.jpg",
        ],
        special: "assets/photocards/sobad/seeuns.png",
      },
      sieun: {
        base: [
          "assets/photocards/sobad/sieund.jpg",
          "assets/photocards/sobad/sieunl.jpg",
        ],
        special: "assets/photocards/sobad/sieuns.png",
      },
      sumin: {
        base: [
          "assets/photocards/sobad/sumind.jpg",
          "assets/photocards/sobad/suminl.jpg",
        ],
        special: "assets/photocards/sobad/sumins.png",
      },
      yoon: {
        base: [
          "assets/photocards/sobad/yoond.jpg",
          "assets/photocards/sobad/yoonl.jpg",
        ],
        special: "assets/photocards/sobad/yoons.png",
      },
    },
    stereotype: {
      isa: {
        base: [
          "assets/photocards/stereotype/isaa.jpg",
          "assets/photocards/stereotype/isab.jpg",
        ],
        special: "assets/photocards/stereotype/isas.png",
      },
      j: {
        base: [
          "assets/photocards/stereotype/ja.jpg",
          "assets/photocards/stereotype/jb.jpg",
        ],
        special: "assets/photocards/stereotype/js.png",
      },
      seeun: {
        base: [
          "assets/photocards/stereotype/seeuna.jpg",
          "assets/photocards/stereotype/seeunb.jpg",
        ],
        special: "assets/photocards/stereotype/seeuns.png",
      },
      sieun: {
        base: [
          "assets/photocards/stereotype/sieuna.jpg",
          "assets/photocards/stereotype/sieunb.jpg",
        ],
        special: "assets/photocards/stereotype/sieuns.png",
      },
      sumin: {
        base: [
          "assets/photocards/stereotype/sumina.jpg",
          "assets/photocards/stereotype/suminb.jpg",
        ],
        special: "assets/photocards/stereotype/sumins.png",
      },
      yoon: {
        base: [
          "assets/photocards/stereotype/yoona.jpg",
          "assets/photocards/stereotype/yoonb.jpg",
        ],
        special: "assets/photocards/stereotype/yoons.png",
      },
    },
    asap: {
      isa: {
        base: [
          "assets/photocards/asap/isaa.jpg",
          "assets/photocards/asap/isab.jpg",
        ],
        special: "assets/photocards/asap/isas.png",
      },
      j: {
        base: [
          "assets/photocards/asap/ja.jpg",
          "assets/photocards/asap/jb.jpg",
        ],
        special: "assets/photocards/asap/js.png",
      },
      seeun: {
        base: [
          "assets/photocards/asap/seeuna.jpg",
          "assets/photocards/asap/seeunb.jpg",
        ],
        special: "assets/photocards/asap/seeuns.png",
      },
      sieun: {
        base: [
          "assets/photocards/asap/sieuna.jpg",
          "assets/photocards/asap/sieunb.jpg",
        ],
        special: "assets/photocards/asap/sieuns.png",
      },
      sumin: {
        base: [
          "assets/photocards/asap/sumina.png",
          "assets/photocards/asap/suminb.jpg",
        ],
        special: "assets/photocards/asap/sumins.png",
      },
      yoon: {
        base: [
          "assets/photocards/asap/yoona.jpg",
          "assets/photocards/asap/yoonb.jpg",
        ],
        special: "assets/photocards/asap/yoons.png",
      },
    },
    weneedlove: {
      isa: {
        base: [
          "assets/photocards/weneedlove/isaa.jpg",
          "assets/photocards/weneedlove/isab.jpg",
        ],
        special: "assets/photocards/weneedlove/isas.png",
      },
      j: {
        base: [
          "assets/photocards/weneedlove/ja.jpg",
          "assets/photocards/weneedlove/jb.jpg",
        ],
        special: "assets/photocards/weneedlove/js.png",
      },
      seeun: {
        base: [
          "assets/photocards/weneedlove/seeuna.jpg",
          "assets/photocards/weneedlove/seeunb.jpg",
        ],
        special: "assets/photocards/weneedlove/seeuns.png",
      },
      sieun: {
        base: [
          "assets/photocards/weneedlove/sieuna.jpg",
          "assets/photocards/weneedlove/sieunb.jpg",
        ],
        special: "assets/photocards/weneedlove/sieuns.png",
      },
      sumin: {
        base: [
          "assets/photocards/weneedlove/sumina.jpg",
          "assets/photocards/weneedlove/suminb.jpg",
        ],
        special: "assets/photocards/weneedlove/sumins.png",
      },
      yoon: {
        base: [
          "assets/photocards/weneedlove/yoona.jpg",
          "assets/photocards/weneedlove/yoonb.jpg",
        ],
        special: "assets/photocards/weneedlove/yoons.png",
      },
    },
    teenfresh: {
      isa: {
        base: [
          "assets/photocards/teenfresh/isaa.jpg",
          "assets/photocards/teenfresh/isab.jpg",
        ],
        special: "assets/photocards/teenfresh/isas.png",
      },
      j: {
        base: [
          "assets/photocards/teenfresh/ja.jpg",
          "assets/photocards/teenfresh/jb.jpg",
        ],
        special: "assets/photocards/teenfresh/js.png",
      },
      seeun: {
        base: [
          "assets/photocards/teenfresh/seeuna.jpg",
          "assets/photocards/teenfresh/seeunb.jpg",
        ],
        special: "assets/photocards/teenfresh/seeuns.png",
      },
      sieun: {
        base: [
          "assets/photocards/teenfresh/sieuna.jpg",
          "assets/photocards/teenfresh/sieunb.jpg",
        ],
        special: "assets/photocards/teenfresh/sieuns.png",
      },
      sumin: {
        base: [
          "assets/photocards/teenfresh/sumina.jpg",
          "assets/photocards/teenfresh/suminb.jpg",
        ],
        special: "assets/photocards/teenfresh/sumins.png",
      },
      yoon: {
        base: [
          "assets/photocards/teenfresh/yoona.jpg",
          "assets/photocards/teenfresh/yoonb.jpg",
        ],
        special: "assets/photocards/teenfresh/yoons.png",
      },
    },
    metamorphic: {
      isa: {
        base: [
          "assets/photocards/metamorphic/isaa.jpg",
          "assets/photocards/metamorphic/isab.jpg",
        ],
        special: "assets/photocards/metamorphic/isas.png",
      },
      j: {
        base: [
          "assets/photocards/metamorphic/ja.jpg",
          "assets/photocards/metamorphic/jb.jpg",
        ],
        special: "assets/photocards/metamorphic/js.png",
      },
      seeun: {
        base: [
          "assets/photocards/metamorphic/seeuna.jpg",
          "assets/photocards/metamorphic/seeunb.jpg",
        ],
        special: "assets/photocards/metamorphic/seeuns.png",
      },
      sieun: {
        base: [
          "assets/photocards/metamorphic/sieuna.jpg",
          "assets/photocards/metamorphic/sieunb.jpg",
        ],
        special: "assets/photocards/metamorphic/sieuns.png",
      },
      sumin: {
        base: [
          "assets/photocards/metamorphic/sumina.jpg",
          "assets/photocards/metamorphic/suminb.jpg",
        ],
        special: "assets/photocards/metamorphic/sumins.png",
      },
      yoon: {
        base: [
          "assets/photocards/metamorphic/yoona.jpg",
          "assets/photocards/metamorphic/yoonb.jpg",
        ],
        special: "assets/photocards/metamorphic/yoons.png",
      },
    },
  };

  let lastPhotocardResult = null;
  const shareCanvas = document.createElement("canvas");
  shareCanvas.id = "photocard-share-canvas";
  shareCanvas.style.display = "none";
  document.body.appendChild(shareCanvas);
  const photocardImageCache = new Map();

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
        "In my world there's Girl's Generation music, delicious food, a little bit of adorable chaos... and STAYC ♡": "Ah, so our worlds are alike... that makes me feel closer to you, SWITH.",
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

  const avatarIntroMessages = {
    "assets/avatars/isa.webp": {
      firstTime:
        "¡Hola! Soy Isa. ¿Te animas a descubrir juntas qué vibra STAYC compartimos hoy? 💄",
      returning:
        "¡Holiii, volvió Isa! Ya hicimos el test antes, ¿lo repetimos para ver si cambió tu vibra?",
    },
    "assets/avatars/j.webp": {
      firstTime:
        "¡Hey, soy J! Tengo mil preguntas para ti, ¿empezamos el quiz y vemos si coincidimos en energía? ✨",
      returning:
        "¡Siii, regresaste! Soy J otra vez. Ya lo jugamos, pero podemos repetirlo y seguir riendo juntas.",
    },
    "assets/avatars/seeun.webp": {
      firstTime:
        "¡Hola, soy Seeun! Vamos a jugar con calma y descubrir tu vibra STAYC, ¿sí? 🦊",
      returning:
        "SWITH linda, soy Seeun de nuevo~ Si quieres podemos rehacer el test y charlar otro ratito.",
    },
    "assets/avatars/sumin.webp": {
      firstTime:
        "Soy Sumin. Preparé este juego para conocerte mejor, ¿lista para empezar ahora mismo? ☕",
      returning:
        "Hola otra vez, habla Sumin. Ya completamos el quiz, pero podemos intentarlo de nuevo si quieres ♡",
    },
    "assets/avatars/sieun.webp": {
      firstTime:
        "Sieun aquí. Me encantaría saber todo sobre tu vibra, ¿le damos al quiz? 🎤",
      returning:
        "¡Reunión de nuevo! Soy Sieun. Ya tienes resultados, pero podemos compararlos si repetimos el test.",
    },
    "assets/avatars/yoon.webp": {
      firstTime:
        "¡Hii, soy Yoon! Estoy lista para jugar y descubrir tu vibra STAYC, ¿vienes conmigo? 💛",
      returning:
        "¡Yoon está de vuelta! Si quieres seguimos jugando el quiz hasta que encontremos tu mood perfecto~",
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

  const resetMemberScores = () => {
    Object.keys(memberScores).forEach((key) => {
      memberScores[key] = 0;
    });
  };

  const addPreferredAlbums = (choice) => {
    const albums = optionAlbumMap[choice];
    if (!albums) {
      return;
    }
    albums.forEach((album) => preferredAlbums.add(album));
  };

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
    if (!messages) {
      return;
    }

    const stick = () => {
      messages.scrollTop = messages.scrollHeight;
    };

    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(stick);
    } else {
      stick();
    }
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

  const addPhotocardBubble = (text, imageUrl) => {
    const wrapper = document.createElement("div");
    wrapper.className = "chat-message bot";

    const avatar = document.createElement("div");
    avatar.className = "chat-avatar-small";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble photocard-bubble";

    const content = document.createElement("p");
    content.textContent = text;

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = text;
    image.className = "photocard-preview";

    bubble.appendChild(content);
    bubble.appendChild(image);
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

  const addMemberScore = (choice) => {
    const memberKey = optionMemberMap[choice];
    if (memberKey && typeof memberScores[memberKey] === "number") {
      memberScores[memberKey] += 1;
    }
  };

  const chooseRandom = (list) => list[Math.floor(Math.random() * list.length)];

  const getTopMember = () => {
    const scores = Object.entries(memberScores);
    const maxScore = Math.max(...scores.map(([, score]) => score));
    const topMembers = scores
      .filter(([, score]) => score === maxScore)
      .map(([member]) => member);
    return chooseRandom(topMembers);
  };

  const getAlbumChoice = () => {
    if (preferredAlbums.size === 0) {
      return chooseRandom(Object.keys(albumLabels));
    }
    const albumList = Array.from(preferredAlbums);
    return chooseRandom(albumList);
  };

  const loadPhotocardImage = (url) => {
    if (photocardImageCache.has(url)) {
      return Promise.resolve(photocardImageCache.get(url));
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        photocardImageCache.set(url, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const pickPhotocard = (member, album) => {
    const albumPool = photocardPool[album];
    if (!albumPool || !albumPool[member]) {
      return null;
    }

    const { base = [], special } = albumPool[member];
    const roll = Math.random();

    if (special && roll <= 0.05) {
      return { url: special, variant: "S" };
    }

    const baseOptions = base.length ? base : special ? [special] : [];
    if (!baseOptions.length) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * baseOptions.length);
    const chosenBase = baseOptions[randomIndex];
    const variant = randomIndex === 1 ? "B" : "A";
    return { url: chosenBase, variant };
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

  const clearOptions = () => {
    optionsContainer.innerHTML = "";
    optionsContainer.scrollTop = 0;
    scrollToBottom();
  };

  const renderOptions = (options) => {
    clearOptions();

    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chat-option";
      button.textContent = option;
      button.addEventListener("click", () => handleOption(option));
      optionsContainer.appendChild(button);
    });

    scrollToBottom();
  };

  const renderCompletion = () => {
    markQuizCompleted();
    clearOptions();

    const share = document.createElement("button");
    share.type = "button";
    share.className = "chat-option";
    share.textContent = "Compartir";
    share.addEventListener("click", async () => {
      share.disabled = true;
      const previousLabel = share.textContent;
      share.textContent = "Generando...";

      try {
        const imageUrl = await generatePhotocardShareImage();
        if (imageUrl) {
          schedule(() => {
            addBotMessage("¡Imagen lista para compartir! Descárgala y súbela a tus redes. 💖", true, () => {
              addSharePreview(imageUrl);
            });
          }, 200);
        } else {
          addBotMessage("Todavía no hay una photocard para compartir. Completa el quiz primero. ✨");
        }
      } catch (error) {
        console.error("Error generating photocard share image", error);
        addBotMessage("No pude crear la imagen ahora mismo. Inténtalo de nuevo en unos segundos. ✨");
      } finally {
        share.disabled = false;
        share.textContent = previousLabel;
      }
    });

    const close = document.createElement("button");
    close.type = "button";
    close.className = "chat-option";
    close.textContent = "Cerrar chat";
    close.addEventListener("click", () => {
      closeChat();
    });

    optionsContainer.appendChild(share);
    optionsContainer.appendChild(close);
    scrollToBottom();
  };

  const showPhotocardResult = () => {
    const member = getTopMember();
    const album = getAlbumChoice();
    const memberLabel = memberLabels[member] || member;
    const albumLabel = albumLabels[album] || album;
    const photocard = pickPhotocard(member, album);

    const introText = `¡Listo! Hoy tu vibra STAYC es ${memberLabel} en la era ${albumLabel}.`;

    lastPhotocardResult = photocard
      ? { member, memberLabel, album, albumLabel, photocardUrl: photocard.url, variant: photocard.variant }
      : null;

    addBotMessage(introText, true, () => {
      if (photocard) {
        schedule(() => {
          addPhotocardBubble(`Photocard ${memberLabel} (${photocard.variant} ver.)`, photocard.url);
        }, 320);
      }

      schedule(() => {
        addBotMessage("¿Quieres compartir tu photocard?", true, () => {
          renderCompletion();
        });
      }, 900);
    });
  };

  const addSharePreview = (imageUrl) => {
    const wrapper = document.createElement("div");
    wrapper.className = "chat-message bot";

    const avatar = document.createElement("div");
    avatar.className = "chat-avatar-small";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble share-preview";

    const content = document.createElement("p");
    content.textContent = "Descarga y comparte tu photocard";

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "Imagen para compartir";
    image.className = "share-preview-image";

    const download = document.createElement("a");
    download.href = imageUrl;
    download.download = "stayc-photocard.png";
    download.className = "share-download";
    download.textContent = "Descargar imagen";

    bubble.appendChild(content);
    bubble.appendChild(image);
    bubble.appendChild(download);

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    scrollToBottom();
  };

  const generatePhotocardShareImage = async () => {
    if (!lastPhotocardResult || !lastPhotocardResult.photocardUrl) {
      return null;
    }

    const { memberLabel, albumLabel, photocardUrl, variant } = lastPhotocardResult;

    const width = 1080;
    const height = 1920;
    shareCanvas.width = width;
    shareCanvas.height = height;
    const ctx = shareCanvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#ff7eb3");
    gradient.addColorStop(1, "#6c63ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    ctx.ellipse(width * 0.75, height * 0.08, 220, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width * 0.25, height * 0.85, 260, 140, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("STAYC Photocard Quiz", width / 2, 110);

    ctx.font = "28px Poppins, sans-serif";
    ctx.fillText(`Tu vibra: ${memberLabel}`, width / 2, 170);
    ctx.font = "24px Poppins, sans-serif";
    ctx.fillText(albumLabel, width / 2, 215);

    const cardX = 160;
    const cardY = 260;
    const cardWidth = width - 320;
    const cardHeight = 1200;
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 18;
    ctx.fillRect(cardX, cardY, cardWidth, cardHeight);
    ctx.shadowColor = "transparent";

    const framePadding = 60;
    const imageMaxWidth = cardWidth - framePadding * 2;
    const imageMaxHeight = cardHeight - framePadding * 2 - 120;
    const photo = await loadPhotocardImage(photocardUrl);
    const ratio = Math.min(imageMaxWidth / photo.width, imageMaxHeight / photo.height);
    const drawWidth = photo.width * ratio;
    const drawHeight = photo.height * ratio;
    const imageX = cardX + (cardWidth - drawWidth) / 2;
    const imageY = cardY + 90;

    ctx.drawImage(photo, imageX, imageY, drawWidth, drawHeight);

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 30px Poppins, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(memberLabel, cardX + framePadding, cardY + 58);

    ctx.fillStyle = "#6c63ff";
    ctx.font = "24px Poppins, sans-serif";
    ctx.fillText(albumLabel, cardX + framePadding, cardY + 98);

    ctx.fillStyle = "#ff5fa2";
    ctx.font = "bold 22px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`Versión ${variant}`, width / 2, cardY + cardHeight - 30);

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Comparte tu vibra STAYC ✨", width / 2, height - 80);

    return shareCanvas.toDataURL("image/png");
  };

  const renderStartOptions = () => {
    clearOptions();

    const yesOption = document.createElement("button");
    yesOption.type = "button";
    yesOption.className = "chat-option";
    yesOption.textContent = "Sí";
    yesOption.addEventListener("click", () => {
      addUserMessage("Sí");
      clearOptions();
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
      clearOptions();
      schedule(() => {
        renderEarlyExit();
      }, 280);
    });

    optionsContainer.appendChild(yesOption);
    optionsContainer.appendChild(noOption);
  };

  const renderEarlyExit = () => {
    clearOptions();
    addBotMessage("Entendido. Cuando quieras empezar a jugar, aquí estaré. ✨", true, () => {
      clearOptions();

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
      scrollToBottom();
    });
  };

  const askCurrentStep = () => {
    const step = chatFlow[stepIndex];
    if (!step) {
      return;
    }

    clearOptions();
    addBotMessage(step.prompt, true, () => {
      renderOptions(step.options);
    });
  };

  const handleOption = (choice) => {
    addUserMessage(choice);
    clearOptions();
    const avatarReactions = avatarMatchReplies[currentAvatar] || {};
    const reactionReply = avatarReactions[choice];

    addMemberScore(choice);
    addPreferredAlbums(choice);

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
        showPhotocardResult();
      }, delayBeforeNext);
    }
  };

  const pickAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarChoices.length);
    const chosenAvatar = avatarChoices[randomIndex];
    currentAvatar = chosenAvatar;
    chatbox.style.setProperty("--chat-avatar-url", `url("${chosenAvatar}")`);
  };

  const getIntroMessage = () => {
    const avatarIntro = avatarIntroMessages[currentAvatar];
    const fallback = hasCompletedQuiz() ? RETURNING_MESSAGE : FIRST_TIME_MESSAGE;
    if (!avatarIntro) {
      return fallback;
    }

    return hasCompletedQuiz()
      ? avatarIntro.returning || RETURNING_MESSAGE
      : avatarIntro.firstTime || FIRST_TIME_MESSAGE;
  };

  const startConversation = () => {
    clearScheduledResponses();
    removeTypingIndicators();
    resetMemberScores();
    preferredAlbums.clear();
    lastPhotocardResult = null;
    pickAvatar();
    messages.innerHTML = "";
    clearOptions();
    stepIndex = 0;
    shouldStartNewSession = false;
    ensureVisitorId();
    addBotMessage(getIntroMessage(), true, () => {
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
    clearOptions();
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