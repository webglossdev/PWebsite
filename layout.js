// ==========================================
// LAYOUT INJECTION — Clean Professional Version
// ==========================================

// Particles & Aurora background (hidden by default, toggled via JS)
const backgroundHTML = `
    <div id="tsparticles"></div>
    <div class="vista-scene">
        <div class="dust dust-layer-1"></div>
        <div class="dust dust-layer-2"></div>
        <div class="aurora aurora-purple"></div>
        <div class="aurora aurora-cyan"></div>
        <div class="aurora aurora-green"></div>
    </div>
`;

// Header with dark mode toggle + particles toggle
const headerHTML = `
    <nav class="floating-header">
        <div class="nav-links left-links">
            <a href="index.html">Início</a>
            <a href="projetos.html">Projetos</a>
        </div>
        
        <div class="nav-logo">
            <a href="index.html">
                <img src="logo.svg" alt="Leonardo P. Soares Logo">
            </a>
        </div>
        
        <div class="nav-links right-links">
            <a href="sobre.html">Sobre Mim</a>
            <a href="contato.html">Contato</a>
        </div>

        <div class="header-controls">
            <button class="particles-toggle" id="particles-toggle" aria-label="Alternar partículas" title="Alternar efeito de partículas">
                ✨
            </button>
            <button class="theme-toggle" id="theme-toggle" aria-label="Alternar tema" title="Alternar tema claro/escuro">
                🌙
            </button>
        </div>
    </nav>
`;

// Development notice banner
const bannerHTML = `
    <div class="dev-banner">
        <div class="marquee">
            <span>Aviso: Este site está em desenvolvimento. Algumas informações podem estar incompletas ou sujeitas a alterações. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Aviso: Este site está em desenvolvimento. Algumas informações podem estar incompletas ou sujeitas a alterações.</span>
        </div>
    </div>
`;

// Development popup
const popupHTML = `
    <div id="dev-popup" class="dev-popup hidden">
        <div class="popup-content">
            <h2>Em Desenvolvimento</h2>
            <p>Olá! Este site ainda está em construção e não está finalizado. Algumas informações podem estar faltando ou sofrerão alterações.</p>
            <button id="close-popup" class="btn-primary" style="width: 100%; margin-top: 10px;">Entendi</button>
        </div>
    </div>
`;

// Footer
const footerHTML = `
    <footer class="social-footer">
        <a href="https://linktr.ee/webglossdev" target="_blank" class="social-pill">
            <span class="icon">🔗</span> Linktree
        </a>
        <a href="mailto:webglossdev@proton.me" class="social-pill">
            <span class="icon">📧</span> webglossdev@proton.me
        </a>
    </footer>

    <div class="site-credits">
        <p>Front-end feito com Gemini 3.1 Pro com edições minhas (Veja a página projetos)<br>
        Hospedado na Vercel com deploy automático via GitHub.</p>
    </div>
`;

function injectLayout() {
    // Inject background + banner + header + popup at beginning of body
    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', backgroundHTML + bannerHTML + headerHTML + popupHTML);
    }

    // Inject footer at end of .content-wrapper
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.insertAdjacentHTML('beforeend', footerHTML);
    }
}

// Execute immediately
injectLayout();
