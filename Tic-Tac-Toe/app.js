let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let move = true; //Initial move
let count = 0; //Track Draw

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(move) {
            //initial-player move
            box.innerText = "O";
            move = false;
        } else {
            //second-player move
            box.innerText = "X";
            move = true;
        }
        box.disabled = true;
        ++count;

        let isWinner = checkWinner();
        if(count == 9 && !isWinner) {
            gameDraw();
        }
    });
});

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const gameDraw = () => {
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is >> ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos1 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
};

const resetGame = () => {
    move = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);