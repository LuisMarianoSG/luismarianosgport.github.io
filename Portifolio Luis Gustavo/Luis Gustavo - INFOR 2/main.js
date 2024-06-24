
//fundo
document.addEventListener("DOMContentLoaded", () => {
    const background = document.getElementById('background');
    const numberOfStars = 100;

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        
        background.appendChild(star);
    }

    for (let i = 0; i < numberOfStars; i++) {
        createStar();
    }
});



//texto
const texts = [
    "Desenvolvedor Front-End",
    "Desenvolvedor Java",
    "Desenvolverdor Phyton",
    "Habilidades em Hardware"
  ];

  const delay = 100;

  let textIndex = 0;

  function typeWriter(text, i) {
    if (i < text.length) {
      document.getElementById('typewriter-text').innerHTML += text.charAt(i);
      setTimeout(() => {
        typeWriter(text, i + 1);
      }, delay);
    } else {
      setTimeout(() => {
        
        document.getElementById('typewriter-text').innerHTML = '';
        textIndex = (textIndex + 1) % texts.length;
        typeWriter(texts[textIndex], 0);
      }, 2000);
    }
  }

  typeWriter(texts[textIndex], 0);


//habilidades
var copy = document.querySelector(".loop").cloneNode(true);
document.querySelector(".IconTech").appendChild(copy);