// Configuração inicial do quebra-cabeça
const puzzleSize = 5; // Tamanho do lado do quebra-cabeça (número de peças por linha/coluna)
const numPieces = puzzleSize * puzzleSize; // Número total de peças

const puzzleConfig = Array.from({ length: numPieces }, (_, index) => index); // Números representando a posição das peças
const winConfig = Array.from({ length: numPieces }, (_, index) => index); // Configuração de vitória

function movePiece(index) {
    const emptyIndex = puzzleConfig.indexOf(numPieces - 1); // Índice da peça vazia

    // Verifica se a peça clicada está adjacente à peça vazia
    if (
        (index === emptyIndex - 1 && index % puzzleSize !== puzzleSize - 1) ||
        (index === emptyIndex + 1 && index % puzzleSize !== 0) ||
        index === emptyIndex - puzzleSize ||
        index === emptyIndex + puzzleSize
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
        const row = Math.floor(pieceIndex / puzzleSize);
        const col = pieceIndex % puzzleSize;
        const position = `${col * -100}% ${row * -100}%`;
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

    // Verifica se a configuração inicial é a configuração de vitória e, se for, embaralha novamente
    if (JSON.stringify(puzzleConfig) === JSON.stringify(winConfig)) {
        shufflePieces();
    }

    updatePuzzle();
}

shufflePieces();



