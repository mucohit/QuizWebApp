const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',()=>{
    curentQuestions++
    setNextQuestion()
})

const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonsElemnet = document.getElementById('answer-buttons')

let shuffledQuestions, curentQuestions;


function startGame(){
console.log('Started')
startButton.classList.add('hide');
shuffledQuestions = questions.sort(()=> Math.random() -.5)
curentQuestions = 0;
questionContainerElement.classList.remove('hide');
setNextQuestion();
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[curentQuestions])

}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsElemnet.appendChild(button)
    });
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElemnet.firstChild){
        answerButtonsElemnet.removeChild(answerButtonsElemnet.firstChild)
    }
}

function selectAnswer(e){
    const sellectedButton = e.target
    const correct = sellectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElemnet.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        
    })
    if(shuffledQuestions.lenght > curentQuestions +1){
        nextButton.classList.remove('hide')
    }
    else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions =[
    {question:'What is the 2+2',
    answers: [
        { text:'4',correct:true  },
        { text:'22', correct:false}
    ]    
}
]