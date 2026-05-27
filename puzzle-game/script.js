class SlidingPuzzle {
    constructor() {
        this.size = 3;
        this.tiles = [];
        this.emptyIndex = 8;
        this.moves = 0;
        this.puzzleContainer = document.getElementById('puzzle');
        this.movesDisplay = document.getElementById('moves');
        this.shuffleBtn = document.getElementById('shuffle-btn');
        
        this.init();
    }
    
    init() {
        this.createTiles();
        this.render();
        this.shuffleBtn.addEventListener('click', () => this.shuffle());
    }
    
    createTiles() {
        this.tiles = [];
        for (let i = 1; i < this.size * this.size; i++) {
            this.tiles.push(i);
        }
        this.tiles.push(0); // 0 represents empty tile
        this.emptyIndex = this.tiles.length - 1;
    }
    
    render() {
        this.puzzleContainer.innerHTML = '';
        this.tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = tile === 0 ? 'tile empty' : 'tile';
            tileElement.textContent = tile === 0 ? '' : tile;
            tileElement.addEventListener('click', () => this.moveTile(index));
            this.puzzleContainer.appendChild(tileElement);
        });
    }
    
    moveTile(index) {
        if (this.canMove(index)) {
            this.swap(index, this.emptyIndex);
            this.emptyIndex = index;
            this.moves++;
            this.movesDisplay.textContent = this.moves;
            this.render();
            
            if (this.isSolved()) {
                setTimeout(() => {
                    alert(`Congratulations! You solved the puzzle in ${this.moves} moves!`);
                }, 100);
            }
        }
    }
    
    canMove(index) {
        const row = Math.floor(index / this.size);
        const col = index % this.size;
        const emptyRow = Math.floor(this.emptyIndex / this.size);
        const emptyCol = this.emptyIndex % this.size;
        
        return (Math.abs(row - emptyRow) + Math.abs(col - emptyCol)) === 1;
    }
    
    swap(index1, index2) {
        [this.tiles[index1], this.tiles[index2]] = [this.tiles[index2], this.tiles[index1]];
    }
    
    isSolved() {
        for (let i = 0; i < this.tiles.length - 1; i++) {
            if (this.tiles[i] !== i + 1) {
                return false;
            }
        }
        return this.tiles[this.tiles.length - 1] === 0;
    }
    
    shuffle() {
        this.moves = 0;
        this.movesDisplay.textContent = this.moves;
        
        // Perform random valid moves to shuffle
        for (let i = 0; i < 100; i++) {
            const validMoves = this.getValidMoves();
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            this.swap(randomMove, this.emptyIndex);
            this.emptyIndex = randomMove;
        }
        
        this.render();
    }
    
    getValidMoves() {
        const validMoves = [];
        const row = Math.floor(this.emptyIndex / this.size);
        const col = this.emptyIndex % this.size;
        
        if (row > 0) validMoves.push(this.emptyIndex - this.size);
        if (row < this.size - 1) validMoves.push(this.emptyIndex + this.size);
        if (col > 0) validMoves.push(this.emptyIndex - 1);
        if (col < this.size - 1) validMoves.push(this.emptyIndex + 1);
        
        return validMoves;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SlidingPuzzle();
});
