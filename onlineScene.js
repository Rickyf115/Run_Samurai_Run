/**
 * Online mode Scene
 */
function onlineScene(){
    
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
      var socket = io.connect('http://proj-309-sb-b-3.cs.iastate.edu:3000/');
      var randomIndex;
      var randomPositions;
      var seed;
      var findingGame;
      var counter;

        /**
         * Sets up variables and display for game screen.
         */
        this.setup = function(){
          frameRate(60);
          seed = 1000;
          randomPositions = [];
          randomIndex = 0;
          setupRandomList();
          createCanvas(windowWidth, windowHeight);
          samurai = new Samurai();
          samurai2 = new Samurai();
          ninjas = [];
          score = 0;
          score2 = 0;
          goal = 5;
          counter = 0;
          winner = "";
          firstRun = true;
          bg = bg1;
          findingGame = true;
    
          socket.on('mouse', moveSamurai2);
          socket.on('score', score2set);
          socket.on('connectedto', connectionSet);
        }
        
        /**
         * Once connection is set this function will run and denote a game has been found.
         */
        function connectionSet(){
          console.log("Established Connection");
          findingGame = false;
          gameTheme.loop();
        } 
        
        /**
         * 
         * @param {*} data 
         */
        function score2set(data){
          console.log(data);
          score2 = data;
        }
    
        /**
         * Based on what key is pressed decides which direction to move samurai.
         * @param {*} keyCode - Code which denotes which key is pressed.
         */
        function moveSamurai2(keyCode){
            console.log(keyCode);
    
            if(keyCode == RIGHT_ARROW){ // Key 'D'
                samurai2.switchLanes("right");
            }
            else if(keyCode == LEFT_ARROW){ // Key 'A'
                samurai2.switchLanes("left");
            }
            else if(keyCode == UP_ARROW){ // Key 'W'
                samurai2.attack();
            }
        }
     
    /** 
     * Reset this screen on calls from other functions
     */
      this.reset = function(){
        this.setup();
      }
    
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
        if(findingGame){
          background(0);
          textAlign(CENTER,CENTER);
          textSize(25);
          text("Finding Game...", windowWidth/2, windowHeight/2);
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
        text("Score: " + score2, windowWidth/7, windowHeight * .05)
    
        //Watch for framerate
        var fps = frameRate();
        stroke(0);
        text("FPS:" + fps.toFixed(2), windowWidth / 2, height - 20);
    
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
           // socket.emit('score', score);
            if(score == goal || score2 == goal){
              clear();
              removeElements();
    
              if(gameOverCreated){
                var oOver = this.sceneManager.findScene(gameOverOnline).oScene;
                oOver.reset();
              }
    
              gameOverCreated = true;
              this.sceneManager.showScene(gameOverOnline);
            }
            ninjas.splice(i, 1);
          }
        }
    
        //Spawn new enemies every 120 frames.
        
        if(counter % 90 == 0){
          ninjas.push(new ninja(false, randomPositions[randomIndex]));
          randomIndex++;
        }
    
        counter++;
        
      }
      
      /**
       * Based on what key is pressed decides which direction to move samurai.
       */
      this.keyPressed = function(){
    
          socket.emit('mouse', keyCode);
    
          if(keyCode == RIGHT_ARROW){
          samurai.switchLanes("right");
        }
        else if(keyCode == LEFT_ARROW){
          samurai.switchLanes("left");
        }
        else if(keyCode == UP_ARROW){
          samurai.attack();
        }
        return false;
      }
      
      /**
       * Sets up a seeded list of random enemy positions so multiplayer is matched up between both players.
       */
      function setupRandomList(){
        for(var i = 0; i < 1000; i++){
          randomPositions[i] = getRandomInt(0, 2);
          console.log(randomPositions[i]);
        }
      }
      
      /**
       * Random number generator.
       * @param {int} min - Minimum value of random values expected.
       * @param {int} max - Maximum value of random values expected.
       */
      function getRandomInt(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
    
        if(seed != 0){
          seed = (seed * 9301 + 49297) % 233280; //Generic Seed Math formula
          var random = seed / 233280.0;
          
          return Math.floor(random * (max - min + 1)) + min;
        }
          
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
    