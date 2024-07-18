let allQuestions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "HYPER TEXT MARKUP LANGUAGE",
      "HOME TOOL MARKUP LANGUAGE",
      "HYPERLINKS AND TEXT MARKUP LANGUAGE",
    ],
    answer: "HYPER TEXT MARKUP LANGUAGE",
  },
  {
    id: 2,
    question: "Who is making the Web standards?",
    options: ["MOZILLA", "The World Wide Web Consortium", "MICROSOFT"],
    answer: "The World Wide Web Consortium",
  },
  {
    id: 3,
    question: "What does NaN stand for in JavaScript?",
    options: ["Not a Number", "No additional Number", "Null and None"],
    answer: "Not a Number",
  },
  {
    id: 4,
    question:
      "Which of the following is the correct way to create a function in JavaScript?",
    options: [
      "function myFunction[] {}",
      "function: myFunction() {}",
      "function myFunction() {}",
    ],
    answer: "function myFunction() {}",
  },
  {
    id: 5,
    question:
      "Which method can be used to convert a JSON text into a JavaScript object?",
    options: [
      "JSON.toObject()",
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convertToObj()",
    ],
    answer: "JSON.parse()",
  },
];

let Mytimer;
let currentIndex = 0;
let userSelections = {};
let opt = document.querySelector(".opt");

btnWrapper.style.visibility = "hidden";
CBT.style.visibility = "hidden";
nav.style.visibility = "hidden";

startBtn.addEventListener("click", () => {
  displayQuestion(currentIndex);

  btnWrapper.style.visibility = "visible";
  CBT.style.visibility = "visible";
  nav.style.visibility = "visible";
  CBTStart.style.display = "none";

  let min = 0;
  let secs = 0;

  Mytimer = setInterval(() => {
    if (secs < 59) {
      secs++;
    } else {
      secs = 0;
      min++;
    }
    timer.innerText = `${min}:${doubleZero(secs)}`;
  }, 1000);

  Mytimer;

  setTimeout(() => {
    clearInterval(Mytimer);
    timer.style.color = "red";
    endQuiz();
  }, 120000);
});

next.addEventListener("click", () => {
  storeSelection();
  if (currentIndex < allQuestions.length - 1) {
    currentIndex++;
    displayQuestion(currentIndex);
  }
  console.log(checkAnswer());
});

prev.addEventListener("click", () => {
  storeSelection();
  if (currentIndex > 0) {
    currentIndex--;
    displayQuestion(currentIndex);
  }
  console.log(checkAnswer());
});

function displayQuestion(index) {
  currentQuestionNum.innerText = allQuestions[index].id;
  quesLength.innerText = allQuestions.length;
  currentQuestion.innerText = allQuestions[index].question;
  optionWrapper.innerHTML = "";

  allQuestions[index].options.forEach((option) => {
    let label = document.createElement("label");
    let input = document.createElement("input");
    let optionContainer = document.createElement("div");
    optionContainer.style.display = "flex";
    optionContainer.style.gap = "20px";

    if (userSelections[allQuestions[index].id] === option) {
      input.checked = true;
    }
    input.type = "radio";
    input.className = "opt";
    input.value = option;
    input.name = "answer";

    label.appendChild(document.createTextNode(option));
    label.appendChild(input);
    optionContainer.appendChild(input);
    optionContainer.appendChild(label);
    optionWrapper.appendChild(optionContainer);
  });
}

function checkAnswer() {
  let score = 0;

  allQuestions.forEach((question) => {
    if (userSelections[question.id] === question.answer) {
      score++;
    }
  });
  return score;
}

function doubleZero(num) {
  return num.toString().padStart(2, "0");
}

function storeSelection() {
  let selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    userSelections[allQuestions[currentIndex].id] = selectedOption.value;
  }
}

function endQuiz() {
  bodyWrapper.innerHTML = "";
  let div = document.createElement("div");
  let paragraph = document.createElement("span");
  let header = document.createElement("h1");
  let backBtn = document.createElement("button");

  backBtn.appendChild(document.createTextNode("Back"));
  div.className = "quizEnd";
  backBtn.className = "backButton";
  paragraph.appendChild(document.createTextNode("TIME'S UP!!!"));
  header.appendChild(
    document.createTextNode(
      `Score: ${(checkAnswer() / allQuestions.length) * 100}%`
    )
  );

  div.appendChild(header);
  div.appendChild(paragraph);
  div.appendChild(backBtn);
  bodyWrapper.appendChild(div);

  backBtn.style.backgroundColor = "rgb(113, 6, 113)";
  header.style.color = "white";

  let backButton = document.querySelector(".backButton");

  backButton.addEventListener("click", () => {
    location.reload();
  });
}

submitBtn.addEventListener("click", () => {
  bodyWrapper.innerHTML = "";
  bodyWrapper.style.backgroundColor = "white";
  let div = document.createElement("div");
  let paragraph = document.createElement("h4");
  let header = document.createElement("h1");
  let backBtn = document.createElement("button");

  div.className = "submitted";
  backBtn.className = "backButton";
  paragraph.appendChild(document.createTextNode("Submission Successful"));
  backBtn.appendChild(document.createTextNode("Back"));
  header.appendChild(
    document.createTextNode(
      `Score: ${(checkAnswer() / allQuestions.length) * 100}%`
    )
  );
  div.appendChild(header);
  div.appendChild(paragraph);
  div.appendChild(backBtn);
  paragraph.style.color = "green";
  paragraph.style.fontSize = "30px";
  backBtn.style.backgroundColor = "rgb(113, 6, 113)";
  bodyWrapper.appendChild(div);
  checkAnswer();
  let backButton = document.querySelector(".backButton");

  backButton.addEventListener("click", () => {
    location.reload();
  });
  clearInterval(Mytimer);
});
