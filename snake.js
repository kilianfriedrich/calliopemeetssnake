// COPY THIS TO HTTP://MAKECODE.CALLIOPE.CC/

let snake: Array<number>[];

let appleX: number;
let appleY: number;

function startGameLoop() {

    while (isAlive()) {

        basic.pause(700);
        basic.clearScreen();

        moveSnake();
        checkApple();
        renderSnake();

        led.toggle(appleX, appleY);

    }

}

function checkApple() {

    if (appleX !== snake[0][0] || appleY !== snake[0][1]) return;

    appendToSnake();

    while (snakeCoversApple()) {

        appleX = Math.random(5);
        appleY = Math.random(5);

    }


}

function snakeCoversApple() {

    for (let i = 0; i < snake.length; i++)
        if (snake[i][0] === appleX && snake[i][1] === appleY)
            return true;

    return false;

}

function renderSnake(index = 0) {

    if (index === snake.length) return;

    led.toggle(snake[index][0], snake[index][1]);
    renderSnake(index + 1);

}

function launch() {

    basic.showString("3 2 1");

    snake = [[2, 2, 0], [1, 2, 0]];

    startGameLoop();

    basic.showString("Game Over");

}

function isAlive() {

    let headX = snake[0][0];
    let headY = snake[0][1];

    for (let i = 1; i < snake.length; i++)
        if (snake[i][0] === headX && snake[i][1] === headY)
            return false;

    return headX >= 0 && headX <= 4 && headY >= 0 && headY <= 4;

}

function moveSnake() {

    let rightTilt = getTiltToRight();
    let downTilt = getTiltToBottom();
    let leftTilt = getTiltToLeft();
    let upTilt = getTiltToTop();

    let snakeDirection = snake[0][2];

    let xTiltDirection = (rightTilt >= leftTilt) ? 0 : 2;
    let xTiltValue = (xTiltDirection === 0) ? rightTilt : leftTilt;

    let yTiltDirection = (downTilt >= upTilt) ? 1 : 3;
    let yTiltValue = (yTiltDirection === 1) ? downTilt : upTilt;

    if (xTiltDirection === 0 && (xTiltValue >= yTiltValue || Math.abs(yTiltDirection - snakeDirection) === 2))
        moveRight();
    else if (yTiltDirection === 1 && (yTiltValue > xTiltValue || Math.abs(xTiltDirection - snakeDirection) === 2))
        moveDown();
    else if (xTiltDirection === 2 && (xTiltValue >= yTiltValue || Math.abs(yTiltDirection - snakeDirection) === 2))
        moveLeft();
    else if (yTiltDirection === 3 && (yTiltValue > xTiltValue || Math.abs(xTiltDirection - snakeDirection) === 2))
        moveUp();

}

function moveRight() {

    snake[0][2] = 0;
    snake[0][0]++;

    movePart(0)

}
function moveDown() {

    snake[0][2] = 1;
    snake[0][1]++;

    movePart(1)

}
function moveLeft() {

    snake[0][2] = 2;
    snake[0][0]--;

    movePart(2)

}
function moveUp() {

    snake[0][2] = 3;
    snake[0][1]--;

    movePart(3)

}

function movePart(direction: number, index: number = 1) {

    if (index === snake.length) return;

    switch (snake[index][2]) {

        case 0: snake[index][0]++; break;
        case 1: snake[index][1]++; break;
        case 2: snake[index][0]--; break;
        case 3: snake[index][1]--; break;

    }

    movePart(snake[index][2], index + 1);

    snake[index][2] = direction;

}

function appendToSnake() {

    switch (snake[snake.length - 1][2]) {

        case 0: snake.push([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1], 0]); break;
        case 1: snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1, 1]); break;
        case 2: snake.push([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1], 2]); break;
        case 3: snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1, 3]); break;

    }

}

function getXRotation() { return input.rotation(Rotation.Roll) }
function getYRotation() { return input.rotation(Rotation.Pitch) }

function getTiltToLeft() { return Math.abs(getXRotation()) === 180 ? 0 : (getXRotation() < 0 ? getXRotation() + 180 : getXRotation() - 180) }
function getTiltToRight() { return Math.abs(getXRotation()) === 180 ? 0 : (getXRotation() > 0 ? -getXRotation() + 180 : -getXRotation() - 180) }
function getTiltToTop() { return Math.abs(getYRotation()) === 180 ? 0 : -getYRotation() }
function getTiltToBottom() { return Math.abs(getYRotation()) === 180 ? 0 : getYRotation() }

launch();