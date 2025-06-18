import { useState } from "react";

const staticQuizData = [
  {
    id: 1,
    question: "What is the primary purpose of React's useEffect hook?",
    options: [
      "To handle side effects in functional components",
      "To create new components",
      "To style components",
      "To handle routing",
    ],
    correctAnswer: "To handle side effects in functional components",
  },
  {
    id: 2,
    question:
      "Which of the following is a valid way to create a state variable in React?",
    options: [
      "const state = new State()",
      "const [state, setState] = useState()",
      "const state = useState",
      "const state = this.state",
    ],
    correctAnswer: "const [state, setState] = useState()",
  },
  {
    id: 3,
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "Java Syntax Extension",
      "JavaScript Syntax",
    ],
    correctAnswer: "JavaScript XML",
  },
  {
    id: 4,
    question: "What is the purpose of React.memo()?",
    options: [
      "To memorize React components",
      "To optimize performance by preventing unnecessary re-renders",
      "To store component state",
      "To create memoized functions",
    ],
    correctAnswer:
      "To optimize performance by preventing unnecessary re-renders",
  },
  {
    id: 5,
    question: "What is the virtual DOM in React?",
    options: [
      "A direct copy of the browser's DOM",
      "A lightweight copy of the actual DOM",
      "A programming language",
      "A browser extension",
    ],
    correctAnswer: "A lightweight copy of the actual DOM",
  },
  {
    id: 6,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle component lifecycle",
      "To manage component state",
      "To create event handlers",
    ],
    correctAnswer: "To memoize functions",
  },
  {
    id: 7,
    question:
      "Which hook would you use to share stateful logic between components?",
    options: ["useShared", "useCustom", "useLogic", "Custom Hook"],
    correctAnswer: "Custom Hook",
  },
  {
    id: 8,
    question: "What is the correct way to pass props to a component?",
    options: [
      "<Component props={props}>",
      "<Component {props}>",
      "<Component ...props>",
      "<Component {...props}>",
    ],
    correctAnswer: "<Component {...props}>",
  },
  {
    id: 9,
    question: "What is the purpose of the key prop in React lists?",
    options: [
      "To style list items",
      "To help React identify which items have changed",
      "To determine list order",
      "To set list item properties",
    ],
    correctAnswer: "To help React identify which items have changed",
  },
  {
    id: 10,
    question:
      "Which method is used to prevent default form submission in React?",
    options: [
      "preventDefault()",
      "stopSubmission()",
      "avoidSubmit()",
      "cancelSubmit()",
    ],
    correctAnswer: "preventDefault()",
  },
];

export default function StaticQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Save the answer
    setAnswers((prev) => [
      ...prev,
      {
        question: staticQuizData[currentQuestion].question,
        selectedAnswer,
        correctAnswer: staticQuizData[currentQuestion].correctAnswer,
        isCorrect:
          selectedAnswer === staticQuizData[currentQuestion].correctAnswer,
      },
    ]);

    if (selectedAnswer === staticQuizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < staticQuizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Quiz Complete!
            </h2>
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-500">
                  {Math.round((score / staticQuizData.length) * 100)}%
                </span>
              </div>
            </div>
            <p className="text-xl text-gray-700 mb-4">Your Score</p>
            <p className="text-3xl font-bold text-blue-600 mb-8">
              {score} out of {staticQuizData.length} correct
            </p>

            {/* Answer Review */}
            <div className="mt-8 text-left">
              <h3 className="text-2xl font-bold mb-4">Review Your Answers:</h3>
              {answers.map((answer, index) => (
                <div key={index} className="mb-6 p-4 rounded-lg bg-gray-50">
                  <p className="font-semibold mb-2">
                    Q{index + 1}: {answer.question}
                  </p>
                  <p className="text-gray-600">
                    Your answer:{" "}
                    <span
                      className={
                        answer.isCorrect ? "text-green-600" : "text-red-600"
                      }
                    >
                      {answer.selectedAnswer}
                    </span>
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-green-600">
                      Correct answer: {answer.correctAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold mt-6"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {staticQuizData.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestion + 1) / staticQuizData.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {staticQuizData[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {staticQuizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-xl transition-all duration-200 ${
                  selectedAnswer === option
                    ? "bg-blue-50 border-2 border-blue-500 shadow-md"
                    : "bg-white border-2 border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                }`}
              >
                <span className="block text-lg text-gray-800">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
              selectedAnswer
                ? "bg-blue-500 hover:bg-blue-600 shadow-md"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {currentQuestion === staticQuizData.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
