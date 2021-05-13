
var bgImg;
var hotAirBallon,hotAirBallonImg;
var database,positions;

function preload(){
  hotAirBallonImg=loadAnimation("ballon1.png","ballon2.png","ballon3.png");
  bgImg=loadImage("bgImage.png");
}
function setup() {
  createCanvas(1350,600);

  database=firebase.database();

  hotAirBallon = createSprite(400, 200, 50, 50);
  hotAirBallon.addAnimation("hotairballon",hotAirBallonImg);
  hotAirBallon.scale=0.5;

  var hotAirBallonposition=database.ref('hotAirBallon/height');
  hotAirBallonposition.on("value",showError)
}
function draw() {
  background(bgImg);

  textFont("Monotype Corsiva");
  fill("black");
  textSize(20);
  text("USE ARROW KEYS TO MOVE THE HOT AIR BALLOON",100,30);

  if(keyDown(LEFT_ARROW)){
    hotAirBallon.x = hotAirBallon.x -10;
}
else if(keyDown(RIGHT_ARROW)){
    hotAirBallon.x = hotAirBallon.x +10;
}
else if(keyDown(UP_ARROW)){
 // updateHeight(0,-10);
  hotAirBallon.addAnimation("hotairballon",hotAirBallonImg);
  hotAirBallon.scale=hotAirBallon.scale -0.01;
  hotAirBallon.y = hotAirBallon.y -10;
}
else if (keyDown(DOWN_ARROW)){
    hotAirBallon.addAnimation("hotairballon",hotAirBallonImg);
    hotAirBallon.scale=hotAirBallon.scale +0.01;
    hotAirBallon.y = hotAirBallon.y +10;

}

  drawSprites();
}
function updateHeight(x,y){
database.ref('hotAirBallon/height').set({
  'x' : height.x + x ,
  'y' : height.y + y
})
}

function readHeight(data){
  height=data.val();
  hotAirBallon.x=height.x;
  hotAirBallon.y=height.y;

}

function showError(){
console.log("error");
}