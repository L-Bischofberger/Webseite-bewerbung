inks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.hidden-section');
const homeButton = document.getElementById('home-button');
const contentSection = document.getElementById('content');

orEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetSection = document.getElementById(link.getAttribute('data-section'));
        sections.forEach(section => {
            section.classList.add('hidden-section');
        });
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
    document.getElementById("popup").style.display = "block";
});

document.getElementById("popup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

document.getElementById("home-button").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});