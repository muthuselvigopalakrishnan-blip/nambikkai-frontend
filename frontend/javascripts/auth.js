document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    const loggedInUser = localStorage.getItem('currentUser');

    // Create login/logout/dashboard links based on auth state
    updateNavbar(navLinks, loggedInUser);
});

function getPathConfig() {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    const isHtmlPage = pathname.includes('/frontend/html/');

    return {
        home: isHtmlPage ? '../../index.html' : 'frontend/html/index.html',
        ngos: isHtmlPage ? 'ngo_list.html' : 'frontend/html/ngo_list.html',
        lawyers: isHtmlPage ? 'lawyer_list.html' : 'frontend/html/lawyer_list.html',
        book: isHtmlPage ? 'book_appointment.html' : 'frontend/html/book_appointment.html',
        login: isHtmlPage ? 'login.html' : 'frontend/html/login.html',
        userDashboard: isHtmlPage ? 'userdashboard.html' : 'frontend/html/userdashboard.html',
        providerDashboard: isHtmlPage ? 'provider-dashboard.html' : 'frontend/html/provider-dashboard.html',
    };
}

function updateNavbar(container, userStr) {
    const user = userStr ? JSON.parse(userStr) : null;
    const paths = getPathConfig();

    let html = `<a href="${paths.home}">Home</a>`;
    html += `<a href="${paths.ngos}">NGO's</a>`;
    html += `<a href="${paths.lawyers}">Lawyers</a>`;

    if (user) {
        if (user.type === 'USER') {
            html += `<a href="${paths.userDashboard}">Dashboard</a>`;
        } else {
            html += `<a href="${paths.providerDashboard}">All Appointment</a>`;
        }
        html += `<a href="${paths.book}">Book Appointment</a>`;
        html += `<a href="#" id="logout-btn" style="color: #ff7675; font-weight: 700;">Logout</a>`;
    } else {
        html += `<a href="${paths.book}">Book Appointment</a>`;
        html += `<a href="${paths.login}">Login</a>`;
    }

    container.innerHTML = html;

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = paths.home;
        });
    }
}
