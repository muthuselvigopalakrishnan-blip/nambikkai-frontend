// Initialize appointments from localStorage or use defaults
const defaultAppointments = [
    {
        id: 1,
        date: "2026-03-05",
        userName: "Muthu Selvi",
        email: "muthu@example.com",
        providerName: "Aasara Foundation",
        providerType: "NGO",
        purpose: "Need help with documentation for a victim of honor killing. Urgent request.",
        status: "Pending"
    },
    {
        id: 2,
        date: "2026-03-10",
        userName: "John Doe",
        email: "john@example.com",
        providerName: "Rebecca John",
        providerType: "LAWYER",
        purpose: "Legal advice on marriage registration and protection from family threats.",
        status: "Pending"
    },
    {
        id: 3,
        date: "2026-03-12",
        userName: "Sarah Smith",
        email: "sarah@example.com",
        providerName: "Aasara Foundation",
        providerType: "NGO",
        purpose: "Requesting emergency shelter information for a young woman in danger.",
        status: "Approved"
    },
    {
        id: 4,
        date: "2026-03-15",
        userName: "Michael Chen",
        email: "mike@example.com",
        providerName: "Rebecca John",
        providerType: "LAWYER",
        purpose: "Case review for human rights violation during a community conflict.",
        status: "Rejected"
    },
    {
        id: 5,
        date: "2026-03-18",
        userName: "Jane Miller",
        email: "jane@gmail.com",
        providerName: "Anand Grover",
        providerType: "LAWYER",
        purpose: "Public Interest Litigation consultation regarding women rights.",
        status: "Pending"
    },
    {
        id: 6,
        date: "2026-03-20",
        userName: "Rajesh Kumar",
        email: "rajesh@example.com",
        providerName: "Anand Grover",
        providerType: "LAWYER",
        purpose: "Assistance with health rights and HIV/AIDS related legal issues.",
        status: "Pending"
    },
    {
        id: 7,
        date: "2026-03-22",
        userName: "Priya Sharma",
        email: "priya@gmail.com",
        providerName: "Dhanak",
        providerType: "NGO",
        purpose: "Seeking support for inter-faith marriage protection and legal aid.",
        status: "Pending"
    },
    {
        id: 8,
        date: "2026-03-25",
        userName: "Anita Desai",
        email: "anita@example.com",
        providerName: "Vrinda Grover",
        providerType: "LAWYER",
        purpose: "Consultation on women's safety and sexual harassment laws.",
        status: "Pending"
    },
    {
        id: 9,
        date: "2026-03-28",
        userName: "Vikram Singh",
        email: "vikram@example.com",
        providerName: "Love Commando",
        providerType: "NGO",
        purpose: "Immediate protection needed for a couple facing threats from family.",
        status: "Pending"
    },
    {
        id: 10,
        date: "2026-04-01",
        userName: "Kavita Reddy",
        email: "kavita@example.com",
        providerName: "Evidence Madurai",
        providerType: "NGO",
        purpose: "Reporting a case of caste-based violence and seeking justice.",
        status: "Pending"
    }
];

let appointments = JSON.parse(localStorage.getItem('all_appointments')) || defaultAppointments;

// Save to localStorage whenever updated
function saveAppointments() {
    localStorage.setItem('all_appointments', JSON.stringify(appointments));
}

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('currentUser');
    if (!loggedInUser) {
        window.location.href = './login.html';
        return;
    }

    const provider = JSON.parse(loggedInUser);
    if (provider.type === 'USER') {
        window.location.href = './userdashboard.html';
        return;
    }

    renderDashboard(provider);
});

async function renderDashboard(provider) {
    // 1. Update Header & Badge
    const providerNameEl = document.getElementById("provider-name");
    const providerBadgeEl = document.getElementById("provider-badge");
    if (providerNameEl) providerNameEl.innerText = provider.name;
    if (providerBadgeEl) {
        providerBadgeEl.innerText = provider.type;
        providerBadgeEl.className = `badge ${provider.type.toLowerCase()}`;
    }

    // 2. DOM Elements for Tables
    const pendingList = document.getElementById("pending-list");
    const historyList = document.getElementById("history-list");
    const pendingTable = document.getElementById("pending-table");
    const historyTable = document.getElementById("history-table");
    const noPendingMsg = document.getElementById("no-pending");
    const noHistoryMsg = document.getElementById("no-history");

    try {
        // 3. Fetch Data from Backend
        const response = await fetch(`http://localhost:8000/api/appointments?provider_name=${encodeURIComponent(provider.name)}`);
        const dbAppointments = response.ok ? await response.json() : [];

        // 4. Split Data into Pending vs History
        const pendingData = dbAppointments.filter(app => (app.status || 'Pending').toLowerCase() === 'pending');
        const historyData = dbAppointments; // History shows everything

        // 5. Render Pending Table
        pendingList.innerHTML = "";
        if (pendingData.length === 0) {
            noPendingMsg.style.display = "block";
            pendingTable.style.display = "none";
        } else {
            noPendingMsg.style.display = "none";
            pendingTable.style.display = "table";
            pendingData.forEach(app => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${app.appointment_date}</td>
                    <td>${app.full_name}</td>
                    <td>${app.email}</td>
                    <td>${app.purpose}</td>
                    <td><span class="status pending">Pending</span></td>
                    <td>
                        <div class="card-actions" style="display:flex; gap:10px;">
                            <button class="action-btn btn-approve" onclick="updateStatus(${app.id}, 'Approved', '${app.full_name}', '${app.email}', '${app.appointment_date}')">
                                <i class="fas fa-check"></i> Approve
                            </button>
                            <button class="action-btn btn-reject" onclick="updateStatus(${app.id}, 'Rejected', '${app.full_name}', '${app.email}', '${app.appointment_date}')">
                                <i class="fas fa-times"></i> Reject
                            </button>
                        </div>
                    </td>
                `;
                pendingList.appendChild(row);
            });
        }

        // 6. Render History Table
        historyList.innerHTML = "";
        if (historyData.length === 0) {
            noHistoryMsg.style.display = "block";
            historyTable.style.display = "none";
        } else {
            noHistoryMsg.style.display = "none";
            historyTable.style.display = "table";
            historyData.forEach(app => {
                const row = document.createElement("tr");
                const status = app.status || 'Pending';
                row.innerHTML = `
                    <td>${app.appointment_date}</td>
                    <td>${app.full_name}</td>
                    <td>${app.email}</td>
                    <td>${app.purpose}</td>
                    <td>
                        <span class="status ${status.toLowerCase()}">${status}</span>
                    </td>
                `;
                historyList.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Dashboard Error:", error);
        noPendingMsg.innerText = "Error loading data. Is the server running?";
        noPendingMsg.style.display = "block";
    }
}

// Global functions for actions
window.updateStatus = async (id, newStatus, userName, userEmail, appDate) => {
    try {
        const response = await fetch(`http://localhost:8000/api/appointments/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            alert(`Appointment ${newStatus} Successfully! Email notification sent to ${userName}.`);
            const provider = JSON.parse(localStorage.getItem('currentUser'));
            renderDashboard(provider);
        } else {
            alert("Failed to update status.");
        }
    } catch (error) {
        console.error("Update error:", error);
        alert("Server connection error.");
    }
};

// Logout functionality
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector(".logout-link");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            localStorage.removeItem('currentUser');
        });
    }
});
