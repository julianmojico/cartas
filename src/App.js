import React, { useState, useEffect } from 'react'
import './styles.css'
import Imports from './imports'
import { randomize } from './utils'
import CardDeck from './CardDeck'


function App() {

    const [cards, setCards] = useState([])

    useEffect(() => {
        if (cards.length === 0) {
            setCards(randomize(Imports))
        }
    }, [cards]);

    return (cards.length != 0) && <CardDeck cards={cards} setCards={setCards} />
}


export default App;