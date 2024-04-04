const Signup = () => {

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-[#7F7F7F]">
            <div className="w-3/12 h-max flex flex-col items-center justify-center bg-white">
                <h1 className="text-4xl font-bold">Sign Up</h1>
                <p>Enter your information to create an account</p>
                <button className="w-[90%] rounded-md bg-black text-white py-2">Sign Up</button>
                <p>Already have an account? <span>Login</span></p>
            </div>
        </div>
    )
}

export default Signup;