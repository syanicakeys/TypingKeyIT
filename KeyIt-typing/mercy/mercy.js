//--- FOR STARTING GAME
var startTime, currentTime, endTime, running = true;

function startMercy() {
    startTimer();
    document.getElementById("btnContainer").style.display = "none";
    randomCategory();    
}

function randomCategory() {
    let game = random(3,1);
    switch(game) {
        case 1: typingGame(); break;
        case 2: typingGame(); break;
        case 3: typingGame(); break;
    }
}

var timer;
function startTimer() {
    startTime = new Date();
    timer = setInterval(() => {
        currentTime = getTimerTime(startTime);
        document.getElementById("scoreDisp").innerHTML = "Score: " + currentTime.toString().padStart(4, "0");
        console.log(currentTime);
    }, 1000);
}

function getTimerTime(startTime) {
    return Math.floor((new Date() - startTime) / 1000);
}

function random(max, min) {
    return Math.floor((Math.random() * max) + min);
}

//Ending the game
function endGame() {
    running = false;
    endTime = currentTime;
    clearInterval(timer);
    alert("Game ended, your score was " + endTime);
    removeInput();
}

//--- END OF STARTING GAME
/*
//---FOR MOUSE CATEGORY
var gameBodyWidth = document.getElementById("gameBody").offsetWidth;
var gameBodyHeight = document.getElementById("gameBody").offsetHeight;
var object = document.getElementById("object");
var score = 0;

//Randomizes Y position of Object within the Div
function YPos() {
    return Math.floor(Math.random() * (gameBodyWidth - object.offsetWidth));
}

//Randomizes X position of Object within the Div
function XPos() {
    return Math.floor(Math.random() * (gameBodyHeight - object.offsetWidth));
}

//Randomizes object size between 3% to 6%;
function objectSize() {
    return Math.floor((Math.random() * 5) + 2);
}

function mouseGame() {
    document.getElementById("object").innerHTML = "<div id='starImg' onclick='objectClick()'> </div>";
    objectRandomizer();
}

let objectTimer;
//Makes the object appear on random places with random size.
function objectRandomizer() {
    if (running) {
        object.style.display = "block";
        objectTimer = setTimeout(objectDisappear, 3000);
        let width = objectSize();
        object.style.width = width + "%";
        object.style.height = (width * 2) + "%"; 
        object.style.top = XPos() + "px";
        object.style.left = YPos() + "px";
    }
}

function objectDisappear() {
    if (!objectTimer) return;
    object.style.display = "none";
    alert("You didn't click the object in time!");
    endGame();
}

//Function for when the object is clicked
function objectClick() {
    clearTimeout(objectTimer);
    objectTimer = null;
    object.style.display = "none";
    randomCategory();
}

//--- END OF MOUSE CATEGORY CODE
*/

//--TYPING CATEGORY
function typingGame() {
    let words = [
        "pear", "fig", "lime", "kiwi", "plum", 
        "lion", "mango", "apple", "grape", "cold", 
        "wolf", "peach", "cat", "bird", "frog", 
        "dog", "fish", "panda", "tiger", "zebra", 
        "bear", "snake", "horse", "mouse", "ocean",
        "tree", "cloud", "trail", "earth", "moon",
        "star", "sun", "rain", "snow", "wind",
        "fire", "rock", "gold", "coin", "ring",
        "cake", "book", "pen", "door", "key",
        "ship", "fish", "bird", "frog", "moon"
    ]; //50 WORDS (3-5 LETTERS) CAN ADD MORE IF NEEDED

    let currentWordIndex = Math.floor(Math.random() * words.length);
    let currentWord = words[currentWordIndex];
    let wordDisplay = document.getElementById("wordDisp");
    wordDisplay.textContent = currentWord;
    
    createInput();

    let typedWord = '';
    let wordArray = currentWord.split('');
    let typingTimer = setTimeout(() => {
        endGame();
    }, 2000);
    
    document.getElementById("userInput").addEventListener("input", function(event) {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            endGame();
        }, 2000);

        let input = event.target.value.trim();
        let typedChar = input.charAt(input.length - 1);
        
        if (currentWord.startsWith(typedWord + typedChar)) {
            typedWord += typedChar;

            let displayHTML = '';
            for (let i = 0; i < wordArray.length; i++) {
                if (i < typedWord.length) {
                    if (typedWord.charAt(i) === wordArray[i]) {
                        displayHTML += `<span style="color: green">${typedWord.charAt(i)}</span>`;
                    } else {
                        displayHTML += `<span style="color: red">${typedWord.charAt(i)}</span>`;
                    }
                } else {
                    displayHTML += wordArray[i];
                }
            }
            wordDisplay.innerHTML = displayHTML;

            if (typedWord === currentWord) {
                currentWordIndex = Math.floor(Math.random() * words.length);
                currentWord = words[currentWordIndex];
                wordArray = currentWord.split('');
                wordDisplay.textContent = currentWord;
                event.target.value = "";
                typedWord = "";
            }
        } else {
            endGame();
        }
    });
}

function createInput() {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "userInput");
    input.setAttribute("autofocus", "autofocus");
    document.getElementById("gameBody").appendChild(input);
}

function removeInput() {
    var input = document.getElementById("userInput");
    if (input) {
        input.parentNode.removeChild(input);
    }
}
//--END OF TYPING CATEGORY