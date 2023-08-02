var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var randomChosenColour;
var level=0;
var started=false;
$("h1").text("press any key to start");

$(document).on("keydown",function(){
    if(!started)
    {
        $("h1").text("level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").on("click",function(){
    var classList = $(this).attr("class").split(/\s+/);
    // alert(classList);
    var userChosenColour = classList[1];
    // alert(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
    playsound(userChosenColour);
    var buttonPressed = $("."+userChosenColour);
    animatePress(buttonPressed);
    
})

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("h1").text("level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // alert(randomChosenColour);
    // var k = $("."+randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // var sound = new Audio("/sounds/"+randomChosenColour+".mp3");
    // sound.play();
    playsound(randomChosenColour);
    
    
    

}


function checkAnswer(n)
{
    if(userClickedPattern[n]===gamePattern[n])
    {
        console.log("correct "+level);
        // alert("correct "+level);
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("game over");
        alert("game over");
        $("body").addClass("game-over");
        playsound("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 2000);
        $("h1").text("Game over! Press any key to restart.");
        started=false;
        level=0;
        gamePattern=[];
    }
}


function playsound(name){
    var sound=new Audio(name+".mp3");
    sound.play();
}

function animatePress(currentColour)
{
    currentColour.addClass("pressed");
    
    setTimeout(()=>{
    currentColour.removeClass("pressed");
    },100);

}
