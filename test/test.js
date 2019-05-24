class Player {
    weapon = 1;
    armor = 1;
    x = 200;
    y = 350;
    speed = 10;
    direction = "U";
    currentSquare;
    constructor(name) {
        this.name = name;
    }
}

class Square {
    constructor(up, down, right, left, val) {
        this.up = up;
        this.down = down;
        this.right = right;
        this.left = left;
        this.val = val;
    }
    
}

class shot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 10;
    }
}

function Level1() {
    begin = new Square(null, null, null, null, "1");
    addSquareUp(begin, new Square(null, null, null, null, "2"));
    addSquareUp(begin.up, new Square(null, null, null, null, "3"));
    player.currentSquare = begin;
    return begin;
}

function addSquareUp(root, temp) {
    root.up = temp;
    temp.down = root;
}

function addSquareDown(root, temp) {
    root.down = temp;
    temp.up = root;
}

function addSquareLeft(root, temp) {
    root.left = temp;
    temp.right = root;
}

function addSquareDown(root, temp) {
    root.down = temp;
    temp.up = root;
}

function moveSquareUp() {
    if (player.currentSquare.up == null) {
        console.log("You can't go up");
    } else {
        player.currentSquare = player.currentSquare.up;
        console.log(player.currentSquare.val);
    }
}

function moveSquareDown() {
    if (player.currentSquare.down == null) {
        console.log("You can't go down");
    } else {
        player.currentSquare = player.currentSquare.down;
        console.log(player.currentSquare.val);
    }
}

function moveSquareLeft() {
    if (player.currentSquare.left == null) {
        console.log("You can't go left");
    } else {
        player.currentSquare = player.currentSquare.left;
        console.log(player.currentSquare.val);
    }
}

function moveSquareRight() {
    if (player.currentSquare.right == null) {
        console.log("You can't go right");
    } else {
        player.currentSquare = player.currentSquare.right;
        console.log(player.currentSquare.val);
    }
}

function moveUp() {
    player.y -= player.speed;
}

function moveDown() {
    player.y += player.speed;
}

function moveLeft() {
    player.x -= player.speed;
}

function moveRight() {
    player.x += player.speed;
}

function shoot() {
    shootbool = true;
}

function drawShot() {
    if (!(shot.x > 400 || shot.x < 0 || shot.y > 400 || shot.y < 0)) {
        context.fillStyle = 'blue';
        context.fillRect(shot.x, shot.y, 5, 5);
        if (player.direction == "U") {
            shot.y -= shot.speed;
        } else if (player.direction == "D") {
            shot.y += shot.speed;
        } else if (player.direction =="L") {
            shot.x -= shot.speed;
        } else if (player.direction == "R") {
            shot.x += shot.speed;
        }
    } else {
        shootbool = false;
    }
}

function checkSquare() {
    if (player.x >= 395 && player.currentSquare.right != null) {
        player.x = 20;
        player.currentSquare = player.currentSquare.right;
        console.log(player.currentSquare);
    } else if (player.x <= 5 && player.currentSquare.left != null) {
        player.x = 380;
        player.currentSquare = player.currentSquare.left;
        console.log(player.currentSquare);
    } else if (player.y >= 390) {
        if (player.currentSquare.down != null) {
            player.y = 0;
            player.currentSquare = player.currentSquare.down;
            console.log(player.currentSquare);
        } else {
            player.y -= player.speed;
        }
    } else if (player.y <= -10 && player.currentSquare.up != null) {
        player.y = 380;
        player.currentSquare = player.currentSquare.up;
        console.log(player.currentSquare);
    } else {

    }
}

//Initialize everything
player = new Player("Ryan");
var shots = [];
shot = new shot(player.x, player.y);
begin = Level1();
player.currentSquare = begin;

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var shootbool;
var wait = false;

function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = 'green';
    context.fillRect(player.x, player.y, 20, 20);
    if (shootbool == true) {
        drawShot();
    }
    checkSquare();
}

document.addEventListener('keydown', function(e) {
    // prevent snake from backtracking on itself by checking that it's
    // not already moving on the same axis (pressing left while moving
    // left won't do anything, and pressing right while moving left
    // shouldn't let you collide with your own body)
  
    // left arrow key
    if (e.which === 37) {
        if (!(player.x <= 0)) {
            moveLeft();
        }
        player.direction = "L";
    }
    // up arrow key
    else if (e.which === 38) {
        if (player.currentSquare.up == null) {
            if (!(player.y <= 0)) {
                moveUp();
            }
        } else {
            if (!(player.y <= -5)) {
                moveUp();
            }
        }
        player.direction = "U"
    }
    // right arrow key
    else if (e.which === 39) {
        if (!(player.x >= 380)) {
            moveRight();
        }
        player.direction = "R"
    }
    // down arrow key
    else if (e.which === 40) {
        if (player.currentSquare.down == null) {
            if (!(player.y >= 380)) {
                moveDown();
            }
        } else {
            if (!(player.y >= 390)) {
                moveDown();
            }
        }
        player.direction = "D"
    }

    else if (e.which === 32) {
        if (!wait) {
            wait = true;
            shootbool = true;
            shot.x = player.x;
            shot.y = player.y;
            shoot();
            setTimeout(function () {
                wait = false;
            }, 1000)
        } 
    }
  });

  requestAnimationFrame(loop);