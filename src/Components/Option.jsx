import React from 'react'

export default function Option(props) {
    let backgroundColor = "";
    if (props.clicked) {
        backgroundColor = "#D6DBF5";
    } else {
        backgroundColor = "#F5F7FB";
    }
    if (props.isChecked) {
        const isCorrect = props.correctOption === props.option;
        if (props.clicked && !isCorrect) {
            backgroundColor = "#F8BCBC"
        }
        if (isCorrect) {
            backgroundColor = "#94D7A2"
        }
    }
    const styles = {
        backgroundColor: backgroundColor,

    }

    return (
        <button
            onClick={() => props.handleClick(props.option)}
            style={styles}
            className="choice">
            {props.option}
        </button>
    )
}



  // const [optionClicked, setOptionClicked] = React.useState(props.clicked)
    // function handleClick() {
    //     setOptionClicked(true)
    // }
