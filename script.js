const sectionLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.hidden-section');
const homeButton = document.getElementById('home-button');
const contentSection = document.getElementById('content');
const popup = document.getElementById('popup');
const infoButton = document.getElementById('info-button');

let isPopupOpen = false;

sectionLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Verhindert das Navigieren zur Seite

        // Holen Sie sich den Zielabschnitt
        const targetSection = document.getElementById(link.getAttribute('data-section'));

        // Verstecken Sie alle Abschnitte
        sections.forEach(section => {
            section.classList.add('hidden-section');
        });

        // Fügen Sie den Zielabschnitt direkt unter den ausgewählten Link ein und zeigen Sie ihn an
        link.parentElement.insertBefore(targetSection, link.nextElementSibling);
        targetSection.classList.remove('hidden-section');

        // Scrollen Sie zum Zielabschnitt und positionieren Sie ihn am oberen Bildschirmrand
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Schließen Sie das Popup-Fenster, wenn ein Abschnitt ausgewählt wird
        closePopup();
    });
});
homeButton.addEventListener('click', function() {
    sections.forEach(section => {
        section.classList.add('hidden-section');
    });
    
    // Schließen Sie das Popup-Fenster, wenn der "Home" -Button geklickt wird
    closePopup();
});

infoButton.addEventListener('click', function() {
    sections.forEach(section => {
        section.classList.add('hidden-section');
    });
    if (!isPopupOpen) {
        popup.style.display = "block";
        isPopupOpen = true;
    } else {
        closePopup();
    }
});

// Funktion zum Schließen des Popup-Fensters
function closePopup() {
    if (isPopupOpen) {
        popup.style.display = "none";
        isPopupOpen = false;
    }
}