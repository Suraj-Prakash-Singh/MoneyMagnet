import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {

    const navigate = useNavigate();
    const initalValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }
    const [formValues, setFormValues] = useState(initalValues);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    
    async function handleSignup(){
        const requestBody = {
            username: formValues.email,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            password: formValues.password
        }

        const stringBody = JSON.stringify(requestBody);
        const response = await fetch("http://localhost:3000/api/v1/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringBody,
        })

        const data = await response.json();
        const statusCode = response.status;

        if(statusCode === 200){
            navigate('/signin')
        }
        else{
            alert(data.message);
        }
        console.log(data);
    }

    console.log(formValues);
    
    return (
        <>
            <div className="my-4 flex flex-col w-[90%] gap-2 [&>input]:border rounded-md [&>label]:font-medium">
                <label>
                    First Name
                </label>
                <input 
                    placeholder="John" 
                    type="text" 
                    className="pl-1 placeholder:pl-2 py-1"
                    name="firstName" 
                    value={formValues.firstName} 
                    onChange={handleInputChange}
                />
                <label>
                    Last Name
                </label>
                <input 
                    name="lastName"
                    placeholder="Doe" 
                    type="text" 
                    className="pl-1 placeholder:pl-2 py-1"
                    value={formValues.lastName} 
                    onChange={handleInputChange}
                />
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
            <button className="w-[90%] rounded-md bg-black text-white py-2 mb-4" onClick={handleSignup}>Sign Up</button>
        </>
    )
}

export default SignupForm;