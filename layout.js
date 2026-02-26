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
            <a href="index.html">Exemplo</a>
            <a href="projetos.html">Exemplo</a>
        </div>
        
        <div class="nav-logo">
            <img src="logo.svg" alt="Exemplo">
        </div>
        
        <div class="nav-links right-links">
            <a href="sobre.html">Exemplo</a>
            <a href="contato.html">Exemplo</a>
        </div>
    </nav>
`;

// 3. Guarda o HTML do Rodapé e Créditos
const footerHTML = `
    <footer class="social-footer">
        <a href="https://exemplo.com" target="_blank" class="social-pill">
            <span class="icon">🔗</span> Exemplo
        </a>
        <a href="mailto:exemplo@exemplo.com" class="social-pill">
            <span class="icon">📧</span> Exemplo
        </a>
    </footer>

    <div class="site-credits">
        <p>Exemplo<br>
        Exemplo</p>
    </div>
`;

// ==========================================
// INJEÇÃO AUTOMÁTICA NA PÁGINA
// ==========================================
function injectLayout() {
    // Injeta o Fundo e o Cabeçalho logo no começo da tag <body>
    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', backgroundHTML + headerHTML);
    }

    // Injeta o Rodapé lá no finalzinho da div .content-wrapper
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.insertAdjacentHTML('beforeend', footerHTML);
    }
}

// Executa imediatamente (será chamado após o carregamento do script)
injectLayout();