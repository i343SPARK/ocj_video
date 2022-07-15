import {useState} from "react";
import axios from "axios";

export const MultipleOption = ({seconds, display}) => {

    const [question, setQuestion] = useState("")
    const [option1, setOption1] = useState("")
    const [option2, setOption2] = useState("")
    const [option3, setOption3] = useState("")

    const [typeAnsware1, setTypeAnsware1] = useState(true)
    const [typeAnsware2, setTypeAnsware2] = useState(true)
    const [typeAnsware3, setTypeAnsware3] = useState(true)

    const getQuestion = (e) => {
        setQuestion( e.target.value)
    }

    const getOption1 = (e) => {
        setOption1(e.target.value)
    }

    const getOption2 = (e) => {
        setOption2(e.target.value)
    }

    const getOption3 = (e) => {
        setOption3(e.target.value)
    }

    const uploadData = () => {
        axios.post("http://localhost:8000/question-multiple-option", {
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            type1: typeAnsware1,
            type2: typeAnsware2,
            type3: typeAnsware3,
            time: seconds
        }).then(res => console.log(res.data)).catch(err => console.log(err))
    }

    const deleteData = () => {
        axios.delete("http://localhost:8000/question-multiple-option/1").then(res => console.log(res.data)).catch(err => console.log(err))
    }

    const switchOption1 = () =>{
        setTypeAnsware1(!typeAnsware1)
    }

    const switchOption2 = () =>{
        setTypeAnsware2(!typeAnsware2)
    }

    const switchOption3 = () =>{
        setTypeAnsware3(!typeAnsware3)
    }

  return(
      <>
          <section className={display ? "display-question-on" : "display-question-off"}>
              <article className={"question-container"}>
                  <input type={"text"} placeholder={"Tu pregunta es...? "} onChange={getQuestion}/>
              </article>
              <section className={"options-container"}>
                  <article className={"option-container"}>
                      <div className={"type-selection-container"}>
                          <button onClick={switchOption1}>
                              <span className={typeAnsware1 ? "true-correct-selected" : "false-correct-selected"}></span>
                          </button>
                          <button onClick={switchOption1}>
                              <span className={typeAnsware1 ? "false-incorrect-selected" : "true-incorrect-selected"}></span>
                          </button>
                      </div>
                      <input type={"text"} placeholder={"Tu opcion es... "} onChange={getOption1}/>
                  </article>
                  <article className={"option-container"}>
                      <div className={"type-selection-container"}>
                          <button onClick={switchOption2}>
                              <span className={typeAnsware2 ? "true-correct-selected" : "false-correct-selected"}></span>
                          </button>
                          <button onClick={switchOption2}>
                              <span className={typeAnsware2 ? "false-incorrect-selected" : "true-incorrect-selected"}></span>
                          </button>
                      </div>
                      <input type={"text"} placeholder={"Tu opcion es... "} onChange={getOption2}/>
                  </article>
                  <article className={"option-container"}>
                      <div className={"type-selection-container"}>
                          <button onClick={switchOption3}>
                              <span className={typeAnsware3 ? "true-correct-selected" : "false-correct-selected"}></span>
                          </button>
                          <button onClick={switchOption3}>
                              <span className={typeAnsware3 ? "false-incorrect-selected" : "true-incorrect-selected"}></span>
                          </button>
                      </div>
                      <input type={"text"} placeholder={"Tu opcion es... "} onChange={getOption3}/>
                  </article>
              </section>
              <div className={"section-add-delete"}>
                  <button onClick={uploadData}>
                      <span className={"add-icon"}></span>
                  </button>
                  <button onClick={deleteData}>
                      <span className={"delete-icon"}></span>
                  </button>
              </div>
          </section>
      </>
  )
}