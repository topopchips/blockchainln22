import { blockjesus_backend } from "../../declarations/blockjesus_backend";

let turn = "X";
let gameOver = false;
let gameWorkingNow = false;
let status = document.getElementById("status");

// Function to change the turn
const changeTurn = async () => {
  let nextTurn = await blockjesus_backend.changeTurn(turn);
  return nextTurn;
};

// Function to check for a win
const checkWin = async () => {
  gameWorkingNow = true;
  status.innerText = "Processing";
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < wins.length; i++) {
    let data = {
      box0: boxtext[wins[i][0]].innerText,
      box1: boxtext[wins[i][1]].innerText,
      box2: boxtext[wins[i][2]].innerText,
    };
    let result = await blockjesus_backend.checkWin(data);
    if (result) {
      document.querySelector(".info").innerText =
        "Player " + boxtext[wins[i][0]].innerText + " Won";
      gameOver = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      status.innerText = "";
      gameWorkingNow = false;
    }
  }

  status.innerText = "";
  gameWorkingNow = false;
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", async () => {
    if (boxtext.innerText === "" && !gameOver && !gameWorkingNow) {
      boxtext.innerText = turn;
      turn = await changeTurn();
      await checkWin();
      if (!gameOver) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for : " + turn;
      }
    }
  });
});

// Reset function
reset.addEventListener("click", (e) => {
  let boxtext = document.querySelectorAll(".boxtext");
  Array.from(boxtext).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  document.getElementsByClassName("info")[0].innerText = "Turn for : " + turn;
  gameOver = false;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0";
});
