sampleText = ["People change over time based on their actions.",
    "Wake up to reality nothing ever goes as plan in this world.",
    "Each of us live dependend and bound by our individual knoweledge and our awareness.",
    "Justice is a weapon it only used to cause harm but it cannot protect or save other.",
    "You cannot change the world with the pretty words alone.",
    "In every story why always hero win in the end."
]

const prompt = document.querySelector('#prompt')
const input = document.querySelector('#input')
const wpm = document.querySelector('#wpm')
const accuracy = document.querySelector('#accuracy')

let targetText = ""
let startTime = null
let timer = null

function loadtext(){
    let randomtext = sampleText[Math.floor(Math.random()*sampleText.length)]
    targetText = randomtext
    prompt.innerHTML = ""
    for(let text of targetText){
        let span = document.createElement('span')
        span.textContent = text
        prompt.appendChild(span)
    }
}


function matchText(){
    const typed = input.value
    const spans = prompt.querySelectorAll("span")
    for(let i = 0; i<spans.length;i++){
        let char = typed[i]
        if(char == null){
            spans[i].className = ""
        } 
        else if(char === targetText[i]){
            spans[i].className = "correct"
        }
        else{
            spans[i].className = "incorrect"
        }
    }

    if(typed.length >= targetText.length){
        clearInterval(timer)
        accuracyfinder()
        wpmfinder()
        input.disabled = true
    }

}

input.addEventListener("input",()=>{
    if(!startTime){
        startTime = new Date()
        timer = setInterval(() => {
    accuracyfinder();
    wpmfinder();
}, 1000);
    }
    matchText()
})


function accuracyfinder(){
    let correct = 0
    const typedText = input.value
    for(let i=0; i<targetText.length;i++){
        if(typedText[i]===targetText[i]){
            correct++
        }
    }

    const accurate = Math.round((correct/typedText.length)*100)

    accuracy.textContent = accurate
}

function wpmfinder(){
    const timePassed = (new Date() - startTime)/60000
    const typedword = input.value
    const word = typedword.trim().split(/\s+/)
    const wpmfind = Math.round(word.length/timePassed)

    wpm.textContent = wpmfind
}


function restart(){
    input.value = ""
    accuracy.textContent = "0"
    wpm.textContent = "0"
    loadtext()
}

loadtext()
input.disabled = false