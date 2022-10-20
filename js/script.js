let moves = 0;
let matches = 0;
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

const startGame = () => {
    numberOfCards = Number(prompt('Com quantas cartas deseja jogar?'));
    while (numberOfCards < 4 || numberOfCards > 14 || (numberOfCards % 2) !== 0) {
        alert('Insira um valor par entre 4 e 14');
        numberOfCards = Number(prompt('Com quantas cartas deseja jogar?'));
    }

    const numberOfImages = numberOfCards / 2;

    buildCardsArray(numberOfImages);
    placeCardsOnScreen();
};

const endGame = () => {
    const message = `Você ganhou em ${moves} jogadas!`;
    alert(message);
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
    const imagesInGame = imagesSrcs.splice(0, numberOfImages);
    cardsInTheGame = imagesInGame.map(image => (buildCardHTMLElement(image)));
    cardsInTheGame = [...cardsInTheGame, ...cardsInTheGame];
    shuffle(cardsInTheGame);
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
            }, 1000);
            return;
        }

        setTimeout(() => {
            chosenCards.forEach(card => flipCard(card));
        }, 1000);

        return;
    }

    return;
};
