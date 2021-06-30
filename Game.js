class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",(data)=>{
            gameState = data.val();
        });
    } 

    update(state){
        /*var gameStateRef = database.ref('gameState');
        gameStateRef.update({
            gameState:count
        });*/

        database.ref('/').update({
            gameState:state
        });
    }


    start(){
        if(gameState === 0){
            player = new Player();
            player.getCount();

            form = new Form();
            form.display();
        }
        car1 = createSprite(100,200);
        car1.addImage("car1", car1Image);
        car2 = createSprite(300,200);
        car2.addImage("car2", car2Image);
        car3 = createSprite(500,200);
        car3.addImage("car3", car3Image);
        car4 = createSprite(700,200);
        car4.addImage("car4", car4Image);
        cars = [car1,car2,car3,car4];
        passedFinish = false;
    }

    play(){
        form.hide_details();
        //textSize(30);
        //text("Game Starts", 120, 100);

        Player.getPlayerInfo();
        player.getFinishedPlayers();

        if(allPlayers !== undefined){
            background(rgb(198, 135, 103));
            image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
            //var yPos = 130;
            var x = 175;
            var y;
            var index = 0;
            for(var plr in allPlayers){
                index = index + 1;
                //x = x + 200;
                x = 200 + (index*200) + allPlayers[plr].xPos;
                y = displayHeight - allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;

                // Display Players' name
                textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);

                if(index === player.index){
                    //cars[index-1].shapeColor = "red";
                    stroke(10);
                    fill("red");
                    ellipse(x,y,60,60);
                    camera.position.x  = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                    if( cars[index - 1].isTouching(obstacles)){
                        carSound.play();
                        yVel -= 0.9;
                    }
                }
                //yPos = yPos + 20;
                //textSize(15);
                //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, yPos);
            }
        }

        if(keyIsDown(UP_ARROW) && player.index!=null){
            player.distance += 10;
                if(keyIsDown(37)){
                    yVel = 0.9;
                    xVel -=0.2;
                    if(player.xPos>60){
                       player.xPos += xVel;
                    }
                    player.distance += yVel;
                }else
                if(keyIsDown(39)){
                    yVel = 0.9;
                    xVel +=0.2
                    if(player.xPos<displayWidth - 60){
                        player.xPos += xVel;
                    }
                    player.distance += yVel;
                }
            player.update();
        }


        if(player.distance>3860 && passedFinish === false){
            //gameState = 2;
            finishedPlayers += 1;
            player.rank += finishedPlayers;
            Player.updateFinishedPlayers();
            passedFinish = true;
            player.update();
        }

        
  
        drawSprites();
    }


    displayRanks(){
        //display the medals
        background("black");
        camera.position.y = 0;
        camera.position.x = 0;
    
        imageMode(CENTER);
    
        Player.getPlayerInfo();
    
        image(bronze_img, displayWidth/-4, -100 + displayHeight/9, 200, 240);
        image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270);
        image(gold_img, 0, -100, 250, 300);
    
        textAlign(CENTER);
        textSize(50);
        for(var plr in allPlayers){
            if(allPlayers[plr].rank === 1){
                text("1st: " + allPlayers[plr].name, 0, 85);
            }else if(allPlayers[plr].rank === 2){
                text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
            }else if(allPlayers[plr].rank === 3){
                text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
            }else{
                textSize(30);
                text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
            }
        }
    }
}