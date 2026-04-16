const defaultAppointments = [
  {
    userName: "User",
    date: "2026-03-05",
    providerType: "NGO",
    providerName: "Aasara Foundation",
    purpose: "Volunteering discussion",
    status: "Confirmed"
  },
  {
    userName: "User",
    date: "2026-03-10",
    providerType: "LAWYER",
    providerName: "Rebecca John",
    purpose: "Personal Meeting",
    status: "Pending"
  },
  {
    userName: "User",
    date: "2026-03-12",
    providerType: "NGO",
    providerName: "DHRDNet",
    purpose: "Awareness Program",
    status: "Confirmed"
  },
  {
    userName: "User",
    date: "2026-03-08",
    providerType: "LAWYER",
    providerName: "Anand Grover",
    purpose: "Legal consultation on property rights",
    status: "Pending"
  },
  {
    userName: "User",
    date: "2026-03-12",
    providerType: "NGO",
    providerName: "Dhanak",
    purpose: "Support for inter-faith marriage",
    status: "Confirmed"
  },
  {
    userName: "User",
    date: "2026-03-15",
    providerType: "LAWYER",
    providerName: "Vrinda Grover",
    purpose: "Human rights violation case",
    status: "Cancelled"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const loggedInUser = localStorage.getItem('currentUser');
  if (!loggedInUser) {
    window.location.href = './login.html';
    return;
  }

  const user = JSON.parse(loggedInUser);
  // If provider tries to access user dashboard, redirect to provider dashboard
  if (user.type !== 'USER') {
    window.location.href = './provider-dashboard.html';
    return;
  }

  loadUsername(user.name);
  loadAppointments(user.name);
});

function loadUsername(name) {
  document.getElementById("username").innerText = name || "User";
}

async function loadAppointments(currentUserName) {
  const tableBody = document.getElementById("appointment-list");
  const noAppointments = document.getElementById("no-appointments");

  const loggedInUser = localStorage.getItem('currentUser');
  if (!loggedInUser) return;
  const user = JSON.parse(loggedInUser);

  try {
    // 1. Fetch from Backend
    const response = await fetch(`http://localhost:8000/api/appointments?email=${user.email}`);
    let dbAppointments = [];
    if (response.ok) {
      dbAppointments = await response.json();
    }

    // 2. Get from Local Storage (fallback/local cache)
    const localApps = JSON.parse(localStorage.getItem('all_appointments')) || [];

    // Combine and deduplicate if necessary, but for simplicity let's prioritize DB data
    // If DB is empty, use defaults for demo
    let appointmentsToShow = dbAppointments;

    if (appointmentsToShow.length === 0 && currentUserName === 'User') {
      appointmentsToShow = defaultAppointments;
    }

    tableBody.innerHTML = "";

    if (appointmentsToShow.length === 0) {
      noAppointments.style.display = "block";
      return;
    }

    noAppointments.style.display = "none";

    appointmentsToShow.forEach(app => {
      const row = document.createElement("tr");

      // Handle both backend and mock data field names
      const date = app.appointment_date || app.date;
      const type = app.appointment_type || app.providerType || app.type;
      const name = app.provider_name || app.providerName || app.name;
      const purpose = app.purpose;
      const status = app.status || "Pending";

      row.innerHTML = `
        <td>${date}</td>
        <td>
          <span class="badge ${type === "NGO" ? "ngo" : "lawyer"}">
            ${type}
          </span>
        </td>
        <td>${name}</td>
        <td>${purpose}</td>
        <td>
          <span class="status ${status.toLowerCase()}">
            ${status}
          </span>
        </td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    noAppointments.innerText = "Error loading appointments. Please try again later.";
    noAppointments.style.display = "block";
  }
}

// Logout functionality
const logoutBtn = document.querySelector(".logout-link");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    localStorage.removeItem('currentUser');
  });
}
