var backgroundImage;
// var offsetX = 0;
var bg, bg1, bg2, bg3, bg4, bg5, bg6;
var winnerSound, loserSound, sliceSound, mainTheme, loginTheme, gameTheme;
var littleSams;
var loadingImages = true;
var loadingSounds = true;
var songCount = 0;
var imageCount = 0;
var sceneManager;

/**
 * Preloads all images and sounds to be used for the game so it is all ready to be used on call.
 */
function preload(){
  //Load Images
  bg1 = loadImage("Textures/GameScreen.jpg");
  bg2 = loadImage("Textures/GameScreen2.jpg");
  bg3 = loadImage("Textures/GameScreen3.jpg");
  bg4 = loadImage("Textures/GameScreen4.jpg");
  bg5 = loadImage("Textures/GameScreen5.jpg");
  bg6 = loadImage("Textures/GameScreen6.jpg");

  //Background sounds
  winnerSound = loadSound('Sounds/winner.mp3');
  loserSound = loadSound('Sounds/loser.mp3');
  sliceSound = loadSound('Sounds/slice.mp3');
  mainTheme = loadSound('Sounds/mainTheme.mp3');
  loginTheme = loadSound('Sounds/login.mp3');
  gameTheme = loadSound('Sounds/gameTheme.mp3');
}

/**
 * Sets up main background image for the game.
 */
function setBackgroundImage(){
  backgroundImage = "url('./Textures/StartScreenBackground2.jpeg')";
  document.body.style.backgroundSize = "100% 100%";
}

/**
 * Sets up scene manager for game and takes us to the loginScene.
 */
function setup(){
  createCanvas(windowWidth, windowHeight);
  setBackgroundImage();

  var sceneManager = new SceneManager();
  sceneManager.backgroundImage = backgroundImage;
  sceneManager.wire();
  sceneManager.showScene(startScreen);
}

/*

function setup(){
  loadImages(bg1,"Textures/GameScreen.jpg")
  loadImages(bg2,"Textures/GameScreen2.jpg")

  loadSongs(winnerSound,'Sounds/winner.mp3')
  loadSongs(loserSound,'Sounds/loser.mp3')
  loadSongs(sliceSound,'Sounds/slice.mp3')
  loadSongs(mainTheme,'Sounds/mainTheme.mp3')
  loadSongs(loginTheme,'Sounds/login.mp3')
  loadSongs(gameTheme,'Sounds/gameTheme.mp3')

  createCanvas(windowWidth, windowHeight);
  littleSams = []
}

//Loading Screen
function draw(){
  //While images and sounds load, show animation.
  if(loadingImages || loadingSounds){
    background(192, 7, 23);
    for(var i = littleSams.length - 1; i >= 0; i--){
      littleSams[i].show();
      littleSams[i].update();
      if(littleSams[i].offscreen()){
        littleSams.splice(i,1);
      }
    }

    if(frameCount % 20 == 0){
      littleSams.push(new ninja(1));
    }

    if(songCount == 6){
      loadingSounds = false;
    }

    if(imageCount == 2){
      loadingImages = false;
    }

  }

  //Once everything is loaded wire over to next scene.
  else{
    setBackgroundImage();
    sceneManager = new SceneManager();
    sceneManager.backgroundImage = backgroundImage;
    clear();
    removeElements();
    sceneManager.wire();
    sceneManager.showScene(loginScene);
  }
}

function loadSongs(song, fileName){
  loadSound(fileName, loadedSong);
  function loadedSong(soundLoaded){
    song = soundLoaded
    songCount++;
  }
}

function loadImages(image, fileName){
  loadImage(fileName, loadedImage);
  function loadedImage(imageLoaded){
    image = imageLoaded
    imageCount++;
  }
}
*/
