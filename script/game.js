
//todo : vsComp modda beraberlikte oyuna kim başladıysa, yeni oyuna onun başlamasını yapamadım

const boxes = [...document.querySelectorAll("li")]
const gameOverSection = document.querySelector(".gameOver")
let restartBtn = gameOverSection.querySelector("button")

let mode = "vsc"
let player1TURN = true
let content
let p1Order = []
let p2Order = []
let unsignedBoxes = []
let winner


    boxes.forEach((box,i)=>{
        box.dataset.order = i+1
        box.tabIndex = "0"
    })

    if(mode == "vs") {
        
        boxes.forEach(box=>box.addEventListener("click",e=> {
        
            if(player1TURN ) {
                renderGame("o",p1Order,box,"p1")
                checkGame("player1",p1Order,boxes)

            }else {
                renderGame("x",p2Order,box,"p2")
                checkGame("player2",p2Order,boxes)
            }
        }))
    }

    else if(mode == "vsc") {

        boxes.forEach(box=>box.addEventListener("click",e=> {
        
            renderGame("o",p1Order,box,"p1")
            checkGame("player1",p1Order,boxes)
            computerMove()
        }))
    }



function renderGame(sign,arr,box,clas) {

    box.innerText = sign
    box.classList.add(clas)

    if(mode == "vs") {
        if(clas == "p1") player1TURN = false
        else player1TURN = true
    }
        
    arr.push(box.dataset.order)
    box.style.pointerEvents = "none"
    box.tabIndex = "-1"
}

function computerMove() {
    unsignedBoxes = boxes.filter(box=> !box.classList.contains("p1") && !box.classList.contains("p2"))

const random = Math.floor(Math.random()*unsignedBoxes.length)

    if(unsignedBoxes.length > 0) {
        renderGame("x",p2Order,unsignedBoxes[random],"p2")
        checkGame("computer",p2Order,boxes)
    }
}

function checkGame(player,arr,boxes) {

    if
    (
        arr.includes("1") && arr.includes("2") && arr.includes("3") ||
        arr.includes("4") && arr.includes("5") && arr.includes("6") ||
        arr.includes("7") && arr.includes("8") && arr.includes("9") ||
        arr.includes("1") && arr.includes("4") && arr.includes("7") ||
        arr.includes("2") && arr.includes("5") && arr.includes("8") ||
        arr.includes("3") && arr.includes("5") && arr.includes("9") ||
        arr.includes("1") && arr.includes("5") && arr.includes("9") ||
        arr.includes("3") && arr.includes("5") && arr.includes("7")

    ){
        winner = player

        if(winner === "player1") player1TURN = false
        else player1TURN = true
            
        endGame()
    }
            
    
    
    else if(boxes.every(box=> box.classList.contains("p1") || box.classList.contains("p2"))) {

        winner = "Draw"

        if(player1TURN) player1TURN = false
        else player1TURN = true
        console.log(player1TURN);

        //todo: Burda bi ibnelik var
        // if(mode == "vsc") {
        //     if(player1TURN) player1TURN = true
        //     else player1TURN = false
        // }
        endGame()
    }
}

function endGame() {
        p1Order = []
        p2Order = []

        boxes.forEach(box=>{
            box.style.pointerEvents = "none"
            box.tabIndex = "-1"
        })

        gameOverSection.classList.add("visible")

    const winnerEl = gameOverSection.querySelector("p")
        winnerEl.innerText = `Winner : ${winner}`

        restartBtn.focus()
   
}

    restartBtn.addEventListener("click",e=>{

        gameOverSection.classList.remove("visible")

        boxes.forEach(box=> {
            box.className = ""
            box.innerText = ""
            box.style.pointerEvents = "all"
            box.tabIndex = "0"
        })

        boxes[0].focus()

        if(mode == "vsc") {
            if(!player1TURN ) {
                computerMove()
                console.log("computer starts");
            }
        }
    }) 

    
