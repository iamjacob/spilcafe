/*
https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/games.json
  {
    "id": 1,
    "title": "Matador",
    "description": "Dansk klassiker inspireret af Monopoly.",
    "image": "https://raw.githubusercontent.com/cederdorff/race/master/images/games/matador.webp",
    "genre": "Familie",
    "playtime": 120,
    "players": { "min": 2, "max": 6 },
    "language": "Dansk",
    "rating": 4.0,
    "age": 8,
    "difficulty": "Let",
    "location": "Vestergade",
    "shelf": "A3",
    "available": true,
    "rules": "Spillerne bevæger sig rundt på brættet og køber ejendomme. Når andre lander på dine felter, betaler de leje. Den sidste spiller, der ikke går bankerot, vinder. Start med 30.000 kr. og få 4.000 kr. hver gang du passerer START. Byg huse og hoteller for at øge lejen. Særlige felter inkluderer Fængsel, Gratis Parkering og forskellige skattekort."
  },
*/
// let allGames = [];

//#1
//Check alle popstates og tilføj ved load for at have dynamisk url!

//#2
//local json istedet.. for at optimere

//#3
//locale billeder også? så kan den køre offline!?'ish

//#4
//  navigator.vibrate(100)
//  navigator.vibrate(400)
//  navigator.vibrate(200)

//#5 - font locale also!!

//#6 - dices

let resultater = document.getElementById("results");
let allGames = []; // Declare allGames globally to access it in displayDrawer

async function getGames() {
  try {
    console.log("🌐 Henter alle spil fra JSON...");
    const response = await fetch(
      "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/games.json"
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    allGames = await response.json();
    allGames
    console.log(`📊 JSON data modtaget: ${allGames.length} games`);

    // populateGenreDropdown();
    // filterMovies();
    console.log(allGames);

    displayGames(allGames);
  } catch (error) {
    console.error("❌ Kunne ikke hente games:", error);
    resultater.innerHTML =
      '<div class="game-list-empty"><p>🚨 Kunne ikke hente Games.</p></div>';
  }
}

// #3: Render all movies in the grid
function displayGames(games) {
  resultater.innerHTML = "";

  if (!games.length) {
    resultater.insertAdjacentHTML(
      "beforeend",
      '<div class="game-list-empty"><p>Ingen spil matchede dine filtre...</p></div>'
    );
    return;
  }

  console.log(`🎬 Viser ${games.length} game`);

  for (const game of games) {
    displayGame(game);
  }
}

// #4: Render a single movie card
function displayGame(game) {
  const gameHTML = `
    <div class="card" onclick="displayDrawer(${game.id})">
	<div class="card__imageHolder">
		<div class="card__rating">
			<svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.06919 6.79995L2.66502 4.35969L0.666687 2.71837L3.30669 2.50127L4.33335 0.199951L5.36002 2.50127L8.00002 2.71837L6.00169 4.35969L6.59752 6.79995L4.33335 5.506L2.06919 6.79995Z" fill="#F2CE17"/>
</svg>
            ${game.rating}
		</div>

		<img src="${game.image}" alt="billed af ${game.title}">
	</div>

	<h2>${game.title}</h2>

	<div class="card__info">
		<div class="card__infoTAG"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg> ${game.players.min}- ${game.players.max}</div>
		<div class="card__infoTAG"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg> ${game.playtime} min</div>
		<div class="card__infoTAG"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> ${game.age}</div>
	</div>
</div>
  `;

  resultater.insertAdjacentHTML("beforeend", gameHTML);
}

getGames();
//filterGames()

let drawHolder = document.getElementById("drawHolder");

function displayDrawer(id) {
   console.log(id);

  // Find the game by id
  const game = allGames.find((game) => game.id === id);

  if (!game) {
    console.error(`Game with id ${id} not found.`);
    return;
  }

  drawHolder.innerHTML = `
			<div class="overlay" id="overlay">
				<div class="overlay__header">
					<div class="close" onclick="closeDrawer()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
					<div class="card__rating">
						<svg width="15" height="13" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.06919 6.79995L2.66502 4.35969L0.666687 2.71837L3.30669 2.50127L4.33335 0.199951L5.36002 2.50127L8.00002 2.71837L6.00169 4.35969L6.59752 6.79995L4.33335 5.506L2.06919 6.79995Z" fill="#F2CE17"/></svg>
						${game.rating}
					</div>
				</div>
				<div class="overlay__main">
					<div class="topInfo">
						<div class="gameinfo">
							<div>
								<div class="title"><h2>${game.title}</h2></div>
								<div class="shortDesc">${game.description}</div>
							</div>
						</div>
						<img src="${game.image}" alt="billede af ${game.title}">
					</div>
					<div class="info">
						<div class="boks">Type: <span>${game.genre}</span></div>
						<div class="boks">Sværhedsgrad: <span>${game.difficulty}</span></div>
						<div class="boks">Spilletid: <span>${game.playtime} min</span></div>
						<div class="boks">Antal spillere: <span>${game.players.min}-${game.players.max}</span></div>
						<div class="boks">Alder: <span>+${game.age}</span></div>
						<div class="boks">Hylde: <span>${game.shelf}</span></div>
					</div>
				</div>
				<div class="drawer" onclick="toggleDrawer()">
					<div class="drawHandle"></div>
					<p>${game.rules}</p>
				</div>
			</div>
		`;
}

function closeDrawer() {
  console.log("closeDrawer");
  document.getElementById("overlay").style.transform = "translateY(75vh)";
}

function filterGames() {
  let filteredGames = [...allGames];

  Object.keys(selected).forEach((filter) => {
    const value = selected[filter];
    if (!value) return;

    switch (filter) {
      case "genre":
        filteredGames = filteredGames.filter((game) => game.genre === value);
        break;
      case "difficulty":
        filteredGames = filteredGames.filter(
          (game) => game.difficulty === value
        );
        break;
      case "players":
        const players = Number(value);
        filteredGames = filteredGames.filter(
          (game) => game.players.min <= players && game.players.max >= players
        );
        break;
      case "time":
        const time = parseInt(value, 10);
        filteredGames = filteredGames.filter((game) => game.playtime <= time);
        break;
      case "search":
        const searchTerm = value.toLowerCase();
        filteredGames = filteredGames.filter((game) =>
          game.title.toLowerCase().includes(searchTerm)
        );
        break;
      case "location":
        filteredGames = filteredGames.filter((game) => game.location === value);
        break;
    }
  });

  displayGames(filteredGames);
}

function renderSubChips(filter) {
//   console.log("Rendering sub-chips for filter:", filter);
//   console.log("Available options:", filters[filter]);

  const activeChip = document.querySelector(`.chip[data-filter="${filter}"]`);
  const chipRect = activeChip.getBoundingClientRect();

  if (!filters[filter]) {
    subChipsContainer.style.display = "none";
    return;
  }

  subChipsContainer.style.display = "flex";
  subChipsContainer.style.position = "absolute";
  subChipsContainer.style.top = `${chipRect.bottom + window.scrollY}px`;
  subChipsContainer.style.left = `${chipRect.left + window.scrollX+40}px`;

  subChipsContainer.innerHTML = filters[filter]
    .map(
      (opt) => `
      <div 
        class="sub-chip ${selected[filter] === opt ? "active" : ""}" 
        data-option="${opt}"
      >${opt}</div>
    `
    )
    .join("");

  // Add listener for sub-chip clicks
  subChipsContainer.onclick = (e) => {
    const opt = e.target.closest(".sub-chip");
    if (!opt) return;
    selected[filter] = opt.dataset.option;
    console.log("Selected option:", selected[filter]);
    renderSubChips(filter);


    // Optionally sync with URL
    const params = new URLSearchParams(selected);
    history.replaceState({}, "", "?" + params.toString());

    // Trigger filtering
    filterGames();
    updateSelectedChips();
    subChipsContainer.style.display="none"

  };
}

const filters = {
  players: ["2", "4", "6", "8", "10"],
  genre: ["Familiespil", "Quiz", "Strategi", "Terninger", "Kortspil"],
  difficulty: ["Let", "Mellem", "Svær"],
  time: ["20 min.", "30 min.", "60 min.", "120 min."],
  sort: ["A-Z", "Z-A", "År", "Rating"],
  location: [
    "Vestergade",
    "Fredensgade",
    "Aalborg",
    "Kolding",
    "auto",
    "other",
  ],
};

let activeFilter = null;
let selected = {};

const filtersContainer = document.querySelector(".filters");
const subChipsContainer = document.querySelector(".sub-filters");

filtersContainer.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  const filter = chip.dataset.filter;
//   console.log("Clicked chip:", chip);
//   console.log("Filter retrieved:", filter);

  // Remove .active from all chips
  document
    .querySelectorAll(".chip")
    .forEach((c) => c.classList.remove("active"));

  // Toggle open/close of the current filter
  if (activeFilter === filter) {
    activeFilter = null;
    subChipsContainer.style.display = "none";

    return;
  }

  chip.classList.add("active");
  activeFilter = filter;
  renderSubChips(filter);
});

function addSelectedChip(contextStore, filter, option) {
  const chipHTML = `
    <div class="sub-chip" data-option="${option}">
      ${filter}: ${option}
      <button class="remove-chip" onclick="removeChip('${contextStore}', '${filter}')">
        <img src="./assets/img/close-icon.svg" alt="Remove" width="16" height="16">
      </button>
    </div>
  `;
  subChipsContainer.insertAdjacentHTML("beforeend", chipHTML);
}

function removeChip(contextStore, filter) {
  contextStore[filter] = null;
  document.querySelectorAll(`.sub-chip[data-option]`).forEach((chip) => {
    if (chip.dataset.option === contextStore[filter]) {
      chip.remove();
    }
  });
}

function updateSelectedChips() {
  const selectedChipsContainer = document.querySelector(".selected-chips");
  selectedChipsContainer.innerHTML = "";

  Object.keys(selected).forEach((filter) => {
    const value = selected[filter];
    if (!value) return;

    const chipHTML = `
      <div class="selected-chip" data-filter="${filter}" data-option="${value}">
        ${filter}: ${value}
        <div class="remove-chip" onclick="removeChip('${filter}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </div>
      </div>
    `;
    selectedChipsContainer.insertAdjacentHTML("beforeend", chipHTML);
  });
}

function removeChip(filter) {
  delete selected[filter];
  updateSelectedChips();
  filterGames();

  // Update URL parameters
  const params = new URLSearchParams(selected);
  history.replaceState({}, "", "?" + params.toString());
}

/* 
Hej kære lærer, kom i også så dybt ned i koden?
Sig skål til en af os (Simon, Mathilde, Oliver eller Jacob)
Så udløser i en øl i basement, fordi i fandt vores easter egg!
*/
function shakeItToTheMax() {
  console.log("Shake it to the max!");

  closeShakePopup();

  function playSound() {
    const audio = new Audio("./assets/audio/shake.mp3");
    navigator.vibrate(100)
    navigator.vibrate(400)
    navigator.vibrate(200)

    audio.play();
  }
  playSound();

  // Add shake animation
  document.body.classList.add("shake");
  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 2000);
}

function closeShakePopup() {
  const popup = document.getElementById("shakePopup");
  popup.style.display = "none";
}

function openShakePopup() {
  const popup = document.getElementById("shakePopup");
  popup.style.display = "flex";
}

window.addEventListener("popstate", () => {

  const params = new URLSearchParams(window.location.search);
  const contextStore = {};

  // Update contextStore based on URL parameters
  params.forEach((value, key) => {
    contextStore[key] = value;
  });

  // Apply filtering based on updated contextStore
  let filteredGames = [...allGames];

  if (contextStore.genre) {
    filteredGames = filteredGames.filter(
      (game) => game.genre === contextStore.genre
    );
  }

  if (contextStore.difficulty) {
    filteredGames = filteredGames.filter(
      (game) => game.difficulty === contextStore.difficulty
    );
  }

  if (contextStore.players) {
    const players = Number(contextStore.players);
    filteredGames = filteredGames.filter(
      (game) => game.players.min <= players && game.players.max >= players
    );
  }

  if (contextStore.time) {
    const time = parseInt(contextStore.time, 10);
    filteredGames = filteredGames.filter((game) => game.playtime <= time);
  }

  if (contextStore.search) {
    const searchTerm = contextStore.search.toLowerCase();
    filteredGames = filteredGames.filter((game) =>
      game.title.toLowerCase().includes(searchTerm)
    );
  }

  if (contextStore.location) {
    filteredGames = filteredGames.filter(
      (game) => game.location === contextStore.location
    );
  }

  displayGames(filteredGames);
});

// let items = [];
// fetch(
//   "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/games.json"
// )
//   .then((res) => res.json())
//   .then((data) => {
//     items = data;
//     console.log("Loaded: " + items.length + " items");
//   });

document.body.insertAdjacentHTML(
  "beforeend",
  `
  <div id="overlay" style="display:none;">
    <div class="game-card" id="gameCard"></div>
  </div>
  <canvas id="confettiCanvas" style="position:fixed; inset:0; pointer-events:none; z-index:10000;"></canvas>
`
);

let lastX = 0,
  lastY = 0,
  lastZ = 0;
let lastUpdate = 0;
let lastShake = 0;
const SHAKE_THRESHOLD = 2000;
const COOLDOWN = 1000;

function handleMotion(e) {
  const acc = e.accelerationIncludingGravity;
  const curTime = Date.now();

  if (curTime - lastUpdate > 100) {
    const diffTime = curTime - lastUpdate;
    lastUpdate = curTime;

    const { x, y, z } = acc;
    const speed =
      (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

    if (speed > SHAKE_THRESHOLD && curTime - lastShake > COOLDOWN) {
      lastShake = curTime;
      const randomGame = allGames[Math.floor(Math.random() * allGames.length)];
      displayDrawer(randomGame.id); // Use displayDrawer to show the game
      shakeItToTheMax();
    }

    lastX = x;
    lastY = y;
    lastZ = z;
  }
}

function showGame(game) {
  const overlay = document.getElementById("overlay");
  const card = document.getElementById("gameCard");

  card.innerHTML = `
    <button class="close">&times;</button>
    <div class="rating">⭐ ${game.rating}</div>
    <img class="game-img" src="${game.image}" alt="${game.title}">
    <h2>${game.title.toUpperCase()}</h2>
    <p class="desc">${game.description}</p>
    <div class="grid">
      <div><strong>Type:</strong> ${game.genre}</div>
      <div><strong>Sværhedsgrad:</strong> ${game.difficulty}</div>
      <div><strong>Spilletid:</strong> ${game.playtime} min</div>
      <div><strong>Antal spillere:</strong> ${game.players.min}–${
    game.players.max
  }</div>
      <div><strong>Alder:</strong> +${game.age}</div>
      <div><strong>Hylde:</strong> ${game.shelf}</div>
    </div>
    <h3>Regler:</h3>
    <p class="rules">${game.rules}</p>
  `;

  overlay.style.display = "flex";
  card.querySelector(".close").onclick = () => (overlay.style.display = "none");
}

document.addEventListener("click", (e) => {
  const overlay = document.getElementById("overlay");
  if (e.target === overlay) overlay.style.display = "none";
});

window.addEventListener("devicemotion", handleMotion);

// 🎉 Confetti effect — now in front of everything
function startConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  const W = (canvas.width = window.innerWidth);
  const H = (canvas.height = window.innerHeight);

  const pieces = [];
  const colors = ["#ff0", "#f0f", "#0ff", "#f55", "#5f5", "#55f"];

  for (let i = 0; i < 777; i++) {
    pieces.push({
      x: Math.random() * W,
      y: (Math.random() * -H) / 2,
      w: 1 + Math.random() * 6,
      h: 1 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 4,
      tilt: Math.random() * 10,
    });
  }

  let duration = 7000;
  let start = null;

  function drawConfetti(ts) {
    if (!start) start = ts;
    const progress = ts - start;
    ctx.clearRect(0, 0, W, H);

    pieces.forEach((p) => {
      p.y += p.speed;
      p.x += Math.sin(p.tilt / 10);
      p.tilt += 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.w, p.h);
    });

    if (progress < duration) {
      requestAnimationFrame(drawConfetti);
    } else {
      ctx.clearRect(0, 0, W, H);
    }
  }

  requestAnimationFrame(drawConfetti);
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    console.log("first")
  selected.search = e.target.value;

  if(e.target.value.toLowerCase() == "maui"){
    const audio = new Audio("./assets/audio/maui.mp3");
    audio.play();
  }

   if(e.target.value.toLowerCase() == "spaces"){
    const audio = new Audio("./assets/audio/spaces.mp3");
    audio.play();
  }

   if(e.target.value.toLowerCase() == "shake"){
    const audio = new Audio("./assets/audio/shakeittothemax.mp3");
    audio.play();
  }

  filterGames();
});

document.getElementById("locationButton").addEventListener("click", () => {
  const dropdown = document.getElementById("locationDropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
});

// Add event listener for dropdown items
const locationDropdown = document.getElementById("locationDropdown");
locationDropdown.addEventListener("click", (e) => {
  const item = e.target.closest(".dropdown-item");

  if (!item) return;

  if (item == "all") return; //then none is choosen so give all locations

  const location = item.dataset.location;
  selected.location = location;

  // If "auto" is selected, request GPS permission
  if (location === "auto") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log("User's location:", latitude, longitude);

        const locations = [
          { name: "Aalborg", lat: 57.0488, lon: 9.9217 },
          { name: "Vestergade", lat: 56.162939, lon: 10.203921 },
          { name: "Fredensgade", lat: 56.162939, lon: 10.203921 },
          { name: "Kolding", lat: 55.4904, lon: 9.4722 },
        ];

        let closestLocation = locations[0];
        let minDistance = Number.MAX_VALUE;

        locations.forEach((loc) => {
          const distance = Math.sqrt(
            Math.pow(latitude - loc.lat, 2) + Math.pow(longitude - loc.lon, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestLocation = loc;
          }
        });

        selected.location = closestLocation.name;
        console.log("Closest location:", selected.location);
        filterGames();
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  } else {
    filterGames();
  }

  // Hide dropdown after selection
  locationDropdown.style.display = "none";
});