class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    });

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question();
      question.display();
    }
  }

  play(){
    background(255,255,0);
    question.hide();
    heading = createElement('h1');
    heading.html("Result of the Quiz");
    heading.position(width/2.5, 30);
    Contestant.getPlayerInfo();

    if (allContestants !== undefined) {
      fill("blue");
      textSize(20);
      text("*NOTE: Contestant who answered correct are only shown here!",130,230);
    
      for(var plr in allContestants){
        var correctAnswer = "2";

        if (correctAnswer == allContestants[plr].answer) {
          fill("green");
        } else {
          fill("red");
        }

        textSize(30);
        abc = text(allContestants[plr].name + ": " + allContestants[plr].answer, 120, 390);
        abc.style("padding-right", "1px");
      }
    }
  }

}
