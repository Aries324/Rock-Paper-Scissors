
let gamesProp = {
  player : null, //move container
  comp : null, //move container
  option : null, //the selector options container
  button : null, 
  win : null, wins : 0, 
  lose: null, loses : 0, 
  draw : null, draws : 0, 

  //startsGame
  startGame : function () {
  

    let images = ["rps-rock.png", "rps-paper.png", "rps-scissors.png"],
        img = null,
        loaded = 0;
    for (let i of images) {
      img = new Image();
      img.onload = function(){
        loaded++;
        if (loaded == images.length) { gamesProp.init(); }
      };
      img.src = i;
    }
  },

  init : function () {
  
    // Get all elements
    gamesProp.player = document.getElementById("playersMove");
    gamesProp.comp = document.getElementById("computersMove");
    gamesProp.option = document.getElementById("options");
    gamesProp.button = document.getElementById("button");
    gamesProp.win = document.getElementById("win");
    gamesProp.lose = document.getElementById("lose");
    gamesProp.draw = document.getElementById("draw");

    // listen for user's selection
    gamesProp.option.addEventListener("change", gamesProp.changeImage);
    gamesProp.changeImage();

    // When user hits "Go!"
    gamesProp.button.addEventListener("click", gamesProp.gamesProp);

    // Unlock all controls
    gamesProp.option.disabled = false;
    gamesProp.button.disabled = false;
  },

  
  changeImage : function () {
  //change image to match user's selection

    let img = new Image();
    img.src = "rps-" + gamesProp.option.value + ".png";
    gamesProp.player.innerHTML = "";
    gamesProp.player.appendChild(img);
  },

  gamesProp : function () {
  // gamesProp() : gamesProp on!

    // Random computer move--divide 100 by the amount of moves to get percentages
    let computerMove = Math.random();
    if (computerMove <= 0.67) { computerMove = "rock"; }
    else if (computerMove <= 0.33) { computerMove = "scissors"; }
    else { computerMove = "paper"; }

    // change image to match computer's move
    let img = new Image();
    img.src = "rps-" + computerMove + ".png";
    gamesProp.comp.innerHTML = "";
    gamesProp.comp.appendChild(img);

    // Win, lose, or draw?
    let playerMove = gamesProp.option.value;
    if (playerMove == computerMove) {
      gamesProp.draws++;
      gamesProp.draw.innerHTML = gamesProp.draws;
      alert("IT'S A TIE!");
    } else {
      let win = true;

      switch(playerMove) {
        case "rock":
          if (computerMove=="paper") { win = false; }
          break;
        case "paper":
          if (computerMove=="scissors") { win = false; }
          break;
        case "scissors":
          if (computerMove=="rock") { win = false; }
          break;
      }
      if (win) {
        gamesProp.wins++;
        gamesProp.win.innerHTML = gamesProp.wins;
        alert("WINNER!!!");
      } else {
        gamesProp.loses++;
        gamesProp.lose.innerHTML = gamesProp.loses;
        alert("YOU LOST...TRY AGAIN!");
      }
    }
  }
};
window.addEventListener("load", gamesProp.startGame);