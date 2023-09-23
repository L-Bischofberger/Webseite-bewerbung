const sectionLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.hidden-section');
const homeButton = document.getElementById('home-button');
const contentSection = document.getElementById('content');

sectionLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Verhindert das Navigieren zur Seite

        // Holen Sie sich den Zielabschnitt und seine Position
        const targetSection = document.getElementById(link.getAttribute('data-section'));

        // Verstecken Sie alle Abschnitte
        sections.forEach(section => {
            section.classList.add('hidden-section');
        });

        // Fügen Sie den Zielabschnitt direkt unter den ausgewählten Link ein und zeigen Sie ihn an
        link.parentElement.insertBefore(targetSection, link.nextElementSibling);
        targetSection.classList.remove('hidden-section');
    });
});

homeButton.addEventListener('click', function() {
    sections.forEach(section => {
        section.classList.add('hidden-section');
    });
});


document.getElementById("info-button").addEventListener("click", function() {
    popup.style.display = "block";
    sections.forEach(section => {
        section.classList.add('hidden-section');
    });
});




homeButton.addEventListener("click", function() {
    popup.style.display = "none";
});