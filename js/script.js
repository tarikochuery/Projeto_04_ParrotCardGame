let numberOfCards
let cardsInTheGame = []
const imagesSrcs = [
    'bobrossparrot.gif', 
    'explodyparrot.gif', 
    'fiestaparrot.gif', 
    'metalparrot.gif', 
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'
]

const startGame = () => {
    numberOfCards = Number(prompt('Com quantas cartas deseja jogar?'))
    while (numberOfCards < 4 || numberOfCards > 14) {
        alert('Insira um valor entre 4 e 14')
        numberOfCards = Number(prompt('Com quantas cartas deseja jogar?'))
    }

    (numberOfCards % 2) === 0 ? numberOfCards = numberOfCards / 2 : numberOfCards = numberOfCards / 2 + 0.5
    buildCardsArray()
    placeCardsOnScreen()
}

const buildCardHTMLElement = (imageSrc) => {
    return `<div class="card">
        <div class="flipper">
            <div class="back-card">
                <img src="./assets/back.png">
            </div>
            <div class="front-card">
                <img src="./assets/${imageSrc}">
            </div>
        </div>
    </div>`
}

const buildCardsArray = () => {
    const imagesInGame = imagesSrcs.splice(0, numberOfCards)
    cardsInTheGame = imagesInGame.map(image => (buildCardHTMLElement(image)))
    cardsInTheGame = [...cardsInTheGame, ...cardsInTheGame]
    shuffle(cardsInTheGame)
}

const placeCardsOnScreen = () => {
    const cardsContainer = document.querySelector('.cards-container')
    cardsContainer.innerHTML = cardsInTheGame.join(' ')
}

const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

startGame()

const cards = document.querySelectorAll('.flipper')

const flipCard = (element) => {
    element.classList.toggle('is-flipped')
}
    
cards.forEach(flipper => flipper.addEventListener('click', () => flipCard(flipper)))
    