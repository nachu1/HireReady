import { useState } from "react";
import axios from "axios";
import{Copy} from "lucide-react";
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

  <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 w-full">

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

    {loading ? (

      <div className="flex flex-col items-center justify-center py-20">

        <div className="w-16 h-16 border-[5px] border-emerald-600 border-t-transparent rounded-full animate-spin"></div>

        <h3 className="mt-6 text-xl font-semibold text-slate-800">
          Generating Cover Letter...
        </h3>

        <p className="mt-2 text-slate-500 text-center max-w-md">
          Creating a personalized cover letter based on your resume and the job description.
        </p>

      </div>

    ) : (

      !result && (

        <>

          <div className="text-center mb-6">

            <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3 text-center">

              <div className="bg-emerald-100 p-2 rounded-xl">

                <Mail
                  size={24}
                  className="text-emerald-600"
                />

              </div>

              Create Your Cover Letter

            </h2>

            <p className="text-base md:text-lg text-slate-500 mt-3">
              Generate a personalized cover letter tailored to your target role.
            </p>

          </div>

          <textarea
            rows="6"
            placeholder="Paste Job Description..."
            value={jobDescription}
            onChange={(e) => {

              setJobDescription(
                e.target.value
              );

              setValidationError("");

            }}
            className="w-full border border-slate-300 rounded-2xl p-4 md:p-5 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-center">

            <button
              onClick={generateCoverLetter}
              className="w-full sm:w-auto bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >

              <WandSparkles size={18} />

              Generate Cover Letter

            </button>

          </div>

        </>

      )

    )}
    {result && (

  <div className="bg-white border rounded-3xl p-4 md:p-8 shadow-xl">

    <div className="flex items-center justify-between gap-3 mb-6">

      <h3 className="text-xl md:text-2xl font-bold">
        Generated Cover Letter
      </h3>

      <button
  onClick={copyCoverLetter}
  className="bg-slate-100 hover:bg-slate-200 text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition flex-shrink-0"
>
  <Copy size={16} />
  {copied ? "Copied" : "Copy"}
</button>

    </div>

    <div className="whitespace-pre-line leading-8 text-slate-700">
      {result}
    </div>

    <div className="flex justify-center mt-8">

      <button
        onClick={() => {

          setResult("");
          setJobDescription("");

        }}
        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition"
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