alert("You are ready to play this game, don't forget to report");

var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];


var isStarted = false;
var level = 0;

$(document).keypress(function(){
    if(!isStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        isStarted = true;
    }
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence(),1000
            });
    }
    }else{
        console.log("wrong");
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over"),200
        });
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(name){
    var audio;
    switch (name) {
        case "green":
            audio = new Audio('sounds/green.mp3');
            break;
        case "yellow":
            audio = new Audio('sounds/yellow.mp3');
            break;
        case "blue":
            audio = new Audio('sounds/blue.mp3');
            break;
        case "red":
            audio = new Audio('sounds/red.mp3');
        default:
            break;
    }

    audio.play();
}

function animatePress(currentColor){

        $("#" + currentColor).addClass("pressed");
        setTimeout(() => $("#" + currentColor).removeClass("pressed"),100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    isStarted = false;
}
