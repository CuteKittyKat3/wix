
    let player;
    let colorsCollected = [];
    let coloredPixels = [];
    let gameRunning = true;
    const canvasSize = 500; // Adjusted canvas size

    function setup() {
        createCanvas(canvasSize, canvasSize);
    player = new Player();
    frameRate(10);
        }

    function drawGrid() {
        background(245); // Light grey background
    stroke(230); // Even lighter grey for grid lines
    for (let x = 0; x <= width; x += 10) {
        line(x, 0, x, height);
            }
    for (let y = 0; y <= height; y += 10) {
        line(0, y, width, y);
            }
        }

    function draw() {
            if (gameRunning) {
        drawGrid();
    player.move();
    player.display();

    if (frameCount % 10 === 0) {
        coloredPixels.push(new ColoredPixel());
                }

                for (let i = coloredPixels.length - 1; i >= 0; i--) {
        coloredPixels[i].move();
    coloredPixels[i].display();
    if (player.collidesWith(coloredPixels[i])) {
        colorsCollected.push(coloredPixels[i].color);
    coloredPixels.splice(i, 1);
                    }
                }
            } else {
        // Display collected colors
        displayCollectedColors();
            }
        }

    function keyPressed() {
        player.changeDirection(keyCode);
        }

    document.getElementById('munchButton').addEventListener('click', function () {
        gameRunning = !gameRunning;
    // Display collected colors
    displayCollectedColors();
        });

    class Player {
        constructor() {
        this.x = width / 2;
    this.y = height / 2;
    this.size = 10;
    this.xSpeed = 0;
    this.ySpeed = 0;
            }

    move() {
        this.x += this.xSpeed * this.size;
    this.y += this.ySpeed * this.size;
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
            }

    display() {
        fill(0);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
            }

    changeDirection(key) {
                if (key === UP_ARROW) this.setSpeed(0, -1);
    else if (key === DOWN_ARROW) this.setSpeed(0, 1);
    else if (key === LEFT_ARROW) this.setSpeed(-1, 0);
    else if (key === RIGHT_ARROW) this.setSpeed(1, 0);
            }

    setSpeed(xSpeed, ySpeed) {
        this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
            }

    collidesWith(pixel) {
                return (this.x === pixel.x && this.y === pixel.y);
            }
        }

    class ColoredPixel {
        constructor() {
        this.x = floor(random(width / 10)) * 10;
    this.y = floor(random(height / 10)) * 10;
    this.size = 10;
    this.color = color(random(255), random(255), random(255));
            }

    move() {
        let choice = floor(random(4));
    if (choice === 0) this.x += this.size;
    else if (choice === 1) this.x -= this.size;
    else if (choice === 2) this.y += this.size;
    else if (choice === 3) this.y -= this.size;

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
            }

    display() {


        fill(this.color);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
            }
        }

    function displayCollectedColors() {
        background(245);
    let gridSize = 10;
    let index = 0;
            for (let y = height - gridSize; y >= 0; y -= gridSize) {
                for (let x = 0; x < width; x += gridSize) {
                    if (index < colorsCollected.length) {
        fill(colorsCollected[index]);
    rect(x, y, gridSize, gridSize);
    index++;
                    }
                }
            }
        }