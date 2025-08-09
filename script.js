sampleText = [
  "People change over time based on their actions.",
  "Wake up to reality nothing ever goes as plan in this world.",
  "Each of us live dependend and bound by our individual knowledge and our awareness.",
  "Justice is a weapon it only used to cause harm but it cannot protect or save other.",
  "You cannot change the world with the pretty words alone.",
  "In every story why always hero win in the end.",
  "Power comes in response to a need, not a desire.",
  "A lesson without pain is meaningless. That's because you can't gain something without sacrificing something else.",
  "A person grows when he's able to overcome hardships. Protection is important, but there are some things a person must learn on his own.",
  "Hard work is worthless for those that don't believe in themselves.",
  "When you give up, that's when the game is over.",
  "Fear is not evil. It tells you what your weakness is. And once you know your weakness, you can become stronger as well as kinder.",
  "Power is not determined by your size, but the size of your heart and dreams.",
  "I am the hope of the universe. I am the answer to all living things that cry out for peace.",
  "The world isn't perfect. But it's there for us, doing the best it can... That's what makes it so damn beautiful.",
  "When you lose sight of your path, listen for the destination in your heart.",
  "Forgetting is like a wound. The wound may heal, but it has already left a scar.",
  "A lesson you learned without pain is a lesson you'll forget easily.",
  "A person becomes strong when they have someone to protect.",
  "A hero is someone who doesn't look away, even when it hurts.",
];

const prompt = document.querySelector("#prompt");
const input = document.querySelector("#input");
const wpm = document.querySelector("#wpm");
const accuracy = document.querySelector("#accuracy");

let targetText = "";
let startTime = null;
let timer = null;

function loadtext() {
  let randomtext = sampleText[Math.floor(Math.random() * sampleText.length)];
  targetText = randomtext;
  prompt.innerHTML = "";
  for (let text of targetText) {
    let span = document.createElement("span");
    span.textContent = text;
    prompt.appendChild(span);
  }
}

function matchText() {
  const typed = input.value;
  const spans = prompt.querySelectorAll("span");
  for (let i = 0; i < spans.length; i++) {
    let char = typed[i];
    if (char == null) {
      spans[i].className = "";
    } else if (char === targetText[i]) {
      spans[i].className = "correct";
    } else {
      spans[i].className = "incorrect";
    }
  }

  if (typed.length >= targetText.length) {
    clearInterval(timer);
    accuracyfinder();
    wpmfinder();
    input.disabled = true;
  }
}

input.addEventListener("input", () => {
  if (!startTime) {
    startTime = new Date();
    timer = setInterval(() => {
      accuracyfinder();
      wpmfinder();
    }, 1000);
  }
  matchText();
});

function accuracyfinder() {
  let correct = 0;
  const typedText = input.value;
  for (let i = 0; i < targetText.length; i++) {
    if (typedText[i] === targetText[i]) {
      correct++;
    }
  }

  const accurate = Math.round((correct / typedText.length) * 100);

  accuracy.textContent = accurate;
}

function wpmfinder() {
  const timePassed = (new Date() - startTime) / 60000;
  const typedword = input.value;
  const word = typedword.trim().split(/\s+/);
  const wpmfind = Math.round(word.length / timePassed);

  wpm.textContent = wpmfind;
}

function restart() {
  startTime = null;
  timer = null;
  input.value = "";
  accuracy.textContent = "0";
  wpm.textContent = "0";
  loadtext();
  input.disabled = false;
}

loadtext();
input.disabled = false;
