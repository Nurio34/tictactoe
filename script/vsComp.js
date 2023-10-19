
const boxes = [...document.querySelectorAll("li")]
const gameOverSection = document.querySelector(".gameOver")

let mode = "vsc"
let player1TURN = true
let player2TURN = false
let content
let p1Order = []
let p2Order = []
let unsignedBoxes = []
let winner

    


startGame()

    boxes.forEach(box=>box.addEventListener("click",e=> {
            
        if(player1TURN ) {
            renderGame("o","p1",p1Order,box)
            checkGame("player1",p1Order,boxes)
        }else {
            renderGame("x","p2",p2Order,box)
            checkGame("player2",p2Order,boxes)
        }
    }))



function startGame() {

    boxes.forEach((box,i)=>{
        box.dataset.order = i+1
        box.tabIndex = "0"
    })
    boxes[0].focus()

    if(mode != "vs" && player2TURN) {
        unsignedBoxes = boxes.filter(box=>!box.classList.contains("p1") && !box.classList.contains("p2"))

        if(unsignedBoxes.length > 0) {
            const random = Math.floor(Math.random() * unsignedBoxes.length)
                unsignedBoxes[random].innerText = "x"
                unsignedBoxes[random].classList.add("p2")
                unsignedBoxes[random].style.pointerEvents = "none"
                unsignedBoxes[random].tabIndex = "-1"
                p2Order.push(unsignedBoxes[random].dataset.order)
                player1TURN = true
                player2TURN = false
        }
    }

}

function renderGame(sign,clas,arr,box) { 
    box.innerText = sign
    box.classList.add(clas)
    arr.push(box.dataset.order)
    box.style.pointerEvents = "none"
    box.tabIndex = "-1"

    if(mode == "vs") {

        if(clas == "p1") {
            player1TURN = false
            player2TURN = true
        }else {
            player1TURN = true
            player2TURN = false
        }
        console.log("vs mode");

    }  

    else {
        unsignedBoxes = boxes.filter(box=>!box.classList.contains("p1") && !box.classList.contains("p2"))

            if(unsignedBoxes.length > 0) {
                const random = Math.floor(Math.random() * unsignedBoxes.length)
                    unsignedBoxes[random].innerText = "x"
                    unsignedBoxes[random].classList.add("p2")
                    unsignedBoxes[random].style.pointerEvents = "none"
                    unsignedBoxes[random].tabIndex = "-1"
                    p2Order.push(unsignedBoxes[random].dataset.order)
            }

            checkGame("computer", p2Order, boxes)
            console.log(p2Order);
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
        arr.includes("1") && arr.includes("5") && arr.includes("9") ||
        arr.includes("3") && arr.includes("5") && arr.includes("7") ||
        arr.includes("3") && arr.includes("6") && arr.includes("9") 

    ){
            boxes.forEach(box=>{
                box.style.pointerEvents = "none"
                box.tabIndex = "-1"
            })

            winner = player
            gameOverSection.classList.add("visible")

        const winnerEl = gameOverSection.querySelector("p")
            winnerEl.innerText = `Winner : ${winner}`

        const restartBtn = gameOverSection.querySelector("button")
            restartBtn.focus()

            restartBtn.onclick = function() {
                gameOverSection.classList.remove("visible")

                boxes.forEach(box=> {
                    box.className = ""
                    box.innerText = ""
                    box.style.pointerEvents = "all"
                    box.tabIndex = "0"
                })
    
                    if(winner === "player1") {
                        player2TURN = true
                        player1TURN = false
                    } else {
                        player1TURN = true
                        player2TURN = false
                    }
                
                p1Order = []
                p2Order = []

                boxes[0].focus()
                startGame()
            }
            
    }
    
    else if(boxes.every(box=> box.classList.contains("p1") || box.classList.contains("p2"))) {

        boxes.forEach(box=>box.style.pointerEvents = "none")

            winner = "Draw"
            gameOverSection.classList.add("visible")

        const winnerEl = gameOverSection.querySelector("p")
            winnerEl.innerText = `Winner : ${winner}`

        const restartBtn = gameOverSection.querySelector("button")
            restartBtn.focus()

            restartBtn.onclick = function() {
                gameOverSection.classList.remove("visible")
 
                boxes.forEach(box=> {
                    box.className = ""
                    box.innerText = ""
                    box.style.pointerEvents = "all"
                    box.tabIndex = "0"
                })
    
                console.log({player1TURN,player2TURN});
                if(player1TURN) {
                    player2TURN = true
                    player1TURN = false
                }
                else {
                    player1TURN = true
                    player2TURN = false
                }
                
                p1Order = []
                p2Order = []

                boxes[0].focus()
            }
    }

}