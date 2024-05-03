const quizData = [
    {
      question: '1.Which of the following languages is primarily used for styling web pages?',
      options: ['HTML', 'JavaScript', 'CSS','PHP'],
      answer: 'CSS',
    },
    {
      question: '2.Which of the following is not a valid CSS selector?',
      options: ['#myElement','.myClass','$myElements','p.myParagraph'],
      answer: '$myElements',
    },
    {
      question: '3.What does CSS stand for?',
      options: ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
      answer: 'Cascading Style Sheets',
    },
    {
      question: '4.Which of the following is NOT a valid way to declare a variable in JavaScript?',
      options: ['var', 'let','const','string'],
      answer: 'string',
    },
    {
      question: '5.What does the "HTTP" stand for in web development?',
      options: ['Hyper Transfer Text Protocol','Hyper Text Transfer Protocol','Hyper Text Transmission Protocol','Hyper Transfer Transmission Protocol'],
      answer: 'Hyper Text Transfer Protocol',
    },
    {
      question: '6.Which of the following is used to create animations in web development?',
      options: ['HTML', 'CSS', 'JavaScript', 'Python'],
      answer: 'CSS',
    },
    {
      question: '7.Which of the following is a backend programming language often used in web development?',
      options: ['HTML', 'CSS', 'JavaScript', 'Python'],
      answer: 'Python',
    },
    {
      question: '8.What is the purpose of the div tag in HTML?',
      options: ['Defines a paragraph', 'Defines a division or a section in an HTML document', 'Defines an image', 'Defines a hyperlink'],
      answer: 'Defines a division or a section in an HTML document',
    },
    {
      question: '9.Which of the following is a popular web development framework for JavaScript?',
      options: ['Django','Laravel','Angular','Flask',],
      answer: 'Angular',
    },
    {
      question: '10.What is the purpose of a "media query" in CSS?',
      options: ['To quary data from a server','To quary a database','To apply different styles based on device characteristics','To quary user input'],
      answer: 'To apply different styles based on device characteristics',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();