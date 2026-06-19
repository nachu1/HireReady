import {
  FaFileAlt,
  FaRobot,
  FaComments,
  FaUserTie,
  FaBrain,
  FaEnvelope,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar({
  page,
  setPage,
  setResumeRequired,
  resumePending
}) {

  const hasResume =
    !!localStorage.getItem(
      "resume_id"
    );

  const showResumeRequired = () => {

    setResumeRequired(false);

    setTimeout(() => {

      setResumeRequired(true);

    }, 10);

  };

const showPendingResume = () => {

  setResumeRequired(false);

  setTimeout(() => {

    setResumeRequired(
      "pending"
    );

  }, 10);

};

 const logout = () => {

  localStorage.removeItem(
    "user_id"
  );

  localStorage.removeItem(
    "user_name"
  );

  localStorage.removeItem(
    "resume_id"
  );

  localStorage.removeItem(
    "resume_name"
  );

  window.location.reload();

};

  return (

    <div className="w-72 bg-slate-900 text-white min-h-screen p-6">

      <div className="flex items-center gap-3 mb-10">

        <FaBrain size={30} />

        <h2 className="text-2xl font-bold">
          HireReady
        </h2>

      </div>

      <div className="flex flex-col justify-between h-[85vh]">

        <ul className="space-y-4">

          <li
            onClick={() => {

  setResumeRequired(false);

  setPage("ats");

}}
            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition ${
              page === "ats"
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <FaFileAlt />
            ATS Analysis
          </li>

          <li
            onClick={() => {

             if (!hasResume) {

  showResumeRequired();

  return;

}



if (resumePending) {

  showPendingResume();

  return;

}
               setResumeRequired(false);
              setPage("resume");

            }}
            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition ${
              page === "resume"
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <FaRobot />
            Resume Improvement
          </li>

          <li
            onClick={() => {

           if (!hasResume) {

  showResumeRequired();

  return;

}

if (resumePending) {

  showPendingResume();

  return;

}
              setResumeRequired(false);
              setPage("cover");

            }}
            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition ${
              page === "cover"
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <FaEnvelope />
            Cover Letter
          </li>

          <li
            onClick={() => {

             if (!hasResume) {

  showResumeRequired();

  return;

}

if (resumePending) {

  showPendingResume();

  return;

}
              setResumeRequired(false);
              setPage("chat");

            }}
            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition ${
              page === "chat"
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <FaComments />
            Career Chat
          </li>

          <li
            onClick={() => {

             if (!hasResume) {

  showResumeRequired();

  return;

}

if (resumePending) {

  showPendingResume();

  return;

}
              setResumeRequired(false);
              setPage("interview");

            }}
            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition ${
              page === "interview"
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <FaUserTie />
            Mock Interview
          </li>

        </ul>

        <button
          onClick={logout}
          className="flex items-center gap-3 p-4 rounded-xl hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>

  );

}

export default Sidebar;