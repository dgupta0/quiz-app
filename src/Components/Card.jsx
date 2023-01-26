import React from 'react'
import Option from "./Option"

export default function Card(props) {
    function handleClick(value) {
        if (props.clickedValue === null) {
            props.handleClickedOption(props.question, value)
        }

    }

    const optionsArr = props.options.map(option => {
        return (
            <Option
                key={option}
                id={option}
                option={option}
                clicked={props.clickedValue === option}
                handleClick={handleClick}
                correctOption={props.answer}
                isChecked={props.isChecked}
            />
        )
    }

    )
    return (
        <div className="mcqs">
            <h3 className="question">{props.question}</h3>
            <div className="options">
                {...optionsArr}
            </div>
            <hr />
        </div>
    )
}