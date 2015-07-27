// main Falling Squares game script file
$(document).ready(init); // functions init
var x = 240,
    y = 450,
    c, ctx, coep,
    obsy = [],
    score = 0,
    sx,
    sy,
    ss = 0,
    sGrad,
    ammo = true,
    then = Date.now(),
    lost = false,
    middle; // misc vars
var fps = { // fps counter
    startTime: 0,
    frameNumber: 0,
    getFPS: function() {
        this.frameNumber++;
        var d = new Date().getTime(),
            currentTime = (d - this.startTime) / 1000,
            result = Math.floor((this.frameNumber / currentTime));

        if (currentTime > 1) {
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return result;

    }
};

function init() { // main init function
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    gameLoop();
    downLoop();
    scoreLoop();
    setTimeout(hideInst, 7500);
    middle = ($(window).width() / 2) - 125;
}
function hideInst() { // instructions fade out
    $("#inst").fadeTo("slow", 0);
}
function scoreLoop() { // score loop
    score++;
    setTimeout(scoreLoop, 250);
}
function reset() { // reset button
    window.location.assign(String(window.location));
}
function lose() { // loss function
    $("#reset").fadeTo("slow", 1);
    lost = true;
    //window.location.assign("#lose");
    //document.getElementById("lose").innerHTML = "Game over! Score: " + score + ".";
    //document.getElementById("lose").style.opacity = 1;
    document.getElementById("lossmessagetext").innerHTML = "You lose! Score: " + score;
    slideLoss();
}

function slideLoss() { // loss message display
    $("#lossmessage").animate({
        left: middle
    }, 250);
}
function gameLoop() { // main game loop
    c.width = c.width; // clears canvas
    if (!lost) {
        for (var i = 0; i <= obs.length; i++) { // render obstacles
            ctx.fillRect(obs[i], obsy[i], 10, 10);
        }
        var collision_space = ctx.getImageData(x, y, 5, 5).data; // checks for collision
        for (var pixel in collision_space) { // checks for collision
            if (collision_space[pixel] !== 0) {
                lose();
                break;
            }
        }
        ctx.fillStyle = "red"; // sets color
        ctx.fillRect(x, y, 5, 5); // render player
        ctx.fillText("Score: " + score, 10, 10); // render score
        ctx.fillText(fps.getFPS() + " FPS", 450, 20); // render FPS
        coep = Math.random() * 10 + 1; // calculates chance of obstacle spawn
        coep = Math.round(coep); // rounds calculation
        if (coep < 5) { // determines whether or not to spawn obstacle
            spawnE();
        }
        var now = Date.now(); // time deltas for movement
        var delta = now - then;
        move(delta / 1000);
        then = now;
        window.requestAnimationFrame(gameLoop); // starts it all over again
    }
}

function downLoop() { // obstacle descent loop
    for (var i = 0; i <= obs.length; i++) { // iterates through each obstacle
        if (obsy[i] < 500) { // determines whether or not obstacle is displayed, drop it
            //obsy[i] += 1.5;
            obsy[i] += 2; // drops obstacle
        }
    }
    setTimeout(downLoop, 10); // starts it all over again
}

var move = function(m) { // movement function
    if (37 in keysDown && x > 10) { // if left arrow key pressed, move left
        x -= 180 * m;
    }
    if (39 in keysDown && x < 485) { // if right arrow key pressed, move right
        x += 180 * m;
    }
};
//****************Old gun function (removed because it changes the objective too drastically)***************
/*function outOfAmmo() {
    document.getElementById("ammo").innerHTML = "Out of ammo.";
}

function doShot() {
    if (score > 200 && ammo === true) {
        ammo = false;
        outOfAmmo();
    }
    if (ammo === true) {
        sGrad = ctx.createLinearGradient(0, 0, 0, 170);
        sGrad.addColorStop(0, "red");
        sGrad.addColorStop(1, "yellow");
        ctx.fillStyle = sGrad;
        ctx.fillRect(sx + 2, 0, 2, 449);
        for (var i = 0; i < 450; i++) {
            for (var j = 10; j > -11; j--) {
                if (obs[i] == sx || obs[i] == sx + j) {
                    obs.splice(i, 0, "500");
                    obs.splice(i + 1, 1);
                }
            }
        }
    }
}

function shoot() {
    sx = x;
    sy = 450;
    window.requestAnimationFrame(doShot);
}*/
addEventListener("keydown", function(e) { // checks for keys down
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) { // checks for keys released
    delete keysDown[e.keyCode];
}, false);
var obs = [];
var randX;
var keysDown = {};

function spawnE() { // spawns obstacle
    randX = Math.round(Math.random() * 494 + 1);
    obs[obs.length] = randX;
    obsy[obsy.length] = 5;
}
