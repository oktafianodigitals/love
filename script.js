const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const sendButton = document.getElementById('sendButton');
const containerhead = document.getElementById('containerhead');
const containerresult = document.getElementById('containerresult');
const inputmessage = document.getElementById('inputmessage');
const result = document.getElementById('result');
const flowers = document.getElementById('flowers');
const flowersEmoji = ['🌼', '🌻', '🏵️', '🌷', '🌹', '🌺', '🌸'];

const TELEGRAM_BOT_TOKEN = '7997566569:AAEDuHXY_BZBVpRMYU4VpCo-hbr46IqiEfc';
const  TELEGRAM_CHAT_ID = '6678271110';

// Move the no button when hover
noButton.addEventListener('mouseover', function() {
    // calculate new position
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    noButton.style.position = 'fixed';
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
});

// Move the no button when touch
noButton.addEventListener('touchstart', function(e) {
    e.preventDefault();
    // calculate new position
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    noButton.style.position = 'fixed';
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
});

// When yes button clicked
yesButton.addEventListener('click', function() {
    // hide the container head
    containerhead.classList.add('hidden');

    // show the container result
    containerresult.style.display = 'block';

    // Create falling flower
    createFlowers();
});

sendButton.addEventListener('click', function() {
    // Get the text value from input
    const message = inputmessage.value.trim();

    if (message) {
        // Send notification to telegram
        sendTelegramNotification(message);

        // Clear the input field after sending
        inputmessage.value = '';

        // Show a temporary succes message
        const originalText = sendButton.innerHTML;
        sendButton.innerHTML = '✓';
        sendButton.disable = true;

        setTimeout(() => {
            sendButton.innerHTML = originalText;
            sendButton.disable = false;
        }, 2000);

        // Add a 1 secdelay before reloading the page
        setTimeout(() => {
            location.reload();
        }, 1000);
    };
});

// Also allow sending when pressing Enter key in input feild
inputmessage.addEventListener('keypress', function() {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendButton.click();
    };
});

function sendTelegramNotification(inputmessage) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    // Send data
    const data = {
        chat_id: TELEGRAM_CHAT_ID,
        text: inputmessage,
        parse_mode: 'HTML'
    };

    // Send request
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(Response => Response.json())
    .then(data => {
        console.log('Send DONE :', data);
    })
    .catch(error => {
        console.error('Error to send :', error);
    });
};

function createFlowers() {
    // create 80 flowers
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            
            // Random emoji
            const emoji = flowersEmoji[Math.floor(Math.random() * flowersEmoji.length)];
            flower.textContent = emoji;

            // Random position
            const left = Math.random()  * 100;
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
    };
};