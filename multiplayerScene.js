/**
 * Multiplayer Mode Scene
 */
function multiplayerScene(){

  var score, score2, goal;
  var winner;
  var samurai, samurai2;
  var ninjas;
  var planks;
  var pauseAreaClicked;
  var isPaused;
  var pauseCreated;
  var firstRun;
  var gameOverCreated;
  var seed;
  var counter;

  /**
   * Sets up variables and display for game screen.
   */
  this.setup = function(){
    seed = 0;
    counter = 0;
    createCanvas(windowWidth, windowHeight);
    samurai = new Samurai();
    samurai2 = new Samurai();
    ninjas = [];
    score = 0;
    score2 = 0;
    goal = 5;
    winner = "";
    firstRun = true;
    gameTheme.loop();
    bg = bg1;

    pauseAreaClicked = false;
    isPaused = false;
    pauseButton = createButton("||");
    pauseButtonCSSSetup(pauseButton, 0.6);
    pauseButton.mousePressed(pauseGame);
  }

  /** 
   * Reset this screen on calls from other functions
   */
  this.reset = function(){
    this.setup();
  }

  /**
   * Returns which player wins.
   */
  this.getScore = function(){
    if(score == goal){
      winner = "White Samurai Wins";
      winnerSound.play();
    }
    else if(score2 == goal){
      winner = "Black Samurai Wins";
      winnerSound.play();
    }
    gameTheme.stop();
    return winner;
  }
  
   /**
   * Loop that constantly is drawing the gameplay. 
   * All game logic is done in this function.
   */
  this.draw = function(){
    if(isPaused){
      gameTheme.stop();
      return;
    }

    //Background Setup
    background(bg);

    //Score
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Score: " + score, windowWidth/1.25, windowHeight * .05)

    //Goal
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Goal: " + goal + " points" , windowWidth/2, windowHeight * .05)

    //Score
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Score: " + score2, windowWidth/6, windowHeight * .05)

    //Watch for framerate
    // var fps = frameRate();
    // stroke(0);
    // text("FPS:" + fps.toFixed(2), windowWidth / 2, height - 20);

    samurai.update();
    samurai.show();

    samurai2.update();
    samurai2.show();
    samurai2.constantCharacter2();

    if(frameCount % 10 == 0){
      samurai.animate();
      samurai2.animate();
    }

    //Update enemy position every frame.
    for(var i = ninjas.length - 1; i >= 0; i--){
      ninjas[i].show();
      ninjas[i].update();

      if(ninjas[i].collision(samurai) || ninjas[i].collision(samurai2)){

        if(ninjas[i].collision(samurai)){
          if(samurai.attacking){
            sliceSound.play();
            score++;
          }
          else{
            if(score > 0)
              score--;
          }
        }

        else if(ninjas[i].collision(samurai2)){
          if(samurai2.attacking){
            sliceSound.play();
            score2++;
          }
          else{
            if(score2 > 0)
              score2--;
          }
        }

        if(score == goal || score2 == goal){
          clear();
          removeElements();

          if(gameOverCreated){
            var oOver = this.sceneManager.findScene(gameOverMulti).oScene;
            oOver.reset();
          }

          gameOverCreated = true;
          this.sceneManager.showScene(gameOverMulti);
        }
        ninjas.splice(i, 1);
      }
    }

    //Spawn new enemies every 120 frames.
    if(counter % 90 == 0){
      ninjas.push(new ninja(true, getRandomInt(0,2)));
    }

    counter++;
  }

  /**
   * Based on what key is pressed decides which direction to move samurai.
   * Arrow keys for player 1
   * WASD for player 2
   */
  this.keyPressed = function(){
    if(keyCode == RIGHT_ARROW){
      samurai.switchLanes("right");
    }
    else if(keyCode == LEFT_ARROW){
      samurai.switchLanes("left");
    }
    else if(keyCode == UP_ARROW){
      samurai.attack();
    }

    if(keyCode == 68){ // Key 'D'
      samurai2.switchLanes("right");
    }
    else if(keyCode == 65){ // Key 'A'
      samurai2.switchLanes("left");
    }
    else if(keyCode == 87){ // Key 'W'
      samurai2.attack();
    }
    return false;
  }

  /**
   * When mouse is pressed decide what action to perform depending on what part of the screen was clicked.
   */
  this.mousePressed = function(){
    if(pauseAreaClicked){
      isPaused = true;

      if(pauseCreated){
        oPause = this.sceneManager.findScene(multiplayerPauseScreen).oScene;
        oPause.reset();
      }

      gameTheme.stop();
      pauseCreated = true;
      pauseAreaClicked = false;
      this.sceneManager.showScene(multiplayerPauseScreen);
    }
  }

  /**
   * Unpause Game
   */
  this.unpause = function(){
    isPaused = false;
  }

  /**
   * Pause Game
   */
  function pauseGame(){
    pauseAreaClicked = true;
  }

  /**
 * CSS Styling for Pause button
 * @param {*} button - what button to set up.
 * @param {double} YpositionMultiple - multiple of Y position to set up button at a desired height scaled with the display.
  */
  function pauseButtonCSSSetup(button, YpositionMultiple){
    button.style("width", "35px");
    button.style("height", "35px");
    button.style("text-align", "center");
    button.style("font-size", "125%");
    button.style("font-weight", "bold")
    button.style("color", "#FFF");
    button.style("background", "00000000");
    button.style("border-radius", "4px");
    button.style("display", "inline-block");
    button.style("border", "none");
    button.style("outline", "none");

    //NOT CSS
    //Center Button
    button.position(windowWidth  >> 6, windowHeight/100);
  }

  /**
   * Random number generator.
   * @param {int} min - Minimum value of random values expected.
   * @param {int} max - Maximum value of random values expected.
   */
  function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    if(seed > 0){
        seed = (seed * 9301 + 49297) % 233280; //Generic Seed Math formula
        var random = seed / 233280.0;
        
        return Math.floor(random * (max - min + 1)) + min;
    }
        
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
