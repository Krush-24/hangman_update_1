var animalList=["Elephant","Lion","Tiger","Giraffe","Kangaroo","Zebra","Panda","Rhinoceros","Hippopotamus","Gorilla"];
var animalHint={0:["It's a mammal kind","It's the largest animal"],1:["King of the Jungle"],2:["It's the largest wild cats in the world","It has unique stripes"],3:["It has the long neck"],4:["It can jump in 2 legs","Seen mostly in Australia"],5:["It has the same color as traffic signal predastrian crossing"],6:["It loves to eat bamboo"],7:["It has a horn above his face"],8:["It's the weighted mammal in both land and water","It looks so fatty"],9:["Man evaluated from this animal","We have movies related to this animal"]};
var birdList=["Eagle", "Cuckoo", "Parrot", "Bat", "Penguin", "Pigeon", "Crow", "Seagull", "Swan", "Peacock"];
var birdHint={0:["Fly so high","Has sharp eye"],1:["It's sounds so good in morning"],2:["It can speak like human"],3:["Hunts only at night"],4:["Lives in frost region"],5:["Symbol of Peace","Human will pet as well as eat"],6:["It's color is black"],7:["Only seen in foreign contries on beach side","Steals the food from human"],8:["It can split water and milk separately"],9:["National bird of India"]}
var carList=["Toyota", "Honda", "Ford", "Chevrolet", "Tesla", "BMW", "Audi", "Benz", "Volkswagen", "Hyundai"];
var carHint={0:["It has fortuner varient"],1:["It has 'H' as symbol with straight alignment"],2:["It has 4 letter covered by blue background","It has mustang varient"],3:["Symbol looks like plus with yellow color"],4:["AI generated Vehicle","His owner name is muskmelon"],5:["Bayerische Motoren Werke - in short form"],6:["4 circles in the symbol"],7:["symbol will have 'Y' inverted inside circle"],8:["It has 2 letters V & W"],9:["It has 'H' as symbol with Italic alignment"]}
var bikeList=["Kawasaki", "Yamaha", "Honda","Suzuki", "BMW", "KTM", "RoyalEnfield", "Bajaj", "Hero", "TVS"];
var bikeHint={0:["Fastest bike in the world"],1:["Most saled bike","Best sports varient"],2:["It's name starts with 'H'"],3:["Second and fourth letter is 'U'"],4:["Bayerische Motoren Werke - in short form"],5:["Most death rated bike","Orange is it's major color"],6:["Strongest Bike","Heaviest Bike"],7:["Third and fifth letter is 'J'"],8:["It's separated from one another company starts with 'H'"],9:["Thirukkurungudi Vengaram Sundaram","Indian Family"]}
var wrongGuesses = 0;
const maxGuesses = 7;
var guessedLetters = [];
var hint = [];
var hintCount=0;
let timeRemaining1 = 60; // 1 minutes in seconds
let timerInterval1;
let timeRemaining2 = 30;
let timerInterval2;
let timeRemaining3 = 15;
let timerInterval3;

function getCategory()
{
    var category = document.querySelector("#category").value;
    localStorage.setItem("category",category);
}
function loadFunction()
{
    var category = localStorage.getItem("category");
    document.getElementById('output').innerHTML = category;
    if(category=='animals')
    {
        var index = Math.floor(Math.random() * animalList.length);
        var selectedWord = animalList[index].toUpperCase();
        hint = animalHint[index];
        var guessedLetters = [];
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
    }
    else if(category=='birds')
    {
        var index = Math.floor(Math.random() * animalList.length);
        var selectedWord = birdList[index].toUpperCase();
        hint = birdHint[index];
        var guessedLetters = [];
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
    }
    else if(category=='car')
    {
        var index = Math.floor(Math.random() * carList.length);
        var selectedWord = carList[index].toUpperCase();
        hint = carHint[index];
        var guessedLetters = [];
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
    }
    else
    {
        var index = Math.floor(Math.random() * bikeList.length);
        var selectedWord = bikeList[index].toUpperCase();
        hint = bikeHint[index];
        var guessedLetters = [];
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");    
    }
    const keyboardElement = document.getElementById("keyboard");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    keyboardElement.innerHTML = alphabet.map(letter => `<button class="key" onclick="handleGuess('${letter}')">${letter}</button>`).join("");
    startTimer1();
}

function handleGuess(letter)
{
    var selectedWord = localStorage.getItem("selectedWord");
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        if(wrongGuesses>1)
        {
            updateHangman();
            wrongGuesses--;
        }
        else{
            updateHangman();
        }
        var audio = document.getElementById("correct_letter");
        audio.play();
    } else {
        var audio = document.getElementById("wrong_letter");
        audio.play();
        wrongGuesses++;
        updateHangman();
    }
    displayWord();
    checkStatus();
}

function displayWord()
{
    var selectedWord = localStorage.getItem("selectedWord");
    document.getElementById("word").innerHTML = selectedWord.toUpperCase()
            .split("")
            .map(letter => guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");    
}

var flag1=0,flag2=0,flag3=0,flag4=0,flag5=0,flag6=0;
function updateHangman()
{
    switch(wrongGuesses)
    {
        case 1: 
        if(flag1==0){
        document.getElementById('hat').style.opacity = 1;
        document.getElementById('hat_line').style.opacity = 1;
        flag1=1;
        }
        else{
        document.getElementById('hat').style.opacity = 0;
        document.getElementById('hat_line').style.opacity = 0;
        wrongGuesses--;
        flag1=0;
        }
        break;
        case 2: 
        if(flag2==0){
            document.getElementById('head').style.opacity = 1;
            flag2=1;
        }
        else{
            document.getElementById('head').style.opacity = 0;
            flag2=0;
        }
        break;
        case 3:
        if(flag3==0){
            document.getElementById('cbody').style.opacity = 1;
            flag3=1;
        }
        else{
            document.getElementById('cbody').style.opacity = 0;
            flag3=0;
        }
        break;
        case 4:
        if(flag4==0){
            document.getElementById('larm').style.opacity = 1;
            flag4=1;
        }
        else{
            document.getElementById('larm').style.opacity = 0;
            flag4=0;
        }
        break;
        case 5:
        if(flag5==0){
            document.getElementById('rarm').style.opacity = 1;
            flag5=1;
        }
        else{
            document.getElementById('rarm').style.opacity = 0;
            flag5=0;
        }
        break;
        case 6:
        if(flag6==0){
            document.getElementById('lleg').style.opacity = 1;
            flag6=1;
        }
        else{
            document.getElementById('lleg').style.opacity = 0;
            flag6=0;
        }
        break;
        case 7: document.getElementById('rleg').style.opacity = 1;break;
    }
}

function checkStatus()
{
    var selectedWord = localStorage.getItem("selectedWord");
    var exists = new Map();
    var word = "";
    for(let i=0;i<selectedWord.length;i++)
    {
        if(!exists.has(selectedWord[i]))
        {
            word+=selectedWord[i];
            exists.set(selectedWord[i],1);
        }
    }
    if (word.length==guessedLetters.join('').length) {
        document.getElementById("message").textContent = "🎉 You guessed the word correctly!";
        disableKeys();
        var audio = document.getElementById("found");
        audio.play();
        clearInterval(timerInterval1); // Stop the timer
        document.getElementById("nextbtn").style.opacity = 1;
    } else if (wrongGuesses >= maxGuesses) {
        document.getElementById("message").textContent = `😢 You missed to guess it correctly! The word was: ${selectedWord}`;
        disableKeys();
        var audio = document.getElementById("failed");
        audio.play();
        clearInterval(timerInterval1); // Stop the timer
    }
}

function disableKeys() {
    document.querySelectorAll(".key").forEach(button => button.disabled = true);
}

function startTimer1() {
    const timerElement = document.getElementById("timer");

    timerInterval1 = setInterval(() => {
        if (timeRemaining1 > 0) {
            timeRemaining1--;
            updateTimerDisplay1(timerElement, timeRemaining1);
        } else {
            clearInterval(timerInterval1);
            document.getElementById("message").textContent = "⏰ Time's up! You couldn't guess the word.";
            disableKeys();
            var audio = document.getElementById("failed");
            audio.play();
        }
    }, 1000);
}

function updateTimerDisplay1(element, time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    element.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2,"0")}`;
}

var flagHint=0;
function handleHint()
{
    if(hintCount<3)
    {
        const dialogBox = document.getElementById("dialogBox");
        if(flagHint==0)
        {
            clearInterval(timerInterval1);
            dialogBox.classList.remove("hidden");
            dialogBox.classList.add("active");
            document.getElementById("hintoutput").textContent = hint;
            flagHint=1;
            hintCount++;
        }
        else
        {
            dialogBox.classList.remove("active");
            dialogBox.classList.add("hidden");
            const timerElement = document.getElementById("timer");
            timerInterval1 = setInterval(() => {
                if (timeRemaining1 > 0) {
                    timeRemaining1--;
                    updateTimerDisplay1(timerElement, timeRemaining1);
                }
            },1000)
            flagHint=0;
        }
    }
    else
    {
        const hint = document.getElementById("hint");
        const dialogBox = document.getElementById("dialogBox");
        hint.classList.remove("active");
        hint.classList.add("hidden");
        dialogBox.classList.remove("active");
        dialogBox.classList.add("hidden");
    }
}

// level 2 functions
var index1=-1,index2=-1;
function loadFunction2()
{
    var category = localStorage.getItem("category");
    document.getElementById('output').innerHTML = category;
    if(category=='animals')
    {
        var index = Math.floor(Math.random() * animalList.length);
        var selectedWord = animalList[index].toUpperCase();
        hint = animalHint[index];
        index1 = Math.floor(Math.random() * selectedWord.length);
        index2 = Math.floor(Math.random() * selectedWord.length);
        if(index1==index2)
        {
            index2 = Math.floor(Math.random() * selectedWord.length);
        }
        var guessLetters = [];
        guessLetters.push(selectedWord[index1]);
        guessLetters.push(selectedWord[index2]);
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
        guessedLetters = guessLetters;
    }
    else if(category=='birds')
    {
        var index = Math.floor(Math.random() * animalList.length);
        var selectedWord = birdList[index].toUpperCase();
        hint = birdHint[index];
        index1 = Math.floor(Math.random() * selectedWord.length);
        index2 = Math.floor(Math.random() * selectedWord.length);
        if(index1==index2)
        {
            index2 = Math.floor(Math.random() * selectedWord.length);
        }
        var guessLetters = [];
        guessLetters.push(selectedWord[index1]);
        guessLetters.push(selectedWord[index2]);
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
        guessedLetters = guessLetters;
    }
    else if(category=='car')
    {
        var index = Math.floor(Math.random() * carList.length);
        var selectedWord = carList[index].toUpperCase();
        hint = carHint[index];
        index1 = Math.floor(Math.random() * selectedWord.length);
        index2 = Math.floor(Math.random() * selectedWord.length);
        if(index1==index2)
        {
            index2 = Math.floor(Math.random() * selectedWord.length);
        }
        var guessLetters = [];
        guessLetters.push(selectedWord[index1]);
        guessLetters.push(selectedWord[index2]);
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
        guessedLetters = guessLetters;
    }
    else
    {
        var index = Math.floor(Math.random() * bikeList.length);
        var selectedWord = bikeList[index].toUpperCase();
        hint = bikeHint[index];
        index1 = Math.floor(Math.random() * selectedWord.length);
        index2 = Math.floor(Math.random() * selectedWord.length);
        if(index1==index2)
        {
            index2 = Math.floor(Math.random() * selectedWord.length);
        }
        var guessLetters = [];
        guessLetters.push(selectedWord[index1]);
        guessLetters.push(selectedWord[index2]);
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
        guessedLetters = guessLetters;
    }
    const keyboardElement = document.getElementById("keyboard");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    keyboardElement.innerHTML = alphabet.map(letter => `<button class="key" onclick="handleGuess2('${letter}')">${letter}</button>`).join("");
    startTimer2();
}

function handleGuess2(letter)
{
    var selectedWord = localStorage.getItem("selectedWord");
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        if(wrongGuesses>1)
        {
            updateHangman2();
            wrongGuesses--;
        }
        else{
            updateHangman2();
        }
        var audio = document.getElementById("correct_letter");
        audio.play();
    } else {
        var audio = document.getElementById("wrong_letter");
        audio.play();
        wrongGuesses++;
        updateHangman2();
    }
    displayWord2();
    checkStatus2();
}

function displayWord2()
{
    var selectedWord = localStorage.getItem("selectedWord");
    document.getElementById("word").innerHTML = selectedWord.toUpperCase()
            .split("")
            .map(letter => guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");    
}

var flag1=0,flag2=0,flag3=0,flag4=0,flag5=0,flag6=0;
function updateHangman2()
{
    switch(wrongGuesses)
    {
        case 1: 
        if(flag1==0){
        document.getElementById('hat').style.opacity = 1;
        document.getElementById('hat_line').style.opacity = 1;
        flag1=1;
        }
        else{
        document.getElementById('hat').style.opacity = 0;
        document.getElementById('hat_line').style.opacity = 0;
        wrongGuesses--;
        flag1=0;
        }
        break;
        case 2: 
        if(flag2==0){
            document.getElementById('head').style.opacity = 1;
            flag2=1;
        }
        else{
            document.getElementById('head').style.opacity = 0;
            flag2=0;
        }
        break;
        case 3:
        if(flag3==0){
            document.getElementById('cbody').style.opacity = 1;
            flag3=1;
        }
        else{
            document.getElementById('cbody').style.opacity = 0;
            flag3=0;
        }
        break;
        case 4:
        if(flag4==0){
            document.getElementById('larm').style.opacity = 1;
            flag4=1;
        }
        else{
            document.getElementById('larm').style.opacity = 0;
            flag4=0;
        }
        break;
        case 5:
        if(flag5==0){
            document.getElementById('rarm').style.opacity = 1;
            flag5=1;
        }
        else{
            document.getElementById('rarm').style.opacity = 0;
            flag5=0;
        }
        break;
        case 6:
        if(flag6==0){
            document.getElementById('lleg').style.opacity = 1;
            flag6=1;
        }
        else{
            document.getElementById('lleg').style.opacity = 0;
            flag6=0;
        }
        break;
        case 7: document.getElementById('rleg').style.opacity = 1;break;
    }
}

function checkStatus2()
{
    var selectedWord = localStorage.getItem("selectedWord");
    var exists = new Map();
    var word = "";
    for(let i=0;i<selectedWord.length;i++)
    {
        if(!exists.has(selectedWord[i]))
        {
            word+=selectedWord[i];
            exists.set(selectedWord[i],1);
        }
    }
    if (word.length==guessedLetters.join('').length) {
        document.getElementById("message").textContent = "🎉 You guessed the word correctly!";
        disableKeys2();
        var audio = document.getElementById("found");
        audio.play();
        clearInterval(timerInterval2); // Stop the timer
        document.getElementById("nextbtn").style.opacity = 1;
    } else if (wrongGuesses >= maxGuesses) {
        document.getElementById("message").textContent = `😢 You missed to guess it correctly! The word was: ${selectedWord}`;
        disableKeys2();
        var audio = document.getElementById("failed");
        audio.play();
        clearInterval(timerInterval2); // Stop the timer
    }
}

function disableKeys2() {
    document.querySelectorAll(".key").forEach(button => button.disabled = true);
}

function startTimer2() {
    const timerElement = document.getElementById("timer");

    timerInterval2 = setInterval(() => {
        if (timeRemaining2 > 0) {
            timeRemaining2--;
            updateTimerDisplay2(timerElement, timeRemaining2);
        } else {
            clearInterval(timerInterval2);
            document.getElementById("message").textContent = "⏰ Time's up! You couldn't guess the word.";
            disableKeys2();
            var audio = document.getElementById("failed");
            audio.play();
        }
    }, 1000);
}

function updateTimerDisplay2(element, time) {
    const minutes = 0;
    const seconds = time % 60;
    element.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2,"0")}`;
}

var flagHint=0;
function handleHint2()
{
    if(hintCount<3)
    {
        const dialogBox = document.getElementById("dialogBox");
        if(flagHint==0)
        {
            clearInterval(timerInterval2);
            dialogBox.classList.remove("hidden");
            dialogBox.classList.add("active");
            document.getElementById("hintoutput").textContent = hint;
            flagHint=1;
            hintCount++;
        }
        else
        {
            dialogBox.classList.remove("active");
            dialogBox.classList.add("hidden");
            const timerElement = document.getElementById("timer");
            timerInterval2 = setInterval(() => {
                if (timeRemaining2 > 0) {
                    timeRemaining2--;
                    updateTimerDisplay2(timerElement, timeRemaining2);
                }
            },1000)
            flagHint=0;
        }
    }
    else
    {
        const hint = document.getElementById("hint");
        const dialogBox = document.getElementById("dialogBox");
        hint.classList.remove("active");
        hint.classList.add("hidden");
        dialogBox.classList.remove("active");
        dialogBox.classList.add("hidden");
    }
}


// level 3 function load
function loadFunction3()
{
    var category = localStorage.getItem("category");
    document.getElementById('output').innerHTML = category;
    if(category=='animals')
    {
        var index = Math.floor(Math.random() * animalList.length);
        var selectedWord = animalList[index].toUpperCase();
        var guessLetters = [];
        guessLetters.push(selectedWord[0]);
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
        guessedLetters = guessLetters;
    }
    else if(category=='birds')
    {
        var index = Math.floor(Math.random() * animalList.length);
        var selectedWord = birdList[index].toUpperCase();
        var guessLetters = [];
        guessLetters.push(selectedWord[0]);
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
        guessedLetters = guessLetters;
    }
    else if(category=='car')
    {
        var index = Math.floor(Math.random() * carList.length);
        var selectedWord = carList[index].toUpperCase();
        var guessLetters = [];
        guessLetters.push(selectedWord[0]);
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
        guessedLetters = guessLetters;
    }
    else
    {
        var index = Math.floor(Math.random() * bikeList.length);
        var selectedWord = bikeList[index].toUpperCase();
        var guessLetters = [];
        guessLetters.push(selectedWord[0]);
        localStorage.setItem("selectedWord",selectedWord);
        document.getElementById("word").innerHTML = selectedWord
            .split("")
            .map(letter => guessLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");
        guessedLetters = guessLetters;
    }
    const keyboardElement = document.getElementById("keyboard");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    keyboardElement.innerHTML = alphabet.map(letter => `<button class="key" onclick="handleGuess3('${letter}')">${letter}</button>`).join("");
    startTimer3();
}

function handleGuess3(letter)
{
    var selectedWord = localStorage.getItem("selectedWord");
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        if(wrongGuesses>1)
        {
            updateHangman3();
            wrongGuesses--;
        }
        else{
            updateHangman3();
        }
        var audio = document.getElementById("correct_letter");
        audio.play();
    } else {
        var audio = document.getElementById("wrong_letter");
        audio.play();
        wrongGuesses++;
        updateHangman3();
    }
    displayWord3();
    checkStatus3();
}

function displayWord3()
{
    var selectedWord = localStorage.getItem("selectedWord");
    document.getElementById("word").innerHTML = selectedWord.toUpperCase()
            .split("")
            .map(letter => guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span class="letter"></span>`)
            .join("");    
}

var flag1=0,flag2=0,flag3=0,flag4=0,flag5=0,flag6=0;
function updateHangman3()
{
    switch(wrongGuesses)
    {
        case 1: 
        if(flag1==0){
        document.getElementById('hat').style.opacity = 1;
        document.getElementById('hat_line').style.opacity = 1;
        flag1=1;
        }
        else{
        document.getElementById('hat').style.opacity = 0;
        document.getElementById('hat_line').style.opacity = 0;
        wrongGuesses--;
        flag1=0;
        }
        break;
        case 2: 
        if(flag2==0){
            document.getElementById('head').style.opacity = 1;
            flag2=1;
        }
        else{
            document.getElementById('head').style.opacity = 0;
            flag2=0;
        }
        break;
        case 3:
        if(flag3==0){
            document.getElementById('cbody').style.opacity = 1;
            flag3=1;
        }
        else{
            document.getElementById('cbody').style.opacity = 0;
            flag3=0;
        }
        break;
        case 4:
        if(flag4==0){
            document.getElementById('larm').style.opacity = 1;
            flag4=1;
        }
        else{
            document.getElementById('larm').style.opacity = 0;
            flag4=0;
        }
        break;
        case 5:
        if(flag5==0){
            document.getElementById('rarm').style.opacity = 1;
            flag5=1;
        }
        else{
            document.getElementById('rarm').style.opacity = 0;
            flag5=0;
        }
        break;
        case 6:
        if(flag6==0){
            document.getElementById('lleg').style.opacity = 1;
            flag6=1;
        }
        else{
            document.getElementById('lleg').style.opacity = 0;
            flag6=0;
        }
        break;
        case 7: document.getElementById('rleg').style.opacity = 1;break;
    }
}

function checkStatus3()
{
    var selectedWord = localStorage.getItem("selectedWord");
    var exists = new Map();
    var word = "";
    for(let i=0;i<selectedWord.length;i++)
    {
        if(!exists.has(selectedWord[i]))
        {
            word+=selectedWord[i];
            exists.set(selectedWord[i],1);
        }
    }
    if (word.length==guessedLetters.join('').length) {
        document.getElementById("message").textContent = "🎉 You guessed the word correctly!";
        disableKeys3();
        var audio = document.getElementById("found");
        audio.play();
        clearInterval(timerInterval3); // Stop the timer
        document.getElementById("nextbtn").style.opacity = 1;
    } else if (wrongGuesses >= maxGuesses) {
        document.getElementById("message").textContent = `😢 You missed to guess it correctly! The word was: ${selectedWord}`;
        disableKeys3();
        var audio = document.getElementById("failed");
        audio.play();
        clearInterval(timerInterval3); // Stop the timer
    }
}

function disableKeys3() {
    document.querySelectorAll(".key").forEach(button => button.disabled = true);
}

function startTimer3() {
    const timerElement = document.getElementById("timer");

    timerInterval3 = setInterval(() => {
        if (timeRemaining3 > 0) {
            timeRemaining3--;
            updateTimerDisplay3(timerElement, timeRemaining3);
        } else {
            clearInterval(timerInterval3);
            document.getElementById("message").textContent = "⏰ Time's up! You couldn't guess the word.";
            disableKeys3();
            var audio = document.getElementById("failed");
            audio.play();
        }
    }, 1000);
}

function updateTimerDisplay3(element, time) {
    const minutes = 0;
    const seconds = time % 60;
    element.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2,"0")}`;
}
