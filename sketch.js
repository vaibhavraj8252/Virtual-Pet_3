var dog, dogI, happyDogI, boneI;
var database;
var foodS, foodStock;
var lastFed;
var feed, addFood;

function preload() {
  dogI = loadImage("Dog.png");
  happyDogI = loadImage("happydog.png");
  boneI = loadImage("bone.png");
}

function setup() {
  createCanvas(1000, 500);
  dog = createSprite(800, 280);
  dog.addImage(dogI);
  dog.scale = 0.2;

  bone1 = createSprite(720, 330);
  bone1.addImage(boneI);
  bone1.scale = 0.1;

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  feed = createButton("Feed your pet");
  feed.position(1000, 80); 

  addFood = createButton("Add Food");
  addFood.position(1110, 80);
}

function draw() {
  background(46, 139, 87);
  drawSprites();

  textFont("audiowide");
  textSize(50);
  fill("white");
  //text("="+foodS,260,265);

  feed.mousePressed(() => {
    writeStock1(foodS);
    dog.addImage(happyDogI);
    bone1.visible = true;
  });

  addFood.mousePressed(() => {
    writeStock(foodS);
    dog.addImage(dogI);
  });

  var x = 80,
    y = 100;
  imageMode(CENTER);

  if (foodS != 0) {
    for (var i = 0; i < foodS; i++) {
      if (i % 10 == 0) {
        x = 80;
        y = y + 50;
      }
      image(boneI, x, y, 60, 30);
      x = x + 70;
    }
  }

  textSize(25);
  text("VAIBHAV RAJ", 50, 30);

  /*  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + (lastFed % 12) + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }*/
}

function readStock(data) {
  foodS = data.val();
}

function writeStock1(x) {
  x = x - 1;
  database.ref("/").update({
    Food: x,
  });
}

function writeStock(x) {
  x = x + 1;
  database.ref("/").update({
    Food: x,
  });
}
