const apps = [
    {
        name: "Pulse Tasks",
        category: "productivitat",
        description: "Organitza projectes, recordatoris i rutines en una sola app.",
        rating: "4.8",
        size: "18 MB",
        icon: "P",
        colors: ["#f20505", "#f27979"]
    },
    {
        name: "Pixel Quest",
        category: "jocs",
        description: "Aventura retro amb nivells curts, ràpids i molt addictius.",
        rating: "4.7",
        size: "96 MB",
        icon: "Q",
        colors: ["#0d0d0d", "#525252"]
    },
    {
        name: "Loop Chat",
        category: "social",
        description: "Comunitats privades, missatges fluids i notes de veu elegants.",
        rating: "4.6",
        size: "42 MB",
        icon: "L",
        colors: ["#f23d3d", "#f27979"]
    },
    {
        name: "Moove Studio",
        category: "creativitat",
        description: "Dissenya reels, stories i peces visuals amb plantilles pro.",
        rating: "4.9",
        size: "71 MB",
        icon: "M",
        colors: ["#0d0d0d", "#f23d3d"]
    },
    {
        name: "Habit Bloom",
        category: "productivitat",
        description: "Segueix hàbits diaris amb gràfiques netes i motivació visual.",
        rating: "4.8",
        size: "24 MB",
        icon: "H",
        colors: ["#f27979", "#f2f2f2"]
    },
    {
        name: "Beat Drop",
        category: "jocs",
        description: "Ritme, velocitat i colors vius en una experiència arcade.",
        rating: "4.5",
        size: "120 MB",
        icon: "B",
        colors: ["#f20505", "#f23d3d"]
    }
];

const appsGrid = document.getElementById("appsGrid");
const searchInput = document.getElementById("searchInput");
const chips = [...document.querySelectorAll(".chip")];
const resultsInfo = document.getElementById("resultsInfo");
let activeCategory = "all";

function renderApps() {
    const term = searchInput.value.trim().toLowerCase();
    const filtered = apps.filter((app) => {
        const matchesCategory = activeCategory === "all" || app.category === activeCategory;
        const matchesSearch =
            app.name.toLowerCase().includes(term) ||
            app.description.toLowerCase().includes(term) ||
            app.category.toLowerCase().includes(term);

        return matchesCategory && matchesSearch;
    });

    resultsInfo.textContent = `${filtered.length} resultats trobats`;

    appsGrid.innerHTML = filtered.map((app) => `
        <article class="app-card">
          <div class="app-icon" style="background: linear-gradient(135deg, ${app.colors[0]}, ${app.colors[1]});">
            ${app.icon}
          </div>
          <div>
            <h3>${app.name}</h3>
            <p>${app.description}</p>
            <div class="meta">
              <span>${app.rating} ★</span>
              <span>${app.size}</span>
              <span>${capitalize(app.category)}</span>
            </div>
          </div>
          <button class="install-btn" type="button">Instal·lar</button>
        </article>
      `).join("");

    if (!filtered.length) {
        appsGrid.innerHTML = `
          <article class="promo-card">
            <strong>No hi ha resultats</strong>
            <p style="margin: 0; color: var(--muted);">Prova una altra cerca o canvia de categoria.</p>
          </article>
        `;
    }

    bindInstallButtons();
}

function bindInstallButtons() {
    document.querySelectorAll(".install-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const isInstalled = button.classList.toggle("installed");
            button.textContent = isInstalled ? "Instal·lada" : "Instal·lar";
        });
    });
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

chips.forEach((chip) => {
    chip.addEventListener("click", () => {
        chips.forEach((item) => item.classList.remove("active"));
        chip.classList.add("active");
        activeCategory = chip.dataset.category;
        renderApps();
    });
});

searchInput.addEventListener("input", renderApps);

document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
        item.classList.add("active");
    });
});

renderApps();