import { useState } from "react";
import axios from "axios";
 import LoadingSpinner
from "./LoadingSpinner";
import {
  FilePenLine,
  Download,
  RefreshCw,
  FileText,
  Target
} from "lucide-react";
import { FolderKanban } from "lucide-react";
function ResumeImprovement() {

  
 
  const [result, setResult] = useState(null);
  const [loading, setLoading] =
  useState(false);
  const [version, setVersion] =
  useState(0);
  const [error, setError] =
  useState("");
  const [downloadLoading,
  setDownloadLoading] =
  useState(false);

  const improveResume = async () => {
      setError("");
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



  try {

    const response =
      await axios.post(
        "https://hireready-xy0d.onrender.com/improve-resume",
        formData
      );
     if (response.data.error) {

  setError(
    response.data.error
  );

  return;

}



    setResult(
      response.data
    );
    setVersion(
  prev => prev + 1
);

  } catch (error) {

  console.error(error);

  setError(
    "Service Temporarily Unavailable"
  );

} finally {

    setLoading(false);

  }

};
  const downloadAIResume = async () => {

  setError("");
  setDownloadLoading(true);

  const resumeId =
    localStorage.getItem(
      "resume_id"
    );

  try {

    const response =
      await axios.get(
        `https://hireready-xy0d.onrender.com/download-ai-resume/${resumeId}`,
        {
          responseType: "blob"
        }
      );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "AI_Resume.pdf";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

  } catch (error) {

  console.error(error);

  setError(
    "Service Temporarily Unavailable"
  );

} finally {

    setDownloadLoading(false);

  }

};

  return (
     

    <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 w-full">
       {downloadLoading && (

  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 flex items-center gap-4">

    <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>

    <div>

      <h3 className="font-semibold text-blue-700">
        Generating Resume...
      </h3>

      <p className="text-blue-600 mt-1">
        Please wait while we prepare your download.
      </p>

    </div>

  </div>

)}
      {error && (

  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">

    <h3 className="font-semibold text-amber-700">
      ⚠️ Service Temporarily Unavailable
    </h3>

    <p className="text-amber-600 mt-1">
     We are currently unable to process your request.
  Please try again later
    </p>

  </div>

)}

  <div className={result ? "pt-2" : "text-center py-10"}>

   {!result && (

<>

<div className="flex items-center justify-center gap-3">
  
  <div className="bg-blue-100 p-2 rounded-xl">
    <FilePenLine
      size={24}
      className="text-blue-600"
    />
  </div>

  <h2 className="text-2xl md:text-3xl font-bold text-center">
    Improve Your Resume
  </h2>

</div>

<p className="text-base md:text-lg text-slate-600 mt-3 text-center">
  Get personalized suggestions to strengthen your resume.
</p>

</>

)}

   {loading ? (

  <div className="flex flex-col items-center justify-center py-16">

    <div className="w-16 h-16 border-[5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>

    <h3 className="mt-6 text-xl font-semibold text-slate-800">
      Improving Resume...
    </h3>

    <p className="mt-2 text-slate-500 text-center">
       optimizing your resume.
      Please wait...
    </p>

  </div>

) : (

  !result && (

    <button
      onClick={improveResume}
     className="mt-6 w-full sm:w-auto bg-blue-600 text-white text-base md:text-lg px-8 py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition"
    >
      Improve Resume
    </button>

  )

)}

  </div>



      {result && (
     

        <div className="mt-8 space-y-6">
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

  <p className="text-slate-500 font-medium text-lg">
    Resume Version {version}
  </p>

  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

   <button
  onClick={improveResume}
  disabled={loading}
  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition"
>
  <RefreshCw size={18} />

  {loading
    ? "Generating..."
    : "Generate New Version"}
</button>

   <button
  onClick={downloadAIResume}
  disabled={downloadLoading}
  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 transition"
>
  {downloadLoading ? (
    "Generating..."
  ) : (
    <>
      <Download size={18} />
      Download Resume
    </>
  )}
</button>

  </div>

</div>

          <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6">

            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
  <FileText size={24} />
  Improved Summary
</h2>

            <p className="leading-8 text-slate-700">
              {result.improved_summary}
            </p>

          </div>

          <div className="bg-green-50 rounded-3xl p-4 md:p-6 shadow">

           <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
  <Target size={24} />
  Recommended Skills
</h2>
            <div className="flex flex-wrap gap-3">

              {result.skills_to_add?.map(
                (skill, index) => (

                  <span
                    key={index}
                 className="bg-green-100 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>

                )
              )}

            </div>

          </div>

   <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6">

  <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
  <FolderKanban size={24} />
  Improved Projects
</h2>

  {result.improved_projects?.map(
    (project, index) => (

      <div
        key={index}
        className="mb-6 border-b pb-4"
      >

        <h3 className="text-lg md:text-xl font-semibold mb-3">
          {project.project_name}
        </h3>

       {project.improved_description?.map(
  (point, i) => (

    <p
      key={i}
      className="mb-2 flex items-start gap-2"
    >
      <span className="text-green-600">
        ✓
      </span>

      <span>
        {point}
      </span>
    </p>

  )
)}

      </div>

    )
  )}

</div>


          <div className="bg-blue-50 rounded-3xl p-4 md:p-6 shadow">

            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Resume Tips
            </h2>

            <ul className="space-y-3">

              {result.resume_tips?.map(
                (tip, index) => (

                  <li
                    key={index}
                    className="bg-white p-4 rounded-xl"
                  >
                    💡 {tip}
                  </li>

                )
              )}

            </ul>

          </div>

        </div>

      )}

    </div>

  );

}

export default ResumeImprovement;