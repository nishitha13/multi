class Form{
     constructor(){
          this.title = createElement('h2');
          this.input = createInput("").attribute("placeholder", "Name");
          this.button = createButton("Play");
          this.greeting = createElement('h2');
          this.reset = createButton('Reset');
     }
 
     hide_details(){
          this.title.hide();
          this.input.hide();
          this.button.hide();
          this.greeting.hide();
     }
 
     display(){
          this.title.html("Car Racing Game");
          this.title.position(displayWidth/2-50, 0);
 
          this.input.position(displayWidth/2 - 40, displayHeight/2 -80);
          this.button.position(displayWidth/2 + 30, displayHeight/2);
          this.reset.position(displayWidth-100,2);
 
          this.button.mousePressed(()=>{
                this.input.hide();
                this.button.hide();
 
                player.name = this.input.value();
                playerCount++;
                player.index = playerCount;
                
                player.update();
                player.updateCount(playerCount);
 
                this.greeting.html("Hello " + player.name) ;
                this.greeting.position(displayWidth/2-70, displayHeight/4);
 
          });

          this.reset.mousePressed(()=>{
               player.updateCount(0);
               game.update(0);
               finishedPlayers = 0;
               Player.updateFinishedPlayers();
               var playersRef  = database.ref('players');
               playersRef.remove();
          });


     }
     
 }