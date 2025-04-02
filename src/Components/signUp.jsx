import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import googleIcon from "../assets/google1.png";
import microsoftIcon from "../assets/microsoft.png";
import appleIcon from "../assets/apple.png";

const SignUp = () => {
  const navigate = useNavigate();

 
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") 
    .setProject("67eabd47002f05d1b097");

  const account = new Account(client);

  // Google Sign-In
  const signInWithGoogle = async () => {
    try {
      account.createOAuth2Session("google", "http://localhost:5173/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get();
        navigate("/home"); // Redirect if already logged in
      } catch (error) {
        console.log("User not logged in");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <h1 className="font-bold text-2xl p-[10px]">ChatGPT</h1> 
      <div className="flex flex-col items-center justify-center mt-24">
      <div className=" p-10 shadow-sm  max-w-2xl  text-[#282828] text-center">
        <h1 className="text-3xl font-semibold mb-6">Create an Account</h1>
        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center bg-transparent hover:bg-[#f1e2e2]  pr-6 py-2 rounded-md transition border border-[#d8caca] w-[350px]"
        >
          <img
            src={googleIcon}
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Continue with Google
        </button>
        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center bg-transparent hover:bg-[#f1e2e2]  pr-3 py-2 rounded-md transition border border-[#d8caca] mt-4 w-[350px]"
        >
          <img
            src={microsoftIcon}
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Continue with Microsoft
        </button>
        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center bg-transparent hover:bg-[#f1e2e2]  pr-8 py-2 rounded-md transition border border-[#d8caca] mt-4 w-[350px]"
        >
          <img
            src={appleIcon}
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Continue with Apple
        </button>
        <p className="mt-4 text-sm">Already have an account?<a href="/" className="font-semibold hover:font-bold"> Login</a></p>
      </div>
      </div>
      <div className="flex justify-center items-center mt-25">
        <p className="text-sm text-[#282828]">By signing in, you agree to our</p>
        <a href="" className="text-sm font-semibold hover:font-bold ml-1">Terms of Service</a>
        <p className="text-sm text-[#282828] ml-1">and</p>
        <a href="" className="text-sm font-semibold hover:font-bold ml-1">Privacy Policy</a>
      </div>
    </div>
  );
};

export default SignUp;
