import React from 'react'
import Card from "./Components/Card"

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export default function Main() {
    const [game, setGame] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [check, setCheck] = React.useState(false)
    const [count, setCount] = React.useState(0)

    function begin() {
        setGame(true)
    }

    console.log(questions)
    console.log(check)

    function fetchQuestion() {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setQuestions(ques => ques.map(q => {
                    return {
                        ...q, options
                            : q.incorrect_answers.concat(q.correct_answer)
                    }
                }))
                setQuestions(ques => {
                    let newQues = []
                    for (let q of ques) {
                        let Randomoptions = []
                        while (q.options.length > 0) {
                            let randomNum = Math.floor(Math.random() * q.options.length)
                            let randomOpt = q.options.splice(randomNum, 1)
                            Randomoptions.push(decodeHtml(...randomOpt))
                        }
                        newQues.push({
                            question: decodeHtml(q.question),
                            answer: decodeHtml(q.correct_answer),
                            newOptions: Randomoptions,
                            clickedValue: null
                        })
                    }

                    return newQues
                })

            })


    }

    React.useEffect(function () {
        fetchQuestion()
    }, [])



    function handleClickedOption(q, option) {
        setQuestions(prevQues => prevQues.map(ques => {
            if (q === ques.question) {

                return { ...ques, clickedValue: option }
            } else {
                return ques
            }
        }))
    }

    function checkAnswer() {
        if (questions.every(q => q.clickedValue !== null)) {
            for (let question of questions) {
                if (question.answer === question.clickedValue) {
                    setCount(prevCount => prevCount + 1)
                }
            }

            setCheck(true)
        }
    }
    function resetGame() {
        setQuestions([])
        setCheck(false)
        setCount(0)
        fetchQuestion()
    }

    const quiz = questions.map(ques => {
        return <Card className="card"
            key={questions.indexOf(ques)}
            question={ques.question}
            options={ques.newOptions}
            answer={ques.answer}
            clickedValue={ques.clickedValue}
            handleClickedOption={handleClickedOption}
            isChecked={check}
        />
    })
    //console.log("quiz", quiz)
    return (
        game ?
            <div>
                {
                    questions.length === 0 ?
                        (<div className='loadBar' style={{ display: "block" }}>
                            <div className='loader'></div>
                        </div>
                        )

                        :

                        (<div className='arena'>
                            {...quiz}
                            {!check && questions.length && <button onClick={checkAnswer} className="check">check answer</button>}
                            {check && <div className="afterCheck">
                                <h3 > You scored {count}/5 correct answers </h3>
                                <button onClick={resetGame} className="reset"> Reset </button>
                            </div>}
                        </div>
                        )
                }
            </div>
            : <div className="start">
                <h1>Quizzical</h1>
                <p> Test your General Knowledge</p>
                <button onClick={begin}>Start Quiz</button>
            </div>
    )
}