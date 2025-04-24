const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const result = document.getElementById('result');
const flowers = document.getElementById('flowers');
const flowersEmojis = ['🌸', '🌺', '🌹', '🌷', '🏵️', '🌻', '🌼'];

// Move the no button when hovered
noButton.addEventListener('mouseover', function() {
    // calculate new position
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    noButton.style.position = 'fixed';
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
});

// Move the no button on touch (mobile)
noButton.addEventListener('touchstart', function(e) {
    // calculate new position
    e.preventDefault();
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    noButton.style.position = 'fixed';
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
});

// When yes clicked
yesButton.addEventListener('click', function() {
    // Hide buttons
    noButton.classList.add('hidden');
    yesButton.classList.add('hidden');

    // Show Result
    result.classList.add('visible');

    // Create falling flowers
    createFlowers();
});

function createFlowers() {
    // create 50 flowers
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.classList.add('flower');

            // Random Emoji
            const emoji = flowersEmojis[Math.floor(Math.random() * flowersEmojis.length)];
            flower.textContent = emoji;

            // Random position
            const left = Math.random() * 100;
            flower.style.left = `${left}%`;

            // Random duration
            const duration = 3 + Math.random() * 5;
            flower.style.animationDuration = `${duration}s`;

            // add to DOM
            flowers.appendChild(flower);

            // Remove after animation
            setTimeout(() => {
                flowers.removeChild(flower);
            }, duration * 1000);
        }, i * 100); 
    }
}