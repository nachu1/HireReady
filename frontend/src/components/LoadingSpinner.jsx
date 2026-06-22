import {
  Brain,
  Sparkles,
  CheckCircle2,
  LoaderCircle
} from "lucide-react";
function LoadingSpinner({
  text,
  progress,
  status,
  showProgress = false
}) {

 
  return (

  <div className="flex items-center justify-center min-h-[70vh] w-full px-4">
    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8">

    <div className="flex flex-col items-center">

  <Brain
    size={46}
    className="text-blue-600"
  />

  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-4">
    HireReady AI
  </h2>

  <p className="text-slate-500 mt-2 text-center">
    {text}
  </p>

</div>

   {showProgress && (

  <div className="mt-8">

    <div className="flex justify-between items-center mb-2">

      <span className="text-sm font-medium text-slate-500">
        AI Processing
      </span>

      <span className="text-sm font-semibold text-blue-600">
        {progress}%
      </span>

    </div>

    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">

      <div
        className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 rounded-full transition-all duration-500"
        style={{
          width: `${progress}%`
        }}
      ></div>

    </div>

  </div>

)}
<div className="mt-8 space-y-4">

  <div className="flex items-center gap-3">
    <CheckCircle2
      size={18}
      className="text-green-600"
    />
    <span className="text-slate-700">
      Reading Resume
    </span>
  </div>

  <div className="flex items-center gap-3">
    <CheckCircle2
      size={18}
      className="text-green-600"
    />
    <span className="text-slate-700">
      Extracting Skills
    </span>
  </div>

  <div className="flex items-center gap-3">
    <LoaderCircle
      size={18}
      className="text-blue-600 animate-spin"
    />
    <span className="text-slate-700">
      Matching Job Description
    </span>
  </div>

  <div className="flex items-center gap-3">
    <Sparkles
      size={18}
      className="text-slate-400"
    />
    <span className="text-slate-400">
      Generating Suggestions
    </span>
  </div>

</div>

    

   <div className="mt-8 text-center">

  <p className="text-base font-semibold text-slate-700">

    {status}

  </p>

  <p className="text-sm text-slate-500 mt-2">

    Please don't close this page.

  </p>

</div>
 </div>
  </div>

);

}

export default LoadingSpinner;