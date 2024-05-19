import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name] : value,
        }))
    }

    async function handleSignIn() {
        const requestBody = {
            username: formValues.email,
            password: formValues.password
        }

        const response = await fetch("http://localhost:3000/api/v1/user/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })

        const data = await response.json();
        const statusCode = response.status;

        if(statusCode === 200){
            const token = data?.token;
            localStorage.setItem("token", token);
            navigate('/dashboard');
        }
        else{
            alert(data?.message);
        }
        console.log("response Data: ", data);
    }
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-[#7F7F7F]">
            <div className="w-[20%] h-max flex flex-col items-center justify-center bg-white rounded-md">
                <h1 className="text-4xl font-bold mt-4">Sign In</h1>
                <p className="text-center my-2 font-medium text-gray-500">Enter your credentials to access your account</p>
                    <div className="my-4 flex flex-col w-[90%] gap-2 [&>input]:border rounded-md [&>label]:font-medium">
                        <label>
                            Email
                        </label>
                        <input 
                            name="email"
                            placeholder="johndoe@example.com" 
                            type="email" 
                            className="pl-1 placeholder:pl-2 py-1"
                            value={formValues.email} 
                            onChange={handleInputChange}
                        />
                        <label>
                            Password
                        </label>
                        <input 
                            name="password"
                            type="password" 
                            className="pl-1 placeholder:pl-2 py-1"
                            value={formValues.password} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <button 
                        className="w-[90%] rounded-md bg-black text-white py-2 mb-4" 
                        onClick={handleSignIn}>
                            Sign In
                    </button>
                <p 
                    className="mb-4 font-medium">
                        Don't have an account?
                    <span 
                        className="underline cursor-pointer"
                        onClick={() => navigate('/signup')}
                        >
                            SignUp
                        </span>
                </p>
            </div>
        </div>
    )
}

export default Signin;