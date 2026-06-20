import { useState } from "react";
import axios from "axios";
import LoadingSpinner
from "./LoadingSpinner";
import { Mail } from "lucide-react";
import { WandSparkles } from "lucide-react";

function CoverLetter() {
const [loading, setLoading] =
  useState(false);
  
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] =
  useState(false);
  const [error, setError] =
  useState("");
  const [validationError,
  setValidationError] =
  useState("");

 const generateCoverLetter = async () => {
  setError("");
setValidationError("");

if (!jobDescription.trim()) {

  setValidationError(
    "Please paste or enter a job description before generating a cover letter."
  );

  return;

}
   setLoading(true);

  const resumeId =
    localStorage.getItem(
      "resume_id"
    );

  const formData =
    new FormData();

  formData.append(
    "resume_id",
    resumeId
  );

  formData.append(
    "job_description",
    jobDescription
  );
 


  try {

    const response =
      await axios.post(
        "https://hireready-xy0d.onrender.com/generate-cover-letter",
        formData
      );
      if (response.data.error) {

  setError(
    response.data.error
  );

  return;

}

    setResult(
      response.data.cover_letter
    );

  } catch (error) {

  console.error(error);

  setError(
    "Service Temporarily Unavailable"
  );

}
  finally {

  setLoading(false);

}
};
const copyCoverLetter = () => {
  setError("");

  navigator.clipboard.writeText(
    result
  );

  setCopied(true);

  setTimeout(() => {

    setCopied(false);

  }, 2000);

};

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6">

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

      {!result && (
  <>

   <div className="text-center mb-6">

 <div className="text-center mb-6">

  <h2 className="text-3xl font-bold flex items-center justify-center gap-3">

    <div className="bg-emerald-100 p-2 rounded-xl">
  <Mail
    size={24}
    className="text-emerald-600"
  />
</div>

    Create Your Cover Letter

  </h2>

  <p className="text-slate-500 mt-3">
    Generate a personalized cover letter tailored to your target role.
  </p>

</div>

  

</div>
     

     <textarea
  rows="8"
  placeholder="Paste Job Description..."
  value={jobDescription}
  onChange={(e) => {

    setJobDescription(
      e.target.value
    );

    setValidationError("");

  }}
  className="w-full border border-slate-300 rounded-2xl p-5 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

     <div className="flex justify-center">

  {loading ? (

    <LoadingSpinner
      text="Generating Cover Letter..."
    />

  ) : (

    <button
  onClick={generateCoverLetter}
  className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl flex items-center gap-2"
>
  <WandSparkles size={18} />
  Generate Cover Letter
</button>

  )}

</div>
</>
)}

      {result && (

        <div className="bg-white border rounded-3xl p-8 shadow-xl">

          <div className="flex justify-between items-center mb-4">

  <h3 className="text-xl font-bold">
    Generated Cover Letter
  </h3>

  <button
    onClick={copyCoverLetter}
    className="text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition"
  >
    {copied
      ? "✓ Copied"
      : "📋 Copy"}
  </button>

</div>

          <p className="whitespace-pre-line">
            {result}
          </p>
          <div className="flex justify-center mt-8">

  <button
    onClick={() => {

      setResult("");
      setJobDescription("");

    }}
    className="bg-blue-600 text-white px-8 py-3 rounded-xl"
  >
    Generate Another Cover Letter
  </button>

</div>

        </div>

      )}

    </div>

  );
}

export default CoverLetter;