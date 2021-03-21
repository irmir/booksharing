import React from 'react'

import { Input } from '../common/Input'

import whiteStar from '../../image/star-white.svg'
import goldWhiteStar from '../../image/star-gold-white.svg'
import goldStar from '../../image/star-gold.svg'


export const Rating = ({ rank, bookId }) => {

    const goldStars = []
    const goldWhiteStars = []
    const whiteStars = []
    let count = 0

    debugger
    if ((rank ^ 0) !== rank) {
        rank = Math.floor(rank)
        goldWhiteStars.push(rank + 1)
    }

    for (let i = 0; i < rank; i++) {
        goldStars.push(i + 1)
        count++
    }

    if (goldWhiteStars.length) {
        count++
    }

    if (count < 5) {
        for (let i = count; i < 5; i++) {
            whiteStars.push(i + 1)
        }
    }

    const onChange = (event) => {   
        console.log(event.target.value)
    }

    // const onMouseOver = (event) => {
    // }

    // const onMouseOut = (event) => {
    // }

    return (
         <div className="stars-group">
            {
                goldStars && goldStars.map(item => (
                    <>
                        <label For={`star-${item}-${bookId}`} className="stars-label" style={{ backgroundImage: `url(${goldStar})` }}>
                            <Input onChange={onChange}  type="radio" className="stars-input" id={`star-${item}-${bookId}`}
                                value={item} key={item} name={`star-for-${bookId}`} />
                        </label>
                    </>
                ))
            }
            {
                goldWhiteStars && goldWhiteStars.map(item => (
                    <>
                        <label For={`star-${item}-${bookId}`} className="stars-label" style={{ backgroundImage: `url(${goldWhiteStar})` }}>
                            <Input onChange={onChange} type="radio" className="stars-input" id={`star-${item}-${bookId}`}
                                value={item} key={item} name={`star-for-${bookId}`} />
                        </label>
                    </>
                ))
            }
            {
                whiteStars && whiteStars.map(item => (
                    <>
                        <label For={`star-${item}-${bookId}`} className="stars-label" style={{ backgroundImage: `url(${whiteStar})` }}>
                            <Input onChange={onChange} type="radio" className="stars-input" id={`star-${item}-${bookId}`}
                                value={item} key={item} name={`star-for-${bookId}`}  />
                        </label>
                    </>
                ))
            }
        </div>
    )
}