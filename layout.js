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
            <img src="logo.svg" alt="Logo">
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
        <a href="#" target="_blank" class="social-pill">
            <span class="icon">🔗</span> Link
        </a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="social-pill">
            <span class="icon">🧐</span> bolha
        </a>
    </footer>

    <div class="site-credits">
        <p>Texto de cima.<br>
        Texto de baixo.</p>
    </div>
`;

// Cabeçalho do ngc
document.body.insertAdjacentHTML('afterbegin', backgroundHTML + headerHTML);

// Injeta o Rodapé lá no finalzinho da div .content-wrapper
const contentWrapper = document.querySelector('.content-wrapper');
if (contentWrapper) {
    contentWrapper.insertAdjacentHTML('beforeend', footerHTML);
}