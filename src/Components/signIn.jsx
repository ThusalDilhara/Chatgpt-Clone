import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../config/appwriteConfig";
import googleIcon from "../assets/google1.png";
import microsoftIcon from "../assets/microsoft.png";
import appleIcon from "../assets/apple.png";

const SignIn = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      account.createOAuth2Session("google", "http://chatgptclone.me/home","http://chatgptclone.me/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get();
        navigate("/home");
      } catch (error) {
        console.log("User not logged in");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      <h1 className="font-bold text-2xl mb-4 sm:mb-8">ChatGPT</h1>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="p-6 sm:p-10 shadow-sm w-full max-w-md text-[#282828] text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Welcome back</h1>

          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-transparent hover:bg-[#f1e2e2] pr-4 sm:pr-6 py-2 rounded-md transition border border-[#d8caca] w-full"
          >
            <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
            Continue with Google
          </button>

          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-transparent hover:bg-[#f1e2e2] pr-3 py-2 rounded-md transition border border-[#d8caca] mt-4 w-full"
          >
            <img src={microsoftIcon} alt="Microsoft" className="w-6 h-6 mr-2" />
            Continue with Microsoft
          </button>

          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-transparent hover:bg-[#f1e2e2] pr-8 py-2 rounded-md transition border border-[#d8caca] mt-4 w-full"
          >
            <img src={appleIcon} alt="Apple" className="w-6 h-6 mr-2" />
            Continue with Apple
          </button>

          <p className="mt-4 text-sm">
            Don't have an account?
            <a href="/signup" className="font-semibold hover:font-bold"> Sign Up</a>
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 flex-wrap gap-1 text-center text-sm text-[#282828]">
        <p>By signing in, you agree to our</p>
        <a href="#" className="font-semibold hover:font-bold ml-1">Terms of Service</a>
        <p>and</p>
        <a href="#" className="font-semibold hover:font-bold ml-1">Privacy Policy</a>
      </div>
    </div>
  );
};

export default SignIn;
