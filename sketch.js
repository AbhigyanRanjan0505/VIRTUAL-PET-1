var pet, happyPet, petImg, petImgTwo, food, database, foodS, foodStock;

function preload() {
  petImg = loadImage("images/dogImg.png");
  petImgTwo = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readstock);

  createCanvas(500, 500);

  pet = createSprite(250, 250, 10, 10);
  pet.addImage(petImg);
  pet.scale = 0.15;
}

function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writestock(foodS);
    pet.addImage(petImgTwo);
  }

  drawSprites();

  noStroke();
  textSize(25);
  fill("white");
  text("Food Reaming: "+ foodS, 165, 200);
  text("Press up arrow key feed drago(your pet dog)milk:", 3, 20);
}

function readstock(data) {
  foodS = data.val();
}

function writestock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  });
}

// function showerrors() {
//   console.log("Error:405, location not found");
// }