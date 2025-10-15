// https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/games.json

/*
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
let resultater = document.getElementById("results");
let allGames = []; // Declare allGames globally to access it in displayDrawer

async function getGames() {
  try {
    console.log("🌐 Henter alle spil fra JSON...");
    const response = await fetch('https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/games.json');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    allGames = await response.json();
    console.log(`📊 JSON data modtaget: ${allGames.length} games`);

    // populateGenreDropdown();
    // filterMovies();
    console.log(allGames);

    displayGames(allGames);

  } catch (error) {
    console.error("❌ Kunne ikke hente games:", error);
    resultater.innerHTML =
      '<div><p>🚨 Kunne ikke hente Games.</p></div>';
  }
}


// #3: Render all movies in the grid
function displayGames(games) {
  resultater.innerHTML = "";

 /*
  if (!game.length) {
    resultater.insertAdjacentHTML(
      "beforeend",
      '<div class="movie-list-empty"><p>🎬 Ingen film matchede dine filtre...</p></div>'
    );
    return;
  }
    */

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
//   gameListElement.insertAdjacentHTML("beforeend", movieHTML);

//   const newCard = movieListElement.lastElementChild;
//   newCard.addEventListener("click", () => {
//     console.log(`🎬 Klik på: "${movie.title}"`);
//     showMovieModal(movie);
//   });

//   newCard.addEventListener("keydown", (event) => {
//     if (event.key === "Enter" || event.key === " ") {
//       event.preventDefault();
//       showMovieModal(movie);
//     }
//   });

}

getGames();


let drawHolder = document.getElementById('drawHolder');

function displayDrawer(id) {
    console.log(id);

    // Find the game by id
    const game = allGames.find(game => game.id === id);

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

/*
<div class="card">
	<div class="card__imageHolder">
		<div class="card__rating">
			<svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.06919 6.79995L2.66502 4.35969L0.666687 2.71837L3.30669 2.50127L4.33335 0.199951L5.36002 2.50127L8.00002 2.71837L6.00169 4.35969L6.59752 6.79995L4.33335 5.506L2.06919 6.79995Z" fill="#F2CE17"/>
</svg>

			4
		</div>
		<img src="https://raw.githubusercontent.com/cederdorff/race/master/images/games/matador.webp" alt="">
	</div>
	
	<h2>Partners</h2>
	
	<div class="card__info">
		<div class="card__infoTAG"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg> 4</div>
		<div class="card__infoTAG"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg> 60 min</div>
		<div class="card__infoTAG"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> +8</div>
	</div>
</div>*/

document.getElementById('closeDrawer').addEventListener('click', closeDrawer);

function closeDrawer() {
    console.log("closeDrawer")

    document.getElementById('overlay').style.transform = 'translateY(85vh)';


}