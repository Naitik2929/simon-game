var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function (e) {
    if (e.key == ' ' || e.key == ' ') {
    console.log(e.key);
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    }
});

$(".btn").click(function () {
    var user_choise = $(this).attr("id");
    userClickedPattern.push(user_choise);
    playSound(user_choise);
    animatePress(user_choise);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(current_level) {
    if (gamePattern[current_level] === userClickedPattern[current_level]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // $(id).css("border-bottom-color", "#fff");
    playSound(randomChosenColour);
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
