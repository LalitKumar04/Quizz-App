const questions=[
    {
        question:"How did Spider-Man get his powers?",
        answers:[
            {text:"bitten by radioactive spider", correct:true},
            {text:"by taking wrong pills", correct:false},
            {text:"military experiment gone wrong", correct:false},
            {text:"born with them", correct:false},
        ]
    },
    {
        question:"How many infinity tones are there?",
        answers:[
            {text:"3", correct:false},
            {text:"5", correct:false},
            {text:"6", correct:true},
            {text:"7", correct:false},
        ]
    },
    {
        question:"What is the only food that cannot go bad?",
        answers:[
            {text:"Dark chocolate", correct:false},
            {text:"Peanut butter", correct:false},
            {text:"Canned tuna", correct:false},
            {text:"Honey", correct:true},
        ]
    },
    
];
const questionElement=document.getElementById("question")
const answerbtn=document.getElementById("answer-button")
const nextbtn=document.getElementById("next-btn")
let currentQuestionIndex=0;
let score=0;

function startQuizz(){
    currentQuestionIndex=0;
    score=0;
    nextbtn.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion=questions[currentQuestionIndex]
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+ '.'+ currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button")
        button.innerHTML=answer.text;
        button.classList.add("btn")
        answerbtn.appendChild(button)
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click',selectAnswer)
    })

}
startQuizz()

function resetState()
{
    nextbtn.style.display="none"
    while(answerbtn.firstChild){
        answerbtn.removeChild(answerbtn.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn=e.target
    const isCorrect=selectedBtn.dataset.correct==="true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerbtn.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")
        }
        button.disabled=true;
    })
    nextbtn.style.display="block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }
    else{
        showScore()
    }
}

function showScore(){
    resetState()
    questionElement.innerHTML=`Your Score is ${score} out of ${questions.length}!`
    nextbtn.innerHTML="Play Again"
    nextbtn.style.display='block'
}

nextbtn.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton()
    }
    else{
        startQuizz()
    }
})
startQuizz()