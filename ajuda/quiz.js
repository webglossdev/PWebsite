document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('quiz-container');
    let quizData = null;

    try {
        const response = await fetch('quiz.json');
        if (!response.ok) {
            throw new Error(`Falha ao carregar quiz.json: HTTP ${response.status}`);
        }

        quizData = await response.json();
        renderNode('inicio');
    } catch (error) {
        container.innerHTML = '<h2>Erro ao carregar o diagnóstico.</h2>';
        console.error('Erro ao carregar o JSON:', error);
    }

    function renderNode(nodeKey) {
        container.innerHTML = '';

        if (quizData.resultados[nodeKey]) {
            renderResult(quizData.resultados[nodeKey]);
            return;
        }

        const node = quizData.fluxo[nodeKey];
        if (node) {
            const questionTitle = document.createElement('h2');
            questionTitle.textContent = node.pergunta;
            questionTitle.style.marginBottom = '20px';
            container.appendChild(questionTitle);

            const buttonsDiv = document.createElement('div');
            buttonsDiv.style.display = 'flex';
            buttonsDiv.style.flexDirection = 'column';
            buttonsDiv.style.gap = '10px';
            buttonsDiv.style.alignItems = 'center';

            node.opcoes.forEach((opcao) => {
                const btn = document.createElement('button');
                btn.className = 'btn-primary';
                btn.textContent = opcao.label;
                btn.onclick = () => renderNode(opcao.next);
                buttonsDiv.appendChild(btn);
            });

            container.appendChild(buttonsDiv);
            return;
        }

        container.innerHTML = `
            <h2>Contato Direto</h2>
            <p>Parece que o seu caso é muito específico.</p>
            <a href="https://wa.me/${quizData.config.whatsapp_number}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="margin-top:20px; display:inline-block;">Falar no WhatsApp</a>
        `;
    }

    function renderResult(resultado) {
        const urlMessage = encodeURIComponent(resultado.whatsapp_msg);
        const waLink = `https://wa.me/${quizData.config.whatsapp_number}?text=${urlMessage}`;

        container.innerHTML = `
            <h2>${resultado.titulo}</h2>
            <p style="margin: 20px 0;">${resultado.descricao}</p>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 20px; display: inline-block; text-align: left;">
                <p><strong>Investimento:</strong> ${resultado.investimento_estimado}</p>
                <p><strong>Prazo:</strong> ${resultado.prazo_medio}</p>
            </div>
            <br>
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">Solicitar via WhatsApp</a>
            <button id="restart-quiz" class="btn-secondary" style="margin-left: 10px;">Refazer Diagnóstico</button>
        `;

        const restartButton = document.getElementById('restart-quiz');
        if (restartButton) {
            restartButton.addEventListener('click', () => renderNode('inicio'));
        }
    }
});
