userClickedPattern=[];
gamePattern=[];
buttonColours=["red", "blue", "green", "yellow"];
var level=0;
var started=false;

function nextsequence(){
    userClickedPattern=[];
    level=level+1;
   $("#level-title").text("level "+level);
    var randomnumber=Math.random();
    randomnumber=Math.floor(randomnumber*3);
    var randomChosenColour=buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   

};
// recently created

// inside $ u can only use class or id or tags
$(".btn").click(function(){
    // this will be used to select button to retrive the click  button info 
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    // recently 
    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColour);
});
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
};

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level  "+level);
        nextsequence();
        started=true;
    }
});
function checkAnswer(currentLevel){
    
     
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(function(){
               nextsequence();
            },1000);
        }
    }
   else{
    console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
   };
  
};
function startOver(){
    gamePattern=[];
    level=0;
    started=false;
}