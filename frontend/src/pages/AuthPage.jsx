import { useState } from "react";
import axios from "axios";
import { Brain } from "lucide-react";
import { toast } from "react-toastify";
function AuthPage({
  setIsLoggedIn
}) {

  const [isLogin, setIsLogin] =
    useState(true);
 const [name, setName] =
  useState("");

const [email, setEmail] =
  useState("");

const [password, setPassword] =
  useState("");

const [loading, setLoading] =
  useState(false);

const [error, setError] =
  useState("");


const registerUser = async () => {

  setError("");

  if (
    !name.trim() ||
    !email.trim() ||
    !password.trim()
  ) {

    setError(
      "Please fill all fields."
    );

    return;

  }

  const formData =
    new FormData();

  formData.append(
    "name",
    name
  );

  formData.append(
    "email",
    email
  );

  formData.append(
    "password",
    password
  );

  try {

    setLoading(true);

    const response =
      await axios.post(
        "http://127.0.0.1:8000/register",
        formData
      );

    if (response.data.error) {

      setError(
        response.data.error
      );

      return;

    }

    toast.success(
  "Account created successfully. Please sign in."
);

    setIsLogin(true);

    setName("");
    setEmail("");
    setPassword("");

  } catch (error) {

    console.error(error);

    setError(
      "Registration failed."
    );

  } finally {

    setLoading(false);

  }

};
const loginUser = async () => {

  setError("");

  if (
    !email.trim() ||
    !password.trim()
  ) {

    setError(
      "Please fill all fields."
    );

    return;

  }

  const formData =
    new FormData();

  formData.append(
    "email",
    email
  );

  formData.append(
    "password",
    password
  );

  try {

    setLoading(true);

    const response =
      await axios.post(
        "http://127.0.0.1:8000/login",
        formData
      );

    if (response.data.error) {

      setError(
        response.data.error
      );

      return;

    }

    localStorage.setItem(
  "user_id",
  response.data.user_id
);

localStorage.setItem(
  "user_name",
  response.data.name
);

if (response.data.resume_id) {

  localStorage.setItem(
    "resume_id",
    response.data.resume_id
  );

  localStorage.setItem(
    "resume_name",
    response.data.resume_name
  );

} else {

  localStorage.removeItem(
    "resume_id"
  );

  localStorage.removeItem(
    "resume_name"
  );

}

setIsLoggedIn(true);

  } catch (error) {

    console.error(error);

    setError(
      "Login failed."
    );

  } finally {

    setLoading(false);

  }

};



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-6">
<div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-md">

        <div className="flex flex-col items-center mb-8">

          <Brain
            size={50}
            className="text-blue-600"
          />

          <h1 className="text-2xl sm:text-3xl font-bold mt-4">
            HireReady 
          </h1>

          <p className="text-slate-500 mt-2">

            {isLogin
              ? "Welcome back"
              : "Create your account"}

          </p>

        </div>

        {!isLogin ? (

         <input
  type="text"
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
  placeholder="Full Name"
  className="w-full border rounded-xl p-3 mb-4"
/>

        ) : null}

        <input
  type="email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  placeholder="Email Address"
  className="w-full border rounded-xl p-3 mb-4"
/>

        <input
  type="password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  placeholder="Password"
  className="w-full border rounded-xl p-3 mb-6"
/>
     {error && (

  <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 mb-4">

    {error}

  </div>

)}
        <button
  onClick={() => {

  if (isLogin) {

    loginUser();

  } else {

    registerUser();

  }

}}
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
>
          {loading
  ? "Please wait..."
  : isLogin
    ? "Sign In"
    : "Create Account"}
        </button>

        <div className="text-center mt-6">

          <button
            onClick={() =>
              setIsLogin(
                !isLogin
              )
            }
            className="text-blue-600 font-medium"
          >

            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default AuthPage;