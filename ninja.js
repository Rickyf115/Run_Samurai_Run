/** 
*Enemies
*/
function ninja(spawnNewEnemies, ninjaPosition){
  var ninj;
  
  //Hashmap for spots X spots to spawn enemies
  var dict = {};
  dict[0] = (windowWidth / 2) * 0.46;
  dict[1] =(windowWidth / 2) * 1.54;
  dict[2] = windowWidth / 2;

  var spin = 0;
  
  var ninjaTypeRNG = 0;

  if(spawnNewEnemies){
    ninjaTypeRNG = getRandomInt(0, 1);
  }

  this.x = dict[ninjaPosition];
  this.y = -100;
  this.size = windowWidth * 0.07
  this.velocity = 5;
  this.pushed = false;

  if(ninjaTypeRNG == 1){
    this.health = 2;
  }
  else if(ninjaTypeRNG == 0){this.health = 1;}

  this.show = function(){
    if(ninjaTypeRNG == 0 || this.getHealth() == 1){
      this.constantCharacter();
    }

    else if(ninjaTypeRNG == 1){
      if(spin % 10 == 0 || spin % 10 == 1 || spin % 10 == 2 || spin % 10 == 3 || spin % 10 == 4){
              fill('white');
              beginShape();
              vertex(this.x,this.y + 25);
              vertex(this.x + 5,this.y + 8);
              vertex(this.x + 25,this.y);
              vertex(this.x + 5,this.y - 8);
              vertex(this.x,this.y - 25);
              vertex(this.x - 5,this.y - 8);
              vertex(this.x - 25,this.y);
              vertex(this.x - 5,this.y + 8);
              vertex(this.x,this.y + 25);
              endShape();
              fill('black');
              ellipse(this.x,this.y,this.size*.30,this.size*.30);
              spin++;
            }
            else{
              fill('white');
              beginShape();
              vertex(this.x - 20,this.y + 20);
              vertex(this.x,this.y + 8);
              vertex(this.x + 20,this.y + 20);
              vertex(this.x + 8,this.y);
              vertex(this.x + 20,this.y - 20);
              vertex(this.x,this.y - 8);
              vertex(this.x - 20,this.y - 20);
              vertex(this.x - 8,this.y);
              vertex(this.x - 20, this.y + 20);
              endShape();
              fill('black');
              ellipse(this.x,this.y,this.size*.30,this.size*.30);
              spin++;
            }
    }
  }

  this.update = function(){
    this.y += this.velocity;

    if(this.velocity < 0 && this.y <= windowHeight * 0.4){
      this.pushed = false;
      this.velocity = 5;
    }
  }

  this.offscreen = function(){
    return this.y > windowHeight;
  }

  this.collision = function(player){
    if(player.x < (this.x + this.size) && player.x > (this.x - this.size)){
      if(player.y < (this.y + this.size) && player.y > (this.y - this.size)){
        return true;
      }
    }
  }

  this.pushBack = function(){
    this.velocity = -6;
    this.pushed = true;
  }

  this.loseHealth = function(){
    this.health--;
  }

  this.getHealth = function(){
    return this.health;
  }

  this.isPushed = function(){
    return this.pushed;
  }

  this.constantCharacter = function(){
    if(spin % 10 == 0 || spin % 10 == 1 || spin % 10 == 2 || spin % 10 == 3 || spin % 10 == 4){
            fill('black');
            beginShape();
            vertex(this.x,this.y + 25);
            vertex(this.x + 5,this.y + 8);
            vertex(this.x + 25,this.y);
            vertex(this.x + 5,this.y - 8);
            vertex(this.x,this.y - 25);
            vertex(this.x - 5,this.y - 8);
            vertex(this.x - 25,this.y);
            vertex(this.x - 5,this.y + 8);
            vertex(this.x,this.y + 25);
            endShape();
            fill('white');
            ellipse(this.x,this.y,this.size*.30,this.size*.30);
            spin++;
          }
          else{
            fill('black');
            beginShape();
            vertex(this.x - 20,this.y + 20);
            vertex(this.x,this.y + 8);
            vertex(this.x + 20,this.y + 20);
            vertex(this.x + 8,this.y);
            vertex(this.x + 20,this.y - 20);
            vertex(this.x,this.y - 8);
            vertex(this.x - 20,this.y - 20);
            vertex(this.x - 8,this.y);
            vertex(this.x - 20, this.y + 20);
            endShape();
            fill('white');
            ellipse(this.x,this.y,this.size*.30,this.size*.30);
            spin++;
          }
  }

  function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
