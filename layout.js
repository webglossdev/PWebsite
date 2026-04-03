// 1. Guarda o HTML do Fundo (Estrelas SVG + Aurora)
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

// 2. Guarda o HTML do Cabeçalho
const headerHTML = `
    <nav class="floating-header">
        <div class="nav-links left-links">
            <a href="index.html">Início</a>
            <a href="projetos.html">Projetos</a>
        </div>
        
        <div class="nav-logo">
            <img src="logo.svg" alt="WebGlossDev Logo">
        </div>
        
        <div class="nav-links right-links">
            <a href="sobre.html">Sobre Mim</a>
            <a href="contato.html">Contato</a>
        </div>
    </nav>
`;

// 3. Guarda o HTML do Rodapé e Créditos
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
        <!-- <p>Front-end feito com Gemini 3.1 Pro com edições minhas (Veja a página projetos)<br>
        Back-end feito e mantido por mim no Oracle Cloud.</p> -->
        <p>Front-end feito com Gemini 3.1 Pro com edições minhas (Veja a página projetos)<br>
        Hospedado na Vercel com deploy automático via GitHub.</p>
        <!-- <p>Conheça o movimento <a href="https://brazilianaccelerationism.com.br/" target="_blank" style="color: white;">Brazil Accelerationism</a>.</p> -->
    </div>
`;

// ==========================================
// INJEÇÃO AUTOMÁTICA NA PÁGINA
// ==========================================

const bannerHTML = `
    <div class="dev-banner">
        <div class="marquee">
            <span>Aviso: Este site está em desenvolvimento. Algumas informações podem estar incompletas ou sujeitas a alterações. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Aviso: Este site está em desenvolvimento. Algumas informações podem estar incompletas ou sujeitas a alterações.</span>
        </div>
    </div>
`;

const popupHTML = `
    <div id="dev-popup" class="dev-popup hidden">
        <div class="popup-content">
            <h2 style="color: #00a2ff; margin-top: 0; font-size: 1.8rem; text-shadow: 0 0 10px rgba(0, 162, 255, 0.5);">Em Desenvolvimento</h2>
            <p>Olá! Este site ainda está em construção e não está finalizado. Algumas informações podem estar faltando ou sofrerão alterações.</p>
            <button id="close-popup" class="btn-primary" style="width: 100%; margin-top: 10px;">Entendi</button>
        </div>
    </div>
`;

function injectLayout() {
    // Injeta o Fundo, Cabeçalho, Banner e Popup logo no começo da tag <body>
    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', backgroundHTML + bannerHTML + headerHTML + popupHTML);
    }

    // Injeta o Rodapé lá no finalzinho da div .content-wrapper
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.insertAdjacentHTML('beforeend', footerHTML);
    }
}

// Executa imediatamente (será chamado após o carregamento do script)
injectLayout();
