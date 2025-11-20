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
      prompt: "What visual style fits you best?",
      options: [
        "Cute, colorful, and bursting with happy vibes.",
    "Elegant and minimalist, with sophisticated details.",
    "Dark/edgy, with a rebellious edge.",
    "Retro pop, with a nostalgic touch.",
  ],
},
{
  prompt: "What type of music do you imagine for your ideal comeback?",
  options: [
    "A summery and refreshing anthem.",
    "A powerful and girl crush sound.",
    "Something playful and catchy to lift your mood.",
    "An emotional ballad/mid-tempo.",
  ],
},
  ];

  const FIRST_TIME_MESSAGE = "¡Bienvenida! ¿Quieres empezar a jugar y descubrir tu vibra STAYC? 💖";
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
    sobad: "SO BAD album",
    stereotype: "STEREOTYPE album",
    asap: "ASAP album",
    weneedlove: "WE NEED LOVE album",
    teenfresh: "TEENFRESH album",
    metamorphic: "METAMORPHIC album",
    iwantit: "I WANT IT album",
    s: "[S] album",
    teddybear: "Teddy Bear album",
    youngluv: "Young Luv album"
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
    "Cute, colorful, and bursting with happy vibes.": ["iwantit", "asap", "teddybear"],
    "Elegant and minimalist, with sophisticated details.": ["metamorphic", "s"],
    "Dark/edgy, with a rebellious edge.": ["s", "sobad", "youngluv"],
    "Retro pop, with a nostalgic touch.": ["weneedlove", "stereotype"],
    "A summery and refreshing anthem.": ["iwantit", "teenfresh"],
    "A powerful and girl crush sound.": ["metamorphic", "s", "sobad", "youngluv"],
    "Something playful and catchy to lift your mood.": ["iwantit", "teddybear"],
    "An emotional ballad/mid-tempo.": ["weneedlove", "stereotype"],
  };

  const photocardConfig = {
    sobad: true,
    stereotype: true,
    asap: true,
    weneedlove: true,
    teenfresh: true,
    metamorphic: true,
    iwantit: true,
    s: true,
    teddybear: true,
    youngluv: true,
  };

  const buildPath = (album, member, variant) => {
    const ext = variant === "s" ? "png" : "jpg";
    return `assets/photocards/${album}/${member}${variant}.${ext}`;
  };

  const getMemberPool = (album, member) => {
    if (!photocardConfig[album]) return null;

    const variants = ["a", "b", "s"];

    const base = variants
      .filter(v => v !== "s")
      .map(v => buildPath(album, member, v));

    const special = buildPath(album, member, "s");

    return { base, special };
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
        "SWITH! 🐱 I'm so glad to see you here~ Do you want to find out which STAYC photocard represents you? It'll be fun getting to know you better.",
    },
    "assets/avatars/j.webp": {
      firstTime:
        "SWITH! 🐶 Hi hi! I'm so happy to see you here~ Want to find out which STAYC photocard you are? I'm sure you're gonna love the result!",
    },
    "assets/avatars/seeun.webp": {
      firstTime:
        "SWITH! 🦊 Hi hi~ I'm so happy to see you here. Would you like to find out which STAYC photocard represents you? It's going to be fun, I promise.",
    },
    "assets/avatars/sumin.webp": {
      firstTime:
        "SWITH! 🐰 Hello hello~ I'm really happy you're here. Want to discover which STAYC photocard represents you? It's going to be special, I think you'll like it",
    },
    "assets/avatars/sieun.webp": {
      firstTime:
        "SWITH! 🐩 I'm glad to see you~ Want to find out which STAYC photocard represents you? It's going to be interesting getting to know you better",
    },
    "assets/avatars/yoon.webp": {
      firstTime:
        "SWITH! 🐯 Hi hiii! I'm so happy to see you here~ Want to find out which STAYC photocard represents you? It's gonna be super fun, I promise!",
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

  const resolveAssetUrl = (url) => {
    if (!url) return url;
    try {
      return new URL(url, window.location.href).toString();
    } catch (error) {
      console.warn("No se pudo resolver la ruta de la photocard", url, error);
      return url;
    }
  };

  const readBlobAsDataUrl = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  const decodeImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    let settled = false;
    img.crossOrigin = "anonymous";

    const finish = () => {
      if (!settled) {
        settled = true;
        resolve(img);
      }
    };

    img.onload = finish;
    img.onerror = reject;
    img.src = src;

    if (img.decode) {
      img.decode().then(finish).catch(reject);
    }
  });

  const convertImageToDataUrl = async (img) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    try {
      return canvas.toDataURL("image/png");
    } catch (error) {
      throw new Error("No se pudo preparar la photocard para compartir");
    }
  };

  const loadPhotocardImage = async (url) => {
    const resolvedUrl = resolveAssetUrl(url);
    if (photocardImageCache.has(resolvedUrl)) {
      return photocardImageCache.get(resolvedUrl);
    }

    const tryFetchDecode = async () => {
      const response = await fetch(resolvedUrl, { cache: "force-cache" });
      if (!response.ok) {
        throw new Error(`No se pudo cargar la photocard (${response.status})`);
      }
      const blob = await response.blob();
      const dataUrl = await readBlobAsDataUrl(blob);
      return decodeImage(dataUrl);
    };

    const tryImageFallback = async () => {
      const rawImage = await decodeImage(resolvedUrl);
      const safeDataUrl = await convertImageToDataUrl(rawImage);
      return decodeImage(safeDataUrl);
    };

    let image;
    try {
      image = await tryFetchDecode();
    } catch (fetchError) {
      console.warn("Fallo al cargar la photocard con fetch, usando alternativa", fetchError);
      image = await tryImageFallback();
    }

    photocardImageCache.set(resolvedUrl, image);
    return image;
  };

  const pickPhotocard = (member, album) => {
    const pool = getMemberPool(album, member);
    if (!pool) return null;

    const { base, special } = pool;

    const roll = Math.random();

    // 5% de probabilidad especial
    if (roll <= 0.05) {
      return { url: special, variant: "S" };
    }

    // Selección normal
    const idx = Math.floor(Math.random() * base.length);
    const chosen = base[idx];
    const variant = idx === 1 ? "B" : "A";

    return { url: chosen, variant };
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
    clearOptions();

    const share = document.createElement("button");
    share.type = "button";
    share.className = "chat-option";
    share.textContent = "Generate Image and Share!";
    share.addEventListener("click", async () => {
      share.disabled = true;
      const previousLabel = share.textContent;
      share.textContent = "Generando...";

      try {
        const imageUrl = await generatePhotocardShareImage();
        if (imageUrl) {
          schedule(() => {
            addSharePreview(imageUrl);
          }, 200);
        } else {
          addBotMessage("Todavía no hay una photocard para generar. Completa el quiz primero. ✨");
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
    close.textContent = "Close chat";
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

    const introText = `Finding the photocard that feels like you… ☁️`;
    console.log(photocard)

    lastPhotocardResult = photocard
      ? { member, memberLabel, album, albumLabel, photocardUrl: photocard.url, variant: photocard.variant }
      : null;

    addBotMessage(introText, true, () => {
      if (photocard) {
        schedule(() => {
          addPhotocardBubble(`Photocard ${memberLabel} from (${albumLabel})`, photocard.url);
        }, 320);
      }

      schedule(() => {
        addBotMessage("Share your result with other SWITHs! Your photocard deserves the spotlight! 💞", true, () => {
          renderCompletion();
        });
      }, 900);
    });
  };

  const addSharePreview = (imageUrl) => {
    clearOptions();

    const wrapper = document.createElement("div");
    wrapper.className = "chat-message bot";

    const avatar = document.createElement("div");
    avatar.className = "chat-avatar-small";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble share-preview";

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "Shareable Photocard Result";
    image.className = "share-preview-image";

    const download = document.createElement("a");
    download.href = imageUrl;
    download.download = "stayc-photocard-ranking.png";
    download.className = "share-download";
    download.textContent = "Download image";

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

    const drawRoundedRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    const backgroundGradient = ctx.createLinearGradient(0, 0, 0, height);
    backgroundGradient.addColorStop(0, "#f8f1f6");
    backgroundGradient.addColorStop(1, "#f3f6fb");
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, width, height);

    const headerBadgeWidth = 320;
    const headerBadgeHeight = 62;
    ctx.fillStyle = "#fce7f3";
    drawRoundedRect((width - headerBadgeWidth) / 2, 96, headerBadgeWidth, headerBadgeHeight, 18);
    ctx.fill();

    ctx.fillStyle = "#be185d";
    ctx.textAlign = "center";
    ctx.font = "bold 24px Poppins, sans-serif";
    ctx.fillText("QUIZ RESULT ☁️", width / 2, 136);

    ctx.fillStyle = "#d9468d";
    ctx.font = "bold 64px Poppins, sans-serif";
    ctx.fillText("Your Photocard Reveal", width / 2, 230);

    ctx.fillStyle = "#6b7280";
    ctx.font = "26px Poppins, sans-serif";
    ctx.fillText("Here’s the photocard that feels like you", width / 2, 278);

    const cardX = 120;
    const cardY = 360;
    const cardWidth = width - cardX * 2;
    const cardHeight = 1240;
    ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 24;
    ctx.fillStyle = "#ffffff";
    drawRoundedRect(cardX, cardY, cardWidth, cardHeight, 32);
    ctx.fill();
    ctx.shadowColor = "transparent";

    const photoFrameX = cardX + 140;
    const photoFrameY = cardY + 160;
    const photoFrameWidth = cardWidth - 280;
    const photoFrameHeight = 820;
    const photoFrameGradient = ctx.createLinearGradient(photoFrameX, photoFrameY, photoFrameX, photoFrameY + photoFrameHeight);
    photoFrameGradient.addColorStop(0, "#fdf2f8");
    photoFrameGradient.addColorStop(1, "#f4f5fb");
    ctx.fillStyle = photoFrameGradient;
    drawRoundedRect(photoFrameX, photoFrameY, photoFrameWidth, photoFrameHeight, 28);
    ctx.fill();

    if (variant === "s") {
      const badgeWidth = 400;
      const badgeHeight = 64;
      const badgeX = width / 2 - badgeWidth / 2;
      const badgeY = photoFrameY - 46;
      ctx.fillStyle = "#fde68a";
      drawRoundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 20);
      ctx.fill();

      ctx.fillStyle = "#92400e";
      ctx.font = "bold 24px Poppins, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Special POB Version", width / 2, badgeY + 42);
    }

    const photo = await loadPhotocardImage(photocardUrl);
    const availableWidth = photoFrameWidth - 200;
    const availableHeight = photoFrameHeight - 200;
    const ratio = Math.min(availableWidth / photo.width, availableHeight / photo.height);
    const drawWidth = photo.width * ratio;
    const drawHeight = photo.height * ratio;
    const imageX = photoFrameX + (photoFrameWidth - drawWidth) / 2;
    const imageY = photoFrameY + (photoFrameHeight - drawHeight) / 2;

    ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
    ctx.shadowBlur = 26;
    ctx.shadowOffsetY = 18;
    drawRoundedRect(imageX - 6, imageY - 6, drawWidth + 12, drawHeight + 12, 24);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.shadowColor = "transparent";

    ctx.drawImage(photo, imageX, imageY, drawWidth, drawHeight);

    ctx.fillStyle = "#0f172a";
    ctx.textAlign = "center";
    ctx.font = "bold 40px Poppins, sans-serif";
    ctx.fillText(memberLabel, width / 2, photoFrameY + photoFrameHeight + 90);

    ctx.fillStyle = "#6b7280";
    ctx.font = "22px Poppins, sans-serif";
    ctx.fillText(albumLabel, width / 2, photoFrameY + photoFrameHeight + 134);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "20px Poppins, sans-serif";
    ctx.fillText("Generated with 🧡 for STAYC and SWITH", width / 2, height - 120);

    // Badge semitransparente bajo el texto
    const linkW = 340;
    const linkH = 44;
    const linkX = width / 2 - linkW / 2;
    const linkY = height - 104; // ligeramente más abajo que el texto anterior

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    drawRoundedRect(linkX, linkY, linkW, linkH, 14);
    ctx.fill();

    ctx.fillStyle = "#475569";
    ctx.font = "bold 20px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("staycrank.github.io", width / 2, linkY + 30);

    return shareCanvas.toDataURL("image/png");
  };

  const renderStartOptions = () => {
    clearOptions();

    const yesOption = document.createElement("button");
    yesOption.type = "button";
    yesOption.className = "chat-option";
    yesOption.textContent = "Yes";
    yesOption.addEventListener("click", () => {
      addUserMessage("Yes");
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
    addBotMessage("Understood! Whenever you want to start playing, I'll be here waiting. ✨", true, () => {
      clearOptions();

      const restart = document.createElement("button");
      restart.type = "button";
      restart.className = "chat-option";
      restart.textContent = "Restart quiz!";
      restart.addEventListener("click", startConversation);

      const close = document.createElement("button");
      close.type = "button";
      close.className = "chat-option";
      close.textContent = "Close chat";
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
    if (!avatarIntro) {
      return FIRST_TIME_MESSAGE;
    }

    return avatarIntro.firstTime || FIRST_TIME_MESSAGE;
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