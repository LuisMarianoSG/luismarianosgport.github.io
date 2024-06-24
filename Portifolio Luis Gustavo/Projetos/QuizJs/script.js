const quest = [
    {
        enunciado: "Qual das seguintes é uma técnica usada para proteger dados durante a transmissão?",
        itens: ["Firewall", "Antivírus", "Criptografia", "Backup"],
        resposta: "Criptografia"
        

    },
    {
        enunciado: "Qual das seguintes linguagens de programação é fortemente tipada e orientada a objetos?",
        itens: ["JavaScript", "Java", "Lua", "Perl"],
        resposta: "Java"

        
        
    },
    {
        enunciado : "Qual tecnologia é usada para estilizar páginas web?", 
        itens:["JavaScript","CSS","SQL","PHP"],
        resposta:"CSS"
        
    },
    {
        enunciado: "Qual das seguintes linguagens é tipicamente usada para programação orientada a objetos e tem uma sintaxe semelhante à linguagem C?",
        itens: ["Java", "Python", "JavaScript", "Haskell"],
        resposta: "Java"

        
    },
    {
        enunciado : "Qual destes não é um tipo de conexão de internet?", 
        
        itens:["ADSL","Fiber Optic","Bluetooth","4G"],
        resposta:"Bluetooth"

        
    },
    {
        enunciado : "Qual destes não é um navegador de internet?", 
        itens:["Chrome","Firefox","Excel","Safari"],
        resposta:"Excel"
        

    },
    {
        enunciado: "Qual das seguintes tecnologias é usada para virtualização, permitindo a execução de múltiplos sistemas operacionais em um único hardware físico?",
        itens: ["Docker", "VirtualBox", "Git", "Terraform"],
        resposta: "VirtualBox"

    },
    {
        enunciado: "Qual das seguintes linguagens é usada para escrever scripts no lado do cliente em aplicações web?",
        itens: ["Python", "Ruby", "JavaScript", "PHP"],
        resposta: "JavaScript"
        

    },
    {
        enunciado: "Qual das seguintes linguagens é frequentemente usada para programação de scripts no lado do servidor?",
        itens: ["JavaScript", "Ruby", "PHP", "HTML"],
        resposta: "PHP"
        

    },
    {
        enunciado: "Qual das seguintes linguagens é frequentemente usada para programação de scripts no lado do servidor?",
        itens: ["JavaScript", "Ruby", "PHP", "HTML"],
        resposta: "PHP"
        
    },
    
];

const itens = document.querySelectorAll(".itens");

var score = 0;
var numQuest = 1;


var controle = 0;
var ctrlDeCLick = false; 

const listElement = document.querySelector("#list-elements")
const listPlayer = [];


const modalInitial = document.querySelector("#modal-neon-initial");
const gameOver = document.querySelector("#modal-neon-final");
let fade = document.querySelector("#fade-modal");

let btnClose = document.querySelector("#btn-initial-close");
let btnContinue = document.querySelector("#btn-initial-continue");

let inputInitial = document.querySelector(".input-modal");
let titleEfect = document.querySelector("#title-modal-final");






toggleModal(gameOver);
tabelaScore(score);
questEmbaralhado = embaralharArray(quest);
embaralharItens();
adicionarEvento();
compQuiz();







function toggleModal(modal){
    modal.classList.toggle("hide");
    
    fade.classList.toggle("hide");
    
};

//verificar termino de jogo//

function veryOver(){
    
    if(controle > quest.length-1){
        
        addElementList(inputInitial.value, score);
        
        toggleModal(gameOver);

        tabelaScore(score);
        
        return true;
    }
};

//-----------------------------------------//


//Efeito no titulo final//
function tabelaScore(score) {
    
    if (score < 299) {
        titleEfect.textContent = "Loser:(";
        titleEfect.classList.add("loser");
    }
    if (score >= 300 && score < 599) {
        titleEfect.textContent = "GameOver";
        titleEfect.classList.add("gameover");
        
    }
    if (score >= 600 && score < 799) {
        titleEfect.textContent = "Great";
        titleEfect.classList.add("great");
    }
    if (score > 800) {
        titleEfect.textContent = "Lord$";
        titleEfect.classList.add("lord");
    }
    else{
        
        titleEfect.textContent = "GameOver";
        titleEfect.classList.add("gameover");
    }
    
}
//-----------------------------//


// Criar Elementos no Doc
    
function compQuiz() {
    ctrlDeCLick = true;

    let enunciado = document.querySelector("#enunciado");

    enunciado.textContent = numQuest + " -" + questEmbaralhado[controle].enunciado;
    

    for (let k = 0; k < itens.length; k++) {
        itens[k].innerHTML = questEmbaralhado[controle]["itens"][k];
        
    }
 
};

//-------------------------------------//


//Adicionar Evento de Analisar Resposta
    function adicionarEvento(){
        for (let i = 0; i < itens.length; i++) {
            
            itens[i].addEventListener('click', function questAnalise() {
                let color;
                if(ctrlDeCLick){

                        if (this.textContent == questEmbaralhado[controle]["resposta"]){
                            this.classList.add("btn-correct");
                            this.classList.remove("btn-standard");
                            color = "btn-correct";
                            score += 100;
                        }else{
                            this.classList.add("btn-error");
                            this.classList.remove("btn-standard");
                            color = "btn-error";
                            if (score>=50) {score -= 50;}
                        };
                        
                        setTimeout(() => { this.classList.remove(color); this.classList.add("btn-standard"); }, 1000);
                          controle++;
                          numQuest++;
                }
                
                ctrlDeCLick = false;
                document.querySelector("#score").innerHTML = "score: " + score;
            
                if (!veryOver()) {
                    
                    embaralharItens();
                    setTimeout(() => { compQuiz() }, 1000);
                }
            })
            
            
        }
    };
// --------------------------------------------------------//

//Emabaralhar Array quest e Embaralhar Itens

    function embaralharArray(array) {
        // Cria uma cópia do array original para não modificar o original
        let questEmbaralhado = array.slice();

        // Algoritmo de Fisher-Yates
        for (let i = questEmbaralhado.length - 1; i > 0; i--) {
            // Escolhe um índice aleatório entre 0 e i
            let j = Math.floor(Math.random() * (i + 1));

            // Troca o elemento arrayEmbaralhado[i] com o elemento arrayEmbaralhado[j]
            [questEmbaralhado[i], questEmbaralhado[j]] = [questEmbaralhado[j], questEmbaralhado[i]];
        }

        return questEmbaralhado;
    };

    function embaralharItens() {
        for (let i = questEmbaralhado[controle]["itens"].length - 1; i > 0; i--) {
            // Escolhe um índice aleatório entre 0 e i
            let j = Math.floor(Math.random() * (i + 1));
    
            // Troca o elemento arrayEmbaralhado[i] com o elemento arrayEmbaralhado[j]
            [questEmbaralhado[controle]["itens"][i], questEmbaralhado[controle]["itens"][j]] = [questEmbaralhado[controle]["itens"][j], questEmbaralhado[controle]["itens"][i]];
        }
        
    }


//---------------------------------------------------------//

//Adicionar elementos a lista de gameover//

function addElementList(name, score) {
    listPlayer.push(
        {   
            name:name,
            score:score,
        }
    );
    let elementAdd = document.createElement('li');
    
    let p1 = (document.createElement('p'));
    let textname = document.createTextNode(listPlayer[listPlayer.length-1].name);
    p1.appendChild(textname)
    elementAdd.appendChild(p1);

    if (score) {
        let p2 = (document.createElement('p'));
        let textscore = document.createTextNode(listPlayer[listPlayer.length-1].score);
        p2.appendChild(textscore)
        elementAdd.appendChild(p2);  
    }

    listElement.appendChild(elementAdd);
    
}
//-----------------------------------------------//

// Eventos Button//

btnContinue.addEventListener('click', function(){
    
    if (inputInitial.value) {
        toggleModal(modalInitial);
    }else{
        alert("digite seu nome");
    }
})

btnClose.addEventListener('click', function(){
    
    if (confirm("tem certeza?")) {
        toggleModal(gameOver);
        let name = inputInitial.value;
        addElementList(name);
        toggleModal(modalInitial);
    }
})


//----------------------------------//

document.querySelector("#btn-reiniciar-game").addEventListener('click', function () {
    location.reload();

})