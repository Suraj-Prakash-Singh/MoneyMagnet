import SignupForm from "./SignupForm";
import { useNavigate  } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-[#7F7F7F]">
            <div className="w-[20%] h-max flex flex-col items-center justify-center bg-white rounded-md">
                <h1 className="text-4xl font-bold mt-4">Sign Up</h1>
                <p className="text-center my-2 font-medium text-gray-500">Enter your information to create an account</p>
                <SignupForm />
                <p className="mb-4 font-medium">Already have an account? 
                    <span 
                        className="cursor-pointer underline" 
                        onClick={() => navigate('/signin')}>
                             Login
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Signup;