import SignupForm from "./SignupForm";

const Signup = () => {

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-[#7F7F7F]">
            <div className="w-[20%] h-max flex flex-col items-center justify-center bg-white rounded-md">
                <h1 className="text-4xl font-bold mt-4">Sign Up</h1>
                <p className="text-center my-2 font-medium text-gray-500">Enter your information to create an account</p>
                <SignupForm/>
                <button className="w-[90%] rounded-md bg-black text-white py-2 mb-4">Sign Up</button>
                <p className="mb-4">Already have an account? <span>Login</span></p>
            </div>
        </div>
    )
}

export default Signup;