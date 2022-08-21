import React from "react"
export default function Splash(props){
    
    return (
        <div className="splash--container">
            <h1 className="splash--title">Quizzical</h1>
            <p className="splash--description">Test your general knowledge</p>
            {props.ready?
            (<button className="splash--start-btn" onClick={props.start} disabled={!props.ready} >Start Quiz</button>):
            <p>Loading...</p>
            }
            
        </div>
    )
}