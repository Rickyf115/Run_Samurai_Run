/**
 * Registration Scene
 */
function registerScene(){
  var submitted = false;
  var exit = false;

   /** 
   * Generate game register screen (sets background and buttons).
   */
  this.setup = function(){
    document.body.style.backgroundImage = this.sceneManager.backgroundImage;
    document.body.style.backgroundSize = "100% 100%";

    drawMenu();

    var user = createDiv("Username");
    setupText(user, 0.36);

    userName = createInput();
    userName.size(windowWidth * 0.8, windowHeight * 0.05);
    userName.position(windowWidth * 0.1, windowHeight * 0.42);
    userName.style("text-align", "center");
    userName.style("font-family", "Arial")
    userName.style('font-size', '200%');

    var mail = createDiv("Email");
    setupText(mail, 0.49);

    email = createInput();
    email.size(windowWidth * 0.8, windowHeight * 0.05);
    email.position(windowWidth * 0.1, windowHeight * 0.55);
    email.style("text-align", "center");
    email.style("font-family", "Arial")
    email.style('font-size', '200%');

    var pass = createDiv("Password");
    setupText(pass, 0.62);

    password = createInput("", "password");
    password.size(windowWidth * 0.8, windowHeight * 0.05);
    password.position(windowWidth * 0.1, windowHeight * 0.68);
    password.style("text-align", "center");
    password.style("font-family", "Arial")
    password.style('font-size', '200%');

    submit = createButton('Submit');
    submit.position(windowWidth * 0.42, windowHeight * 0.77);
    submit.mousePressed(goToMainMenu);
    buttonCSSSetup(submit);
  }

  /**
   * When mouse is pressed decide what action to perform depending on what part of the screen was clicked.
   * Send user information to SQL Database.
   */
  this.mousePressed = function(){
    if(submitted){
      removeElements();
      clear();
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://proj-309-sb-b-3.cs.iastate.edu/doregister.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      var someStuff='userName='+userName.value()+'&email='+email.value()+'&userPass='+sha256(password.value());
      xhr.send(someStuff);

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
        }
      }
      this.sceneManager.showScene(setup);
    }

    if(exit){
      exit = false;
      removeElements();
      clear();
      start.reset();
      this.sceneManager.showScene(loginScene);
    }
  }

  /**
   * Helper method for drawing buttons and text ontro screen.
   */
  function drawMenu(){
    //Buttons Setup
    exitButton = createButton("X");
    exitButtonCSSSetup(exitButton, 0.6);
    exitButton.mousePressed(goToMainMenu);
  }

 /**
   * CSS Styling for buttons
   * @param {*} button - what button to set up.
   * @param {double} YpositionMultiple - multiple of Y position to set up button at a desired height scaled with the display.
    */
  function buttonCSSSetup(button, YpositionMultiple){
    //CSS
    button.style("text-align", "center");
    button.style("font-size", "150%");
    button.style("color", "#000");
    button.style("background", "white");
    button.style("display", "inline-block");
    button.style("font-family", "Arial");
    button.style("border", "none");
    button.style("border-radius", "9px");
    button.style("box-shadow", "0 6px #989898");

    //NOT CSS
  }

 /**
   * CSS Styling for exit button
   * @param {*} button - what button to set up.
   * @param {double} YpositionMultiple - multiple of Y position to set up button at a desired height scaled with the display.
    */
  function exitButtonCSSSetup(button, YpositionMultiple){
    button.style("width", "35px");
    button.style("height", "35px");
    button.style("text-align", "center");
    button.style("font-size", "150%");
    button.style("font-weight", "bold")
    button.style("color", "#FFF");
    button.style("background", "#C30000");
    button.style("border-radius", "4px");
    button.style("display", "inline-block");
    button.style("border", "none");
    button.style("outline", "none");

    //NOT CSS
    //Center Button
    button.position(windowWidth  >> 6, windowHeight/100);
  }

   /**
   * CSS Styling for text
   * @param {*} givenDiv - given text to style.
   * @param {double} heightVariable - multiple of Y position to set up button at a desired height scaled with the display.
   */
  function setupText(givenDiv, heightVariable){
    givenDiv.style("width", windowWidth + "px");
    givenDiv.style("margin", "0 auto");
    givenDiv.style("text-align", "center");
    givenDiv.style("position", 0, windowHeight * heightVariable);
    givenDiv.style("color", "white");
    givenDiv.style("font-family", "Arial");
    givenDiv.style("text-shadow", "0px 3px #989898")
    givenDiv.style("font-size", "250%");
  }

   /**
   * Lets the program know that the submit button has been clicked.
   */
  function goToMainMenu(){
    submitted = true;
    exit = true;
  }
}
