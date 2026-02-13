// State
let state = {
    selectedCat: null,
    name: '',
    noAttempts: 0,
    noReason: '', // Will store Q&A log
    finalResponse: '',
    mode: 'professional', // 'professional' or 'valentine'
    questionIndex: 0,
    qaLog: [], // Temporary storage for Q&A
    valentineQuestionIndex: 0, // Track position in questionnaire
    questionsAnswered: [] // Track questionnaire answers
};

// Cat Data
const cats = [
    { 
        name: 'Mochi', 
        profCaption: 'ID: #8921 | Breed: Scottish Fold | Age: 2 Years | Status: Available', 
        valCaption: 'The Cuddler', 
        img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Luna', 
        profCaption: 'ID: #8922 | Breed: Bombay | Age: 1 Year | Status: Available', 
        valCaption: 'The Night Owl', 
        img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Simba', 
        profCaption: 'ID: #8923 | Breed: Ginger Tabby | Age: 3 Years | Status: Pending', 
        valCaption: 'The King', 
        img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Bella', 
        profCaption: 'ID: #8924 | Breed: Calico | Age: 4 Years | Status: Available', 
        valCaption: 'The Princess', 
        img: 'https://images.unsplash.com/photo-1503431131728-83d9dd91a685?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Oliver', 
        profCaption: 'ID: #8925 | Breed: Tuxedo | Age: 6 Months | Status: Available', 
        valCaption: 'The Playful', 
        img: 'https://images.unsplash.com/photo-1490100667990-4fced8021649?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Leo', 
        profCaption: 'ID: #8926 | Breed: Maine Coon Mix | Age: 5 Years | Status: Urgent', 
        valCaption: 'The Brave', 
        img: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Nala', 
        profCaption: 'ID: #8927 | Breed: Siamese | Age: 2 Years | Status: Available', 
        valCaption: 'The Sassy Queen', 
        img: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Oscar', 
        profCaption: 'ID: #8928 | Breed: British Shorthair | Age: 4 Years | Status: Available', 
        valCaption: 'The Gentleman', 
        img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Milo', 
        profCaption: 'ID: #8929 | Breed: Ragdoll | Age: 1 Year | Status: Pending', 
        valCaption: 'The Fluffball', 
        img: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Chloe', 
        profCaption: 'ID: #8930 | Breed: Persian | Age: 3 Years | Status: Available', 
        valCaption: 'The Diva', 
        img: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Max', 
        profCaption: 'ID: #8931 | Breed: Bengal | Age: 2 Years | Status: Urgent', 
        valCaption: 'The Wild One', 
        img: 'https://images.unsplash.com/photo-1511044568932-338cba0fb803?w=500&auto=format&fit=crop&q=60' 
    },
    { 
        name: 'Lily', 
        profCaption: 'ID: #8932 | Breed: Sphynx | Age: 5 Years | Status: Available', 
        valCaption: 'The Unique Beauty', 
        img: 'https://images.unsplash.com/photo-1501820488136-72669149e0d4?w=500&auto=format&fit=crop&q=60' 
    }
];

// Phrases for the "No" button
const noButtonPhrases = [
    "chl by chl",
    "bhaag ja",
    "dur dur",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!"
];

// Cute GIFs for "No" clicks
const reactionGifs = [
    "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif", // Sad cat
    "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif", // Shocked cat
    "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif", // Crying cat
    "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif", // Disappointed cat
    "https://media.giphy.com/media/BbnJm4FC4kGPK/giphy.gif", // Pleading cat
    "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif" // Suspicious cat
];

// New Valentine's Day Questions
const valentineQuestions = [
    {
        question: "Do you believe in love at first sight, or should I walk by again with a kitten? 😻",
        answers: ["I believe!", "Show me the kitten!"],
        gif: "https://media.giphy.com/media/3o7TKSha51ATTx9Kz6/giphy.gif"
    },
    {
        question: "Are you made of catnip? Because you're driving me crazy! 😉",
        answers: ["Maybe I am...", "Haha, you're silly!"],
        gif: "https://media.giphy.com/media/59bgei1dDl4s0/giphy.gif"
    },
    {
        question: "If you were a cat, you'd be purr-fect. Ready for the final question? ❤️",
        answers: ["I'm ready!", "Let's do it!"],
        gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Y4dHB6emZta2R2ZGd6dG1oYjZ2bmd3ZWFzNmZ1eGI0eXp2ZHR0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKWpu2j5aVIMuR2/giphy.gif"
    }
];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    renderGallery();
});

// Create Floating Hearts
function createHearts() {
    const container = document.querySelector('.bg-hearts');
    container.innerHTML = ''; // Clear existing
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(heart);
    }
}

// Render Cat Gallery
function renderGallery() {
    const gallery = document.getElementById('cat-gallery');
    gallery.innerHTML = '';
    cats.forEach(cat => {
        const card = document.createElement('div');
        card.classList.add('cat-card');
        
        const caption = state.mode === 'professional' ? cat.profCaption : cat.valCaption;
        
        card.innerHTML = `
            <img src="${cat.img}" alt="${cat.name}">
            <div class="cat-info">
                <h3 class="cat-name">${cat.name}</h3>
                <p class="cat-caption">${caption}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            selectCat(cat);
        });

        gallery.appendChild(card);
    });
}

// Navigation
function showSection(id) {
    document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    
    const section = document.getElementById(id);
    if (section) {
        section.classList.add('active');
    } else {
        document.getElementById('home-section').classList.add('active');
    }
    
    // Add or remove class to prevent background scrolling
    if (id !== 'home-section') {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }
}

function selectCat(cat) {
    state.selectedCat = cat;
    
    // Update Surprise/Detail Section Content based on mode
    const img = document.getElementById('surprise-img');
    const title = document.getElementById('surprise-title');
    const text = document.getElementById('surprise-text');
    const yesBtn = document.getElementById('surprise-yes-btn');
    const noBtn = document.getElementById('surprise-no-btn');

    img.src = cat.img;

    if (state.mode === 'professional') {
        title.innerText = `Feline Profile: ${cat.name}`;
        text.innerText = `${cat.profCaption}. \n\nThis animal is currently housed at our central facility. Adoption requires a background check and home visit. Proceed with application?`;
        yesBtn.innerText = "Initiate Application";
        noBtn.innerText = "Return to Listing";
        noBtn.onclick = () => showSection('home-section');
    } else {
        title.innerText = "Do you want to see something special just for you? 💝";
        text.innerText = "";
        yesBtn.innerText = "YES 💖";
        noBtn.innerText = "NO 😼";
        setupSurpriseNoButton(); // Re-enable the running button
    }

    showSection('surprise-section');
}

// New Step: Go to Application Form
function goToApplication() {
    if (state.mode === 'professional') {
        document.getElementById('app-cat-name').innerText = state.selectedCat.name;
        showSection('application-section');
    } else {
        // If already in valentine mode, just go to name capture
        showSection('name-section');
    }
}

// Professional -> Valentine Transition (Triggered by Form Submit)
function submitApplication() {
    // Trigger Transition
    const overlay = document.getElementById('transition-overlay');
    const text = document.getElementById('transition-text');
    overlay.classList.add('active');
    
    // Typing effect
    const message = "System Malfunction... ❤️ Overloading Cuteness... ❤️ Rebooting to Love Mode...";
    let i = 0;
    text.innerHTML = "";
    
    const typeInterval = setInterval(() => {
        text.innerHTML += message.charAt(i);
        i++;
        if (i > message.length) clearInterval(typeInterval);
    }, 50);

    setTimeout(() => {
        // Switch Theme
        state.mode = 'valentine';
        document.body.classList.remove('professional');
        document.body.classList.add('valentine');
        
        // Play Music
        const audio = document.getElementById('bg-music');
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed (user interaction needed):", e));
        
        // Update Text
        document.getElementById('main-title').innerText = "Kitty Kingdom 🐾";
        document.getElementById('main-subtitle').innerText = "Pick a cat that speaks to your soul...";
        
        // DO NOT re-render gallery in Valentine mode to keep focus on the selected cat
        // renderGallery();

        // Go to Name Capture
        showSection('name-section');
        
        // Fade out overlay
        overlay.classList.remove('active');
    }, 4000); // Longer for typing effect
}

function handleSurpriseNo() {
    if (state.mode === 'professional') {
        showSection('home-section');
    }
}

function submitName() {
    const input = document.getElementById('user-name');
    if (input.value.trim() === '') {
        alert('Please enter your name! 😿');
        return;
    }
    state.name = input.value.trim();
    
    // Start the qualifying questions
    state.valentineQuestionIndex = 0;
    state.questionsAnswered = [];
    displayValentineQuestion();
}

function displayValentineQuestion() {
    if (state.valentineQuestionIndex < valentineQuestions.length) {
        const currentQ = valentineQuestions[state.valentineQuestionIndex];
        
        document.getElementById('qualifying-question-text').innerText = currentQ.question;
        document.getElementById('qualifying-gif').src = currentQ.gif;
        
        const answersContainer = document.getElementById('qualifying-answers');
        answersContainer.innerHTML = '';
        
        currentQ.answers.forEach(answer => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-yes');
            button.innerText = answer;
            button.onclick = () => handleValentineAnswer(answer);
            answersContainer.appendChild(button);
        });
        
        showSection('qualifying-section');
    } else {
        // All questions answered, show the final valentine proposal
        const valImg = document.getElementById('valentine-cat-img');
        if (state.selectedCat) {
            valImg.src = state.selectedCat.img;
        }
        document.getElementById('valentine-question').innerText = `${state.name}, will you be my Valentine? 💌`;
        showSection('valentine-section');
    }
}

function handleValentineAnswer(answer) {
    // Log the answer
    const currentQ = valentineQuestions[state.valentineQuestionIndex];
    state.questionsAnswered.push({ question: currentQ.question, answer: answer });

    // Move to the next question
    state.valentineQuestionIndex++;
    displayValentineQuestion();
}

// Surprise Page "No" Button Logic (Moves away) - Only for Valentine Mode
function setupSurpriseNoButton() {
    const btn = document.getElementById('surprise-no-btn');
    // Remove old listeners to prevent stacking if called multiple times
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('mouseover', () => {
        if (state.mode === 'valentine') {
            const x = Math.random() * (window.innerWidth - newBtn.offsetWidth);
            const y = Math.random() * (window.innerHeight - newBtn.offsetHeight);
            newBtn.style.position = 'fixed';
            newBtn.style.left = x + 'px';
            newBtn.style.top = y + 'px';
        }
    });
}

// Valentine Page Logic
function handleNo() {
    state.noAttempts++;
    state.questionIndex++;

    // Change image to a reaction GIF
    const valImg = document.getElementById('valentine-cat-img');
    valImg.src = reactionGifs[state.questionIndex % reactionGifs.length];

    // Update the "No" button text
    const noBtn = document.getElementById('valentine-no-btn');
    noBtn.innerText = noButtonPhrases[state.questionIndex % noButtonPhrases.length];

    // Enlarge the "Yes" button
    const yesBtn = document.getElementById('valentine-yes-btn');
    const currentFontSize = window.getComputedStyle(yesBtn).fontSize;
    yesBtn.style.fontSize = `${parseFloat(currentFontSize) * 1.2}px`;

    // Update pleading message
    const msg = document.getElementById('valentine-message');
    msg.innerText = "Please reconsider? 🥺";

    // Log the "No" click
    state.noReason += `Attempt ${state.noAttempts}: Clicked '${noBtn.innerText}'; `;
}

function handleYes() {
    state.finalResponse = 'YES';
    sendData();
    showSection('success-section');
    document.getElementById('success-message').innerText = `YAYYYY 💕 You said YES, ${state.name}!`;
    launchConfetti();
}

function showLetter() {
    showSection('letter-modal');
}

// Send Data to Backend
async function sendData() {
    try {
        await fetch('/api/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: state.name,
                selectedCat: state.selectedCat ? state.selectedCat.name : 'Unknown',
                noAttempts: state.noAttempts,
                noReason: state.noReason,
                finalResponse: state.finalResponse,
                qualifyingAnswers: state.questionsAnswered // Send new data
            })
        });
    } catch (error) {
        console.error('Error saving response:', error);
    }
}

// Confetti
function launchConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function shareLove() {
    if (navigator.share) {
        navigator.share({
            title: 'My Valentine Surprise',
            text: 'I just said YES to the cutest Valentine surprise! 😻',
            url: window.location.href
        });
    } else {
        alert('Copy this link and send it to your love! 💌\n' + window.location.href);
    }
}
