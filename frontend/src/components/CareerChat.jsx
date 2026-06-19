import {
  useState,
  useEffect,
  useRef
} from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { Hand,Smile } from "lucide-react";
import {
  Bot,
  BriefcaseBusiness
} from "lucide-react";
function CareerChat() {

   const [userName, setUserName] =
  useState("User");

  const [message, setMessage] =
    useState("");
    const [messages, setMessages] =
  useState([]);
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
      "http://127.0.0.1:8000/career-chat",
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
  

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6">
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

   <div className="flex items-center gap-3 mb-6">
  <BriefcaseBusiness size={32} />
  <h2 className="text-3xl font-bold">
    Career Assistant
  </h2>
</div>
      
<div className="mt-8 space-y-4 max-h-[500px] overflow-y-auto">

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
      ? "max-w-[50%]"
      : "max-w-[85%]"
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

<div className="mt-4 flex gap-3">

<div className="w-full mt-6">

  <textarea
    rows="4"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Ask about resumes, interviews, career guidance, or job applications..."
    className="w-full border rounded-2xl p-4 resize-none"
  />

  <div className="flex justify-end mt-4">

  <button
  onClick={askCareerAI}
  disabled={loading}
  className={`px-6 py-3 rounded-xl flex items-center gap-2 text-white transition ${
    loading
      ? "bg-slate-400 cursor-not-allowed"
      : "bg-slate-700 hover:bg-slate-800"
  }`}
>
  <Send size={18} />
  {loading ? "Thinking..." : "Ask"}
</button>

  </div>

</div>

</div>
     
</div>


  );
}

export default CareerChat;