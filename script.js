// ==========================================
// DARK MODE TOGGLE
// ==========================================
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Check saved preference or system preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        toggle.textContent = '☀️';
    } else if (saved === 'light') {
        document.documentElement.classList.add('light');
        toggle.textContent = '🌙';
    } else {
        // Follow system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            toggle.textContent = '☀️';
        } else {
            toggle.textContent = '🌙';
        }
    }

    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');

        if (isDark) {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            toggle.textContent = '🌙';
        } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            toggle.textContent = '☀️';
        }
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const saved = localStorage.getItem('theme');
        if (!saved) {
            // Only auto-switch if no manual preference set
            if (e.matches) {
                document.documentElement.classList.add('dark');
                toggle.textContent = '☀️';
            } else {
                document.documentElement.classList.remove('dark');
                toggle.textContent = '🌙';
            }
        }
    });
}

// Initialize theme as early as possible
initTheme();

// ==========================================
// PARTICLES TOGGLE (disabled by default)
// ==========================================
let particlesLoaded = false;
let particlesActive = false;

function initParticlesToggle() {
    const toggle = document.getElementById('particles-toggle');
    if (!toggle) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches || navigator.maxTouchPoints > 0;

    // Check saved preference (default: off)
    const saved = localStorage.getItem('particles');
    if (saved === 'true') {
        enableParticles(toggle, isMobile);
    }

    toggle.addEventListener('click', () => {
        if (particlesActive) {
            disableParticles(toggle);
        } else {
            enableParticles(toggle, isMobile);
        }
    });
}

function enableParticles(toggleBtn, isMobile) {
    document.body.classList.add('particles-enabled');
    toggleBtn.classList.add('active');
    localStorage.setItem('particles', 'true');
    particlesActive = true;

    // Dynamically load tsParticles if not loaded
    if (!particlesLoaded && document.getElementById('tsparticles')) {
        loadTsParticles(isMobile);
    }
}

function disableParticles(toggleBtn) {
    document.body.classList.remove('particles-enabled');
    toggleBtn.classList.remove('active');
    localStorage.setItem('particles', 'false');
    particlesActive = false;

    // Destroy existing particles instance
    if (window.tsParticles) {
        try {
            window.tsParticles.domItem(0)?.destroy();
        } catch (e) {
            // Already destroyed or not initialized
        }
    }
}

function loadTsParticles(isMobile) {
    const scripts = [
        'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js'
    ];

    let loaded = 0;
    scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            loaded++;
            if (loaded === scripts.length) {
                particlesLoaded = true;
                initParticlesEffect(isMobile);
            }
        };
        document.head.appendChild(script);
    });
}

function initParticlesEffect(isMobile) {
    if (!window.tsParticles || !document.getElementById('tsparticles')) return;

    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: !isMobile,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 140,
                    duration: 9,
                    factor: 10,
                    speed: 0.5,
                    easing: "ease-out-sine"
                }
            }
        },
        particles: {
            color: { value: ["#60A5FA", "#818CF8", "#A78BFA", "#93C5FD"] },
            links: { enable: false },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "out" },
                random: true,
                speed: { min: 0.15, max: 0.5 },
                straight: false
            },
            number: { density: { enable: true, area: 800 }, value: isMobile ? 20 : 35 },
            opacity: {
                value: { min: 0.2, max: 0.6 },
                animation: { enable: true, speed: 0.4, minimumValue: 0.2, sync: false }
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
                value: { min: 8, max: 14 },
                animation: { enable: true, speed: 1.5, minimumValue: 8, sync: false }
            },
            rotate: {
                value: { min: 0, max: 360 },
                direction: "random",
                animation: { enable: true, speed: 3, sync: false }
            }
        },
        detectRetina: true
    });
}

// Init particles toggle when DOM is ready
document.addEventListener('DOMContentLoaded', initParticlesToggle);

// ==========================================
// HEADER SCROLL HIDE/SHOW
// ==========================================
let lastScrollTop = 0;
let isScrolling = false;
const header = document.querySelector('.floating-header');

if (header) {
    window.addEventListener('scroll', function () {
        if (!isScrolling) {
            window.requestAnimationFrame(function () {
                let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                if (currentScroll > lastScrollTop && currentScroll > 100) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }

                lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
}

// ==========================================
// DEV POPUP LOGIC (restored)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const devPopup = document.getElementById('dev-popup');
        const closeBtn = document.getElementById('close-popup');
        
        if (devPopup && closeBtn) {
            let devPopupLoads = localStorage.getItem('dev_popup_loads');
            
            if (!devPopupLoads) {
                // First visit
                devPopup.classList.remove('hidden');
                localStorage.setItem('dev_popup_loads', '1');
            } else {
                let loads = parseInt(devPopupLoads, 10);
                if (loads >= 3) {
                    // Every 3 reloads
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
// GITHUB STATS (Preserved from original)
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

    const CACHE_TIME = 60 * 60 * 1000; // 1 hour

    for (const container of containers) {
        const repo = container.getAttribute('data-repo');
        if (!repo) continue;

        // Show skeleton
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
