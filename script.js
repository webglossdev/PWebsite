// Detecta se o dispositivo é mobile/touch para otimizar performance
const isMobile = window.matchMedia('(max-width: 768px)').matches || navigator.maxTouchPoints > 0;

if (document.getElementById('tsparticles') && !isMobile) {
    tsParticles.load("tsparticles", {
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: !isMobile, // Desabilita repulse no mobile para performance
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

// ==========================================
// LÓGICA DO POPUP DE DESENVOLVIMENTO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Timeout para garantir que o layout.js já injetou o HTML
    setTimeout(() => {
        const devPopup = document.getElementById('dev-popup');
        const closeBtn = document.getElementById('close-popup');
        
        if (devPopup && closeBtn) {
            let devPopupLoads = localStorage.getItem('dev_popup_loads');
            
            if (!devPopupLoads) {
                // Primeira visita
                devPopup.classList.remove('hidden');
                localStorage.setItem('dev_popup_loads', '1');
            } else {
                let loads = parseInt(devPopupLoads, 10);
                if (loads >= 3) {
                    // A Cada 3 Recargas
                    devPopup.classList.remove('hidden');
                    localStorage.setItem('dev_popup_loads', '1');
                } else {
                    localStorage.setItem('dev_popup_loads', (loads + 1).toString());
                }
            }
            
            closeBtn.addEventListener('click', () => {
                devPopup.classList.add('hidden');
            });
        }
    }, 100);
});

// ==========================================
// LÓGICA DE ESTATÍSTICAS DO GITHUB (SENIOR VERSION)
// ==========================================
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `há ${interval} anos`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `há ${interval} meses`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `há ${interval} dias`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `há ${interval} horas`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `há ${interval} minutos`;
    return "agora mesmo";
}

async function fetchGitHubStats() {
    const containers = document.querySelectorAll('.github-stats-container');
    if (containers.length === 0) return;

    // Cache duration: 1 hour
    const CACHE_TIME = 60 * 60 * 1000;

    for (const container of containers) {
        const repo = container.getAttribute('data-repo');
        if (!repo) continue;

        // Show Skeleton
        container.innerHTML = `
            <div class="stat-skeleton skeleton-sm"></div>
            <div class="stat-skeleton skeleton-md"></div>
            <div class="stat-skeleton skeleton-lg"></div>
        `;

        try {
            const cacheKey = `gh_stats_${repo}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_TIME) {
                    renderStats(container, data);
                    continue;
                }
            }

            // Fetch Data
            const [repoRes, commitsRes] = await Promise.all([
                fetch(`https://api.github.com/repos/${repo}`),
                fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`)
            ]);

            if (!repoRes.ok || !commitsRes.ok) throw new Error('GitHub API Error');

            const repoData = await repoRes.json();
            const commitsData = await commitsRes.json();

            let totalCommits = 0;
            const linkHeader = commitsRes.headers.get('Link');
            if (linkHeader) {
                const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
                totalCommits = match ? parseInt(match[1], 10) : commitsData.length;
            } else {
                totalCommits = commitsData.length;
            }

            const stats = {
                stars: repoData.stargazers_count,
                commits: totalCommits,
                lastDate: commitsData[0]?.commit.author.date || null,
                lastAuthor: commitsData[0]?.author?.login || commitsData[0]?.commit.author.name || '?'
            };

            // Save to Cache
            localStorage.setItem(cacheKey, JSON.stringify({ data: stats, timestamp: Date.now() }));
            renderStats(container, stats);

        } catch (error) {
            console.error(`Erro GitHub (${repo}):`, error);
            container.innerHTML = `<div class="stat-error">⚠️ Erro ao carregar métricas do GitHub.</div>`;
        }
    }
}

function renderStats(container, data) {
    const starLabel = data.stars === 1 ? 'Star' : 'Stars';
    const commitLabel = data.commits === 1 ? 'Commit' : 'Commits';
    const timeDisplay = data.lastDate ? timeAgo(data.lastDate) : 'Desconhecido';

    container.innerHTML = `
        <div class="stat-item" title="Estrelas no GitHub">
            <span>⭐</span> <strong>${data.stars}</strong> ${starLabel}
        </div>
        <div class="stat-item" title="Total de Commits">
            <span>🔄</span> <strong>${data.commits}</strong> ${commitLabel}
        </div>
        <div class="stat-item" title="Autor do último commit">
            <span>👤</span> ${data.lastAuthor}
        </div>
        <div class="stat-item" title="Data do último commit">
            <span>📅</span> ${timeDisplay}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', fetchGitHubStats);

