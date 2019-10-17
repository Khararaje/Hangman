"use strict";

const underscore = document.getElementById("Underscore");
const button = document.getElementById("btn");
const right = document.getElementById("right");
const wrong = document.getElementById("wrong");
const word = [fetchRandomWord()];
const letters = word[0];
const canvas = document.getElementById("canvas");
const  userInput = document.getElementById("userInput");
var wrongEntry = 0;
const easy = document.getElementById("easy");
const med = document.getElementById("med");
const hard = document.getElementById("hard");
let rightletter = [];
let wrongletter = [];
let random = null;
let underScores = [];
let game;
//allow user to specify difficulty
//use hangman api
function fetchRandomWord(){
  return fetch("https://hangman-api.lively.software/?difficulty=easy")
  .then(response => response.json())
  .then(parsedResponse => parsedResponse.word);
}


class HangmanGame{
  constructor(){}
  async setup(){
    underScores.pop();
    underScores.pop();
    underScores.pop();
    underScores.pop();
    underScores.pop();
    wrongEntry = 0;
    this.randomWord = await fetchRandomWord();
    const letters = word[0];
    for (let i = 0; i < this.randomWord.length;i++){
      underScores.push('_');
      underscore.innerHTML = underScores.join(' ');
    }
    random = this.randomWord;
    return underScores;
  }
  guess(val){
    this.NumberOfGuesses += 1;
    return this.randomWord === val;
  }
}

button.addEventListener("click", async function (buttonClickEvent){
  buttonClickEvent.preventDefault();
  game = new HangmanGame();
  await game.setup();
  console.log(game);
  console.log(underScores);
  console.log(word);
  userInput.innerHTML = "Let Ye Key Be Thy Ink";
  draw();
  for (var i = 0; i < wrongletter.length; i++){
    wrongletter.pop();
    wrongletter.pop();
    wrongletter.pop();
    rightletter.pop();
    rightletter.pop();
    wrong.innerHTML = wrongletter.join(' ');
    wrong.innerHTML = wrongletter.join(' ');
    right.innerHTML = rightletter.join(' ');
  }
});
easy.addEventListener("click", async function (easyClickEvent){
  easyClickEvent.preventDefault();
  game = new HangmanGame();
  await game.setup();
  qString = "https://hangman-api.lively.software/?difficulty=easy"
});

med.addEventListener("click", async function (medClickEvent){
  medClickEvent.preventDefault();
  game = new HangmanGame();
  await game.setup();
  qString = "https://hangman-api.lively.software/?difficulty=medium"
});
hard.addEventListener("click", async function (hardClickEvent){
  hardClickEvent.preventDefault();
  game = new HangmanGame();
  await game.setup();
  qString = "https://hangman-api.lively.software/?difficulty=hard"
});

//create undersores based on word

//get user guess
//check user guess
document.addEventListener('keypress', (event) => {
  let keycode = event.keyCode;
  let keyword = String.fromCharCode(keycode);
  let ocurr = 0;
  //user guess right
  if(random.indexOf(keyword) > -1){
    //push to right letter array
    rightletter.push(keyword);
    right.innerHTML = rightletter.join(' ');
    ocurr++;
    
    console.log("right : " +rightletter)
    for (var i = 0; i < underScores.length; i++){
    underScores[random.indexOf(keyword)] = keyword;
    underscore.innerHTML = underScores.join(' ');
    
    if (random.indexOf(keyword) > -1 && ocurr > 0){
        underScores[random.indexOf(keyword)] = keyword;
        underscore.innerHTML = underScores.join(' ');
        ocurr = 0;
    }
    }
    console.log(underScores);

    //check if all underscores have been filled
    if(underScores.join('') == random){
        userInput.innerHTML = "Press Start to restart.";
        for (let i = 0; i < rightletter.length; i++){
            rightletter.pop();
        }
        right.innerHTML = rightletter.join(' ');
     alert("You win!");
    }
  }
  else{
    //if wrong push to wrong array
    if(wrongletter.indexOf(keyword) > - 1){
        alert("This letter has already been guessed. Please select another.");
    }
    else{
    wrongletter.push(keyword)
    wrong.innerHTML = wrongletter.join(' ');
    console.log( "wrong : " + wrongletter)
    wrongEntry++;
    hangman();
    if(wrongEntry == 11){
        userInput.innerHTML = "Press Start to restart.";
        for (let i = 0; i < wrongletter.length; i++){
            rightletter.pop();
        }
      alert("You lose!");
     }
  }
}
});


//draw image
function draw(){
  var abc = canvas.getContext("2d");
  abc.fillStyle = "white";
        abc.lineWidth=3;
        abc.fillRect(0, 0, 300, 300);
        abc.beginPath(); 
            abc.moveTo(50,270);
            abc.lineTo(50,25);
            abc.stroke();
        abc.beginPath(); 
            abc.moveTo(65,270);
            abc.lineTo(65,85);
            abc.stroke();
        abc.beginPath(); 
            abc.moveTo(65,64);
            abc.lineTo(65,40);
            abc.stroke();
        abc.beginPath(); 
            abc.moveTo(49,25);
            abc.lineTo(175,25);
            abc.stroke();
        abc.beginPath();
            abc.moveTo(49,40);
            abc.lineTo(86,40);
            abc.stroke();
        abc.beginPath(); 
            abc.moveTo(106,40);
            abc.lineTo(175,40);
            abc.stroke();
        abc.beginPath();
            abc.moveTo(173,25);
            abc.lineTo(173,40);
            abc.stroke();
        abc.beginPath();
            abc.moveTo(50,80);
            abc.lineTo(100,25);
            abc.stroke();
        abc.beginPath(); 
            abc.moveTo(60,90);
            abc.lineTo(111,35);
            abc.stroke();
        abc.beginPath(); 
            abc.moveTo(50,80);
            abc.lineTo(60,90);
            abc.stroke();
        abc.beginPath(); 
            abc.moveTo(100,25);
            abc.lineTo(111,35);
            abc.stroke();
        abc.beginPath(); 
            abc.moveTo(35,270);
            abc.lineTo(265,270);
            abc.stroke();
        abc.beginPath(); 
            abc.moveTo(150,40);
            abc.lineTo(150,80);
            abc.stroke();
}
function hangman(){
  var abc = canvas.getContext("2d");
  if(wrongEntry==1){
    abc.beginPath(); //head
        abc.arc(150, 100, 20, 0, 2*Math.PI);
        abc.stroke();
    abc.beginPath(); //left eye
        abc.arc(143, 95, 3.5, 0, 2*Math.PI);
        abc.stroke();
    abc.beginPath(); //right eye
        abc.arc(157, 95, 3.5, 0, 2*Math.PI);
        abc.stroke();
    abc.beginPath(); //mouth
        abc.arc(150, 103, 9, 0, Math.PI);
        abc.stroke();
}
if(wrongEntry==2){
  abc.beginPath(); //body
      abc.moveTo(150,120);
      abc.lineTo(150,190);
      abc.stroke();
}
if(wrongEntry==3){
  abc.fillStyle = "white";
  abc.fillRect(138, 102, 24, 12); //cover mouth
  abc.beginPath(); //straight mouth
      abc.moveTo(140,108);
      abc.lineTo(160,108);
      abc.stroke();
  abc.beginPath(); //right arm
      abc.moveTo(150,135);
      abc.lineTo(180,160);
      abc.stroke();
}
if(wrongEntry==4){
  abc.beginPath(); //left arm
      abc.moveTo(150,135);
      abc.lineTo(120,160);
      abc.stroke();
}
if(wrongEntry==5){
  abc.fillRect(138, 102, 24, 12); //cover mouth
  abc.beginPath(); //sad mouth
      abc.arc(150, 112, 9, 0, Math.PI, true);
      abc.stroke();
  abc.beginPath(); //right leg
      abc.moveTo(149,188);
      abc.lineTo(180,230);
      abc.stroke();
}
if(wrongEntry==6){
  abc.beginPath(); //left leg
      abc.moveTo(151,188);
      abc.lineTo(120,230);
      abc.stroke();
}
if(wrongEntry==7){
  abc.fillRect(138, 90, 24, 24); //cover face
  abc.fillRect(118, 121.2, 70, 120); //cover body
  abc.beginPath(); //straight mouth
      abc.moveTo(140,108);
      abc.lineTo(160,108);
      abc.stroke();
  abc.beginPath(); //body
      abc.moveTo(150,135);
      abc.lineTo(150,205);
      abc.stroke();
  abc.beginPath(); //right arm
      abc.moveTo(150,150);
      abc.lineTo(180,175);
      abc.stroke();
  abc.beginPath(); //left arm
      abc.moveTo(150,150);
      abc.lineTo(120,175);
      abc.stroke();
  abc.beginPath(); //right leg
      abc.moveTo(149,203);
      abc.lineTo(180,245);
      abc.stroke();
  abc.beginPath(); //left leg
      abc.moveTo(151,203);
      abc.lineTo(120,245);
      abc.stroke();
  abc.lineWidth=2;
  abc.beginPath(); //left eye
      abc.moveTo(140,93);
      abc.lineTo(146,98);
      abc.stroke();
      abc.moveTo(140,98);
      abc.lineTo(146,93);
      abc.stroke();
  abc.beginPath(); //right eye
      abc.moveTo(154,98);
      abc.lineTo(160,93);
      abc.stroke(); 
      abc.moveTo(154,93);
      abc.lineTo(160,98);
      abc.stroke();
}
if(wrongEntry==8){
  abc.fillRect(118, 135, 70, 120); //cover body
  abc.lineWidth=3;
  abc.beginPath(); //body
      abc.moveTo(150,150);
      abc.lineTo(150,220);
      abc.stroke();
  abc.beginPath(); //right arm
      abc.moveTo(150,165);
      abc.lineTo(180,180);
      abc.stroke();
  abc.beginPath(); //left arm
      abc.moveTo(150,165);
      abc.lineTo(120,180);
      abc.stroke();
  abc.beginPath(); //right leg
      abc.moveTo(149,218);
      abc.lineTo(180,260);
      abc.stroke();
  abc.beginPath(); //left leg
      abc.moveTo(151,218);
      abc.lineTo(120,260);
      abc.stroke();
}
if(wrongEntry==9){
  abc.fillRect(118, 143, 70, 120); //cover body
  abc.lineWidth=3;
  abc.beginPath(); //body
      abc.moveTo(150,165);
      abc.lineTo(150,235);
      abc.stroke();
  abc.beginPath(); //right arm
      abc.moveTo(150,180);
      abc.lineTo(180,195);
      abc.stroke();
  abc.beginPath(); //left arm
      abc.moveTo(150,180);
      abc.lineTo(120,195);
      abc.stroke();
  abc.beginPath(); //right leg
      abc.moveTo(149,232);
      abc.lineTo(180,270);
      abc.stroke();
  abc.beginPath(); //left leg
      abc.moveTo(151,232);
      abc.lineTo(120,270);
      abc.stroke();
}
if(wrongEntry==10){
  abc.fillRect(118, 148, 70, 120); //cover body
  abc.lineWidth=3;
  abc.beginPath(); //body
      abc.moveTo(150,180);
      abc.lineTo(150,250);
      abc.stroke();
  abc.beginPath(); //right arm
      abc.moveTo(150,195);
      abc.lineTo(180,210);
      abc.stroke();
  abc.beginPath(); //left arm
      abc.moveTo(150,195);
      abc.lineTo(120,210);
      abc.stroke();
  abc.beginPath(); //right leg
      abc.moveTo(149,247);
      abc.lineTo(200,270);
      abc.stroke();
  abc.beginPath(); //left leg
      abc.moveTo(151,247);
      abc.lineTo(100,270);
      abc.stroke();
}
if(wrongEntry==11){
  abc.fillRect(90, 148, 120, 120); //cover body
  abc.lineWidth=3;
  abc.beginPath(); //body
      abc.moveTo(200,195);
      abc.lineTo(150,268);
      abc.stroke();
  abc.beginPath(); //right arm
      abc.moveTo(191,210);
      abc.lineTo(220,245);
      abc.stroke();
  abc.beginPath(); //left arm
      abc.moveTo(191,210);
      abc.lineTo(145,237);
      abc.stroke();
  abc.beginPath(); //right leg
      abc.moveTo(149,268);
      abc.lineTo(210,268);
      abc.stroke();
  abc.beginPath(); //left leg
      abc.moveTo(151,268);
      abc.lineTo(90,268);
      abc.stroke();
}
}

//alert user they've won or lost and give
  //option to restart
