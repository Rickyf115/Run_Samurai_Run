/**
 * Character which user takes control of for gameplay.
 */
function Samurai(){
  this.x = windowWidth / 2;
  this.y = windowHeight * 0.85;
  this.velocityX = 0;
  this.velocityY = 0;
  this.attacking = false;
  this.alreadyScored = false;
  this.hit = false;
  var previousX = windowWidth / 2;
  var leftTranslation = (windowWidth / 2) * 0.48;
  var rightTranslation = (windowWidth / 2) * 1.52;
  var upTranslation = (windowHeight / 2) * 1.5;
  this.size = windowWidth * 0.15;
  this.animation = false;

  /**
   * Displays Samurai on screen with desired shapes/sprites in the desired XY positions with given sizes.
   */
  this.show = function(){
    //Feet
    if(this.animation){
      fill(50);
      ellipse(this.x - this.size/4, this.y - this.size/3, this.size/4, this.size/4);
    }
    else{
      fill(50);
      ellipse(this.x + this.size/4, this.y - this.size/3, this.size/4, this.size/4);
    }

    this.constantCharacter();
  }

  /**
   * Animates character to make him/her look like he/she is moving.
   */
  this.animate = function(){
    this.animation = !this.animation;
  }

  /**
   * White Samurai design in mutliplayer and player model for single player.
   */
  this.constantCharacter = function(){
    if(!this.attacking){
      //sword
      fill("brown");
      rect(this.x + windowWidth * .1, this.y +(windowHeight * .01) * 2, windowWidth * .02, windowHeight * .01);
      fill("brown");
      rect(this.x + windowWidth * .105, this.y +(windowHeight * .01), windowWidth * .01, windowHeight * .01);
      fill("brown");
      rect(this.x + windowWidth * .105, this.y, windowWidth * .01, windowHeight * .01);
      fill("brown");
      rect(this.x + windowWidth * .105, this.y - (windowHeight * .01), windowWidth * .01, windowHeight * .01);
      fill("brown");
      rect(this.x + windowWidth * .09, this.y - ((windowHeight * .01) * 2), windowWidth * .04, windowHeight * .01);
      fill("grey");
      rect(this.x + windowWidth * .097, this.y - ((windowHeight * .01) * 12), windowWidth * .027, windowHeight * .1);
      //arm
      fill("grey");
      rect(this.x, this.y, windowWidth * .12, windowHeight*.01);
    }
    else{
      //sword
      fill("brown");
      rect(this.x + windowWidth * .087  , this.y -((windowHeight * .01) * 8)      , windowHeight * .01    , windowWidth * .02);
      fill("brown");
      rect(this.x + windowWidth * .07, this.y -((windowHeight * .01) * 7.7) , windowHeight * .01    ,windowWidth * .01);
      fill("brown");
      rect(this.x + windowWidth * .054, this.y - ((windowHeight * .01) * 7.7) , windowHeight * .01    , windowWidth * .01);
      fill("brown");
      rect(this.x + windowWidth * .034, this.y - ((windowHeight * .01) * 7.7) , windowHeight * .01    , windowWidth * .01);
      fill("brown");
      rect(this.x + windowWidth * .015 , this.y - ((windowHeight * .01) * 8.5) , windowHeight * .01    , windowWidth * .04);
      fill("grey");
      rect(this.x - windowWidth * .147, this.y - ((windowHeight * .01) * 8.1), windowHeight * .1     , windowWidth * .027);

      //arm
      fill("grey");
      rect(this.x + windowWidth * .055, this.y - ((windowHeight * .01) * 8), windowHeight*.01, windowWidth * .12);
    }
    //hat
    fill("white");
    ellipse(this.x, this.y, this.size, this.size);
    fill("grey");
    ellipse(this.x, this.y, windowWidth * 0.08, windowWidth * 0.08);
    fill("white");
    ellipse(this.x, this.y, windowWidth * 0.06, windowWidth * 0.06);
    fill("grey");
    ellipse(this.x, this.y, windowWidth * 0.04, windowWidth * 0.04);
    fill("white");
    ellipse(this.x, this.y, windowWidth * 0.02, windowWidth * 0.02);
  }

  /**
   * Black Samurai design in multiplayer
   */
  this.constantCharacter2 = function(){
    //hat
    fill("black");
    ellipse(this.x, this.y, this.size, this.size);
    fill("grey");
    ellipse(this.x, this.y, windowWidth * 0.08, windowWidth * 0.08);
    fill("black");
    ellipse(this.x, this.y, windowWidth * 0.06, windowWidth * 0.06);
    fill("grey");
    ellipse(this.x, this.y, windowWidth * 0.04, windowWidth * 0.04);
    fill("black");
    ellipse(this.x, this.y, windowWidth * 0.02, windowWidth * 0.02);
  }

  /**
   * Updates Samurai velocity based on where in the screen he/she is located and what the user is clicking.
   */
  this.update = function(){

    //Update Players position based on gestures.
    this.x += this.velocityX;
    this.y += this.velocityY;

    //IF Left Right or Middle lane have been reached, stop updating
    //the character's position.
    //Dont allow for both directions to be pressed
    if(this.x >= rightTranslation
    || this.x <= leftTranslation
    || (this.x == windowWidth / 2 && (previousX != windowWidth / 2))){
      this.velocityX = 0;
    }

    if(this.y <= upTranslation){
      this.attacking = false;
      this.velocityY = 15;
    }

    else if(this.y == windowHeight * 0.85){
      this.velocityY = 0;
    }

  }

  /**
   * Indicates whether Samurai's velocity should be towards left or right of the screen (MOVEMENT).
   * Switches Samurai between the three lanes.
   * @param {String} leftOrRight - Move left or right?
   */
  this.switchLanes = function(leftOrRight){
    if(leftOrRight == "right"){
      if(!(this.x >= rightTranslation)){
        this.velocityX = 12;
      }
    }
    if(leftOrRight == "left"){
      if(!(this.x <= leftTranslation)){
        this.velocityX = -12;
      }
    }
    previousX = this.x;
  }

  /**
   * Sets velocity of samurai towards the negative Y direction to denote an attacking animation, and changes samurai state to attacking.
   */
  this.attack = function(){
    this.attacking = true;

    if(!(this.y <= upTranslation)){
      this.velocityY = -15;
    }
  }
}
