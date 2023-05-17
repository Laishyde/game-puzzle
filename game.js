// Configuração inicial do quebra-cabeça
const puzzleConfig = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Números representando a posição das peças
const winConfig = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Configuração de vitória

function movePiece(index) {
    const emptyIndex = puzzleConfig.indexOf(8); // Índice da peça vazia

    // Verifica se a peça clicada está adjacente à peça vazia
    if (
        (index === emptyIndex - 1 && index % 3 !== 2) ||
        (index === emptyIndex + 1 && index % 3 !== 0) ||
        index === emptyIndex - 3 ||
        index === emptyIndex + 3
    ) {
        // Troca a posição da peça clicada com a peça vazia
        [puzzleConfig[index], puzzleConfig[emptyIndex]] = [
            puzzleConfig[emptyIndex],
            puzzleConfig[index]
        ];

        updatePuzzle();
        checkWin();
    }
}

function updatePuzzle() {
    const pieces = document.getElementsByClassName("piece");

    // Atualiza a posição das peças no quebra-cabeça
    for (let i = 0; i < pieces.length; i++) {
        const pieceIndex = puzzleConfig[i];
        const row = Math.floor(pieceIndex / 3);
        const col = pieceIndex % 3;
        const position = `${col * -100}px ${row * -100}px`;
        pieces[i].style.backgroundPosition = position;
    }
}

function checkWin() {
    // Verifica se a configuração atual do quebra-cabeça é igual à configuração de vitória
    if (JSON.stringify(puzzleConfig) === JSON.stringify(winConfig)) {
        alert("Parabéns! Você ganhou o jogo!");
    }
}

function shufflePieces() {
    // Embaralha as peças do quebra-cabeça
    for (let i = puzzleConfig.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [puzzleConfig[i], puzzleConfig[j]] = [puzzleConfig[j], puzzleConfig[i]];
    }

    updatePuzzle();
}

shufflePieces();
