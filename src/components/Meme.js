import React, { useEffect } from "react";
import { useState } from "react";

export default function Meme() {
    const [allMemes, setAllMemes] = React.useState([])
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    function handleChange(event) {
        setMeme((prev) => {
            return (
                {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            )
        })
    }
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function newImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    return (
        <>
            <input type="text"
                name="topText"
                onChange={handleChange}
                value={meme.topText}
            />
            <input type="text"
                name="bottomText"
                onChange={handleChange}
                value={meme.bottomText}
            />
            <button onClick={newImage}>Generate Image</button>

            <div className="meme">
                <img src={meme.randomImage}
                    alt=""
                />
                <h3 id="topText">{meme.topText}</h3>
                <h3 id="bottomText">{meme.bottomText}</h3>
            </div>
        </>
    )
}