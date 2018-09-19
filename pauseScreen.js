/**
 * Pause Screen for Single Player mode
 */
function pauseScreen(){

  var game;
  var start;
  this.resumeGame;
  this.startOver;

  /**
   * Sets up variables and buttons for pause screen
   */
  this.setup = function(){
    this.resumeGame = createButton("Resume Game");
    buttonCSSSetup(this.resumeGame, 0.5);
    this.resumeGame.mousePressed(goToGame);

    this.startOver = createButton("Main Menu");
    buttonCSSSetup(this.startOver, 0.6);
    this.startOver.mousePressed(backToMainMenu);

    game = false;
    start = false;
  }

   /** 
   * Reset this screen on calls from other functions
   */
  this.reset = function(){
    this.setup();
  }

  /**
   * Removes all elements from pause screen when game is unpaused,
   */
  this.removePauseElements = function(){
    this.resumeGame.remove();
    this.startOver.remove();
  }

  /**
   * When mouse is pressed decide what action to perform depending on what part of the screen was clicked.
   */
  this.mousePressed = function(){
    if(game || start){
      this.removePauseElements();
      currentGame = this.sceneManager.findScene(gameScreen).oScene;
    }

    if(game){
      game = false;
      currentGame.unpause();
      this.sceneManager.showScene(gameScreen);
    }

    else if(start){
      start = false;
      clear();
      removeElements();
      oStart = this.sceneManager.findScene(startScreen).oScene;
      oStart.reset();
      this.sceneManager.showScene(startScreen);
    }
  }

/**
 * CSS Styling for buttons
 * @param {*} button - what button to set up.
 * @param {double} YpositionMultiple - multiple of Y position to set up button at a desired height scaled with the display.
  */
  function buttonCSSSetup(button, YpositionMultiple){
    button.style("width", "400px");
    button.style("height", "50px");
    button.style("text-align", "center");
    button.style("font-size", "150%");
    button.style("color", "#000");
    button.style("background", "white");
    button.style("display", "inline-block");
    button.style("font-family", "Arial");
    button.style("border", "none");
    button.style("border-radius", "9px");
    button.style("box-shadow", "0 8px #989898");

    //NOT CSS
    //Center Button
    button.position(windowWidth - button.width >> 1, windowHeight * YpositionMultiple);
  }

  /**
   * Lets the program know that the resume game button has been clicked.
   */
  function goToGame(){
    game = true;
  }

  /**
   * Let the program know that the main menu button has been clicked.
   */
  function backToMainMenu(){
    start = true;
  }
}
