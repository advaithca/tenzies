import React from "react"

export default function Die(props){
    return(
        <div className="Die" style={props.style} name={props.id} onClick={(event)=>props.holdDice(props.id,event)}>
            {props.value}
        </div>
    )
}