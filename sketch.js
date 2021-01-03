var sword;
var swordImage;
var PLAY=1,END=0,gameState=1,score=0;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup,enemiesGroup,gameoverImg;
var enemies1
var sound_fruit,sound_gameOver;
var position;
var position;

function preload(){
  //load image to swordImage
  swordImage=loadImage("sword.png");
  fruit1=loadImage("fruit1.png");
   fruit2=loadImage("fruit2.png");
   fruit3=loadImage("fruit3.png");
   fruit4=loadImage("fruit4.png");
  enemies1= loadImage("alien1.png");
  gameoverImg=loadImage("gameover.png");
  sound_fruit=loadSound("knifeSwooshSound.mp3")
sound_gameOver=loadSound("gameover.mp3")

}
function setup(){
  createCanvas(400,400);
  //creating swordsprite
  sword=createSprite(200,200,10,10);
  //adding image to sprite
  sword.addImage(swordImage);
  //to make sword smaller--->to add scale
  sword.scale=0.75;
  fruitGroup=new Group();
  enemiesGroup=new Group();
  
  
}

function draw(){
  //adding background color
  background("lightgreen");
  text("YOUR POINTS ARE: " + score, 250,50);
  
  if(gameState==PLAY){
    //call functions of fruits and enemies
    fruits();
    enemies();
  //swords movements follow mouse movements
  
  sword.x=mouseX;
  sword.y=mouseY;
  
  //score increment if fruit is touched by sword
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    sound_fruit.play()
    score=score+2;
  }
  else{ if(enemiesGroup.isTouching(sword)){
    //gamestate changed to end state
    gameState=END;
    //destroying all fruit and enemy groups
    fruitGroup.destroyEach();
    enemiesGroup.destroyEach();
    sound_gameOver.play();
    //setting velocityX to 0 for fruits and enemies when gameState is ended
    fruitGroup.setVelocityXEach(0);
    enemiesGroup.setVelocityXEach(0);
    //gameover image to sword
    sword.addImage(gameoverImg);
    //setting sword position to centre of canvas
    sword.x=200;
    sword.y=200;
    
  }
  }}
  //to display the sprites
  drawSprites();

}
//creating function fruits
function fruits(){
  
  if(frameCount%80==0){position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.25;
    if (position==1){
      //for moving right to left 
    fruit.velocityX=-(7+score/4);
    }
  else if (position==2){
    fruit.x =0;
    fruit.velocityX = (7+score/4);
    
    fruit.y=Math.round(random(50,420));
    
    fruit.lifetime = 100;
    
   
    
  }
    
    //to set different fruit images randomly
    var r =Math.round(random(1,4));
    switch(r){
        
      case 1:fruit.addImage(fruit1);
             break;
             case 2: fruit.addImage(fruit2);
          break;
          case 3: fruit.addImage(fruit3);
        break;
        case 4:fruit.addImage(fruit4);
        break;
        default: break;
    }
    //positioning of fruit
    fruit.y=Math.round(random(10,360));
    //giving lifetime to sprite to avoid memory leak
    fruit.setlifeTime=30;
    //adding fruits to group
    fruitGroup.add(fruit);
  }
  
}
function enemies(){
  //as we dont want enemies to come as fast as fruits
   if(frameCount%200==0){
    var enemies=createSprite(400,200,20,20);
    enemies.scale=0.5;
    enemies.velocityX=-4;
    enemies.y=Math.round(random(10,390));
     //adding image to enemies which is loaded in preload
      enemies.addImage(enemies1);
   enemies.setlifeTime=50;
   enemiesGroup.add(enemies);
   }
  
  
}
