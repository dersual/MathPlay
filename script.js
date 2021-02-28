"use strict";
const get = x => document.getElementById(x);

let app = newVue();
let game = newGame();
app.$data.game = game;


window.setInterval(() => {
  app.$data.game = game;
  app.$data.quadFail = Math.max(0,app.$data.quadFail-1)
  if (get("quadFail")) get("quadFail").style.opacity = app.$data.quadFail/100;
  if (app.$data.tab == "game") {
    if (game.left.toString()=="x"&&(game.right.toString()==0||!game.right.toString().includes("x"))) {
      app.$data.win = true
    }
    if (game.right.toString()=="x"&&(game.left.toString()==0||!game.left.toString().includes("x"))) {
      app.$data.win = true
    }
  }
}, 50);

function addListeners() {
document
  .getElementById("buttonLinear Equations")
  .addEventListener("click", function() {
    switchTab("game", 1);
  });
/*
document
  .getElementById("buttonFactoring")
  .addEventListener("click", function() {
    switchTab("game", 2);
  });
*/
document
  .getElementById("buttonSolving Quadratics")
  .addEventListener("click", function() {
    switchTab("game", 3);
  });

document
  .getElementById("buttonHow to play")
  .addEventListener("click", function() {
    window.location.href="https://mathplay.glitch.me/howtoplay.html"
  });

document
  .getElementById("buttonAbout")
  .addEventListener("click", function() {
    window.location.href="https://mathplay.glitch.me/about.html"
  });
}

addListeners();

function switchTab(x, y) {
  app.$data.tab = x;
  app.$data.levelType = y??0;
  let xx = 1;
  let yy = 1;
  if (get('quad1')) get('quad1').innerHTML = get('quad2').innerHTML = get('quad3').innerHTML = 0
  app.$data.quadraticSolving=false

  switch (y) {
    case 1:
      xx = randomInt(-10, 10)
      do {
        yy = randomInt(-10, 10)
      } while (xx == yy)
      game.left = new Expression([
        {
          type: "poly",
          value: [
            { num: randomInt(-10, 10), den: 1 },
            { num: xx, den: 1 }
          ]
        }
      ]);
      game.right = new Expression([
        {
          type: "poly",
          value: [
            { num: randomInt(-10, 10), den: 1 },
            { num: yy, den: 1 }
          ]
        }
      ]);
      break;
    case 2:
      
      break;
    case 3:
      xx = randomInt(-5, 5)
      do {
        yy = randomInt(-5, 5)
      } while (xx == yy)
      game.left = new Expression([
        {
          type: "poly",
          value: [
            { num: randomInt(-10, 10), den: 1 },
            { num: randomInt(-10, 10), den: 1 },
            { num: xx, den: 1 }
          ]
        }
      ]);
      game.right = new Expression([
        {
          type: "poly",
          value: [
            { num: randomInt(-10, 10), den: 1 },
            { num: randomInt(-10, 10), den: 1 },
            { num: yy, den: 1 }
          ]
        }
      ]);
      break;
    default:
      break;
  }
  window.setTimeout(() => addListeners(), 100)
}

function randomInt(x, y) {
  return Math.floor(Math.random() * (y - x + 1) + x);
}

function newGame() {
  return {
    left: 0,
    right: 0,
    mult: 2,
    quad: [0,0,0]
  };
}

class Expression { //This creates a *class*, classes are basically objects but with specific properties
  constructor(express) { //This function defines how to make a class object, like Expression([25])
    this.value = express;
  }
  toString() { //This function converts a class object into a string, to be displayed in index.html
    let thing = this.value; //You don't need to understand how it works, you just need to understand that it is used to make a string
    let string = "";
    for (let i = 0; i < thing.length; i++) {
      string = string == "" ? "" : "×";
      let substring = "";
      if ((thing[i].type = "poly")) {
        for (let j = 0; j < thing[i].value.length; j++) {
          substring = (substring == "" ? "" : substring[0]=="-"||substring[0]=="_" ? "" : "+") + substring;
          substring =
            (thing[i].value[j].num == 0 ? "_" : (
            (thing[i].value[j].den == 1 ? "" : "(" ) +
            (Math.abs(thing[i].value[j].num) == Math.abs(thing[i].value[j].den) && j >= 1 ? (thing[i].value[j].num == 0-thing[i].value[j].den ?"-":"") : (thing[i].value[j].num +
            (thing[i].value[j].den == 1 ? "" : "/" + thing[i].value[j].den + ")"))) +
            (j == 0 ? "" : "x" + (j == 1 ? "" : "<sup>" + j + "</sup>")))) +
            substring;
        }
        if (thing.length >= 2) {
          substring = "(" + substring + ")";
        }
        substring = substring.startsWith("_+") ? substring.replace("_+","_") : substring
        string += substring.replaceAll("_","");
      }
    }
    return string==0?0:string;
  }
}

function addBoth(coeff,k) {
  if (!app.$data.quadraticSolving) {
  game.left.value[0].value[k].num += coeff * game.left.value[0].value[k].den
  game.right.value[0].value[k].num += coeff * game.right.value[0].value[k].den
  }
}

function multiplyBoth(power) {
  if (!app.$data.quadraticSolving) {
  for (let i=0;i<game.left.value[0].value.length;i++) {
    game.left.value[0].value[i][power==1?"num":"den"] *= game.mult**Math.abs(power)
    game.right.value[0].value[i][power==1?"num":"den"] *= game.mult**Math.abs(power)
    let gcd = gcd_two_numbers(game.left.value[0].value[i].num,game.left.value[0].value[i].den)
    game.left.value[0].value[i].num = Math.round(game.left.value[0].value[i].num / gcd)
    game.left.value[0].value[i].den = Math.round(game.left.value[0].value[i].den / gcd)
    gcd = gcd_two_numbers(game.right.value[0].value[i].num,game.right.value[0].value[i].den)
    game.right.value[0].value[i].num = Math.round(game.right.value[0].value[i].num / gcd)
    game.right.value[0].value[i].den = Math.round(game.right.value[0].value[i].den / gcd)
  }
  }
}

function negative() {
  if (!app.$data.quadraticSolving) {
  for (let i=0;i<game.left.value[0].value.length;i++) {
    game.left.value[0].value[i].num *= -1
    game.right.value[0].value[i].num *= -1
  }
  }
}

function quadratic() {
  if (!app.$data.quadraticSolving) {
    if (game.left.toString()==0||game.right.toString()==0) {
      app.$data.quadraticSolving = true
      game.quad = [0,0,0]
    } else {
      app.$data.quadFail = 100
    }
  }
}

function gcd_two_numbers(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}
function createQuadraticExpression (a,b,c) { 
//from stack overflow I gotta change to fit the style 
var result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
var result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);

} 

function submitQuad() {
  if ((game.left.toString() == 0 &&
      get('quad1').innerHTML == game.right.value[0].value[2].num &&
      get('quad2').innerHTML == game.right.value[0].value[1].num &&
      get('quad3').innerHTML == game.right.value[0].value[0].num ) ||
      (game.right.toString() == 0 &&
      get('quad1').innerHTML == game.left.value[0].value[2].num &&
      get('quad2').innerHTML == game.left.value[0].value[1].num &&
      get('quad3').innerHTML == game.left.value[0].value[0].num )) {
    app.$data.win = true
  }
}  
function idkWattoNamethis(){ 
if (!app.$data.quadraticSolving) {
    if (game.left.toString()==0){ 
      return [game.right.value[0].value[2].num, game.right.value[0]]  
    }
} 
}
