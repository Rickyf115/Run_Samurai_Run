/**
 * Single Player Screen
 */
function gameScreen(){

  var score;
  var samurai;
  var ninjas;
  var planks;
  var backgroundImg;
  var pauseAreaClicked;
  var isPaused;
  var pauseCreated;
  var gameOverCreated;
  var firstRun;
  var seed;
  var counter;

  /**
   * Sets up variables and display for game screen.
   */
  this.setup = function(){
    seed = 0;
    createCanvas(windowWidth, windowHeight);
    gameTheme.loop();
    samurai = new Samurai();
    ninjas = [];
    planks = [];
    score = 0;
    bg = bg1;
    counter = 0;
    //Create the Pause Button
    pauseAreaClicked = false;
    firstRun = true;
    isPaused = false;
    pauseButton = createButton("||");
    pauseButtonCSSSetup(pauseButton, 0.6);
    pauseButton.mousePressed(pauseGame);
  }

  /**
   * Based on what key is pressed decides which direction to move samurai.
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
  }

  /** 
   * Reset this screen on calls from other functions
   */
  this.reset = function(){
    this.setup();
  }

  /**
   * Get current player score
   */
  this.getScore = function(){
    return score;
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
    // background(bg);

    //Different difficulties created
    if(score <= 5){
      background(bg);
    }
    else if(score <= 10){
      background(bg3);
    }
    else if(score <= 15){
      background(bg4);
    }
    else if(score <= 20) {
      background(bg5);
    }
    else{
      background(bg6);
    }

    //Text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("Score: " + score, windowWidth/2, windowHeight * .05)

    //Watch for framerate
    // var fps = frameRate();
    // stroke(0);
    // text("FPS:" + fps.toFixed(2), windowWidth / 2, height - 20);

    samurai.update();
    samurai.show();

    if(frameCount % 10 == 0){
      samurai.animate();
    }

    //Update enemy position every frame.
    for(var i = ninjas.length - 1; i >= 0; i--){
      ninjas[i].show();
      ninjas[i].update();

      //If enemies go offscreen delete them to free up memory.
      if(ninjas[i].offscreen()){
        ninjas.splice(i, 1);
        if(score > 0)
          score -= ninjas[i].getHealth();
      }

      if(ninjas[i].collision(samurai) && !ninjas[i].isPushed()){
        if(samurai.attacking){
          //Slice sound
          sliceSound.play();

          score++;
          ninjas[i].loseHealth();
          if(ninjas[i].getHealth() >= 1){
            ninjas[i].pushBack();
          }
        }
        else{
          clear();
          removeElements();
          if(gameOverCreated){
            var oOver = this.sceneManager.findScene(gameOverScene).oScene;
            oOver.reset();
          }

          gameOverCreated = true;
          gameTheme.stop();

          this.sceneManager.showScene(gameOverScene);
        }
        if(!ninjas[i].isPushed()){
          ninjas.splice(i, 1);
        }
      }
    }

    if(score <= 2){
      if(frameCount % 80 == 0){
        ninjas.push(new ninja(false, getRandomInt(0,2)));
      }
    }

    else if(score > 2 && score <= 5){
      if(frameCount % 70 == 0){
        ninjas.push(new ninja(false,getRandomInt(0,2)));
      }
    }

    else if(score > 5 && score <= 10){
      if(frameCount % 60 == 0){
        ninjas.push(new ninja(false, getRandomInt(0,2)));
      }
    }

    else if(score > 10 && score <= 50) {
      if(frameCount % 50 == 0){
        ninjas.push(new ninja(true, getRandomInt(0,2)));
      }
    }

    else{
      if(frameCount % 40 == 0){
        ninjas.push(new ninja(true, getRandomInt(0,2)));
      }
    }

    counter++;
  }

  /**
   * When mouse is pressed decide what action to perform depending on what part of the screen was clicked.
   */
  this.mousePressed = function(){
    if(!pauseAreaClicked){
      if(mouseX > (windowWidth / 2) * 1.5){
        samurai.switchLanes("right");
      }

      else if(mouseX < (windowWidth / 2) * 0.5){
        samurai.switchLanes("left");
      }

      else{
        samurai.attack();
      }
    }

    else{
      if(isPaused){
        isPaused = false;
      }

      else{
        isPaused = true;
        if(pauseCreated){
          oPause = this.sceneManager.findScene(pauseScreen).oScene;
          oPause.reset();
        }

        pauseCreated = true;
        gameTheme.stop();
        this.sceneManager.showScene(pauseScreen);
      }

      pauseAreaClicked = false;
    }
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
   * Pause Game
   */
  function pauseGame(){
    pauseAreaClicked = true;
  }

  /**
   * Unpause Game
   */
  this.unpause = function(){
    gameTheme.loop();
    isPaused = false;
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
