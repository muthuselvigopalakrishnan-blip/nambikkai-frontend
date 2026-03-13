const container = document.getElementById("lawyer-container");

function renderNGOs(ngos) {
  container.innerHTML = ""; // Clear existing content

  ngos.forEach((ngo) => {
    const card = document.createElement("div");
    card.className = "card";

    card.style.cursor = "pointer";
    card.onclick = () => window.location.href = ngo.detail_page;

    card.innerHTML = `
        <img src="${ngo.image_url}" alt="${ngo.name}">
        <div class="card-content">
            <h3>${ngo.name}</h3>
            <p>${ngo.description}</p>
            <button onclick="event.stopPropagation(); window.location.href='${ngo.detail_page}'">View More</button>
        </div>
    `;

    container.appendChild(card);
  });
}

// Use local data instead of fetching
if (window.appData && window.appData.ngos) {
  renderNGOs(window.appData.ngos);
} else {
  console.error("NGO data not found in window.appData");
}
