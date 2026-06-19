import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

import ATSPage from "./ATSPage";
import ResumePage from "./ResumePage";
import CoverLetterPage from "./CoverLetterPage";
import CareerChatPage from "./CareerChatPage";
import InterviewPage from "./InterviewPage";

function Dashboard() {

  const [page, setPage] = useState("ats");

const [resumeRequired,
  setResumeRequired] =
  useState(false);
  const [resumePending,
  setResumePending] =
  useState(false);

  const renderPage = () => {

    switch (page) {

      case "resume":
        return <ResumePage />;

      case "cover":
        return <CoverLetterPage />;

      case "chat":
        return <CareerChatPage />;

      case "interview":
        return <InterviewPage />;

      default:
        return (
 <ATSPage
  setResumeRequired={
    setResumeRequired
  }
  setResumePending={
    setResumePending
  }
/>
);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">

    <Sidebar
  page={page}
  setPage={setPage}
  setResumeRequired={
    setResumeRequired
  }
  resumePending={
    resumePending
  }
/>

      <div className="flex-1 p-8">

       
{resumeRequired === true && (

  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">

    <h3 className="font-semibold text-amber-700">
      📄 Resume Required
    </h3>

    <p className="text-amber-600 mt-2">
      Please upload and analyze your resume first.
    </p>

    <button
      onClick={() => {

        setPage("ats");
        setResumeRequired(false);

      }}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl"
    >
      Go to ATS Analysis
    </button>

  </div>

)}

{resumeRequired === "pending" && (

  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">

    <h3 className="font-semibold text-amber-700">
      🔄 New Resume Selected
    </h3>

    <p className="text-amber-600 mt-2">
      Please analyze your new resume before continuing.
    </p>

    <button
      onClick={() => {

        setPage("ats");
        setResumeRequired(false);

      }}
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl"
    >
      Go to ATS Analysis
    </button>

  </div>

)}

        <motion.div
  key={page}
  initial={{
    opacity: 0,
    y: 15
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.3
  }}
>
  {renderPage()}
</motion.div>

      </div>

    </div>
  );
}

export default Dashboard;