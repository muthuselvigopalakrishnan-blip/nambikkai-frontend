const container = document.getElementById("lawyer-container");

function renderLawyers(lawyers) {
    container.innerHTML = ""; // Clear existing content

    lawyers.forEach((lawyer) => {
        const card = document.createElement("div");
        card.className = "card";

        card.style.cursor = "pointer";
        card.onclick = () => window.location.href = lawyer.detail_page;

        card.innerHTML = `
            <img src="${lawyer.image_url}" alt="${lawyer.name}">
            <div class="card-content">
                <h3>${lawyer.name}</h3>
                <p>${lawyer.quote}</p>
                <button onclick="event.stopPropagation(); window.location.href='${lawyer.detail_page}'">View More</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Use local data instead of fetching
if (window.appData && window.appData.lawyers) {
    renderLawyers(window.appData.lawyers);
} else {
    console.error("Lawyer data not found in window.appData");
}
