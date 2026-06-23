import {
  useState,
  useEffect,
  useRef
} from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { Hand,Smile } from "lucide-react";
import {
  Bot,
  BriefcaseBusiness,
  Trash2
} from "lucide-react";
function CareerChat() {

   const [userName, setUserName] =
  useState("User");

  const [message, setMessage] =
    useState("");
    const [messages, setMessages] =
  useState([]);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const messagesEndRef =
  useRef(null);
  

  const [loading, setLoading] =
  useState(false);
  const [error, setError] =
  useState("");
   useEffect(() => {

  const resumeName =
    localStorage.getItem(
      "resume_name"
    );

  console.log(
    "resume_name:",
    resumeName
  );

  if (resumeName) {

    setUserName(
      resumeName
    );

  }

}, []);

useEffect(() => {

  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth"
  });

}, [messages]);

useEffect(() => {

  const resumeId =
    localStorage.getItem(
      "resume_id"
    );

  if (!resumeId) return;

  const savedChat =
    localStorage.getItem(
      `career_chat_${resumeId}`
    );

  if (savedChat && savedChat !== "[]") {

    setMessages(
      JSON.parse(savedChat)
    );

  } else {

    setMessages([
      {
        sender: "ai",
        text:
`I can help with:
• Resume Review
• Interview Preparation
• Career Guidance

How can I help today?`
      }
    ]);

  }

}, []);

useEffect(() => {

  if (messages.length === 0) return;

  const resumeId =
    localStorage.getItem(
      "resume_id"
    );

  if (!resumeId) return;

  localStorage.setItem(

    `career_chat_${resumeId}`,

    JSON.stringify(messages)

  );

}, [messages]);




  const askCareerAI = async () => {
    setError("");
    if (!message.trim()) {
  return;
}

    const formData =
      new FormData();

    const resumeId =
  localStorage.getItem(
    "resume_id"
  );

formData.append(
  "resume_id",
  resumeId
);

    formData.append(
      "message",
      message
    );
    formData.append(
  "history",
  JSON.stringify(
    messages.slice(-6)
  )
);

   try {

  setLoading(true);

  setMessages(prev => [
    ...prev,
    {
      sender: "user",
      text: message
    }
  ]);

  const userMessage = message;

  

  const result =
   await axios.post(
  "https://hireready-xy0d.onrender.com/career-chat",
  formData
);
    if (result.data.error) {

  setError(
    result.data.error
  );

  return;

}
      setMessages(prev => [
  ...prev,
 
  {
    sender: "ai",
    text: result.data.response
  }
]);

setMessage("");

    } catch (error) {

      console.error(error);

    } finally {

  setLoading(false);

}

  };
  const clearChat = () => {

  const resumeId =
    localStorage.getItem(
      "resume_id"
    );

  localStorage.removeItem(
    `career_chat_${resumeId}`
  );

  setMessages([
    {
      sender: "ai",
      text:
`I can help with:
• Resume Review
• Interview Preparation
• Career Guidance

How can I help today?`
    }
  ]);

};

  return (

  <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 w-full">
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

   <div className="flex items-center justify-between mb-6">

  <div className="flex items-center gap-3">

    <BriefcaseBusiness size={32} />

    <h2 className="text-2xl md:text-3xl font-bold">
      Career Assistant
    </h2>

  </div>

  <button
   onClick={() => setShowClearDialog(true)}
    className="p-2 rounded-lg hover:bg-slate-100 transition"
    title="Clear Chat"
  >
    <Trash2
      size={20}
      className="text-slate-600"
    />
  </button>

</div>
      
<div className="mt-6 space-y-4 h-[420px] md:h-[500px] overflow-y-auto pr-2">

  {messages.map((msg, index) => (

    <div
      key={index}
      className={`flex ${
        msg.sender === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
  className={`${
    msg.sender === "user"
      ? "max-w-[85%] md:max-w-[60%]"
      : "max-w-[90%] md:max-w-[75%]"
  } p-4 rounded-2xl whitespace-pre-line ${
    msg.sender === "user"
      ? "bg-blue-600 text-white"
      : "bg-slate-100"
  }`}
>
       <>
  {msg.sender === "ai" && index === 0 && (
   <div className="flex items-center gap-1 mb-3">

  <span className="font-semibold text-slate-800">
    Hi, {userName}
  </span>

  <Smile
    size={18}
    className="text-blue-600"
  />

</div>
  )}

  {msg.text}
</>
      </div>

    </div>

  ))}

  {loading && (

    <div className="flex items-center gap-2 text-slate-500">

      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>

     <div className="flex gap-1 items-center">

  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>

  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>

  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>

</div>

    </div>

  )}
   <div ref={messagesEndRef}></div>
</div>

<div className="mt-6">

  <div className="relative">

    <textarea
      rows="3"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Ask about resumes, interviews, career guidance, or job applications..."
      className="w-full border rounded-2xl p-4 pb-12 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <button
      onClick={askCareerAI}
      disabled={loading}
      className={`absolute bottom-3 right-3 h-9 w-9 rounded-full flex items-center justify-center transition ${
        loading
          ? "bg-slate-400 cursor-not-allowed"
          : "bg-slate-800 hover:bg-slate-900"
      }`}
    >
      <ArrowUp
  size={18}
  strokeWidth={2.8}
  className="text-white"
/>
    </button>

  </div>

</div>
     

{showClearDialog && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl">

      <h3 className="text-xl font-bold">
        Clear Conversation?
      </h3>

      <p className="text-slate-600 mt-2">
        This will permanently remove this chat history.
      </p>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowClearDialog(false)}
          className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            clearChat();
            setShowClearDialog(false);
          }}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Clear
        </button>

      </div>

    </div>

  </div>

)}

</div>


  );
}

export default CareerChat;