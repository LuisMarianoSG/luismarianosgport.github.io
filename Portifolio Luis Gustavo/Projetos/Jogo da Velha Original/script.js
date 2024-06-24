const blockElements = document.querySelectorAll(".block-area");
let roudGame = "x";
const valueBlock = [];
const jogadasWin = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const gameOver = document.querySelector("#modal-neon-final");
let fade = document.querySelector("#fade-modal");
let titleEfect = document.querySelector(".title-modal-final.result");



function toggleModal(modal, result) {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
    if (result == 'x' || result == 'o') {
        titleEfect.textContent = result;
    }
    
}

function manipularArray() {
    valueBlock.length = 0;
    blockElements.forEach(block => {
        valueBlock.push(block.dataset.valor);
    });
}

function verificVencedor(combinacoes, arrayBlock) {
    for (let combinacao of combinacoes) {
        const [a, b, c] = combinacao;
        if (arrayBlock[a] && arrayBlock[a] === arrayBlock[b] && arrayBlock[a] === arrayBlock[c]) {
            return arrayBlock[a];
        }
    }
    return null;
}

function verificEmpate(arrayBlock) {
    return arrayBlock.every(valor => valor === 'x' || valor === 'o');
}

blockElements.forEach(block => {
    block.addEventListener('click', function addValor() {
        block.classList.add(roudGame);
        block.dataset.valor = roudGame;

        manipularArray();

        const vencedor = verificVencedor(jogadasWin, valueBlock);
        if (vencedor) {
            toggleModal(gameOver, vencedor);
            if (vencedor == 'x') {
                titleEfect.classList.add('great');
            }if (vencedor == 'o'){
                titleEfect.classList.add('loser');
            }
            
            
        } else if (verificEmpate(valueBlock)) {
            toggleModal(gameOver);
        }

        roudGame = roudGame === "x" ? "o" : "x";
        block.removeEventListener('click', addValor);
    });
});

document.querySelector("#btn-reiniciar-game").addEventListener('click', () => location.reload());
