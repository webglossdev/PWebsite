tsParticles.load("tsparticles", {
    fpsLimit: 120,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse" 
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 140, // Distância que o mouse começa a interagir
                duration: 9,   // Tempo (em segundos) para a estrela parar o movimento (inércia do líquido)
                factor: 10,     // Força BEM fraca (para não dar um soco na estrela)
                speed: 0.5,    // Deslizamento lento e suave
                easing: "ease-out-sine" // Curva elástica macia
            }
        }
    },
    particles: {
        color: { value: ["#ffd700", "#00a2ff", "#8a2be2", "#00ffcc"] },
        links: { enable: false },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" }, 
            random: true,
            speed: 0.5, 
            straight: false
        },
        number: { density: { enable: true, area: 800 }, value: 45 },
        opacity: { value: 0.6, animation: { enable: true, speed: 0.5, minimumValue: 0.2 } },
        shape: {
            type: "image", 
            options: {
                image: {
                    src: "estrelas.svg", 
                    width: 32,
                    height: 32,
                    replaceColor: false
                }
            }
        },
        size: { value: { min: 15, max: 15 } }
    },
    detectRetina: true
});

// ==========================================
// LÓGICA PARA ESCONDER/MOSTRAR O CABEÇALHO
// ==========================================
let lastScrollTop = 0;
const header = document.querySelector('.floating-header');

window.addEventListener('scroll', function() {
    // Pega a posição atual da rolagem
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Se rolou para baixo e já passou de 100px do topo da página
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.classList.add('header-hidden'); // Esconde o cabeçalho
    } else {
        header.classList.remove('header-hidden'); // Mostra o cabeçalho
    }
    
    // Atualiza a última posição. (O <= 0 evita bugs se o usuário fizer scroll negativo no topo)
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

