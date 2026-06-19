function LoadingSpinner({
  text,
  progress,
  showProgress = false
}){
  return (

  <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">

    <p className="text-3xl font-bold text-slate-800 mb-8">
      {text}
    </p>

    {showProgress && (

      <div className="w-full max-w-md flex items-center gap-3 mb-10">

        <div className="flex-1 bg-slate-200 rounded-full h-4 overflow-hidden">

          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`
            }}
          ></div>

        </div>

        <span className="text-sm font-medium text-slate-600">
          {progress}%
        </span>

      </div>

    )}

    <div className="w-20 h-20 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>

    <p className="mt-8 text-base text-slate-500">
      Please wait while we analyze your resume...
    </p>

  </div>

);

}

export default LoadingSpinner;