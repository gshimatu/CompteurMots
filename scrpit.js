/*
 * Lien vers mon github   : https://github.com/gshimatu
 * Auteur                 : Gauthier Shimatu (Le shimatologue)
 * Nom du fichier         : scrpit.js
 * Date de création       : 2025-05-17 00:37:00
 * Description            : Compteur de mots, caractères, paragraphes, phrases et temps de lecture
 * Version               : 1.0
 */


const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');
const paraCount = document.getElementById('para-count');
const sentenceCount = document.getElementById('sentence-count');
const charNoSpaceCount = document.getElementById('char-nospace-count');
const readingTime = document.getElementById('reading-time');
const keywordsDensity = document.getElementById('keywords-density');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');

textInput.addEventListener('input', updateCounters);
clearBtn.addEventListener('click', () => {
    textInput.value = '';
    updateCounters();
});
copyBtn.addEventListener('click', () => {
    textInput.select();
    document.execCommand('copy');
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copié !';
    setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copier';
    }, 1200);
});

function updateCounters() {
    const text = textInput.value;
    // Caractères (avec espaces)
    charCount.textContent = text.length;
    // Caractères (sans espaces)
    charNoSpaceCount.textContent = text.replace(/\s/g, '').length;
    // Mots
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    wordCount.textContent = text.trim() ? words.length : 0;
    // Paragraphes
    const paras = text.split(/\n+/).filter(p => p.trim().length > 0);
    paraCount.textContent = paras.length;
    // Phrases
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentenceCount.textContent = sentences.length;
    // Temps de lecture (moyenne 200 mots/min)
    const minutes = words.length / 200;
    if (words.length === 0) {
        readingTime.textContent = '0 sec';
    } else if (minutes < 1) {
        readingTime.textContent = Math.ceil(minutes * 60) + ' sec';
    } else {
        readingTime.textContent = Math.floor(minutes) + ' min ' + Math.round((minutes % 1) * 60) + ' sec';
    }
    // Densité des mots-clés (top 3)
    const freq = {};
    words.map(w => w.toLowerCase()).forEach(w => {
        if (w.length > 2) freq[w] = (freq[w] || 0) + 1;
    });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 3);
    if (sorted.length === 0) {
        keywordsDensity.textContent = '-';
    } else {
        keywordsDensity.textContent = sorted.map(([w, n]) => `${w} (${n})`).join(', ');
    }
}

updateCounters();