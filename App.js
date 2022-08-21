import React from "react"
import Splash from "./Splash"
import Quiz from "./Quiz"
import ReactDOM from "react-dom"
export default function App(){
    const apiUrl='https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'
    
    const [apiData,setApiData]=React.useState([])
    const [started,setStarted]=React.useState(false)
    const [gameEnd,setGameEnd]=React.useState(false)
    const [dataloaded,setDataLoaded]=React.useState(false)
    const [quizQuestions,setQuizQuestions]=React.useState()
    let display;
    
    function getDecodedString(str){
            const txt = document.createElement('textarea')
            txt.innerHTML = str
            return txt.value}
            
    React.useEffect(()=>{
        if(dataloaded)return;
        fetch(apiUrl)
        .then(response=>response.json())
        .then(data=>{
            setApiData(data.results)
                setDataLoaded(true)
                setQuizQuestions(buildQuestionsArray())
        })                
    },[apiData.length])
    
    
    function startQuiz(){
        setStarted(true)
    }
        function shuffle(array){
        let m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }
    const parser=new DOMParser()
    function buildQuestionsArray(){
        if(apiData.length){
            return apiData.map(data=>{
                let result={
                    question:getDecodedString(data.question),
                    correctAnswer:getDecodedString(data.correct_answer),
                    selectedOption:"",
                    options:[...data.incorrect_answers,data.correct_answer]
                }
                //removing the special characters
                result.options=result.options.map(o=>getDecodedString(o))
                result.options=shuffle(result.options)
                return result
            })
        }
    }
    function countCorrectAnswers(){
        let total=quizQuestions.reduce((count,question)=>{
            if (question.selectedOption===question.correctAnswer) {
            return count + 1;
        }
        return count;
        },0)
        return total
    }
    function resetGame(){    
        fetch(apiUrl)
        .then(response=>response.json())
        .then(data=>{
            setApiData(data.results)
                setDataLoaded(true)
                setQuizQuestions(buildQuestionsArray())
        }) 
        setGameEnd(false)
    }
    function checkAnswers(){
        console.log("Checking answers: ",countCorrectAnswers())
        setGameEnd(true);
    }
    function setSelected(question,selection){
        const newState=quizQuestions.map(
            q=>q.question===question?
            {...q,selectedOption:selection} : q
        )
        setQuizQuestions(newState)
    }
    if(started){
            const quizElements=quizQuestions.map(elt=>{
            return (<Quiz key={elt.question}
                    question={elt.question}
                    selectedOption={elt.selectedOption}
                    correctAnswer={elt.correctAnswer}
                    setSelected={setSelected}
                    options={elt.options}
                    gameEnd={gameEnd}
                    />)})
             
            display = ( <div className="quiz--container">
                            <div>{quizElements}</div>
                            {!gameEnd && 
                                <button className="quiz--check-btn"
                                        onClick={checkAnswers} >
                                        Check answers
                                </button>}  
                            {gameEnd &&(
                                <div className="quiz--reset-container">
                                    <p>You scored {countCorrectAnswers()}/{quizQuestions.length} correct answers</p>
                                    <button onClick={resetGame}>Play again</button>
                                </div>)}
                        </div>) 
        }
    else {  display =(<Splash start={startQuiz} ready={dataloaded}/>)}
    
    return(<main id="main">{display}</main>)
}