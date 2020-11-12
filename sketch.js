var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey ,monkey_running ;
var banana , bananaImg, food, foodGroup ;
var obstacleImg, obstacle, stone, obstaclesGroup;
var survivalTime = 0;

function preload(){
  
  //loading animation for monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  //loading image for food
  bananaImg = loadImage("banana.png");
  
  //loading image for obstacles
  obstacleImg = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,500);
  
  //creating sprite for monkey 
  monkey = createSprite(80,335,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  //creating a sprite for ground
  ground = createSprite(400,420,1000,10);
  ground.x = ground.width/2;
  //ground.visible = false;
  
  foodGroup = createGroup();
  obstaclesGroup = createGroup();

  survivalTime = 0;
  
}

function draw() {
   
  background(220);
 
  textSize(20);
  text("SurvivalTime:"+survivalTime, 110, 100);
  
  if(gameState === PLAY){
  survivalTime = Math.ceil(frameCount/frameRate()); 

  //jumping the monkey with space key
  if(keyDown("space")&& monkey.y>200 ){
    monkey.velocityY = -12;
  }
  
  //calling food and stone
  food();
  stone();
  
  //adding gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //making monkey collide with the ground
  monkey.collide(ground);
  
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
  } else if (gameState === END){
    monkey.velocityY = 0;
    
    monkey.visible = false;
    ground.velocityX = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  } 
  
   drawSprites();
}

function food (){
  if(frameCount % 80 ===0){
    banana = createSprite(300,Math.round(random(180,250)),40,10);
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 150;
    
    //adding bananas in food group
    foodGroup.add(banana);
  }
}

function stone (){
  if(frameCount % 300 === 0){
    obstacle = createSprite(300,380,20,20);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacle.lifetime = 110;
    
    //adding obstacles in obstacles group
    obstaclesGroup.add(obstacle);
  }
}


