import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../config/appwriteConfig";
import googleIcon from "../assets/google1.png";
import microsoftIcon from "../assets/microsoft.png";
import appleIcon from "../assets/apple.png";

const SignUp = () => {
  const navigate = useNavigate();

  // Google Sign-In
  const signInWithGoogle = async () => {
    try {
      account.createOAuth2Session("google", "http://chatgptclone.me/home", "http://chatgptclone.me/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Check if user is logged in
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
    <div className="flex flex-col min-h-screen bg-white">
      <h1 className="font-bold text-2xl p-4">ChatGPT</h1>

      <div className="flex-grow flex items-center justify-center">
        <div className="p-6 sm:p-10 shadow-md w-full max-w-md text-[#282828] text-center rounded-lg">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Create an Account</h1>

          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-transparent hover:bg-[#f1e2e2] pr-6 py-2 rounded-md transition border border-[#d8caca] w-full mb-4"
          >
            <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
            Continue with Google
          </button>

          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-transparent hover:bg-[#f1e2e2] pr-3 py-2 rounded-md transition border border-[#d8caca] w-full mb-4"
          >
            <img src={microsoftIcon} alt="Microsoft" className="w-6 h-6 mr-2" />
            Continue with Microsoft
          </button>

          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-transparent hover:bg-[#f1e2e2] pr-8 py-2 rounded-md transition border border-[#d8caca] w-full"
          >
            <img src={appleIcon} alt="Apple" className="w-6 h-6 mr-2" />
            Continue with Apple
          </button>

          <p className="mt-4 text-sm">
            Already have an account?
            <a href="/" className="font-semibold hover:font-bold ml-1">Login</a>
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap text-center text-[#282828] p-4">
        <p className="text-sm">By signing in, you agree to our</p>
        <a href="#" className="text-sm font-semibold hover:font-bold mx-1">Terms of Service</a>
        <p className="text-sm">and</p>
        <a href="#" className="text-sm font-semibold hover:font-bold mx-1">Privacy Policy</a>
      </div>
    </div>
  );
};

export default SignUp;
