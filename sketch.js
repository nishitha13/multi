var database;

var gameState = 0;

var form, player, game;

var playerCount = 0;

var allPlayers;

var distance = 0;

var car1, car2, car3, car4, cars;
var track,car1Image,car2Image,car3Image,car4Image;
var xVel, yVel;

var finishedPlayers=0, obstacles, obstacle, obstacleImage;
var carSound, i;
var passedFinish;
var bronze_img;
var silver_img;
var gold_img;


function preload(){
    track = loadImage("track.jpg");
    car1Image = loadImage("car1.png");
    car2Image = loadImage("car2.png");
    car3Image = loadImage("car3.png");
    car4Image = loadImage("car4.png");

    obstacleImage = loadImage("f1.png");
    ground = loadImage("ground.png");
    bronze_img = loadImage("bronze.png");
    silver_img = loadImage("silver.png");
    gold_img = loadImage("gold.png");
    carSound=loadSound("sliding.mp3")
}

function setup(){
    database = firebase.database();

    createCanvas(displayWidth-20,displayHeight-30); 
    
    xVel = 0;
    yVel = 0;
    
    game  = new Game();
    game.getState();
    game.start();

    obstacles = createGroup();
    
    //PLACING OBSTACLES AT RANDOM POSITIONS
    for(i=0;i<5;i++)
    {
        w=random(200,950);
        h=random(-height*4,height-300);
        obstacle = createSprite(w,h,10,10);
        obstacle.addImage("obstacle",obstacleImage);
        obstacles.add(obstacle);
    }
}

function draw(){
    //background("white");
    if(playerCount === 4 && finishedPlayers === 0){
        game.update(1);
    }

   
    if(gameState===1 && passedFinish === false){
        clear();
        game.play();
    }

    //end the game
    if (finishedPlayers === 4) {
        game.update(2);
        //gameState = 2;
    }

    if(gameState===2 && finishedPlayers === 4){
        
        //game.end();
        game.displayRanks();
    }
}
