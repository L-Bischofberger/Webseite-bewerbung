let isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let gameContainer = document.getElementById('game-container');

if (isMobileDevice) {
    gameContainer.style.display = 'none';
    gameMessage.style.display = 'block';
} else {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let rows = 10;
    let cols = 10;
    let scaleFactor = 35;
    let snake = [{ x: 5, y: 5 }];
    let cellWidth = 0;
    let cellHeight = 0;
    let direction = 0;
    let foodCollected = false;
    let foodEaten = 0;

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    placeFood();

    setInterval(gameLoop, 200);
    document.addEventListener('keydown', keyDown);

    draw();

    function setCanvasSize() {
        canvas.width = 700;
        canvas.height = 700;

        cellWidth = canvas.width / cols;
        cellHeight = canvas.height / rows;
    }

    function draw() {
        ctx.fillStyle = '#38d1bc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#004E6D';
        snake.forEach(part => add(part.x, part.y));

        ctx.fillStyle = '#dc2543';
        add(food.x, food.y);

        ctx.fillStyle = 'wight';
        ctx.font = '16px Arial';
        ctx.fillText('Food eaten: ' + foodEaten, 10, 20);

        requestAnimationFrame(draw);
    }

    function add(x, y) {
        ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
    }

    function shiftSnake() {
        for (let i = snake.length - 1; i > 0; i--) {
            const part = snake[i];
            const lastPart = snake[i - 1];
            part.x = lastPart.x;
            part.y = lastPart.y;
        }
    }

    function testGameOver() {
        let firstPart = snake[0];
        let otherParts = snake.slice(1);
        let duplicatePart = otherParts.find(part => part.x === firstPart.x && part.y === firstPart.y);

        if (snake[0].x < 0 || snake[0].x > cols - 1 || snake[0].y < 0 || snake[0].y > rows - 1 || duplicatePart) {
            placeFood();
            snake = [{ x: 5, y: 5 }];
            direction = 0;
            foodEaten = 0;
        }
    }

    function gameLoop() {
        testGameOver();
        if (foodCollected) {
            snake = [{ x: snake[0].x, y: snake[0].y }, ...snake];
            foodCollected = false;
            foodEaten++;
        }
        shiftSnake();
        if (direction === 'LEFT') {
            snake[0].x--;
        }
        if (direction === 'RIGHT') {
            snake[0].x++;
        }
        if (direction === 'UP') {
            snake[0].y--;
        }
        if (direction === 'DOWN') {
            snake[0].y++;
        }
        if (food.x === snake[0].x && food.y === snake[0].y) {
            foodCollected = true;
            placeFood();
        }
    }
    function keyDown(e) {
        if (e.keyCode === 65 && direction !== 'RIGHT') {
            direction = 'LEFT';
        }
        if (e.keyCode === 87 && direction !== 'DOWN') {
            direction = 'UP';
        }
        if (e.keyCode === 68 && direction !== 'LEFT') {
            direction = 'RIGHT';
        }
        if (e.keyCode === 83 && direction !== 'UP') {
            direction = 'DOWN';
        }
    }

    function placeFood() {
        let emptyCells = [];

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let isSnakePart = snake.some(part => part.x === i && part.y === j);
                if (!isSnakePart) {
                    emptyCells.push({ x: i, y: j });
                }
            }
        }

        if (emptyCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            food = emptyCells[randomIndex];
        }
    }

}
