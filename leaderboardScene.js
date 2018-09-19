/**
 * Leaderboard Screen
 */
function leaderboardScene(){

  var exit = false;
  var jString;

  var json;

  /** 
   * Set up variables and get scores from sever as well as drawing menu.
   */
  this.setup = function(){
    start = this.sceneManager.findScene(startScreen).oScene;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://proj-309-sb-b-3.cs.iastate.edu/leader.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    var someStuff='userName='+userName.value()+'&userPass='+sha256(password.value());
    xhr.send(someStuff);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        jString = xhr.responseText.trim();
        json = JSON.parse(jString);
        sortJSON();
        drawMenu();
      }
    }
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
    console.log(json[0].user_name);

    if(exit){
      exit = false;
      removeElements();
      clear();
      start.reset();
      this.sceneManager.showScene(startScreen);
    }
  }

  /**
   * Helper method that draws buttons and player names on leaderboard.
   */
  function drawMenu(){
    background(50);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(225);
    text("TOP 10 Players", width / 2, height * 0.02);

    //Buttons Setup
    exitButton = createButton("X");
    buttonCSSSetup(exitButton, 0.6);
    exitButton.mousePressed(goToMainMenu);

    for(i = 0; i < 10; i++){
      if(i == getJSONSize()){
        break;
      }

      textSize(windowWidth * windowHeight * 0.00008);
      fill(255);
      textAlign(CENTER);
      text(i+1, width * 0.06, height * ((i+1) * 0.08))
      textAlign(LEFT);
      text(json[i].userName, width * 0.14, height * ((i + 1) * 0.08));
      textAlign(RIGHT);
      fill(255, 0, 0);
      text(json[i].score, width * 0.90, height * ((i + 1) * 0.08))
    }

    for(i = 0; i < getJSONSize(); i++){
      if(json[i].userName == userName.value()){
        fill(255);
        textAlign(CENTER);
        text(i+1, width * 0.06, height * 0.93);
        textAlign(LEFT);
        text(json[i].userName, width * 0.14, height * (0.93));
        fill(255,0,0);
        textAlign(RIGHT);
        text(json[i].score, width * 0.90, height * (0.93));
      }
    }
  }

  /**
   * CSS Styling for buttons
   * @param {*} button - what button to set up.
   * @param {double} YpositionMultiple - multiple of Y position to set up button at a desired height scaled with the display.
    */
  function buttonCSSSetup(button, YpositionMultiple){
    button.style("width", "35px");
    button.style("height", "35px");
    button.style("text-align", "center");
    button.style("font-size", "150%");
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
   * Let the program know that the exit button has been clicked.
   */
  function goToMainMenu(){
      exit = true;
  }

  /**
   * Gets size of player score JSON File passed from Database.
   */
  function getJSONSize(){
    return Object.keys(json).length;
  }

  /**
   * Sorts JSON by player score before it is displayed.
   */
  function sortJSON(){
    for(i = 0; i < getJSONSize() - 1; i++){
      for(j = i + 1; j < getJSONSize(); j++){
        if(parseInt(json[i].score) < parseInt(json[j].score)){
          swap(j, i);
        }
      }
    }
  }

  /**
   * Swap helper method for sorting
   * @param {*} i - Object 1 to be swapped
   * @param {*} j - Object 2 to be swapped
   */
  function swap(i, j){
    temp = json[i];
    json[i] = json[j];
    json[j] = temp;
  }
}
