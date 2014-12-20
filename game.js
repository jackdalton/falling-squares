$(document).ready(init);
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
    middle;
var fps = {
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

function init() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    gameLoop();
    downLoop();
    scoreLoop();
    setTimeout(hideInst, 7500);
    middle = ($(window).width() / 2) - 125;
}
function hideInst() {
    $("#inst").fadeTo("slow", 0);
}
function scoreLoop() {
    score++;
    setTimeout(scoreLoop, 250);
}
function reset() {
    window.location.assign("http://html5.jackdalton.co");
}
function lose() {
    $("#reset").fadeTo("slow", 1);
    lost = true;
    //window.location.assign("#lose");
    //document.getElementById("lose").innerHTML = "Game over! Score: " + score + ".";
    //document.getElementById("lose").style.opacity = 1;
    document.getElementById("lossmessagetext").innerHTML = "You lose! Score: " + score;
    slideLoss();
}

function slideLoss() {
    $("#lossmessage").animate({
        left: middle
    }, 250);
}
function gameLoop() {
    c.width = c.width;
    if (lost === false) {
        for (var i = 0; i <= obs.length; i++) {
            ctx.fillRect(obs[i], obsy[i], 10, 10);
        }
        var collision_space = ctx.getImageData(x, y, 5, 5).data;
        for (var pixel in collision_space) {
            if (collision_space[pixel] !== 0) {
                lose();
                break;
            }
        }
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, 5, 5);
        ctx.fillText("Score: " + score, 10, 10);
        ctx.fillText(fps.getFPS() + " FPS", 450, 20);
        coep = Math.random() * 10 + 1;
        coep = Math.round(coep);
        if (coep < 5) {
            spawnE();
        }
        var now = Date.now();
        var delta = now - then;
        move(delta / 1000);
        then = now;
        window.requestAnimationFrame(gameLoop);
    }
}

function downLoop() {
    for (var i = 0; i <= obs.length; i++) {
        if (obsy[i] < 500) {
            //obsy[i] += 1.5;
            obsy[i] += 2;
        }
    }
    setTimeout(downLoop, 10);
}

var move = function(m) {
    if (37 in keysDown && x > 10) {
        // Left
        x -= 180 * m;
    }
    if (39 in keysDown && x < 485) {
        // Right
        x += 180 * m;
    }
};

function outOfAmmo() {
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
}
addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);
var obs = [];
var randX;
var keysDown = {};

function spawnE() {
    randX = Math.round(Math.random() * 494 + 1);
    obs[obs.length] = randX;
    obsy[obsy.length] = 5;
}
