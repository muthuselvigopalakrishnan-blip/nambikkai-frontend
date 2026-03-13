document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    const loggedInUser = localStorage.getItem('currentUser');

    // Create login/logout/dashboard links based on auth state
    updateNavbar(navLinks, loggedInUser);
});

function updateNavbar(container, userStr) {
    const user = userStr ? JSON.parse(userStr) : null;
    const currentPath = window.location.pathname;

    let html = `<a href="index.html">Home</a>`;
    html += `<a href="ngo_list.html">NGO's</a>`;
    html += `<a href="lawyer_list.html">Lawyers</a>`;

    if (user) {
        if (user.type === 'USER') {
            html += `<a href="userdashboard.html">Dashboard</a>`;
        } else {
            html += `<a href="provider-dashboard.html">All Appointment</a>`;
        }
        html += `<a href="book_appointment.html">Book Appointment</a>`;
        html += `<a href="#" id="logout-btn" style="color: #ff7675; font-weight: 700;">Logout</a>`;
    } else {
        html += `<a href="book_appointment.html">Book Appointment</a>`;
        html += `<a href="login.html">Login</a>`;
    }

    container.innerHTML = html;

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}
