/**
 * Main menu screen
 */
function startScreen(){

  var singlePlayer = false;
  var multiplayer = false;
  var leaderboard = false;
  var online = false;
  var leaderboardCreated = false;
  var gameScreenCreated = false;
  var localCreated = false;
  var onlineCreated = false;
  var opacityVal = 1;

  /** 
   *Generate game start screen (sets background and buttons).
   */
  this.setup = function(){
    document.body.style.backgroundImage = this.sceneManager.backgroundImage;
    document.body.style.backgroundSize = "100% 100%";
    setupStartUpScreen();
    mainTheme.loop();
  }

  /** 
   * Reset this screen on calls from other functions
   */
  this.reset = function(){
    this.setup();
  }

  /**
   * When mouse is pressed decide what action to perform depending on what part of the screen was clicked.
   */
  this.mousePressed = function(){
    console.log('mousePressed');
    if(singlePlayer){
      singlePlayer = false;
      removeElements();
      clear();
      //If a game screen has been created before then reset it.
      //Creates a brand new instance of the game.
      if(gameScreenCreated){
        oGame = this.sceneManager.findScene(gameScreen).oScene;
        oGame.reset();
      }
      gameScreenCreated = true;

      mainTheme.stop();
      this.sceneManager.showScene(gameScreen);
    }

    else if(multiplayer){
      multiplayer = false;
      removeElements();
      clear();

      //If a game screen has been created before then reset it.
      //Creates a brand new instance of the game.
      if(localCreated){
        oMulti = this.sceneManager.findScene(multiplayerScene).oScene;
        oMulti.reset();
      }
      localCreated = true;

      mainTheme.stop();
      this.sceneManager.showScene(multiplayerScene);
    }

    else if(leaderboard){
      leaderboard = false;
      removeElements();
      clear();

      //If a leaderboard screen has been created before then reset it.
      //Creates a brand new instance of this display.
      if(leaderboardCreated){
        oLeaderboard = this.sceneManager.findScene(leaderboardScene).oScene;
        oLeaderboard.reset();
      }

      leaderboardCreated = true;
      mainTheme.stop();
      this.sceneManager.showScene(leaderboardScene);
    }

    else if(online){
      online = false;
      removeElements();
      clear();

      //If a game screen has been created before then reset it.
      //Creates a brand new instance of the game.
      if(onlineCreated){
          oMulti = this.sceneManager.findScene(onlineScene).oScene;
          oMulti.reset();
      }
      onlineCreated = true;

      mainTheme.stop();
      this.sceneManager.showScene(onlineScene);
    }
  }

  /**
   * Helper method that sets title and buttons for screen.
   */
  function setupStartUpScreen(){
    var title = createDiv("RUN SAMURAI, RUN!");
    setupText(title, 0.3, 1);
    setupButtons();
  }

  /**
   * Helper method that stores all the code to start up buttons.
   */
  function setupButtons(){
    //Buttons Setup
    singlePlayerButton = createButton("Single Player");
    buttonCSSSetup(singlePlayerButton, 0.5);
    singlePlayerButton.mousePressed(goToSinglePlayer);
    multiplayerButton = createButton("Multiplayer");
    buttonCSSSetup(multiplayerButton, 0.6);
    multiplayerButton.mousePressed(goToMultiplayer);
    onlineButton = createButton("Online Game");
    buttonCSSSetup(onlineButton, 0.7);
    onlineButton.mousePressed(goToOnline);
    leaderboardButton = createButton("Leaderboard")
    buttonCSSSetup(leaderboardButton, 0.8);
    leaderboardButton.mousePressed(goToLeaderboard);
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
    button.style("border", "none");
    button.style("border-radius", "9px");
    button.style("box-shadow", "0 8px #989898");
    button.style("display", "inline-block");
    button.style("font-family", "Arial");

    //NOT CSS
    //Center Button
    button.position(windowWidth - button.width >> 1, windowHeight * YpositionMultiple);
  }

  /**
   * CSS Styling for text
   * @param {*} givenDiv - given text to style.
   * @param {double} heightVariable - multiple of Y position to set up button at a desired height scaled with the display.
   * @param {double} opacity -Desired opacity of Text
   */
  function setupText(givenDiv, heightVariable, opacity){
    givenDiv.style("width", windowWidth + "px");
    givenDiv.style("margin", "0 auto");
    givenDiv.style("text-align", "center");
    givenDiv.style("position", 0, windowHeight * heightVariable);
    givenDiv.style("color", "white");
    givenDiv.style("font-family", "Arial");
    givenDiv.style("text-shadow", "0px 3px #989898")
    givenDiv.style("font-size", "320%");
    givenDiv.style("opacity", opacity);
  }

  /**
   * Lets the program know that the single player button has been clicked.
   */
  function goToSinglePlayer(){
    singlePlayer = true;
  }

  /**
   * Lets the program know that the multiplayer button has been clicked.
   */
  function goToMultiplayer(){
    multiplayer = true;
  }

   /**
   * Lets the program know that the leaderboard button has been clicked.
   */
  function goToLeaderboard(){
    leaderboard = true;
  }

   /**
   * Lets the program know that the online button has been clicked.
   */
  function goToOnline(){
    online = true;
  }
}
