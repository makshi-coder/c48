var backgroundImg,background
var rocketImg,rocket
var bombImg,bomb,bombGroup
var starImg,star,starGroup
var gameState="play"
var bgsprite
var score=0
var starGroup,bombGroup
var flag=0

function preload(){
backgroundImg=loadImage("background.png")
rocketImg=loadImage("rocket.png")
bombImg=loadImage("bomb.png")
starImg=loadImage("star.png")
bombSound=loadSound("bombSound.wav")
starSound=loadSound("star.mp3")
bgSound=loadSound("bgSound.mp3")
blastImg=loadImage("blast.png")
}

function setup() {
createCanvas(windowWidth,windowHeight)
bgsprite=createSprite(width/2,height/2,800,800)
bgsprite.scale=4.8
bgsprite.addImage(backgroundImg)

rocket=createSprite(width/2,height/2,50,50)
rocket.addImage(rocketImg)
rocket.scale=0.8

starGroup=new Group()
bombGroup=new Group()

bgSound.play()
bgSound.loop=true

rocket.setCollider("rectangle",0,0,100,200)

}

function draw() {
 background("black")
 bgsprite.velocityY=1
 if (bgsprite.y>400){
    bgsprite.y=200
    console.log(bgsprite)

 }

 if(keyDown("right")){
   rocket.x=rocket.x+4
}

if(keyDown("left")){
   rocket.x=rocket.x-4
}
if(keyDown("up")){
   rocket.y=rocket.y-4
}
if(keyDown("down")){
   rocket.y=rocket.y+4
}

 spawnbomb()
 spawnStars()
 for(var i=0;i<starGroup.length;i++){
    if(starGroup.get(i).isTouching(rocket)){
       starGroup.get(i).destroy()
       score=score+1
       starSound.play()
       starSound.setVolume(0.3)
    }
 }
 for(var i=0;i<bombGroup.length;i++){
   if(bombGroup.get(i).isTouching(rocket)){
      bombGroup.get(i).destroy()
      bombSound.play()
      score=score-2
     
      bombSound.setVolume(0.3)
     flag=1
   }
   if(flag===1){
      blast=createSprite(rocket.x,rocket.y)
      blast.addImage(blastImg)
      blast.scale=0.3
      blast.lifetime=80
      flag=0
   }
}

if(score<0){
   gameOver()
   rocket.destroy()
   bgsprite.velocityY=0
   bombGroup.destroyEach()
   starGroup.destroyEach()

   
}
//console.log(Math.round(random(1,6)))
 drawSprites()
   fill("white") 
   stroke("blue")
   strokeWeight(4)
   textSize(20)
   text("SCORE- "+score,600,50)
}
function spawnStars(){
   if(frameCount%300===0){
      star=createSprite(400,400,20,20)
      star.x=Math.round(random(160,1200))
      star.y=Math.round(random(50,200))
      star.addImage(starImg)
      star.scale=0.03
      starGroup.add(star)
      star.lifetime=200

   }
}
function spawnbomb(){
   if(frameCount%700===0){
      bomb=createSprite(400,400,20,20)
      bomb.x=Math.round(random(160,1200))
      bomb.y=Math.round(random(50,200))
      bomb.addImage(bombImg)
      bomb.scale=0.2
    //  if(rocket.isTouching(bomb)){
       //  console.log("blast")
       //  blast=createSprite(bomb.x,bomb.y)
        // blast.addImage(blastImg)
        // blast.scale=1
         
         //bomb.destroy()

     //  }
      bombGroup.add(bomb)
     // bomb.lifetime=300
    //  bomb.debug=true
      bomb.setCollider("circle",0,0,400)
    //  rocket.debug=true
     
   }
    
}

function gameOver() {
   swal({
     title: `Game Over`,
     text: "Oops you lost the game....!!!",
     imageUrl:
       "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
     imageSize: "100x100",
     confirmButtonText: "Thanks For Playing",
     
   },
   function (isConfirm){
      if(isConfirm){
       location.reload()
      }
      
   });
 }