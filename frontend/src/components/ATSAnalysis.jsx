import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import ATSScoreCircle from "./ATSScoreCircle";
import { FileSearch } from "lucide-react";

function ATSAnalysis({
  setResumeRequired,
  setResumePending
}) {

  const [file, setFile] = useState(null);
  const [currentResume,
  setCurrentResume] =
  useState(null);

const [replaceResume,
  setReplaceResume] =
  useState(false);
  const fileInputRef = useRef(null);

  const [jobDescription,
    setJobDescription] = useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);
    const [progress,
  setProgress] =
  useState(0);
    const [error, setError] =
  useState("");
const [validationError,
  setValidationError] =
  useState("");
 

useEffect(() => {

  const loadResume = async () => {

    const userId =
      localStorage.getItem(
        "user_id"
      );

    if (!userId) return;

    try {

      const response =
        await axios.get(

          `http://127.0.0.1:8000/current-resume/${userId}`

        );

      if (
        response.data.resume_id
      ) {

        setCurrentResume(

          response.data

        );
        localStorage.setItem(
  "resume_name",
  response.data.name
);

      }

    } catch (error) {

      console.log(error);

    }

  };

  loadResume();

}, []);


  const analyzeResume = async () => {
    setResumeRequired(false);
  setError("");
  setValidationError("");
 if (!file && !currentResume) {

  setValidationError(
    "Please upload a resume before analyzing."
  );

  return;

}
if (!jobDescription.trim()) {

  setValidationError(
    "Please paste a job description before analyzing."
  );

  return;

}
    setLoading(true);
    setProgress(0);

const interval = setInterval(() => {

  setProgress((prev) => {

    if (prev >= 90) {

      return 90;

    }

    return prev + 5;

  });

}, 200);

    const formData =
  new FormData();

const userId =
  localStorage.getItem(
    "user_id"
  );

formData.append(
  "user_id",
  userId
);

if (file) {

  formData.append(
    "file",
    file
  );

}

formData.append(
  "job_description",
  jobDescription
);

    try {

      const response =
  await axios.post(
    "http://127.0.0.1:8000/analyze-resume",
    formData
  );
 if (response.data.error) {

  setError(
    response.data.error
  );

  return;

}

localStorage.setItem(
  "resume_id",
  response.data.resume_id
);


localStorage.setItem(
  "resume_name",
  response.data.name
);
localStorage.setItem(
  "resume_name",
  response.data.name
);


setResult(
  response.data.analysis
);
clearInterval(interval);

setProgress(100);
setResumePending(false);
setResumeRequired(false);
    } catch (error) {
    clearInterval(interval);

setProgress(0);
  console.error(error);

  setError(
    "Service Temporarily Unavailable"
  );

} finally {

      setLoading(false);

    }

  };

 return (

  <div>
    {validationError && (

  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">

    <h3 className="font-semibold text-amber-700">
      ⚠️ Unable to Continue
    </h3>

    <p className="text-amber-600 mt-1">
      {validationError}
    </p>

  </div>

)}
     
{error && (

  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">

    <h3 className="font-semibold text-amber-700">
      ⚠️ Service Temporarily Unavailable
    </h3>

    <p className="text-amber-600 mt-1">
      We are currently unable to process your request.
      Please try again later.
    </p>

  </div>

)}

  {!loading && !result && (

<div className="bg-white rounded-3xl shadow-xl p-6 mb-6">

<div className="flex items-center gap-3 mb-6">

  <FileSearch
    size={32}
    className="text-blue-600"
  />

  <h2 className="text-3xl font-bold">
    Resume Analysis
  </h2>

</div>
<input
  ref={fileInputRef}
  type="file"
  id="resumeUpload"
  accept=".pdf"
 onChange={(e) => {

  if (!e.target.files[0]) return;

 setFile(e.target.files[0]);

setCurrentResume({
  filename: e.target.files[0].name
});

setReplaceResume(false);
setResumePending(true);

}}
  className="hidden"
/>

   {currentResume && !replaceResume ? (

  <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center mb-6">

    <div className="text-5xl mb-4">
      📄
    </div>

    <h3 className="text-2xl font-bold">
      Current Resume
    </h3>

    <p className="text-green-700 font-semibold mt-4">
      ✓ {currentResume.filename}
    </p>

    <button
      onClick={() =>
  fileInputRef.current.click()
}
      className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
    >
      Replace Resume
    </button>

  </div>

) : (

  <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-3xl p-12 text-center mb-6">

    <div className="text-5xl mb-4">
      📄
    </div>

    <h3 className="text-2xl font-bold">
      Upload Your Resume
    </h3>

    <p className="text-slate-500 mt-2">
      Drag & Drop or Browse PDF File
    </p>

  

    <label
      htmlFor="resumeUpload"
      className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-700 transition"
    >
      Choose Resume
    </label>

    {file && (

      <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mt-5">

        <p className="font-semibold text-green-700">
          ✓ Resume Uploaded
        </p>

        <p className="text-slate-700 mt-2">
          {file.name}
        </p>

      </div>

    )}

  </div>

)}

        <textarea
          rows="8"
          placeholder="Paste Job Description Here..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(
              e.target.value
            )
          }
          className="w-full border rounded-2xl p-4 mb-4"
        />

       <button
  onClick={analyzeResume}
  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
>
  Analyze Resume
</button>
      </div>

    )}

    {loading && (

     <LoadingSpinner
  text="Analyzing Resume..."
  progress={progress}
  showProgress={true}
/>

    )}

   {result && (

  <div className="space-y-6">

    {/* ATS SCORE */}

    <motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.5
  }}
  className="bg-white rounded-3xl shadow-xl p-8"
>

      <h2 className="text-2xl font-bold text-center mb-6">
        ATS Score
      </h2>

      <ATSScoreCircle
        score={result.ats_score}
      />

      <p className="text-center text-slate-500 mt-4">
        Resume Match Analysis
      </p>

    </motion.div>

    {/* SUMMARY CARDS */}

    <motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    delay: 0.2,
    duration: 0.5
  }}
  className="grid md:grid-cols-3 gap-6"
>

      <div className="bg-green-50 rounded-3xl p-6 shadow">

        <h3 className="text-lg font-bold text-green-700">
          Matching Skills
        </h3>

        <h1 className="text-4xl font-bold mt-3">
          {result.matching_skills?.length}
        </h1>

      </div>

      <div className="bg-red-50 rounded-3xl p-6 shadow">

        <h3 className="text-lg font-bold text-red-700">
          Missing Skills
        </h3>

        <h1 className="text-4xl font-bold mt-3">
          {result.missing_skills?.length}
        </h1>

      </div>

      <div className="bg-blue-50 rounded-3xl p-6 shadow">

        <h3 className="text-lg font-bold text-blue-700">
          Suggestions
        </h3>

        <h1 className="text-4xl font-bold mt-3">
          {result.suggestions?.length}
        </h1>

      </div>

    </motion.div>

    {/* MATCHING SKILLS */}

    <motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    delay: 0.4,
    duration: 0.5
  }}
  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>

      <h3 className="text-2xl font-bold mb-4 text-green-700">
        ✅ Matching Skills
      </h3>

      <div className="flex flex-wrap gap-3">

        {result.matching_skills?.map(
          (skill, index) => (

            <span
              key={index}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>

          )
        )}

      </div>

    </motion.div>

    {/* MISSING SKILLS */}

    <motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    delay: 0.4,
    duration: 0.5
  }}
  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>

      <h3 className="text-2xl font-bold mb-4 text-red-700">
        ❌ Missing Skills
      </h3>

      <div className="flex flex-wrap gap-3">

        {result.missing_skills?.map(
          (skill, index) => (

            <span
              key={index}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>

          )
        )}

      </div>

    </motion.div>

    {/* SUGGESTIONS */}

    <motion.div
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    delay: 0.4,
    duration: 0.5
  }}
  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>

      <h3 className="text-2xl font-bold mb-4 text-blue-700">
        💡 Suggestions
      </h3>

      <ul className="space-y-3">

        {result.suggestions?.map(
          (item, index) => (

            <li
              key={index}
              className="bg-slate-50 p-4 rounded-xl"
            >
              {item}
            </li>

          )
        )}

      </ul>

    </motion.div>

  </div>

)}

  </div>

);
}
 export default ATSAnalysis;