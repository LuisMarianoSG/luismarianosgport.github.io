const cardsMemory = document.querySelectorAll(".card-game");
const gameOver = document.querySelector("#modal-neon-final");
const fade = document.querySelector("#fade-modal");
const lifeIcons = document.querySelector('.hearts');

let cardOne, cardTwo;
let controlClick = false;
let controlError = 5;

function addCards() {
    const gameArea = document.querySelector('.content-game');
    const cards = Array.from(gameArea.children);
    const cardsEmb = embaralharArray(cards);

    gameArea.innerHTML = '';
    cardsEmb.forEach(card => gameArea.appendChild(card));
    cardsEmb.forEach((card, i) => {
        setTimeout(() => {
            card.style.animation = 'shuffle 2s';
            setTimeout(() => card.style.animation = '', 2000);
        }, i * 100);
    });
}

function verificDuo() {
    if (cardOne.dataset.duo === cardTwo.dataset.duo) {
        [cardOne, cardTwo].forEach(card => {
            card.removeEventListener('click', flipCard);
            card.classList.add('card-correct');
            setTimeout(() => card.classList.remove('card-error'), 1500);
        });
        resetVar();
        if (verifTermino()) toggleModal(gameOver);
    } else {
        controlClick = true;
        setTimeout(() => {
            [cardOne, cardTwo].forEach(card => {
                card.classList.add('card-error');
                setTimeout(() => card.classList.remove('card-error', 'flip', 'mark'), 1000);
            });
            resetVar();
        }, 1500);
        limitError();
    }
}


function limitError() {
    controlError--;
    const icons = lifeIcons.querySelectorAll('.life-icon');
    setTimeout(() => {
        
        if (icons.length > 0) lifeIcons.removeChild(icons[icons.length - 1]);
        if (controlError === 0) toggleModal(gameOver);
    }, 2000);
        
    
    
}


function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



function resetVar() {
    [cardOne, cardTwo] = [null, null];
    controlClick = false;
}

//Verificar fim de jogo

function verifTermino() {
    return Array.from(cardsMemory).every(card => card.classList.contains('flip'));
}


//Manipulador de vizulização

function toggleModal(modal) {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}


//Efeito flip das Cartas

function flipCard() {
    if (controlClick || this === cardOne) return;

    this.classList.add('flip', 'mark');
    if (!cardOne) {
        cardOne = this;
        return;
    }
    cardTwo = this;
    verificDuo();
}

addCards();

cardsMemory.forEach(card => card.addEventListener('click', flipCard));

document.querySelector("#btn-reiniciar-game").addEventListener('click', () => location.reload());
