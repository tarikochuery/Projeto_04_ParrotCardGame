let moves;
let matches;
let numberOfCards;
let cardsInTheGame = [];
const imagesSrcs = [
    'bobrossparrot.gif',
    'explodyparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'
];
let secondsAmount = 0;
let startTimer;

const setTimer = () => {
    const timer = document.querySelector('.timer');
    const SECONDS_DIVIDER = 60;
    const minutes = Number((secondsAmount / SECONDS_DIVIDER).toFixed(0)).toLocaleString('pt-br', { minimumIntegerDigits: 2 });
    const seconds = (secondsAmount % SECONDS_DIVIDER).toLocaleString('pt-br', { minimumIntegerDigits: 2 });
    timer.innerHTML = `${minutes}:${seconds}`;
};


const startGame = () => {
    document.querySelector('.cards-container').innerHTML = '';
    secondsAmount = 0;
    matches = 0;
    moves = 0;
    numberOfCards = Number(prompt('Com quantas cartas deseja jogar?'));
    while (numberOfCards < 4 || numberOfCards > 14 || (numberOfCards % 2) !== 0) {
        alert('Insira um valor par entre 4 e 14');
        numberOfCards = Number(prompt('Com quantas cartas deseja jogar?'));
    }

    const numberOfImages = numberOfCards / 2;
    console.log(numberOfImages);
    buildCardsArray(numberOfImages);
    placeCardsOnScreen();
    startTimer = setInterval(() => {
        secondsAmount++;
        setTimer();
    }, 1000);
};

const endGame = () => {
    const message = `Você ganhou em ${moves} jogadas, em ${secondsAmount} segundos!`;
    alert(message);
    clearInterval(startTimer);
    let restartGame = prompt('Deseja reiniciar a partida? sim ou não');
    while (restartGame !== 'sim' && restartGame !== 'não') {
        alert('Resposta inválida. Digite "sim" ou "não"');
        restartGame = prompt('Deseja reiniciar a partida? sim ou não');
    }
    restartGame === 'sim' && startGame();
};

const buildCardHTMLElement = (imageSrc) => {
    return `<div class="card">
        <div class="flipper" onclick="makeMove(this)">
            <div class="back-card">
                <img src="./assets/back.png">
            </div>
            <div class="front-card">
                <img id="card-image" src="./assets/${imageSrc}">
            </div>
        </div>
    </div>`;
};

const buildCardsArray = (numberOfImages) => {
    const imagesInGame = imagesSrcs.filter((image, idx) => idx < numberOfImages);
    cardsInTheGame = imagesInGame.map(image => (buildCardHTMLElement(image)));
    cardsInTheGame = [...cardsInTheGame, ...cardsInTheGame];
    shuffle(cardsInTheGame);
    console.log(cardsInTheGame);
};

const placeCardsOnScreen = () => {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = cardsInTheGame.join(' ');
};

const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

startGame();

const cards = document.querySelectorAll('.flipper');

const flipCard = (element) => {
    element.classList.toggle('is-flipped');
    element.classList.toggle('chosen');
    element.getAttribute('onclick') ? element.setAttribute('onclick', '') : element.setAttribute('onclick', 'makeMove(this)');
};

const isAMatch = (card1, card2) => {
    const image1 = card1.querySelector('#card-image').src;
    const image2 = card2.querySelector('#card-image').src;
    return image1 === image2;
};

function makeMove(element) {
    moves++;
    flipCard(element);
    const chosenCards = document.querySelectorAll('.chosen');
    if (chosenCards.length == 2) {
        if (isAMatch(chosenCards[0], chosenCards[1])) {
            chosenCards.forEach(card => {
                card.classList.remove('chosen');
            });
            matches++;
            setTimeout(() => {
                matches === (numberOfCards / 2) && endGame();
            }, 500);
            return;
        }

        setTimeout(() => {
            chosenCards.forEach(card => flipCard(card));
        }, 1000);
        return;
    }

    return;
};
