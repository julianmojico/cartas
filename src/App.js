import React, { useState, useEffect } from 'react'
import './styles.css'
import Imports from './imports'
import { randomize, isEmptyArray } from './utils'
import CardDeck from './CardDeck'
import { ReactComponent as TitleSvg } from './title.svg'
import Footer from './Footer'

function App() {

    const [cards, setCards] = useState([])

    useEffect(() => {
        isEmptyArray(cards) && setCards(randomize(Imports))
    }, [cards]);

    return (
        <>
            <div className="titleContainer">
                <TitleSvg className="title"/>
            </div>
            {!isEmptyArray(cards) && <CardDeck cards={cards} setCards={setCards} />}
            <Footer/>
        </>
    )
}


export default App;