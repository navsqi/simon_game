var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var counter = 0;


function restart() {
    $(document).on("keypress", function (e) {
        if (e.key === "r") {
            $("body").removeClass("game-over");
            $("h1").text("Press S Key to Start");
        }
    });
}

$(document).on("keypress", function (e) {
    if (e.key === "s") {
        setTimeout(function () {
            randomChosenColor();
        }, 300);
    }
});

$("h1").on("click", function () {
    setTimeout(function () {
        randomChosenColor();
    }, 300);

});

function checkAnswer(currentLevel) {

    var indexOfUser = userClickedPattern.length - 1;
    var indexOfPattern = gamePattern.length - 1;

    if (userClickedPattern[indexOfUser] == gamePattern[indexOfUser]) {
        console.log("success");

        if (indexOfUser == indexOfPattern) {
            setTimeout(function () {
                randomChosenColor();
            }, 1000);

            userClickedPattern = [];
        }
    } else {
        setTimeout(function () {
            $("body").addClass("game-over")
        });
        $("h1").text("Game over, press R key to restart");
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        restart();
    }


}



function nextSequence(min, max) {
    var randNumber = Math.floor(Math.random() * (max - min + 1)) + 0;
    var randColor = buttonColors[randNumber];

    playSound(randColor);
    animation(randColor);

    level = level + 1;
    $("h1").text("Level " + level);

    return randNumber;
}

function randomChosenColor() {
    var randNumber = nextSequence(0, 3);
    var randColor = buttonColors[randNumber];
    gamePattern.push(randColor);

    playSound(randColor);
    animation(randColor);

    return gamePattern;
}

$(".btn").on("click", function () {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    animation(userChoosenColor);

    checkAnswer(level);

    console.log(userChoosenColor);
});

function animation(name) {

    $("#" + name).addClass("pressed");
    playSound(name);
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var red = new Audio("sounds/red.mp3");
    var green = new Audio("sounds/green.mp3");
    var blue = new Audio("sounds/blue.mp3");
    var yellow = new Audio("sounds/yellow.mp3");
    var wrong = new Audio("sounds/wrong.mp3");

    switch (name) {
        case "red":
            red.play();
            break;

        case "yellow":
            yellow.play();
            break;

        case "blue":
            blue.play();
            break;

        case "green":
            green.play();
            break;

        case "wrong":
            wrong.play();
            break;

        default:
            break;
    }
}