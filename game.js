let gameItems = {
    'plyr1': { 'spnScr': '#f1', 'div': '#f-box', 'score': 0 },
    'plyr2': { 'spnScr': '#f2', 'div': '#s-box', 'score': 0 },
    'crts': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'K', 'J', 'Q'],
    'crtMtchs': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'A': 10, 'K': 10, 'J': 10, 'Q': 10 },
    'wins': 0,
    'loss': 0,
    'ties': 0,
};

const PLY1 = gameItems['plyr1'];
const PLY2 = gameItems['plyr2'];

const pushSound = new Audio('sounds/swish.m4a');
const dltSound = new Audio('sounds/mas.mp3');
const winSound = new Audio('sounds/cash.mp3');
const losSound = new Audio('sounds/aww.mp3');


document.querySelector('#btn-1').addEventListener('click', One);
document.querySelector('#btn-3').addEventListener('click', deletAll);
document.querySelector('#btn-2').addEventListener('click', Two);

//Major function
function One() {
    let print = randomNumber();
    showCarts(print, PLY1);
    showResult(PLY1);
    let pick = Winnr()
    prntWinner(pick);

}

function randomNumber() {
    let singleNumber = Math.floor(Math.random() * 13);
    return gameItems['crts'][singleNumber];
}
// Minor function 
function showCarts(print, player) {
    let folderImages = document.createElement('img');
    folderImages.src = `images/${print}.png`;
    document.querySelector(player['div']).appendChild(folderImages);
    pushSound.play();
    player['score'] += gameItems['crtMtchs'][print];
}
//Minor function
function deletAll() {
    let plyr1Imamges = document.querySelector('#f-box').querySelectorAll('img');
    for (let i = 0; i < plyr1Imamges.length; i++) {
        plyr1Imamges[i].remove();
    }

    let plyr2Images = document.querySelector('#s-box').querySelectorAll('img');
    for (let i = 0; i < plyr2Images.length; i++) {
        plyr2Images[i].remove();
    }
    document.querySelector('#f1').textContent = 0;
    document.querySelector('#f2').textContent = 0;

    document.querySelector('#f1').style.color = 'black';
    document.querySelector('#f2').style.color = 'black';

    document.querySelector('#rsut-1').textContent = 'Play';
    document.querySelector('#rsut-1').style.color = 'black';
}

//Minor function 
function showResult(player) {
    if (player['score'] > 21) {
        document.querySelector(player['spnScr']).textContent = 'BOST!';
        document.querySelector(player['spnScr']).style.color = 'red';

    } else {

        document.querySelector(player['spnScr']).textContent = player['score'];
    }

}
//Major one too
function Two() {
    let print = randomNumber();
    showCarts(print, PLY2);
    showResult(PLY2);
    if (PLY2['score'] > 19) {
        let pick = Winnr()
        prntWinner(pick);
    }
}

function Winnr() {
    let winner;
    if (PLY1['score'] <= 21) {

        if (PLY1['score'] > PLY2['score'] || (PLY2['score'] > 21)) {
            gameItems['wins']++;
            winner = PLY1;

        } else if (PLY1['score'] < PLY2['score']) {
            winner = PLY2;
            gameItems['loss']++;

        } else if (PLY1['score'] === PLY2['score']) {
            gameItems['ties']++;
        }
    } else if (PLY1['score'] > 21 && PLY2['score'] <= 21) {
        gameItems['loss']++;
        winner = PLY2;

    } else if (PLY1['score'] > 21 && PLY2['score'] > 21) {
        gameItems['ties']++;
    }
    return winner;
}

function prntWinner(pick) {
    let message, mssageColor;


    if (pick === PLY1) {
        document.querySelector('#w').textContent = gameItems['wins'];
        message = 'PLY1 Win!';
        mssageColor = 'green';
        winSound.play();

    } else if (pick === PLY2) {
        document.querySelector('#l').textContent = gameItems['loss'];
        message = 'PLY1 Lost!';
        mssageColor = 'red';
        losSound.play();

    } else {
        document.querySelector('#t').textContent = gameItems['ties'];
        message = 'PLY1 tie';
        mssageColor = 'black';
    }




}