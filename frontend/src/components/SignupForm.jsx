import { useState } from "react";

const SignupForm = () => {

    const initalValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }
    
    const [formValues, setFormValues] = useState(initalValues);
    
    async function handleSignup(){
        console.log(formValues);
        // const requestBody = {
        //     username: formValues.email,
        //     firstName: formValues.firstName,
        //     lastName: formValues.lastName,
        //     password: formValues.password
        // }

        // const response = await fetch("http://localhost:3000/api/v1/user/signup", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(requestBody),
        // })

        // const data = await response.json();
        // console.log(data);
    }

    console.log(formValues);
    
    return (
        <>
            <div className="my-4 flex flex-col w-[90%] gap-2 [&>input]:border rounded-md [&>label]:font-medium">
                <label>
                    First Name
                </label>
                <input placeholder="John" type="text" className="pl-1 placeholder:pl-2 py-1"
                    value={formValues.firstName} onChange={(e) => setFormValues((...prev) => prev.firstName = e.target.value)}>
                </input>
                <label>
                    Last Name
                </label>
                <input placeholder="Doe" type="text" className="pl-1 placeholder:pl-2 py-1"
                    value={formValues.lastName} onChange={(e) => setFormValues((...prev) => prev.lastName = e.target.value)}>
                </input>
                <label>
                    Email
                </label>
                <input placeholder="johndoe@example.com" type="email" className="pl-1 placeholder:pl-2 py-1"
                    value={formValues.email} onChange={(e) => setFormValues((...prev) => prev.email = e.target.value)}>
                </input>
                <label>
                    Password
                </label>
                <input type="password" className="pl-1 placeholder:pl-2 py-1"
                    value={formValues.password} onChange={(e) => setFormValues((prevState) => ({...prevState,}))}>
                </input>
            </div>
            <button className="w-[90%] rounded-md bg-black text-white py-2 mb-4" onClick={handleSignup}>Sign Up</button>
        </>
    )
}

export default SignupForm;