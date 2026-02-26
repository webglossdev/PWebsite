if (document.getElementById('tsparticles')) {
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
                speed: { min: 0.2, max: 0.8 }, // Velocidade mais orgânica e variada
                straight: false
            },
            number: { density: { enable: true, area: 800 }, value: 45 },
            opacity: {
                value: { min: 0.3, max: 0.8 },
                animation: { enable: true, speed: 0.5, minimumValue: 0.3, sync: false }
            },
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
            size: {
                value: { min: 10, max: 18 },
                animation: { enable: true, speed: 2, minimumValue: 10, sync: false } // Pulso de tamanho (Twinkle)
            },
            rotate: {
                value: { min: 0, max: 360 },
                direction: "random",
                animation: { enable: true, speed: 5, sync: false } // Rotação lenta e constante
            }
        },
        detectRetina: true
    });
}

// ==========================================
// LÓGICA PARA ESCONDER/MOSTRAR O CABEÇALHO
// ==========================================
let lastScrollTop = 0;
let isScrolling = false;
const header = document.querySelector('.floating-header');

if (header) {
    window.addEventListener('scroll', function () {
        if (!isScrolling) {
            window.requestAnimationFrame(function () {
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

                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
}

