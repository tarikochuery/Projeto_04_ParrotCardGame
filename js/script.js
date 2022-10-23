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

    let numberOfMatches = 0;
    const cards = document.querySelectorAll('.flipper');

    cards.forEach(flipper => flipper.addEventListener('click', () => flipCard(flipper)));

    // while (numberOfMatches < numberOfImages) {
    //     const flippedCards = document.querySelectorAll('is-flipped');
    //     if (flippedCards.length == 2) {
    //         compareCards(flippedCards[0], flippedCards[1]) && numberOfMatches++;
    //     }
    // }
};

const buildCardHTMLElement = (imageSrc) => {
    return `<div class="card">
        <div class="flipper">
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



const flipCard = (element) => {
    element.classList.toggle('is-flipped');
};

function compareCards(card1, card2) {
    return card1.querySelector('#card-image').src === card2.querySelector('#card-image').src;
}



//TODO: Implementar lógica do jogo da memória