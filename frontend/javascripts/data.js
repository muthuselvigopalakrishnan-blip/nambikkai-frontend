const ngos = [
    {
        name: "Aasara Foundation",
        description: "Supporting victims of honor killing.",
        image_url: "../assets/asara_foundation.png",
        detail_page: "asara_foundation.html"
    },
    {
        name: "Dhanak",
        description: "Promoting right to choose.",
        image_url: "../assets/dhanak.png",
        detail_page: "dhanak.html"
    },
    {
        name: "DHRDNet",
        description: "Human rights protection.",
        image_url: "../assets/dhrdnet.png",
        detail_page: "dhrdnet.html"
    },
    {
        name: "Evidence Madurai",
        description: "Monitoring social justice.",
        image_url: "../assets/evidence_madurai.png",
        detail_page: "evidence_madurai.html"
    },
    {
        name: "Love Commando",
        description: "Protecting love birds.",
        image_url: "../assets/Love_commados.png",
        detail_page: "love_commados.html"
    },
    {
        name: "Manjhi",
        description: "Empowering communities.",
        image_url: "../assets/manji_manch.png",
        detail_page: "manji_manch.html"
    }
];

const lawyers = [
    {
        name: "Anand Grover",
        quote: "Honor killing is a crime.",
        image_url: "../assets/Anand-Grover.avif",
        detail_page: "anand_grover.html"
    },
    {
        name: "Colin Gonsalves",
        quote: "Say NO to violence.",
        image_url: "../assets/Colin Gonsalves.webp",
        detail_page: "colin_gonsalves.html"
    },
    {
        name: "Indira Jaising",
        quote: "We must support victims.",
        image_url: "../assets/Indira.png",
        detail_page: "indira.html"
    },
    {
        name: "Kavita Srivastava",
        quote: "Education can stop it.",
        image_url: "../assets/Kavita Srivastava.png",
        detail_page: "kavita_srivastava.html"
    },
    {
        name: "Rebecca John",
        quote: "Strong law is needed.",
        image_url: "../assets/Rebecca_John.jpg",
        detail_page: "rebecca_john.html"
    },
    {
        name: "Vrinda Grover",
        quote: "Everyone has rights.",
        image_url: "../assets/Vrinda_Grove.png",
        detail_page: "vrinda_grover.html"
    }
];

// If using in a module context, you might want to export them.
// But for simple script tags, they just need to be in the global scope.
window.appData = {
    ngos: ngos,
    lawyers: lawyers
};
