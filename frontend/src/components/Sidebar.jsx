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
  resumePending,
  sidebarOpen,
  setSidebarOpen
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

    <div
  className={`
    fixed md:static top-0 left-0 z-50
    w-72 h-screen
    bg-slate-900 text-white p-6
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>

      <div className="flex items-center gap-3 mb-6 md:mb-10">

        <FaBrain size={30} />

        <h2 className="text-xl md:text-2xl font-bold">
          HireReady
        </h2>

      </div>

      <div className="flex flex-col justify-between h-auto md:h-[85vh]">

        <ul className="space-y-4">

          <li
            onClick={() => {

  setResumeRequired(false);

  setPage("ats");
  setSidebarOpen(false);

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
              setSidebarOpen(false);

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
              setSidebarOpen(false);

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
              setSidebarOpen(false);

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
              setSidebarOpen(false);

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