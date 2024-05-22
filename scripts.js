import { hijaiyah } from './hijaiyah.js';

document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById('hijaiyahGrid');
    const randomLetterText = document.getElementById('randomLetter');
    const resultText = document.getElementById('resultText');

    function getRandomHijaiyah() {
        const randomIndex = Math.floor(Math.random() * hijaiyah.length);
        return hijaiyah[randomIndex];
    }

    function resetGame() {
        resultText.textContent = '';
        const randomLetter = getRandomHijaiyah();
        randomLetterText.textContent = randomLetter.arabic;
        randomLetterText.dataset.latin = randomLetter.latin;
        randomLetterText.dataset.pronounciation = randomLetter.pronounciation;
    }

    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA'; // Set the language to Arabic
            speechSynthesis.speak(utterance);
        } else {
            console.error('Speech Synthesis API not supported in this browser.');
        }
    }

    hijaiyah.forEach(letter => {
        const div = document.createElement('div');
        div.className = 'grid-item';
        
        const arabicDiv = document.createElement('div');
        arabicDiv.className = 'arabic';
        arabicDiv.textContent = letter.arabic;
        
        const latinDiv = document.createElement('div');
        latinDiv.className = 'latin';
        latinDiv.textContent = letter.latin;
        
        div.appendChild(arabicDiv);
        div.appendChild(latinDiv);

        div.dataset.latin = letter.latin;
        div.dataset.pronounciation = letter.pronounciation;
        
        div.addEventListener('click', function() {
            speak(letter.pronounciation); // Speak the pronunciation
            if (div.querySelector('.arabic').textContent === randomLetterText.textContent) {
                resultText.textContent = 'Selamat anda benar!';
                setTimeout(resetGame, 2000);
            } else {
                resultText.textContent = 'Masih salah, coba lagi.';
            }
        });
        
        gridContainer.appendChild(div);
    });

    resetGame();
});
