// Get base URL for absolute paths
const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1)

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
      prompt: "A totally free day with nothing scheduled. What happens?",
      options: [
        "I become one with my bed, then order sushi and ask everyone for a movie to watch.",
        "Clean, do the laundry, then lie down and binge an anime. Being at home is the best.",
        "A bike ride, an einspänner, and a musical or a movie if I can fit one in.",
        "Play with slime, watch a drama, and promise I'll tidy my room tomorrow.",
        "Build Lego or a DIY kit with a Marvel movie on in the background.",
        "Eat something delicious the moment I wake up, then pass out from a food coma.",
      ],
    },
    {
      prompt: "A friend asks: what should we eat?",
      options: [
        "Sushi. Salmon and beef. Nothing else is as easy and delicious.",
        "Whatever I'm craving that I probably shouldn't have. Chicken? Malatang?",
        "I've had a list all week: spicy pork trotters, cold soy noodles, and coffee after.",
        "Pork belly at a place with great reviews. Eating well together is twice the happiness.",
        "I say I'll hold back, then I'm up at midnight cooking ramen. Sorry, I lost.",
        "The trending thing nobody's tried yet. Ube latte? Spicy raw-beef noodles? Let's go.",
      ],
    },
    {
      prompt: "How do you show people you care?",
      options: [
        "Reminders: wear sunscreen, drink water, check the weather before you go out.",
        "I tell them not to doubt themselves, and that I'll cheer the loudest.",
        "I say thank you, a lot. Every day feels full of things to be grateful for.",
        "A short 'I luv you' and a good night, every single day.",
        "Full energy: you worked hard today, let's go, let's do our best tomorrow!!",
        "I tease them. Actually I'm not sorry. Love me like this too.",
      ],
    },
    {
      prompt: "It's pouring rain. You...",
      options: [
        "Put on rain boots and wonder if I should just go out and get soaked for fun.",
        "Stay in. Sun by day, bugs by night, rain all week: this is why home wins.",
        "Beg the sky to stop, because I have somewhere important to be tonight.",
        "Slip on the wet stairs, then still plan to wear my rain boots twice this season.",
        "Prepare thoroughly for the storm, and then it doesn't rain at all.",
        "Feel smug about the dehumidifier I bought ahead of the rainy season.",
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
  let sessionFlow = chatFlow;
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
    youngluv: "Young Luv album",
    stayalive: "Stay Alive album"
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
    "I become one with my bed, then order sushi and ask everyone for a movie to watch.": "isa",
    "Clean, do the laundry, then lie down and binge an anime. Being at home is the best.": "sumin",
    "A bike ride, an einspänner, and a musical or a movie if I can fit one in.": "sieun",
    "Play with slime, watch a drama, and promise I'll tidy my room tomorrow.": "seeun",
    "Build Lego or a DIY kit with a Marvel movie on in the background.": "yoon",
    "Eat something delicious the moment I wake up, then pass out from a food coma.": "j",
    "Sushi. Salmon and beef. Nothing else is as easy and delicious.": "isa",
    "Whatever I'm craving that I probably shouldn't have. Chicken? Malatang?": "sumin",
    "I've had a list all week: spicy pork trotters, cold soy noodles, and coffee after.": "sieun",
    "Pork belly at a place with great reviews. Eating well together is twice the happiness.": "seeun",
    "I say I'll hold back, then I'm up at midnight cooking ramen. Sorry, I lost.": "yoon",
    "The trending thing nobody's tried yet. Ube latte? Spicy raw-beef noodles? Let's go.": "j",
    "Reminders: wear sunscreen, drink water, check the weather before you go out.": "isa",
    "I tell them not to doubt themselves, and that I'll cheer the loudest.": "sumin",
    "I say thank you, a lot. Every day feels full of things to be grateful for.": "sieun",
    "A short 'I luv you' and a good night, every single day.": "seeun",
    "Full energy: you worked hard today, let's go, let's do our best tomorrow!!": "yoon",
    "I tease them. Actually I'm not sorry. Love me like this too.": "j",
    "Put on rain boots and wonder if I should just go out and get soaked for fun.": "isa",
    "Stay in. Sun by day, bugs by night, rain all week: this is why home wins.": "sumin",
    "Beg the sky to stop, because I have somewhere important to be tonight.": "sieun",
    "Slip on the wet stairs, then still plan to wear my rain boots twice this season.": "seeun",
    "Prepare thoroughly for the storm, and then it doesn't rain at all.": "yoon",
    "Feel smug about the dehumidifier I bought ahead of the rainy season.": "j",
  };

  const optionAlbumMap = {
    "Cute, colorful, and bursting with happy vibes.": ["iwantit", "asap", "teddybear", "stayalive"],
    "Elegant and minimalist, with sophisticated details.": ["metamorphic", "s"],
    "Dark/edgy, with a rebellious edge.": ["s", "sobad", "youngluv"],
    "Retro pop, with a nostalgic touch.": ["weneedlove", "stereotype"],
    "A summery and refreshing anthem.": ["iwantit", "teenfresh"],
    "A powerful and girl crush sound.": ["metamorphic", "s", "sobad", "youngluv"],
    "Something playful and catchy to lift your mood.": ["iwantit", "teddybear", "stayalive"],
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
    stayalive: true,
  };

  const WYP_URL = "https://www.whosyourpoca.com/group/9UfjucwO-F4qgCHio4C3a/";

  // ponytail: only Stay Alive is mapped to WhosYourPoca ids; other albums fall back to the group page. Add "<album>/<file>": "<short_id>" as they get mapped.
  const wypIds = {
    "stayalive/sumina": "377886f80503", "stayalive/suminb": "e1b2bef4d528", "stayalive/sumins": "aaf05fbd9493",
    "stayalive/sieuna": "2421c436da65", "stayalive/sieunb": "d285e2f066e9", "stayalive/sieuns": "8f7da04dfc58",
    "stayalive/isaa": "1e9412566bd9", "stayalive/isab": "23b02da8c555", "stayalive/isas": "e4d8018952d8",
    "stayalive/seeuna": "a8a009d988fe", "stayalive/seeunb": "d92e1dcb2a3f", "stayalive/seeuns": "89a4696cb844",
    "stayalive/yoona": "3ea181d9c026", "stayalive/yoonb": "5ac848ed7030", "stayalive/yoons": "680ccd6236ce",
    "stayalive/ja": "6aa46e28bdec", "stayalive/jb": "a35a92fe0cab", "stayalive/js": "93c9da823729",
  };

  const getWypUrl = (imageUrl) => {
    const key = (imageUrl.match(/photocards\/(.+)\.\w+$/) || [])[1];
    return wypIds[key] ? `https://www.whosyourpoca.com/photocard/${wypIds[key]}/` : WYP_URL;
  };

  const buildPath = (album, member, variant) => {
    const ext = variant === "s" ? "png" : "jpg";
    return getFullImagePath(`assets/photocards/${album}/${member}${variant}.${ext}`);
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
        "I become one with my bed, then order sushi and ask everyone for a movie to watch.": "Same!! Nothing beats sushi after a long sleep ㅎㅎ I'll send you a song recommendation later 💗",
        "Sushi. Salmon and beef. Nothing else is as easy and delicious.": "Salmon and beef sushi are the best, right? You have great taste ㅎㅎ",
        "Reminders: wear sunscreen, drink water, check the weather before you go out.": "Hehe you sound just like me! Don't forget your sunscreen today too 💗",
        "Put on rain boots and wonder if I should just go out and get soaked for fun.": "Right?! Rain boots make a rainy day not so bad ~ but be careful on the wet roads!",
      },
      "assets/avatars/j.webp": {
        "Super energetic with my friends! And with a very powerful laugh. But I also have my calm moments.": "Waaaah, just like me! I like you so much already~ It seems like we're soulmates!",
        "I try to give encouragement and support to my friends, especially by making them laugh and saying nice things to them.": "I'm one of those who always gives encouragement and support to my friends~ Like when I tell Sieun that she does look tall hahaha. I like making people feel good!",
        "Anything related to animals! They're adorable... Maybe going to a cat café?": "Oh! Me too! Should we go together next time, SWITH? I'll treat you to BHC Bburing Chicken hahaha.",
        "Eat something delicious the moment I wake up, then pass out from a food coma.": "ㅋㅎㅋㅎ same! Today's plan: eat, then pass out from a food coma. I'm happy",
        "The trending thing nobody's tried yet. Ube latte? Spicy raw-beef noodles? Let's go.": "Heol, you too?! There are so many delicious things in this world.. let's try them all",
        "I tease them. Actually I'm not sorry. Love me like this too.": "Hehehe a cheeky one, just like me! Love me when I'm like this too~",
        "Feel smug about the dehumidifier I bought ahead of the rainy season.": "ㅋㅎㅋㅎ right?! The dehumidifier was my best decision. Emptying the water is the only problem..",
      },
      "assets/avatars/seeun.webp": {
        "I look calm, but when I'm comfortable I have a 4D personality and I'm very playful.": "I seem calm at first but when you get to know me I'm super 4D and playful... although I also like staying home watching dramas like '별에서 온 그대' ♡.",
        "I'm not a direct person, so I try to say things subtly to my friends... And I get a bit pouty sometimes~": "They also say I'm pouty! But in a cute way... Or so they say. I'm sure we'd understand each other perfectly without needing words!",
        "Dramas, candy crush, sweet snacks...": "For me the perfect plan is staying home watching my favorite dramas, eating garlic bread and not going out at all... literally I only go out three times a year hahaha.",
        "Play with slime, watch a drama, and promise I'll tidy my room tomorrow.": "Hoho.. you too? Tomorrow's not the day for tidying either. You know what I mean",
        "Pork belly at a place with great reviews. Eating well together is twice the happiness.": "Kyakyak! Everyone likes pork belly. Tell me your good restaurants, please!",
        "A short 'I luv you' and a good night, every single day.": "Hehe that's my style too. I luv you~ 💗",
        "Slip on the wet stairs, then still plan to wear my rain boots twice this season.": "ㅋㅋㅋ you fell too?! Be careful, it's slippery! I'll definitely wear my rain boots.",
      },
      "assets/avatars/sumin.webp": {
        "My energy is calm but firm, like when I practice in silence and suddenly get serious without warning.": "Ah, so we're alike... that calm that seems soft but works hard inside, 맞지?",
        "In friendship I'm the one who takes care, makes bad jokes, remembers details... but also the one who trips first.": "That sounds just like me... taking care and joking while tripping a bit, I like your vibe.",
        "A perfect Sunday is good food, a nice drama, playing with keropi... and resting at home in pajamas.": "You like keropi? Me too! There's nothing I like more than keropi! Except SWITH, hehe.",
        "Clean, do the laundry, then lie down and binge an anime. Being at home is the best.": "Being at home is the best, right~? Have a dreamless sleep tonight too 🌙",
        "Whatever I'm craving that I probably shouldn't have. Chicken? Malatang?": "ㅋㅋㅋ the opposite of what we should eat.. but that's the most delicious, right?",
        "I tell them not to doubt themselves, and that I'll cheer the loudest.": "Then I'll cheer for you the loudest too. This muuuuch!!",
        "Stay in. Sun by day, bugs by night, rain all week: this is why home wins.": "Exactly!! This is why I don't want to go outside ㅋㅋㅋ",
      },
      "assets/avatars/sieun.webp": {
        "Active; when I do something, I do it with all my energy.": "Ah ~ I think we'd understand each other very well... Although I'm actually quite calm and tranquil; I reflect on things a lot.",
        "Direct and clear, I don't beat around the bush.": "That's right! Honesty is something I value a lot. I also think I tend to be very responsible and organized in my relationships with other people; I like doing things well.",
        "Planning my next trip to a majestic city like LA or similar.": "Ohhh, I love Los Angeles ~ It's definitely one of my favorite cities in the world.",
        "A bike ride, an einspänner, and a musical or a movie if I can fit one in.": "Omona, we're the same~?~? I'm really into riding my bike these days 🩵",
        "I've had a list all week: spicy pork trotters, cold soy noodles, and coffee after.": "ㅋㅋㅋ I have a lot of plans too! Now I'm hungryyy 🖤",
        "I say thank you, a lot. Every day feels full of things to be grateful for.": "Thank youuu ❣️ Thanks to people like you, my heart feels so rich",
        "Beg the sky to stop, because I have somewhere important to be tonight.": "Right~?~? It can't rain today.. especially not tonight ㅜㅜ",
      },
      "assets/avatars/yoon.webp": {
        "Pure energy! I'm hyperactive, playful, and the life of the party.": "Wooow you're just like me! My members always laugh with me.",
        "Playful; I'm always hugging my friends or looking to play with them.": "You're adorable! I'm sure it's impossible to get bored with you.",
        "Video games, anime, consuming k-pop content.": "WHAT! Really? We have to play together someday, this is destiny! What do you play?",
        "Build Lego or a DIY kit with a Marvel movie on in the background.": "Hehe Lego is just nice, right?! I keep falling asleep halfway through the movie though ㅋㅋㅋ",
        "I say I'll hold back, then I'm up at midnight cooking ramen. Sorry, I lost.": "ㅋㅋㅋㅋ sorry, I lost too.. chapagetti with good kimchi is too strong",
        "Full energy: you worked hard today, let's go, let's do our best tomorrow!!": "You've worked hard today too!! Let's go, let's do our best!! hehe",
        "Prepare thoroughly for the storm, and then it doesn't rain at all.": "Uhaha same! I prepared so thoroughly and it didn't even rain.. phew",
      },
    };

  const avatarIntroMessages = {
    "assets/avatars/isa.webp": {
      firstTime:
        "hellooooo SWITH 🐱 have you eaten? Drink lots of water today too! Want to find out which STAYC photocard represents you? I'd like to get to know you a little better 💗",
    },
    "assets/avatars/j.webp": {
      firstTime:
        "SWITH! 🐶 heok, you're here!! Be prepared, I'm going to make you fall for me ㅋㅎㅋㅎ Want to find out which STAYC photocard you are?",
    },
    "assets/avatars/seeun.webp": {
      firstTime:
        "hellu SWITH 🦊 have you eaten? I just washed up and now I'm lying down hoho. Want to find out which STAYC photocard represents you? It sounds fun~",
    },
    "assets/avatars/sumin.webp": {
      firstTime:
        "SWITH~ 🐰 what are you doing? I was just rolling around at home ㅋㅋㅋ Want to discover which STAYC photocard represents you? You'll do great anyway!",
    },
    "assets/avatars/sieun.webp": {
      firstTime:
        "SWITH~?~? 🐩 omona, you came! I'm so happy, seriously ❣️ Want to find out which STAYC photocard represents you~? Come hang out with me for a bit 🩵",
    },
    "assets/avatars/yoon.webp": {
      firstTime:
        "SWITH!! 🐯 hi hiii, you've worked hard today too! hehe Want to find out which STAYC photocard represents you? Let's go, let's do our best!!",
    },
  };

  const chatToggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const chatClose = document.getElementById("chat-close");
  const messages = document.getElementById("chat-messages");
  const optionsContainer = document.getElementById("chat-options");
  const chatHint = document.getElementById("chat-hint");
  const chatHintClose = document.getElementById("chat-hint-close");
  const CHAT_HINT_KEY = "staycChatHintDismissed";
  const activeTimeouts = new Set();
  let shouldStartNewSession = true;
  let currentAvatar = null;
  let userNickname = "";

  const getNicknameForDisplay = () => userNickname || "you";

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
      const scroller = messages.parentElement; // .chatbox-body scrolls messages + options together
      scroller.scrollTop = scroller.scrollHeight;
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

  const hideChatHint = () => {
    if (chatHint) {
      chatHint.classList.remove("visible");
    }
  };

  const dismissChatHint = () => {
    hideChatHint();
    try {
      sessionStorage.setItem(CHAT_HINT_KEY, "true");
    } catch (err) {
      // Storage might be unavailable; ignore errors
    }
  };

  const showChatHint = () => {
    if (!chatHint) {
      return;
    }

    try {
      if (sessionStorage.getItem(CHAT_HINT_KEY) === "true") {
        return;
      }
    } catch (err) {
      // Continue without storage gating if unavailable
    }

    requestAnimationFrame(() => {
      chatHint.classList.add("visible");
    });
  };

  const removeTypingIndicators = () => {
    messages.querySelectorAll(".typing-indicator").forEach((node) => node.remove());
  };

  const addBotBubble = (text, indicator) => {
    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = text;

    // Swap the typing dots for the text in place so the avatar doesn't jump
    if (indicator && indicator.isConnected) {
      indicator.classList.remove("typing-indicator");
      indicator.querySelector(".message-bubble").replaceWith(bubble);
      scrollToBottom();
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "chat-message bot";

    const avatar = document.createElement("div");
    avatar.className = "chat-avatar-small";

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
    image.addEventListener("load", scrollToBottom);

    // Card + WhosYourPoca strip are one link, so the card reads as coming from the catalogue.
    const card = document.createElement("a");
    card.className = "wyp-card";
    card.href = getWypUrl(imageUrl);
    card.target = "_blank";
    card.rel = "noopener";

    const more = document.createElement("span");
    more.className = "wyp-more";
    more.textContent = "See more details from this photocard";

    const powered = document.createElement("span");
    powered.className = "wyp-powered";
    powered.textContent = "Powered by";

    const logo = document.createElement("img");
    logo.src = getFullImagePath("assets/whosyourpoca-logo.svg");
    logo.alt = "WhosYourPoca";
    powered.appendChild(logo);

    card.append(image, more, powered);

    bubble.appendChild(content);
    bubble.appendChild(card);
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
      addBotBubble(text, indicator);
      handleDisplayed();
    }, Math.min(1400, 500 + text.length * 12)); // longer messages "type" longer
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

  // -----------------------------------------------------------
  // SAFE IMAGE LOADING FOR CANVAS (iOS SAFE, NO FETCH, NO BLOB)
  // -----------------------------------------------------------

  // Mucho más simple: solo resuelve rutas sin tocar blobs ni dataURLs
  const resolveAssetUrl = (url) => {
    if (!url) return url;
    try {
      return new URL(url, window.location.href).toString();
    } catch (e) {
      console.warn("Could not resolve asset URL:", url);
      return url;
    }
  };

  const getFullImagePath = (relativePath) => {
    return baseUrl + relativePath;
  };

  // Carga real de imagen: sin fetch, sin blob, sin dataURL
  // Directo a <img>, compatible con Safari iOS para canvas
  const loadPhotocardImage = (url) =>
    new Promise((resolve, reject) => {
      if (!url) return reject("Invalid URL");

      // Ya NO usamos resolveAssetUrl() porque url YA es absoluta
      const absoluteUrl = url;

      // Cache local
      if (photocardImageCache.has(absoluteUrl)) {
        return resolve(photocardImageCache.get(absoluteUrl));
      }

      const img = new Image();
      img.crossOrigin = "anonymous"; // seguro incluso sin CORS explícito

      img.onload = () => {
        photocardImageCache.set(absoluteUrl, img);
        resolve(img);
      };

      img.onerror = (err) => {
        console.error("Failed to load photocard image:", absoluteUrl, err);
        reject(err);
      };

      img.src = absoluteUrl; // Safari necesita absolute URL aquí
    });
  

  const pickPhotocard = (member, album) => {
    const pool = getMemberPool(album, member);
    if (!pool) return null;

    const { base, special } = pool;

    const roll = Math.random();

    // 5% de probabilidad especial
    if (roll <= 0.05) {
      return { url: special, variant: "s" };
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

    const introText = `Finding the photocard that feels like ${getNicknameForDisplay()}… ☁️`;
    console.log(photocard)

    lastPhotocardResult = photocard
      ? { member, memberLabel, album, albumLabel, photocardUrl: photocard.url, variant: photocard.variant }
      : null;

    addBotMessage(introText, true, () => {
      if (photocard) {
        schedule(() => {
          addPhotocardBubble(`${memberLabel} from ${albumLabel}`, photocard.url);
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

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    shareCanvas.width = width * dpr;
    shareCanvas.height = height * dpr;
    shareCanvas.style.width = `${width}px`;
    shareCanvas.style.height = `${height}px`;
    const ctx = shareCanvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    if (document.fonts?.ready) {
      try {
        await document.fonts.ready;
      } catch (fontError) {
        console.warn("Could not confirm fonts loaded before drawing photocard image", fontError);
      }
    }

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
    ctx.fillText(`Here’s the photocard that feels like ${getNicknameForDisplay()}`, width / 2, 278);

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

    // Quiet WhosYourPoca credit at the foot of the card; skipped if the logo fails to load.
    try {
      const wypLogo = await loadPhotocardImage(getFullImagePath("assets/whosyourpoca-logo.svg"));
      const creditY = cardY + cardHeight - 62;
      const logoH = 28;
      const logoW = logoH * (wypLogo.width / wypLogo.height);
      const gap = 12;

      ctx.strokeStyle = "#ece6f2";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.moveTo(width / 2 - 150, creditY - 36);
      ctx.lineTo(width / 2 + 150, creditY - 36);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = "600 15px Poppins, sans-serif";
      ctx.fillStyle = "#a79bb5";
      ctx.textAlign = "left";
      const label = "POWERED BY";
      const startX = width / 2 - (ctx.measureText(label).width + gap + logoW) / 2;
      ctx.fillText(label, startX, creditY + 6);
      ctx.globalAlpha = 0.8;
      ctx.drawImage(wypLogo, startX + ctx.measureText(label).width + gap, creditY - logoH / 2, logoW, logoH);
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
    } catch (logoError) {
      console.warn("Could not draw WhosYourPoca credit", logoError);
    }

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

    ctx.fillStyle = "#a79bb5";
    ctx.font = "600 18px Poppins, sans-serif";
    ctx.fillText("www.whosyourpoca.com",width / 2, linkY + linkH + 32);

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
        renderNicknamePrompt();
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

  const renderNicknamePrompt = () => {
    clearOptions();

    addBotMessage("Before we start, how should I call you during the quiz? ✨", true, () => {
      const container = document.createElement("div");
      container.className = "chat-nickname";

      const input = document.createElement("input");
      input.type = "text";
      input.className = "chat-option-input";
      input.placeholder = "Enter your nickname";
      input.maxLength = 40;

      const confirm = document.createElement("button");
      confirm.type = "button";
      confirm.className = "chat-option";
      confirm.textContent = "Start quiz!";

      const saveNickname = () => {
        const nickname = input.value.trim() || "SWITH";
        userNickname = nickname;
        addUserMessage(nickname);
        clearOptions();

        schedule(() => {
          addBotMessage(`Nice to meet you, ${nickname}! Let's begin. ☁️`, true, () => {
            schedule(askCurrentStep, 500);
          });
        }, 400);
      };

      confirm.addEventListener("click", saveNickname);
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          saveNickname();
        }
      });

      container.appendChild(input);
      container.appendChild(confirm);
      optionsContainer.appendChild(container);
      input.focus();
      scrollToBottom();
    });
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

  const shuffled = (list) => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const k = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[k]] = [copy[k], copy[i]];
    }
    return copy;
  };

  const askCurrentStep = () => {
    const step = sessionFlow[stepIndex];
    if (!step) {
      return;
    }

    clearOptions();
    addBotMessage(step.prompt, true, () => {
      renderOptions(shuffled(step.options)); // so the members never appear in a fixed order
    });
  };

  const handleOption = (choice) => {
    addUserMessage(choice);
    clearOptions();
    const avatarReactions = avatarMatchReplies[currentAvatar] || {};
    const reactionReply = avatarReactions[choice];

    addMemberScore(choice);
    addPreferredAlbums(choice);

    stepIndex += 1;
    const next = stepIndex < sessionFlow.length ? askCurrentStep : showPhotocardResult;

    schedule(() => {
      if (reactionReply) {
        addBotMessage(reactionReply, true, () => schedule(next, 500));
      } else {
        next();
      }
    }, 400);
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
    userNickname = "";
    pickAvatar();
    messages.innerHTML = "";
    clearOptions();
    // Four of the member questions, shuffled, then the album questions
    const memberSteps = shuffled(chatFlow.filter((step) => optionMemberMap[step.options[0]]));
    sessionFlow = memberSteps.slice(0, 4).concat(chatFlow.filter((step) => !optionMemberMap[step.options[0]]));
    stepIndex = 0;
    shouldStartNewSession = false;
    addBotMessage(getIntroMessage(), true, () => {
      renderStartOptions();
    });
  };

  const openChat = () => {
    chatbox.classList.add("open");
    chatToggle.setAttribute("aria-expanded", "true");
    dismissChatHint();
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

  if (chatHintClose) {
    chatHintClose.addEventListener("click", dismissChatHint);
  }

  showChatHint();

  return {
    open: openChat,
    close: closeChat,
  };
})();