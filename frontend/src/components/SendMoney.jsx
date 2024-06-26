import { useState } from "react";

const SendMoney = ({ open, setShowModal }) => {
    
    const [amount, setAmount] = useState(0);
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const iconText = firstName.charAt(0).toUpperCase();
    const authToken = localStorage.getItem("token");
    const visibility = open ? "visible": "hidden";

    async function handleMoneyTransfer(){
        const requestBody = {
            to: localStorage.username,
            amount: parseInt(amount)
        }
        const response = await fetch(`http://localhost:3000/api/v1/account/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(requestBody),
        })
        const data = await response.json();
        alert(data.message);
    }
    return(
        <div className={`w-screen h-screen flex items-center justify-center ${visibility}`}>
            <div className="w-[30%] flex flex-col justify-between items-center rounded-md shadow-xl">
                <h1 className="text-4xl font-bold mt-5">Send Money</h1>
                <div className="mt-10 flex items-start w-[85%] gap-4">
                    <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500 text-xl font-semibold text-white"
                    >   {iconText}
                    </div>
                    <p className="mt-1 text-2xl font-bold">{firstName} {lastName}</p>
                </div>
                <div className="w-[85%] flex items-start">
                    <p className="font-semibold">Amount (in Rs) </p>
                </div>
                <div className="w-[85%] mt-4 flex flex-col items-center justify-center gap-6">
                    <input 
                        type="number" 
                        className="pl-2 w-full h-10 border-slate-300 border rounded-md" 
                        placeholder="Enter amount" 
                        value={amount} onChange={(e) => setAmount(e.target.value)}
                    />
                    <button 
                        className="w-full h-10 bg-green-500 text-white rounded-md"
                        onClick={() => handleMoneyTransfer()}
                    >   Initiate Transfer
                    </button>
                    <button 
                        className="w-full h-10 bg-red-500 text-white rounded-md mb-10" 
                        onClick={() => setShowModal(false)}
                    >   Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SendMoney;