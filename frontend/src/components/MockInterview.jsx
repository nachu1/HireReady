import { useState } from "react";
import axios from "axios";
import LoadingSpinner
from "./LoadingSpinner";
import { UserRoundSearch } from "lucide-react";
import { Trophy } from "lucide-react";

function MockInterview() {
   const [questionLoading,
  setQuestionLoading] =
  useState(false);

const [evaluationLoading,
  setEvaluationLoading] =
  useState(false);

  
  

  const [questions, setQuestions] =
    useState([]);
    const [currentQuestion, setCurrentQuestion] =
  useState(0);
  const [interviewFinished,
  setInterviewFinished] =
  useState(false);

const [answer, setAnswer] =
  useState("");

const [evaluation, setEvaluation] =
  useState(null);
const [scores, setScores] =
  useState([]);
  const [error, setError] =
  useState("");
   
  const generateQuestions = async () => {
    setError("");
   setQuestions([]);
   setCurrentQuestion(0);
   setScores([]);
   setEvaluation(null);
   setAnswer("");
    setQuestionLoading(true);
   

    const formData = new FormData();

    const resumeId =
  localStorage.getItem(
    "resume_id"
  );

formData.append(
  "resume_id",
  resumeId
);
   

    try {

      const response =
        await axios.post(
          "https://hireready-xy0d.onrender.com/generate-interview-questions",
          formData
        );
        if (response.data.error) {

  setError(
    response.data.error
  );

  return;

}
        console.log("Interview API Response:");
console.log(
  JSON.stringify(
    response.data,
    null,
    2
  )
);

      const allQuestions = [
  ...(response.data.common_fresher_questions || []),
  ...(response.data.resume_based_questions || []),
  ...(response.data.advanced_questions || [])
];
setInterviewFinished(false);
setScores([]);
setCurrentQuestion(0);
setQuestions(allQuestions);

    }  catch (error) {

  console.error(error);

  setError(
    "Service Temporarily Unavailable"
  );

}
    finally {

  setQuestionLoading(false);

}

  };
  const submitAnswer = async () => {
    setError("");
     setEvaluationLoading(true);
  const formData = new FormData();

  formData.append(
    "question",
    questions[currentQuestion]
  );

  formData.append(
    "answer",
    answer
  );

  try {

    const response =
      await axios.post(
        "https://hireready-xy0d.onrender.com/evaluate-answer",
        formData
      );
   if (response.data.error) {

  setError(
    response.data.error
  );

  return;

}

    setEvaluation(
      response.data
    );
    setScores(
  prev => [
    ...prev,
    response.data.score
  ]
);

  }  catch (error) {

  console.error(error);

  setError(
    "Service Temporarily Unavailable"
  );

}
  finally {

  setEvaluationLoading(false);

}

};
const nextQuestion = () => {

  setCurrentQuestion(
    currentQuestion + 1
  );

  setAnswer("");

  setEvaluation(null);

};
   const totalScore =
  scores.reduce(
    (a, b) => a + b,
    0
  );

const percentage =
  scores.length > 0
    ? Math.round(
        (totalScore /
          (scores.length * 10))
        * 100
      )
    : 0;
    let performance = "Beginner";

if (percentage >= 80) {

  performance = "Excellent";

} else if (percentage >= 60) {

  performance = "Intermediate";

} else if (percentage >= 40) {

  performance = "Basic";

}

  return (

    <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 w-full">
      {error && (

  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">

    <h3 className="font-semibold text-amber-700">
      ⚠️ Service Temporarily Unavailable
    </h3>

    <p className="text-amber-600 mt-1">
      Please try again later.
    </p>

  </div>

)}

      <div className="flex items-center gap-3 mb-2">

  <div className="bg-blue-100 p-2 rounded-xl">
    <UserRoundSearch
      size={24}
      className="text-blue-600"
    />
  </div>

  <h2 className="text-2xl md:text-3xl font-bold">
    Mock Interview
  </h2>

</div>

{questions.length === 0 &&
 !interviewFinished && (

<p className="text-slate-500 mb-6">
  Practice AI-generated interview questions and get instant feedback.
</p>

)}
  
{questions.length === 0 &&
 !interviewFinished && (

<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-6 mb-6 border border-blue-100">

  <h3 className="font-bold text-lg mb-3">
    What You'll Get
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

    <div>✓ Resume-based questions</div>
    <div>✓ Technical questions</div>
    <div>✓ Instant scoring</div>
    <div>✓ AI feedback</div>

  </div>

</div>

)}
     
{questions.length === 0 &&
 !interviewFinished && (

  questionLoading ? (

  <div className="flex flex-col items-center justify-center py-20">

    <div className="w-16 h-16 border-[5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>

    <h3 className="mt-6 text-xl font-semibold text-slate-800">
      Preparing Your Interview...
    </h3>

    <p className="mt-2 text-slate-500 text-center max-w-md">
       Creating personalized interview questions based on your resume.
    </p>

  </div>

) : (

   

   <div className="flex justify-center mt-6">

  <button
  onClick={generateQuestions}
  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg transition"
>
  Start Interview
</button>

</div>

  )

)}

   {questions.length > 0 &&
 currentQuestion < questions.length &&
 !interviewFinished &&
 !evaluation && (

  evaluationLoading ? (

    <div className="flex flex-col items-center justify-center py-16">

      <div className="w-16 h-16 border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>

      <h3 className="mt-6 text-xl font-semibold text-slate-800">
        Evaluating Your Answer...
      </h3>

      <p className="mt-2 text-slate-500 text-center max-w-md">
        Our AI is reviewing your response and preparing detailed feedback.
      </p>

    </div>

  ) : (

    <div className="mt-8">

    <h3 className="text-xl md:text-2xl font-bold mb-4">

      Question {currentQuestion + 1}
      of {questions.length}

    </h3>

    <div className="bg-slate-50 p-4 md:p-6 rounded-2xl">

      {questions[currentQuestion]}

    </div>

    <textarea
      rows="6"
      value={answer}
      onChange={(e) =>
        setAnswer(
          e.target.value
        )
      }
      placeholder="Type your answer..."
     className="w-full border border-slate-300 rounded-2xl p-4 mt-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

 {!evaluation && (

 

    <button
      onClick={submitAnswer}
      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl mt-4 transition"
    >
      Submit Answer
    </button>

  

)}

  </div>

  )

)}
{evaluation && !interviewFinished && (

  <div className="mt-6 bg-slate-50 p-4 md:p-6 rounded-2xl shadow">

    <h3 className="text-2xl font-bold">

      Score: {evaluation.score}/10
    </h3>

    <h4 className="mt-4 font-bold">
      Level:
    </h4>

    <p>
      {evaluation.level}
    </p>

    <h4 className="mt-4 font-bold">
      Strengths
    </h4>

    <ul>

      {evaluation.strengths?.map(
        (item, index) => (
          <li key={index}>
            ✅ {item}
          </li>
        )
      )}

    </ul>

    <h4 className="mt-4 font-bold">
      Improvements
    </h4>

    <ul>

      {evaluation.improvements?.map(
        (item, index) => (
          <li key={index}>
            💡 {item}
          </li>
        )
      )}

    </ul>

    <h4 className="mt-4 font-bold">
      Ideal Answer
    </h4>

    <p>
      {evaluation.ideal_answer}
    </p>

    <h4 className="mt-4 font-bold">
      Interviewer Feedback
    </h4>

    <p>
      {evaluation.interviewer_feedback}
    </p>

   {currentQuestion <
  questions.length - 1 ? (

  <button
    onClick={nextQuestion}
    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl mt-6 transition"
  >
    Next Question
  </button>

) : (

  <button
  onClick={() =>
    setInterviewFinished(true)
  }
  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl mt-6 transition"
>
  Finish Interview
</button>

)}

  </div>

)}
  {interviewFinished &&  (

 <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-5 md:p-8 rounded-3xl shadow-xl text-center">

    <div className="flex items-center justify-center gap-3">
 <Trophy
  size={36}
  className="text-yellow-500"
/>
  <h2 className="text-2xl md:text-4xl font-bold text-green-700">
    Interview Complete
  </h2>
</div>

    <div className="mt-8">
  <p className="text-slate-500 text-lg">
    Overall Score
  </p>

  <h3 className="text-5xl md:text-6xl font-bold text-blue-600">
    {percentage}%
  </h3>
</div>

    <div className="mt-6">
  <span className="inline-block bg-white px-8 py-3 rounded-full shadow font-semibold text-lg mt-2">
    {performance}
  </span>
</div>

    <button
    onClick={() => {

  setQuestions([]);
  setCurrentQuestion(0);
  setScores([]);
  setEvaluation(null);
  setAnswer("");
  setInterviewFinished(false);

}}
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl mt-8 transition"
    >
      Start New Interview
    </button>

  </div>

)}

    </div>

  );
}

export default MockInterview;