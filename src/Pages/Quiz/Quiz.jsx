// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// export default function Quiz() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const videoid = queryParams.get("videoId");
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [QuizId, setQuizId] = useState(null);
//   const [currentQuestionData, setCurrentQuestionData] = useState(null);
//   const [arr, setArr] = useState([]);

//   async function fetchQuizData () {
//     try {
//       const options = {
//         url: "https://brightminds.runasp.net/api/Quizzes",
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         data: {
//           videoId: videoid,
//           title: "Quiz Title",
//         },
//       };
//       const response = await axios.request(options);
//       setQuestions(response.data.data.questions);
//       setQuizId(response.data.data.id);
//       setCurrentQuestionData(response.data.data.questions[currentQuestion]);
//     } catch (error) {
//       console.error("Error fetching quiz data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchQuizData();
//   }, [videoid]);

//   async function handleQuizAnswer() {
//     try {
//       const options = {
//         url: "https://brightminds.runasp.net/api/Quizzes/evaluate",
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         data: {
//           "quizId": QuizId,
//           "quizAnswers": arr
//         },
//       };
//       const data = await axios.request(options);
//       setScore(data.data.data.grade);
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   const handleAnswerSelect = (answer) => {
//     setSelectedAnswer(answer);
//   };


//   const handleNextQuestion = (questionId, answer) => {
//     setArr(prevArr => [...prevArr, { questionId, studentAnswer: answer }]);
//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//       setCurrentQuestionData(questions[currentQuestion + 1]);
//       setSelectedAnswer("");
//     } else {
//       setShowResult(true);
//     }
//   };

//   useEffect(() => {
//   if (arr.length === questions.length && questions.length > 0) {
//     handleQuizAnswer();
//   }
// }, [arr]);


//   if (!questions.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (showResult) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">
//               Quiz Complete!
//             </h2>
//             <div className="relative inline-block mb-8">
//               <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
//                 <span className="text-4xl font-bold text-blue-500">
//                   {Math.round((score / questions.length) * 100)}%
//                 </span>
//               </div>
//             </div>
//             <p className="text-xl text-gray-700 mb-4">Your Score</p>
//             <p className="text-3xl font-bold text-blue-600 mb-8">
//               {score} out of {questions.length} correct
//             </p>
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const options = [
//     { key: "option1", value: currentQuestionData.option1 },
//     { key: "option2", value: currentQuestionData.option2 },
//     { key: "option3", value: currentQuestionData.option3 },
//     { key: "option4", value: currentQuestionData.option4 },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-sm font-medium text-gray-500">
//               Question {currentQuestion + 1} of {questions.length}
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//               style={{
//                 width: `${
//                   ((currentQuestion + 1) / questions.length) * 100
//                 }%`,
//               }}
//             ></div>
//           </div>
//         </div>

//         {/* Question */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             {currentQuestionData.title}
//           </h2>

//           {/* Options */}
//           <div className="space-y-4">
//             {options.map((option) => (
//               <button
//                 key={option.key}
//                 onClick={() => {
//                   handleAnswerSelect(option.value);
//                 }}
//                 className={`w-full p-4 text-left rounded-xl transition-all duration-200 ${
//                   selectedAnswer === option.value
//                     ? "bg-blue-50 border-2 border-blue-500 shadow-md"
//                     : "bg-white border-2 border-gray-200 hover:border-blue-200 hover:bg-gray-50"
//                 }`}
//               >
//                 <span className="block text-lg text-gray-800">{option.value}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex justify-end mt-8">
//           <button
//             onClick={() => {
//               handleNextQuestion(questions[currentQuestion].id, selectedAnswer);
//             }}
//             disabled={!selectedAnswer}
//             className={`px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
//               selectedAnswer
//                 ? "bg-blue-500 hover:bg-blue-600 shadow-md"
//                 : "bg-gray-300 cursor-not-allowed"
//             }`}
//           >
//             {currentQuestion === questions.length - 1
//               ? "Finish Quiz"
//               : "Next Question"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }










import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Quiz() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoid = queryParams.get("videoId");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [arr, setArr] = useState([]);

  const currentQuestionData = questions[currentQuestion];

  async function fetchQuizData() {
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Quizzes",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          videoId: videoid,
          title: "Quiz Title",
        },
      };
      const response = await axios.request(options);
      setQuestions(response.data.data.questions);
      setQuizId(response.data.data.id);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  }

  useEffect(() => {
    fetchQuizData();
  }, [videoid]);

  async function handleQuizAnswer() {
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Quizzes/evaluate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          quizId: quizId,
          quizAnswers: arr,
        },
      };
      const data = await axios.request(options);
      setScore(data.data.data.grade);
    } catch (e) {
      console.log(e);
    }
  }

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = (questionId, answer) => {
    setArr((prevArr) => [...prevArr, { questionId, studentAnswer: answer }]);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    if (arr.length === questions.length && questions.length > 0) {
      handleQuizAnswer();
    }
  }, [arr]);

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen   to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Quiz Complete!
          </h2>
          <div className="w-32 h-32 rounded-full border-8 border-blue-500 mx-auto flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-blue-600">
              {Math.round((score / questions.length) * 100)}%
            </span>
          </div>
          <p className="text-xl text-gray-700 mb-4">Your Score</p>
          <p className="text-3xl font-bold text-blue-600 mb-8">
            {score} out of {questions.length} correct
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const options = [
    { key: "option1", value: currentQuestionData.option1 },
    { key: "option2", value: currentQuestionData.option2 },
    { key: "option3", value: currentQuestionData.option3 },
    { key: "option4", value: currentQuestionData.option4 },
  ];

  return (
    <div className="min-h-screen  via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-blue-100">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {currentQuestion + 1}
              </div>
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            {currentQuestionData.title}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {options.map((option) => (
              <button
                key={option.key}
                onClick={() => handleAnswerSelect(option.value)}
                className={`w-full p-4 text-left rounded-xl transition-all duration-200 border-2 focus:outline-none ${
                  selectedAnswer === option.value
                    ? "bg-blue-100 border-blue-600 text-blue-900 shadow"
                    : "bg-white border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <span className="block text-lg font-medium">
                  {option.value}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end mt-8">
          <button
            onClick={() =>
              handleNextQuestion(
                questions[currentQuestion].id,
                selectedAnswer
              )
            }
            disabled={!selectedAnswer}
            className={`px-8 py-3 rounded-full text-white font-semibold transition-all duration-200 ${
              selectedAnswer
                ? "bg-blue-500 hover:bg-blue-600 shadow-lg"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
