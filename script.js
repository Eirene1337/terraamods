const mods = [

    {
        id: 1,
        name: "Calamity Mod",
        category: "content",
        image: "assets/calamity.png",

        description:
            "A massive content mod featuring new bosses, weapons, biomes and challenging adventures.",

        downloads: 15240,
        rating: 4.9,

        downloadUrl: "https://calamitymod.com/download"
    },

    {
        id: 2,
        name: "Aetherfull",
        category: "content",
        image: "assets/aetherfull.png",

        description:
            "Explore mysterious worlds, powerful enemies and exciting new content in Aetherfull.",

        downloads: 8240,
        rating: 4.8,

        downloadUrl: "https://www.dropbox.com/scl/fi/d6qmnsz1y9djk9mgesza1/Aetherfall.zip?rlkey=eaqa9jfv1ah18kkbinqtkotg7&st=yx40gbsd&dl=1"
    },

    {
        id: 3,
        name: "Magic Overhaul",
        category: "magic",
        image: "assets/magic.png",

        description:
            "Completely improve and expand the magic system with powerful new abilities.",

        downloads: 9840,
        rating: 4.8,

        downloadUrl: "https://steamcommunity.com/workshop/filedetails/?id=2925249383"
    },

    {
        id: 4,
        name: "Boss Arena",
        category: "boss",
        image: "assets/boss.png",

        description:
            "Fight dangerous new bosses and challenge yourself with intense battles.",

        downloads: 7420,
        rating: 4.7,

        downloadUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3077668360"
    },

    {
        id: 5,
        name: "Better Inventory",
        category: "utility",
        image: "assets/inventory.png",

        description:
            "Improve your inventory management and make your gameplay experience smoother.",

        downloads: 12500,
        rating: 4.9,

        downloadUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3678702962"
    },

    {
        id: 6,
        name: "HD Terraria",
        category: "visual",
        image: "assets/visual.png",

        description:
            "Enhance Terraria with improved visuals, effects and graphical improvements.",

        downloads: 6300,
        rating: 4.6,

        downloadUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3416566835"
    },

    {
        id: 7,
        name: "Adventure World",
        category: "content",
        image: "assets/adventure.png",

        description:
            "Discover new regions, adventures and mysterious worlds waiting to be explored.",

        downloads: 11200,
        rating: 4.8,

        downloadUrl: "https://steamcommunity.com/workshop/filedetails/?id=2604287089"
    }

];
let currentCategory = "all";



function getFavorites() {

    return JSON.parse(

        localStorage.getItem("favorites")

    ) || [];

}



function saveFavorites(favorites) {

    localStorage.setItem(

        "favorites",

        JSON.stringify(favorites)

    );

}



function renderMods(modList) {

    const grid =

        document.getElementById(
            "modsGrid"
        );


    const favorites =

        getFavorites();


    grid.innerHTML = "";


    if (modList.length === 0) {

        grid.innerHTML = `

            <div class="no-results">

                <h3>No mods found</h3>

                <p>
                    Try searching for something else.
                </p>

            </div>

        `;

        return;

    }



    modList.forEach(mod => {

        const isFavorite =

            favorites.includes(mod.id);


        grid.innerHTML += `

            <div class="mod-card">


                <div class="mod-image">

                    <img
                        src="${mod.image}"
                        alt="${mod.name}"
                    >

                </div>


                <div class="mod-content">


                    <div class="mod-title">

                        ${mod.name}

                    </div>


                    <div class="mod-description">

                        ${mod.description}

                    </div>


                    <div class="mod-info">


                        <span>

                            ⭐ ${mod.rating}

                        </span>


                        <span>

                            ⬇ ${mod.downloads.toLocaleString()}

                        </span>


                    </div>


                    <div class="mod-footer">


                        <button
                            class="download-btn"
                            onclick="downloadMod(${mod.id})"
                        >

                            Download

                        </button>


                        <button
                            class="favorite-btn"
                            onclick="toggleFavorite(${mod.id})"
                        >

                            ${isFavorite ? "❤️" : "🤍"}

                        </button>


                    </div>


                </div>


            </div>

        `;

    });



    document
        .getElementById("modCount")
        .textContent =

        `${modList.length} mods found`;

}

function filterCategory(category, button) {

    // Aktif kategori butonunu değiştir
    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");


    // Modları filtrele
    document.querySelectorAll(".mod-card").forEach(card => {

        const cardCategory = card.dataset.category;

        if (
            category === "all" ||
            cardCategory === category
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
}

const navLinks = document.querySelectorAll(".nav-links a:not(.discord-link)");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


function filterCategory(category, button) {

    // Aktif kategori butonunu değiştir
    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");


    // Modları filtrele
    document.querySelectorAll(".mod-card").forEach(card => {

        const cardCategory = card.dataset.category;

        if (
            category === "all" ||
            cardCategory === category
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
}


function filterCategory(
    category,
    button
) {

    currentCategory = category;


    document
        .querySelectorAll(".category")
        .forEach(item => {

            item.classList.remove("active");

        });


    button.classList.add("active");


    if (category === "all") {

        renderMods(mods);

        return;

    }


    const filteredMods =

        mods.filter(

            mod =>
                mod.category === category

        );


    renderMods(filteredMods);

}



function searchMods() {

    const searchValue =

        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    let filteredMods =

        mods.filter(mod =>

            mod.name
                .toLowerCase()
                .includes(searchValue)

            ||

            mod.description
                .toLowerCase()
                .includes(searchValue)

        );


    if (
        currentCategory !== "all"
    ) {

        filteredMods =

            filteredMods.filter(

                mod =>
                    mod.category === currentCategory

            );

    }


    renderMods(filteredMods);

}



function toggleFavorite(id) {

    let favorites =

        getFavorites();


    if (favorites.includes(id)) {

        favorites = favorites.filter(

            favoriteId =>
                favoriteId !== id

        );

    }

    else {

        favorites.push(id);

    }


    saveFavorites(favorites);


    refreshCurrentMods();

}



function refreshCurrentMods() {

    if (
        currentCategory === "all"
    ) {

        renderMods(mods);

        return;

    }


    const filteredMods =

        mods.filter(

            mod =>
                mod.category === currentCategory

        );


    renderMods(filteredMods);

}



function downloadMod(id) {

    const mod = mods.find(
        mod => mod.id === id
    );

    if (!mod || !mod.downloadUrl) {
        alert("Download link not available.");
        return;
    }

    window.open(
        mod.downloadUrl,
        "_blank"
    );
}

document
    .getElementById("searchInput")
    .addEventListener(

        "keyup",

        function(event) {

            if (
                event.key === "Enter"
            ) {

                searchMods();

            }

        }

    );


renderMods(mods);

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});
