document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const startButton = document.getElementById("start-button")
  const restartButton = document.getElementById("restart-button")
  const backButton = document.getElementById("back-button")
  const backToMenuButton = document.getElementById("back-to-menu-button")
  const resultsBackToMenuButton = document.getElementById("results-back-to-menu")
  const settingsContainer = document.getElementById("settings-container")
  const songSelectionContainer = document.getElementById("song-selection-container")
  const matchContainer = document.getElementById("match-container")
  const resultsContainer = document.getElementById("results-container")
  const progressBar = document.getElementById("progress-bar")
  const progressText = document.getElementById("progress-text")
  const currentRound = document.getElementById("current-round")
  const rankingList = document.getElementById("ranking-list")
  const shareUrl = document.getElementById("share-url")
  const copyButton = document.getElementById("copy-button")
  const twitterShare = document.getElementById("twitter-share")

  // Image sharing elements
  const generateImageButton = document.getElementById("generate-image")
  const downloadImageLink = document.getElementById("download-image")
  const imagePreviewContainer = document.getElementById("image-preview-container")
  const imagePreview = document.getElementById("image-preview")
  const rankingCanvas = document.getElementById("ranking-canvas")
  const verticalLayoutRadio = document.getElementById("vertical-layout")
  const horizontalLayoutRadio = document.getElementById("horizontal-layout")

  // Settings Elements
  const rankTarget = document.getElementById("rank-target")
  const titleTracksRadio = document.getElementById("title-tracks")
  const customSelectionRadio = document.getElementById("custom-selection")

  // Song Selection Elements
  const songGrid = document.getElementById("song-grid")
  const selectedCount = document.getElementById("selected-count")
  const selectAllBtn = document.getElementById("select-all-btn")
  const deselectAllBtn = document.getElementById("deselect-all-btn")
  const confirmSelectionBtn = document.getElementById("confirm-selection-btn")
  const backToSettingsBtn = document.getElementById("back-to-settings-btn")

  // State variables
  let songs = []
  let currentSongs = []
  let matches = []
  let currentMatchIndex = 0
  let results = []
  let history = []
  let currentRankings = []
  const selectedSongs = new Set()
  const albumCoversCache = {}

  // Get base URL for absolute paths
  const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1)

  const assets = "assets/"
  const staycAlbum = assets + "stayc.png"
  const staydomAlbum = assets + "staydom.jpg"
  const youngluvAlbum = assets + "young-luv.jpg"
  const stereotypeAlbum = assets + "stereotype.jpeg"
  const needLoveAlbum = assets + "we-need-love.png"
  const teddyBearAlbum = assets + "teddy-bear.png"
  const teddyBearJpAlbum = assets + "teddy-bear-jp.jpg"
  const poppyAlbum = assets + "poppy.jpg"
  const teenFreshAlbum = assets + "teenfresh.jpg"
  const lit = assets + "lit.jpg"
  const fancy = assets + "fancy.jpg"
  const meow = assets + "meow.jpeg"
  const iAlbum = assets + "i.jpg"
  const gptJp = assets + "gptJp.jpg"
  const metamorphicAlbum = assets + "metamorphic.jpeg"
  const SAlbum = assets + "s.jpg"
  const ourBluesAlbums = assets + "star.png"
  const overuAlbum =  assets + "overu.jpg"
  const tstarsAlbum = assets + "tstars.jpeg"
  const iwiAlbum = assets + "iwi.jpeg"

  // Sample song data
  const staycSongs = [
    { id: 1, title: "SO BAD", album: "Star To A Young Culture", albumCover: staycAlbum, isTitle: true },
    { id: 2, title: "LIKE THIS", album: "Star To A Young Culture", albumCover: staycAlbum, isTitle: false },
    { id: 3, title: "ASAP", album: "STAYDOM", albumCover: staydomAlbum, isTitle: true },
    { id: 4, title: "SO WHAT", album: "STAYDOM", albumCover: staydomAlbum, isTitle: false },
    { id: 5, title: "LOVE FOOL", album: "STAYDOM", albumCover: staydomAlbum, isTitle: false },
    { id: 6, title: "SO BAD (TAK Remix)", album: "STAYDOM", albumCover: staydomAlbum, isTitle: false },
    { id: 7, title: "STEREOTYPE", album: "STEREOTYPE", albumCover: stereotypeAlbum, isTitle: true },
    { id: 8, title: "I'LL BE THERE", album: "STEREOTYPE", albumCover: stereotypeAlbum, isTitle: false },
    { id: 9, title: "SLOW DOWN", album: "STEREOTYPE", albumCover: stereotypeAlbum, isTitle: false },
    { id: 10, title: "COMPLEX", album: "STEREOTYPE", albumCover: stereotypeAlbum, isTitle: false },
    { id: 11, title: "RUN2U", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: true },
    { id: 12, title: "SAME SAME", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 13, title: "247", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 14, title: "YOUNG LUV", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 15, title: "BUTTERFLY", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 16, title: "I WANT U BABY", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 17, title: "STAR", album: "Our Blues", albumCover: ourBluesAlbums, isTitle: false },
    { id: 18, title: "BEAUTIFUL MONSTER", album: "WE NEED LOVE", albumCover: needLoveAlbum, isTitle: true },
    { id: 19, title: "I LIKE IT", album: "WE NEED LOVE", albumCover: needLoveAlbum, isTitle: false },
    { id: 20, title: "LOVE", album: "WE NEED LOVE", albumCover: needLoveAlbum, isTitle: false },
    { id: 21, title: "RUN2U (TAK Remix)", album: "WE NEED LOVE", albumCover: needLoveAlbum, isTitle: false },
    { id: 22, title: "Poppy (Japanese Ver.)", album: "Poppy (Japanese Ver.)", albumCover: poppyAlbum, isTitle: true },
    { id: 23, title: "ASAP (Japanese Ver.)", album: "Poppy (Japanese Ver.)", albumCover: poppyAlbum, isTitle: false },
    { id: 24, title: "Teddy Bear", album: "Teddy Bear", albumCover: teddyBearAlbum, isTitle: true },
    { id: 25, title: "Poppy (Korean Ver.)", album: "Teddy Bear", albumCover: teddyBearAlbum, isTitle: false },
    {
      id: 26,
      title: "Teddy Bear (Japanese Ver.)",
      album: "Teddy Bear(Japanese Ver.)",
      albumCover: teddyBearJpAlbum,
      isTitle: false,
    },
    {
      id: 27,
      title: "Stereotype (Japanese Ver.)",
      album: "Teddy Bear(Japanese Ver.)",
      albumCover: teddyBearJpAlbum,
      isTitle: false,
    },
    { id: 28, title: "Bubble", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: true },
    { id: 29, title: "Not Like You", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 30, title: "I Wanna Do", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 31, title: "Be Mine", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 32, title: "Bubble (English Ver.)", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 33, title: "Bubble (Sped Up)(English Ver.)", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 34, title: "LIT", album: "LIT", albumCover: lit, isTitle: true },
    { id: 35, title: "Bubble (Japanese Ver.)", album: "LIT", albumCover: lit, isTitle: false },
    { id: 36, title: "Fancy - Spotify Singles", album: "Fancy - Spotify Singles", albumCover: fancy, isTitle: false },
    { id: 37, title: "Twenty", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 38, title: "Cheeky Icy Thang", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: true },
    { id: 39, title: "1 Thing", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 40, title: "Give It 2 Me", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 41, title: "Find (Sieun & Seeun & J)", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 42, title: "Let Me Know", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 43, title: "Nada", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 44, title: "Fakin'(Sumin & Yoon)", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 45, title: "Roses (ISA)", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 46, title: "Beauty Bomb", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 47, title: "Gummy Bear", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 48, title: "Stay WITH me", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 49, title: "Flexing On My Ex", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 50, title: "Trouble Maker", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 51, title: "MEOW", album: "MEOW / Cheeky Icy Thang (Japanese Ver.)", albumCover: meow, isTitle: true },
    {
      id: 52,
      title: "Cheeky Icy Thang - Japanese Ver.",
      album: "MEOW / Cheeky Icy Thang (Japanese Ver.)",
      albumCover: meow,
      isTitle: false,
    },
    {
      id: 53,
      title: "MEOW - Remix Version",
      album: "MEOW / Cheeky Icy Thang (Japanese Ver.)",
      albumCover: meow,
      isTitle: false,
    },
    { id: 54, title: "GPT", album: "...I", albumCover: iAlbum, isTitle: true },
    { id: 55, title: "Meant To Be", album: "...I", albumCover: iAlbum, isTitle: false },
    {
      id: 56,
      title: "GPT - Japanese Ver.",
      album: "GPT (Japanese Ver.)/Tell Me Now",
      albumCover: gptJp,
      isTitle: false,
    },
    { id: 57, title: "Tell Me Now", album: "GPT (Japanese Ver.)/Tell Me Now", albumCover: gptJp, isTitle: false },
    { id: 58, title: "Over U, Goodbye (Seeun x J)", album: "Over U, Goodbye (Seeun x J)", albumCover: overuAlbum, isTitle: false },
    { id: 59, title: "BEBE", album: "S", albumCover: SAlbum, isTitle: true },
    { id: 60, title: "DIAMOND", album: "S", albumCover: SAlbum, isTitle: false },
    { id: 61, title: "PIPE DOWN", album: "S", albumCover: SAlbum, isTitle: false },
    { id: 62, title: "Trace of Stars (ISA)", album: "Trace of Stars (Crushology 101 OST Part.1)", albumCover: tstarsAlbum, isTitle: false },
    { id: 63, title: "I WANT IT", album: "STAYC Special Single [I WANT IT]", albumCover: iwiAlbum, isTitle: true },
    { id: 64, title: "BOY", album: "STAYC Special Single [I WANT IT]", albumCover: iwiAlbum, isTitle: false },
    { id: 65, title: "반칙 (Honestly)", album: "STAYC Special Single [I WANT IT]", albumCover: iwiAlbum, isTitle: false },
  ]

  // Album colors for fallback
  const albumColors = {
    STAYDOM: "#ffb5d3",
    "YOUNG-LUV.COM": "#a59dff",
    STEREOTYPE: "#ffde59",
    "WE NEED LOVE": "#6c63ff",
    "Teddy Bear": "#ff5fa2",
    Poppy: "#ffb5d3",
    Bubble: "#a59dff",
    TEENFRESH: "#ffde59",
  }

  // Initialize the app
  function init() {
    // Set up event listeners
    startButton.addEventListener("click", handleStartClick)
    restartButton.addEventListener("click", restartRanking)
    backButton.addEventListener("click", goBack)
    backToMenuButton.addEventListener("click", backToMenu)
    resultsBackToMenuButton.addEventListener("click", backToMenu)
    copyButton.addEventListener("click", copyShareUrl)

    // Image sharing event listeners
    generateImageButton.addEventListener("click", generateRankingImage)

    // Song selection event listeners
    selectAllBtn.addEventListener("click", selectAllSongs)
    deselectAllBtn.addEventListener("click", deselectAllSongs)
    confirmSelectionBtn.addEventListener("click", startRankingFromSelection)
    backToSettingsBtn.addEventListener("click", backToSettings)

    // Preload album covers for canvas use
    preloadAlbumCovers()

    // Initialize song grid
    initializeSongGrid()
  }

  // Handle start button click
  function handleStartClick() {
    if (customSelectionRadio.checked) {
      showSongSelection()
    } else {
      startRanking()
    }
  }

  // Show song selection interface
  function showSongSelection() {
    settingsContainer.style.display = "none"
    songSelectionContainer.style.display = "block"
    updateSelectedCount()
  }

  // Back to settings from song selection
  function backToSettings() {
    songSelectionContainer.style.display = "none"
    settingsContainer.style.display = "block"
  }

  // Initialize song grid
  function initializeSongGrid() {
    songGrid.innerHTML = ""

    staycSongs.forEach((song) => {
      const songItem = document.createElement("div")
      songItem.className = `song-item ${song.isTitle ? "title-track" : ""}`
      songItem.dataset.songId = song.id

      songItem.innerHTML = `
        <div class="song-item-cover">
          <img src="${getFullImagePath(song.albumCover)}" alt="${song.album}" onerror="this.src='${getFullImagePath("assets/placeholder.jpg")}'">
        </div>
        <div class="song-item-title">${song.title}</div>
        <div class="song-item-album">${song.album}</div>
      `

      songItem.addEventListener("click", () => toggleSongSelection(song.id))
      songGrid.appendChild(songItem)
    })


    // Initialize time estimation as hidden
    document.getElementById("time-estimation").style.display = "none"
  }

  // Toggle song selection
  function toggleSongSelection(songId) {
    const songItem = document.querySelector(`[data-song-id="${songId}"]`)

    if (selectedSongs.has(songId)) {
      selectedSongs.delete(songId)
      songItem.classList.remove("selected")
    } else {
      selectedSongs.add(songId)
      songItem.classList.add("selected")
    }

    updateSelectedCount()
  }

  // Update selected count and button state
  function updateSelectedCount() {
    const count = selectedSongs.size
    selectedCount.textContent = count
    confirmSelectionBtn.disabled = count < 2


    // Update time estimation
    updateTimeEstimation(count)
  }

  // Calculate and display time estimation
  function updateTimeEstimation(songCount) {
    const timeEstimationElement = document.getElementById("time-estimation")
    const estimatedTimeElement = document.getElementById("estimated-time")
    const estimatedRoundsElement = document.getElementById("estimated-rounds")

    if (songCount < 2) {
      timeEstimationElement.style.display = "none"
      return
    }

    // Calculate number of rounds (combinations of n songs taken 2 at a time)
    const rounds = (songCount * (songCount - 1)) / 2

    // Estimate time per round (average decision time + UI transitions)
    // Conservative estimate: 3-5 seconds per round
    const secondsPerRound = 4
    const totalSeconds = rounds * secondsPerRound

    // Convert to human-readable format
    let timeText = ""
    if (totalSeconds < 60) {
      timeText = `${totalSeconds} seconds`
    } else if (totalSeconds < 3600) {
      const minutes = Math.ceil(totalSeconds / 60)
      timeText = `${minutes} minute${minutes > 1 ? "s" : ""}`
    } else {
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.ceil((totalSeconds % 3600) / 60)
      timeText = `${hours}h ${minutes}m`
    }

    // Update display
    estimatedTimeElement.textContent = timeText
    estimatedRoundsElement.textContent = rounds
    timeEstimationElement.style.display = "flex"

    // Add warning for very long rankings
    if (rounds > 100) {
      timeEstimationElement.style.color = "var(--accent)"
      if (rounds > 300) {
        timeEstimationElement.style.color = "#ff6b6b"
      }
    } else {
      timeEstimationElement.style.color = "var(--secondary)"
    }
  }

  // Select all songs
  function selectAllSongs() {
    selectedSongs.clear()
    staycSongs.forEach((song) => selectedSongs.add(song.id))
    updateSongGridSelection()
    updateSelectedCount()
  }

  // Deselect all songs
  function deselectAllSongs() {
    selectedSongs.clear()
    updateSongGridSelection()
    updateSelectedCount()
  }

  // Select only title tracks
  function selectTitleTracks() {
    selectedSongs.clear()
    staycSongs.filter((song) => song.isTitle).forEach((song) => selectedSongs.add(song.id))
    updateSongGridSelection()
    updateSelectedCount()
  }

  // Update song grid visual selection
  function updateSongGridSelection() {
    document.querySelectorAll(".song-item").forEach((item) => {
      const songId = Number.parseInt(item.dataset.songId)
      if (selectedSongs.has(songId)) {
        item.classList.add("selected")
      } else {
        item.classList.remove("selected")
      }
    })
  }

  // Start ranking from custom selection
  function startRankingFromSelection() {
    if (selectedSongs.size < 2) {
      alert("Please select at least 2 songs to rank!")
      return
    }

    // Filter songs based on selection
    songs = staycSongs.filter((song) => selectedSongs.has(song.id))

    // Create matches
    createMatches()

    // Update UI
    songSelectionContainer.style.display = "none"
    matchContainer.style.display = "flex"
    startButton.style.display = "none"
    restartButton.style.display = "inline-flex"

    // Show first match
    showMatch(0)
  }

  // Get full path for an image
  function getFullImagePath(relativePath) {
    return baseUrl + relativePath
  }

  // Preload album covers to use with canvas
  function preloadAlbumCovers() {
    staycSongs.forEach((song) => {
      if (!albumCoversCache[song.id]) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          albumCoversCache[song.id] = img
        }
        img.onerror = (e) => {
          console.error(`Failed to load image for song ${song.id}: ${song.title}`, e)
          createFallbackCover(song)
        }
        img.src = getFullImagePath(song.albumCover)
      }
    })
  }

  // Create a fallback colored cover with album initial
  function createFallbackCover(song) {
    const canvas = document.createElement("canvas")
    canvas.width = 120
    canvas.height = 120
    const ctx = canvas.getContext("2d")

    const colors = ["#ffb5d3", "#a59dff", "#ffde59", "#6c63ff", "#ff5fa2"]
    const colorIndex = (song.id - 1) % colors.length

    ctx.fillStyle = colors[colorIndex]
    ctx.fillRect(0, 0, 120, 120)

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 40px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(song.album.charAt(0), 60, 60)

    const dataUrl = canvas.toDataURL()
    const fallbackImg = new Image()
    fallbackImg.src = dataUrl
    albumCoversCache[song.id] = fallbackImg
  }

  // Start the ranking process
  function startRanking() {
    // Filter songs based on settings
    songs = filterSongs()

    if (songs.length < 2) {
      alert("Not enough songs to rank! Please check your selection.")
      return
    }

    // Create matches
    createMatches()

    // Update UI
    settingsContainer.style.display = "none"
    matchContainer.style.display = "flex"
    startButton.style.display = "none"
    restartButton.style.display = "inline-flex"

    // Show first match
    showMatch(0)
  }

  // Filter songs based on user settings
  function filterSongs() {
    let filteredSongs = [...staycSongs]

    // Filter by title tracks if selected
    if (titleTracksRadio.checked) {
      filteredSongs = filteredSongs.filter((song) => song.isTitle)
    }

    return filteredSongs
  }

  // Create all possible matches between songs
  function createMatches() {
    matches = []
    currentSongs = [...songs]

    // Create all possible pairs
    for (let i = 0; i < currentSongs.length; i++) {
      for (let j = i + 1; j < currentSongs.length; j++) {
        matches.push([currentSongs[i], currentSongs[j]])
      }
    }

    // Shuffle matches for more randomness
    matches = shuffleArray(matches)

    // Reset state
    currentMatchIndex = 0
    results = []
    history = []

    // Update progress
    updateProgress()
  }

  // Show a specific match
  function showMatch(index) {
    if (index >= matches.length) {
      showResults()
      return
    }

    const leftSong = matches[index][0]
    const rightSong = matches[index][1]

    // Update UI with song details
    const leftCard = document.querySelector(".song-card.left")
    const rightCard = document.querySelector(".song-card.right")

    // Left song
    leftCard.querySelector(".album-cover").innerHTML = `
      <img src="${getFullImagePath(leftSong.albumCover)}" alt="${leftSong.album}" onerror="this.src='${getFullImagePath("assets/placeholder.jpg")}'">
    `
    leftCard.querySelector(".song-title").textContent = leftSong.title
    leftCard.querySelector(".album-name").textContent = leftSong.album

    // Right song
    rightCard.querySelector(".album-cover").innerHTML = `
      <img src="${getFullImagePath(rightSong.albumCover)}" alt="${rightSong.album}" onerror="this.src='${getFullImagePath("assets/placeholder.jpg")}'">
    `
    rightCard.querySelector(".song-title").textContent = rightSong.title
    rightCard.querySelector(".album-name").textContent = rightSong.album

    // Add click events
    leftCard.onclick = () => selectWinner(leftSong, rightSong)
    rightCard.onclick = () => selectWinner(rightSong, leftSong)

    // Update round counter
    currentRound.textContent = index + 1

    // Show/hide back to menu button based on if it's the first match
    backButton.style.display = index === 0 ? "none" : "inline-flex"
    backToMenuButton.style.display = index === 0 ? "inline-flex" : "none"
  }

  // Handle song selection
  function selectWinner(winner, loser) {
    // Record the result
    results.push({
      winner: winner.id,
      loser: loser.id,
    })

    // Save to history for back button
    history.push(currentMatchIndex)

    // Move to next match
    currentMatchIndex++
    updateProgress()
    showMatch(currentMatchIndex)
  }

  // Go back to previous match
  function goBack() {
    if (history.length === 0) return

    // Remove last result
    results.pop()

    // Get previous match index
    currentMatchIndex = history.pop()

    // Update progress
    updateProgress()

    // Show the match again
    showMatch(currentMatchIndex)
  }

  // Update progress bar
  function updateProgress() {
    const progress = (currentMatchIndex / matches.length) * 100
    progressBar.value = progress
    progressText.textContent = `${Math.round(progress)}%`
  }

  // Show final results
  function showResults() {
    // Calculate rankings based on results
    currentRankings = calculateRankings()

    // Display rankings
    displayRankings(currentRankings)

    // Update UI
    matchContainer.style.display = "none"
    resultsContainer.style.display = "block"

    // Generate share URL
    generateShareUrl(currentRankings)

    // Reset image preview
    imagePreviewContainer.style.display = "none"
    downloadImageLink.style.display = "none"
    imagePreview.innerHTML = ""
  }

  // Calculate rankings based on match results
  function calculateRankings() {
    // Create a score map for each song
    const scoreMap = {}
    songs.forEach((song) => {
      scoreMap[song.id] = 0
    })

    // Count wins for each song
    results.forEach((result) => {
      scoreMap[result.winner] = (scoreMap[result.winner] || 0) + 1
    })

    // Sort songs by score
    const sortedSongs = [...songs].sort((a, b) => {
      return (scoreMap[b.id] || 0) - (scoreMap[a.id] || 0)
    })

    // Get the target number of rankings to show
    const targetValue = rankTarget.value
    const limit = targetValue === "all" ? sortedSongs.length : Number.parseInt(targetValue)

    return sortedSongs.slice(0, limit)
  }

  // Display rankings in the UI
  function displayRankings(rankings) {
    rankingList.innerHTML = ""

    rankings.forEach((song, index) => {
      const rankingItem = document.createElement("div")
      rankingItem.className = "ranking-item"
      rankingItem.innerHTML = `
        <div class="ranking-position">${index + 1}</div>
        <div class="ranking-album-cover">
          <img src="${getFullImagePath(song.albumCover)}" alt="${song.album}" onerror="this.src='${getFullImagePath("assets/placeholder.jpg")}'">
        </div>
        <div class="ranking-song-info">
          <div class="ranking-song-title">${song.title}</div>
          <div class="ranking-album-name">${song.album}</div>
        </div>
      `

      rankingList.appendChild(rankingItem)
    })
  }

  // Generate share URL with rankings
  function generateShareUrl(rankings) {
    const baseUrl = window.location.href.split("?")[0]
    const rankingIds = rankings.map((song) => song.id).join(",")
    const shareUrlText = `${baseUrl}?ranking=${rankingIds}`

    shareUrl.value = shareUrlText

    // Update Twitter share link
    const tweetText = encodeURIComponent(
      `Check out my STAYC song ranking!\n\nMy top ${rankings.length} STAYC songs:\n1. ${rankings[0].title}\n2. ${rankings[1]?.title || ""}\n3. ${rankings[2]?.title || ""}`,
    )
    twitterShare.href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(shareUrlText)}`
  }

  // Copy share URL to clipboard
  function copyShareUrl() {
    shareUrl.select()
    document.execCommand("copy")

    // Visual feedback
    copyButton.textContent = "Copied!"
    setTimeout(() => {
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy
      `
    }, 2000)
  }

  // Generate an image of the ranking
  function generateRankingImage() {
    if (currentRankings.length === 0) return

    // Show loading state
    generateImageButton.disabled = true
    generateImageButton.textContent = "Generating..."

    // Check which layout is selected
    const isVertical = verticalLayoutRadio.checked

    // Ensure all album covers are loaded before generating
    ensureAlbumCoversLoaded(currentRankings).then(() => {
      if (isVertical) {
        generateVerticalImage()
      } else {
        generateHorizontalImage()
      }

      // Reset button state
      generateImageButton.disabled = false
      generateImageButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        Generate Image
      `
    })
  }

  // Ensure all album covers are loaded
  function ensureAlbumCoversLoaded(rankings) {
    const promises = rankings.map((song) => {
      return new Promise((resolve) => {
        if (albumCoversCache[song.id]) {
          resolve()
          return
        }

        // If not in cache, load it now
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          albumCoversCache[song.id] = img
          resolve()
        }
        img.onerror = () => {
          // Create fallback
          createFallbackCover(song)
          resolve()
        }
        // Use absolute path
        img.src = getFullImagePath(song.albumCover)
      })
    })

    return Promise.all(promises)
  }

  // Generate vertical image
  function generateVerticalImage() {
    // Set canvas dimensions
    const width = 800
    const height = 150 + currentRankings.length * 70 + 30
    rankingCanvas.width = width
    rankingCanvas.height = height

    const ctx = rankingCanvas.getContext("2d")

    // Draw background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)

    // Draw header background
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, "#ff7eb3")
    gradient.addColorStop(1, "#ff5fa2")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, 100)

    // Draw header text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 36px Poppins, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("My STAYC Song Ranking", width / 2, 60)

    // Draw rankings
    let y = 120
    currentRankings.forEach((song, index) => {
      // Draw ranking background
      ctx.fillStyle = index % 2 === 0 ? "#f8f9fa" : "#ffffff"
      ctx.fillRect(0, y, width, 70)

      // Draw position
      ctx.fillStyle = "#ff5fa2"
      ctx.font = "bold 28px Poppins, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${index + 1}`, 40, y + 40)

      // Draw album cover
      if (albumCoversCache[song.id]) {
        ctx.drawImage(albumCoversCache[song.id], 70, y + 10, 50, 50)
      } else {
        // Fallback colored square if image not available
        const colors = ["#ffb5d3", "#a59dff", "#ffde59", "#6c63ff", "#ff5fa2"]
        const colorIndex = index % colors.length
        ctx.fillStyle = colors[colorIndex]
        ctx.fillRect(70, y + 10, 50, 50)
      }

      // Draw song title
      ctx.fillStyle = "#333333"
      ctx.font = "bold 20px Poppins, sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(song.title, 140, y + 30)

      // Draw album name
      ctx.fillStyle = "#888888"
      ctx.font = "16px Poppins, sans-serif"
      ctx.fillText(song.album, 140, y + 55)

      y += 70
    })

    // Draw footer
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, height - 60, width, 60)

    ctx.fillStyle = "#888888"
    ctx.font = "14px Poppins, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Generated with STAYC Song Ranker", width / 2, height - 35)

    // Draw second line of footer text
    ctx.fillStyle = "#ff5fa2"
    ctx.font = "16px Poppins, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("STAYC girls is going down!", width / 2, height - 15)

    // Convert canvas to image
    const imageUrl = rankingCanvas.toDataURL("image/png")

    // Display image preview
    imagePreview.innerHTML = `<img src="${imageUrl}" alt="STAYC Song Ranking">`
    imagePreviewContainer.style.display = "block"

    // Update download link
    downloadImageLink.href = imageUrl
    downloadImageLink.style.display = "inline-flex"
    downloadImageLink.download = "stayc-ranking-vertical.png"
  }

  // Generate horizontal image
  function generateHorizontalImage() {
    // Calculate dimensions based on number of songs
    const itemWidth = 180
    const width = Math.max(800, currentRankings.length * itemWidth)
    const height = 430
    rankingCanvas.width = width
    rankingCanvas.height = height

    const ctx = rankingCanvas.getContext("2d")

    // Draw background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)

    // Draw header background
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, "#ff7eb3")
    gradient.addColorStop(1, "#ff5fa2")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, 100)

    // Draw header text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 36px Poppins, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("My STAYC Song Ranking", width / 2, 60)

    // Draw rankings
    currentRankings.forEach((song, index) => {
      const x = index * itemWidth

      // Draw card background
      ctx.fillStyle = "#f8f9fa"
      ctx.fillRect(x + 10, 120, itemWidth - 20, 220)

      // Draw position badge
      ctx.fillStyle = "#ff5fa2"
      ctx.beginPath()
      ctx.arc(x + itemWidth / 2, 140, 20, 0, 2 * Math.PI)
      ctx.fill()

      // Draw position number
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 20px Poppins, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${index + 1}`, x + itemWidth / 2, 147)

      // Draw album cover
      if (albumCoversCache[song.id]) {
        ctx.drawImage(albumCoversCache[song.id], x + (itemWidth - 120) / 2, 170, 120, 120)
      } else {
        // Fallback colored square if image not available
        const colors = ["#ffb5d3", "#a59dff", "#ffde59", "#6c63ff", "#ff5fa2"]
        const colorIndex = index % colors.length
        ctx.fillStyle = colors[colorIndex]
        ctx.fillRect(x + (itemWidth - 120) / 2, 170, 120, 120)
      }

      // Draw song title (truncate if too long)
      ctx.fillStyle = "#333333"
      ctx.font = "bold 16px Poppins, sans-serif"
      ctx.textAlign = "center"
      const title = truncateText(song.title, 15)
      ctx.fillText(title, x + itemWidth / 2, 310)

      // Draw album name (truncate if too long)
      ctx.fillStyle = "#888888"
      ctx.font = "14px Poppins, sans-serif"
      const album = truncateText(song.album, 18)
      ctx.fillText(album, x + itemWidth / 2, 330)
    })

    // Draw footer
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, height - 60, width, 60)

    ctx.fillStyle = "#888888"
    ctx.font = "14px Poppins, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Generated with STAYC Song Ranker", width / 2, height - 35)

    // Draw second line of footer text
    ctx.fillStyle = "#ff5fa2"
    ctx.font = "16px Poppins, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("STAYC girls is going down!", width / 2, height - 15)

    // Convert canvas to image
    const imageUrl = rankingCanvas.toDataURL("image/png")

    // Display image preview
    imagePreview.innerHTML = `<img src="${imageUrl}" alt="STAYC Song Ranking">`
    imagePreviewContainer.style.display = "block"

    // Update download link
    downloadImageLink.href = imageUrl
    downloadImageLink.style.display = "inline-flex"
    downloadImageLink.download = "stayc-ranking-horizontal.png"
  }

  // Helper function to truncate text
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + "..."
  }

  // Restart the ranking process
  function restartRanking() {
    settingsContainer.style.display = "block"
    songSelectionContainer.style.display = "none"
    matchContainer.style.display = "none"
    resultsContainer.style.display = "none"
  }

  // Go back to the main menu
  function backToMenu() {
    // Reset UI
    settingsContainer.style.display = "block"
    songSelectionContainer.style.display = "none"
    matchContainer.style.display = "none"
    resultsContainer.style.display = "none"
    startButton.style.display = "inline-flex"
    restartButton.style.display = "none"

    // Reset state
    currentMatchIndex = 0
    results = []
    history = []
    selectedSongs.clear()
    updateSongGridSelection()
    updateSelectedCount()
  }

  // Helper function to shuffle an array
  function shuffleArray(array) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Check if there's a shared ranking in the URL
  function checkForSharedRanking() {
    const urlParams = new URLSearchParams(window.location.search)
    const ranking = urlParams.get("ranking")

    if (ranking) {
      const rankingIds = ranking.split(",").map((id) => Number.parseInt(id))
      const rankedSongs = rankingIds.map((id) => staycSongs.find((song) => song.id === id)).filter((song) => song)

      if (rankedSongs.length > 0) {
        currentRankings = rankedSongs
        displayRankings(rankedSongs)
        generateShareUrl(rankedSongs)

        settingsContainer.style.display = "none"
        resultsContainer.style.display = "block"
        return true
      }
    }

    return false
  }

  // Initialize the app
  init()

  // Check for shared ranking
  checkForSharedRanking()
})
