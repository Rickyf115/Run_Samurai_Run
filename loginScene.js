/**
 * Login Screen 
 */
function loginScene(){
  var submitted = false;
  var newSamurai = false;
  var goToGame = false;

  /** 
   *Generate game login screen (sets background and buttons).
   */
  this.setup = function(){
    document.body.style.backgroundImage = this.sceneManager.backgroundImage;
    document.body.style.backgroundSize = "100% 100%";
    var name = createDiv("Username");
    setupText(name, 0.35);

    userName = createInput();
    userName.size(windowWidth * 0.8, windowHeight * 0.05);
    userName.position(windowWidth * 0.1, windowHeight * 0.42);
    userName.style("text-align", "center");
    userName.style('font-size', '200%');
    userName.style("font-family", "Arial");

    var pass = createDiv("Password");
    setupText(pass, 0.48)
    password = createInput("", "password");
    password.size(windowWidth * 0.8, windowHeight * 0.05);
    password.position(windowWidth * 0.1, windowHeight * 0.55);
    password.style("text-align", "center");
    password.style('font-size', '200%');
    password.style("font-family", "Arial");

    submit = createButton('Submit');
    submit.position(CENTER, windowHeight * 0.65);
    submit.mousePressed(goToMainMenu);
    buttonCSSSetup(submit);

    var reg = createDiv("Not a Samurai?");
    setupText(reg, 0.85);
    reg.style("font-size", "200%");
    reg.style("text-shadow", "0px 2px #989898");
    register = createButton("Register Now!");
    register.position(CENTER, windowHeight * 0.9);
    register.mousePressed(goToRegister);
    buttonCSSSetup(register);
    loginTheme.loop();
    }
  
  /**
   * Loop function which draw display.
   * Removes Elements from scene when user passes login Scene.
   */
  this.draw = function(){
    if(goToGame){
      removeElements();
      clear();
      this.sceneManager.showScene(startScreen);
      loginTheme.stop();
    }
  }

  //Feature: You can enter to login. =)
  this.keyPressed = function(){
    if(keyCode == 13){
      login();
      loginTheme.stop();
    }
  }

  /**
   * When mouse is pressed decide what action to perform depending on what part of the screen was clicked.
   */
  this.mousePressed = function(){
    if(submitted){
      login();
    }
    else if(newSamurai){
      removeElements();
      clear();
      newSamurai = false;
      this.sceneManager.showScene(registerScene);
    }
  }

  /**
   * Checks user information with the SQL database to make sure information matches and log player into game.
   */
  function login(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://proj-309-sb-b-3.cs.iastate.edu/dologin.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    var someStuff='userName='+userName.value()+'&userPass='+sha256(password.value());
    xhr.send(someStuff);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if(xhr.responseText.trim() == "true"){
          goToGame = true;
        }
        else{
          submitted = false;
        }
      }
    }
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
    givenDiv.style("font-size", "275%");
  }

  /**
   * Lets the program know that the submit button has been clicked.
   */
  function goToMainMenu(){
    submitted = true;
  }

  /**
   * Lets the program know that the register button has been clicked.
   */
  function goToRegister(){
    newSamurai = true;
  }
}
