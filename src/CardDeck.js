import React, { useState } from 'react'
import { useSprings, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './styles.css'


// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 + 4000 })
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -2000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function CardDeck({ cards, setCards }) {

    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, set] = useSprings(cards.length, (i) => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity

    const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        set((i) => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.3 : 1 // Active cards lift up a bit
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })

        //Finish, all cards clear, startover.
        if (!down && gone.size === cards.length) {
            setTimeout(() => {
                gone.clear();
                setCards([]);
            }, 600)
        }
    })

    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return <div className="carddeck">

        {props.map(({ x, y, rot, scale }, i) => (
            <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,calc(${y}px - 10vh),0)`) }}>
                {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                <animated.div className="card" {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }} />
            </animated.div>
        ))}
        <svg>
            <filter id="grayscale-filter">
                <feColorMatrix type="saturate" values="0" />
            </filter>
        </svg>
    </div>
}

export default CardDeck;