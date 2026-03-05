# PWebsite
-
Código do meu website, obviamente não é exatamente a mesma coisa que está no ar, eu removi informações sensiveis do código para publicar aqui, como: o webhook de contato, números de telefone, etc. Virou básicamente um template.
-
Obrigado especial para a DevClub, o Aulão gratuito que fizeram de Front-end me ensinou muito.
Se quiser pode sugerir melhorias ao website ou reportar bugs e alternativas melhores à funções implementadas com: Issues ou Pull Requests.
-
Base do código feito por IA (Gemini 3.1 Pro) e depois editado e continuado por mim, usando VS CODE inicialmente e depois fiz a troca para o Google Antigravity (Copilot não é muito bom mas tem pontos positivos). Self-Hosted em uma VPS da Oracle Cloud com Ubuntu 22.04, Nginx rodando o site, e Nginx Proxy Manager gerindo o Proxy.


Aqui tem um fluxograma explicando como foi meu processo de criação do front-end:

<img width="1208" height="506" alt="image" src="https://github.com/user-attachments/assets/92ab30a3-9345-4efa-8486-20638d3037e8" />
Esse fluxograma foi feito por mim no Obsidian, IA não foi utilizado.
{
	"nodes":[
		{"id":"9fc51ba792394778","type":"text","text":"CSS Tamanhos e cores","x":-590,"y":394,"width":250,"height":60,"color":"5"},
		{"id":"3c0c1a779803b77f","type":"text","text":"HTML Textos e Bolhas","x":-840,"y":394,"width":250,"height":60,"color":"#ffd500"},
		{"id":"a6164ac412803e63","type":"text","text":"JS: Textos do cabeçalho, Conf. das partículas (Distance, Duration, etc) e cores e tamanhos","x":-340,"y":394,"width":324,"height":100,"color":"2"},
		{"id":"d0f23d7f924c8ae8","type":"text","text":"CSS: Efeitos glassmorphism, animações otimizadas e responsividade do site","x":240,"y":394,"width":360,"height":66,"color":"5"},
		{"id":"cd858370c46c6c9b","type":"text","text":"HTML: Otimizações (Sintaxe e de loading da página)","x":-5,"y":394,"width":250,"height":66,"color":"#917c0d"},
		{"id":"0faf9e759a66b3ba","type":"text","text":"SVG: Design das partículas de estrelas e fundo da página no Figma","x":-1139,"y":394,"width":299,"height":95,"color":"1"},
		{"id":"5c3129622a389ca4","type":"text","text":"JS: Manipulação avançada do DOM, obfuscação simples do webhook do discord e otimização do evento de scroll da página.","x":600,"y":394,"width":380,"height":95,"color":"2"},
		{"id":"6aa1164a1745c1ba","type":"text","text":"Construí o conteúdo das páginas ","x":-740,"y":274,"width":300,"height":50,"color":"3"},
		{"id":"2bb9836161d44ad7","type":"text","text":"Pedi ao Gemini para fazer o complicado que eu não sei ainda","x":218,"y":274,"width":404,"height":78,"color":"3"},
		{"id":"7ee1090313b0d478","type":"text","text":"Pedi ao Gemini 3.1 Pro a base do HTML, CSS E JS","x":-315,"y":140,"width":460,"height":82,"color":"3"},
		{"id":"9e7f64dece35869f","type":"text","text":"Idealizei o website e seus conteúdos","x":-243,"y":40,"width":317,"height":63,"color":"4"},
		{"id":"5be8c525677968fc","type":"text","text":"Abri o Live server pra começar a editar o visual de verdade no Google Antigravity IDE, utilizando os agentes para correção de bugs, edições nas animações e responsividade do site.","x":-315,"y":580,"width":460,"height":120,"color":"5"},
		{"id":"aee6e6093657fdf3","type":"text","text":"Ultimas edições no website e verificação manual completa do website e dos códigos antes de publicar","x":-265,"y":740,"width":361,"height":92,"color":"5"},
		{"id":"f97f101ffb3eb3a0","type":"text","text":"Lançamento","x":-160,"y":1000,"width":152,"height":50,"color":"4"},
		{"id":"d3b9ad72a1cc023e","x":-220,"y":880,"width":271,"height":60,"color":"1","type":"text","text":"Começar e Terminar Back-End."}
	],
	"edges":[
		{"id":"82fa7c6750b0a95a","fromNode":"9e7f64dece35869f","fromSide":"bottom","toNode":"7ee1090313b0d478","toSide":"top"},
		{"id":"5af36ce4bc56df5d","fromNode":"7ee1090313b0d478","fromSide":"bottom","toNode":"6aa1164a1745c1ba","toSide":"top"},
		{"id":"a0b75416d4873acf","fromNode":"6aa1164a1745c1ba","fromSide":"bottom","toNode":"3c0c1a779803b77f","toSide":"top"},
		{"id":"3905d78fe37c3c47","fromNode":"6aa1164a1745c1ba","fromSide":"bottom","toNode":"9fc51ba792394778","toSide":"top"},
		{"id":"8b7e6fb76f056035","fromNode":"6aa1164a1745c1ba","fromSide":"bottom","toNode":"a6164ac412803e63","toSide":"top"},
		{"id":"61a310b98f221147","fromNode":"7ee1090313b0d478","fromSide":"bottom","toNode":"2bb9836161d44ad7","toSide":"top"},
		{"id":"ad83d1a00c2b0d77","fromNode":"2bb9836161d44ad7","fromSide":"bottom","toNode":"cd858370c46c6c9b","toSide":"top"},
		{"id":"d8e78cfc264fd14c","fromNode":"2bb9836161d44ad7","fromSide":"bottom","toNode":"d0f23d7f924c8ae8","toSide":"top"},
		{"id":"a7b1b4d94f318485","fromNode":"2bb9836161d44ad7","fromSide":"bottom","toNode":"5c3129622a389ca4","toSide":"top"},
		{"id":"35f40a29e91a6526","fromNode":"3c0c1a779803b77f","fromSide":"bottom","toNode":"5be8c525677968fc","toSide":"top","color":"1"},
		{"id":"53b9554cc9cd55eb","fromNode":"9fc51ba792394778","fromSide":"bottom","toNode":"5be8c525677968fc","toSide":"top","color":"1"},
		{"id":"48572f2a9e412809","fromNode":"a6164ac412803e63","fromSide":"bottom","toNode":"5be8c525677968fc","toSide":"top","color":"1"},
		{"id":"0dd4f68e19cdfec1","fromNode":"cd858370c46c6c9b","fromSide":"bottom","toNode":"5be8c525677968fc","toSide":"top","color":"1"},
		{"id":"0f2871fe06377967","fromNode":"d0f23d7f924c8ae8","fromSide":"bottom","toNode":"5be8c525677968fc","toSide":"top","color":"1"},
		{"id":"ce5d586ed0568e54","fromNode":"5c3129622a389ca4","fromSide":"bottom","toNode":"5be8c525677968fc","toSide":"top","color":"1"},
		{"id":"44b63eeadbc0bd3f","fromNode":"6aa1164a1745c1ba","fromSide":"bottom","toNode":"0faf9e759a66b3ba","toSide":"top"},
		{"id":"36fd7c1c99282bab","fromNode":"0faf9e759a66b3ba","fromSide":"bottom","toNode":"5be8c525677968fc","toSide":"top","color":"1"},
		{"id":"80e4fde59552a4ae","fromNode":"5be8c525677968fc","fromSide":"bottom","toNode":"aee6e6093657fdf3","toSide":"top"},
		{"id":"7533bf38b7124a57","fromNode":"aee6e6093657fdf3","fromSide":"bottom","toNode":"d3b9ad72a1cc023e","toSide":"top"},
		{"id":"f3849524e3c5e610","fromNode":"d3b9ad72a1cc023e","fromSide":"bottom","toNode":"f97f101ffb3eb3a0","toSide":"top"}
	]
}
