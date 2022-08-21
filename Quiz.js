import React from "react"
export default function Quiz(props){
    const { question,selectedOption,correctAnswer,setSelected,options,gameEnd}=props
    // console.log("selected "+selectedOption,"correct "+correctAnswer)
    const optionsElements=options.map(opt=>{
        let result
        if(gameEnd){
            result= (<span   className={`quiz--option 
                    ${correctAnswer===opt?" correct":""}
                    ${selectedOption!=opt?" ignored":"wrong"}`}
                    onClick={()=>setSelected(question,opt)}  
                    key={opt}>{opt}
            </span>)
        }else{
            result= (<span   className={`quiz--option ${selectedOption===opt? " selected":""}`}
                    onClick={()=>setSelected(question,opt)}  
                    key={opt}>{opt}
            </span>)
        }
        
        return result
        })
        
    return (
        
        <section className="quiz--section">
            <h2 className="quiz--question">{question}</h2>
            <div className="quiz--option-group">
                {optionsElements}
                
            </div>
        </section>
         
    )
}