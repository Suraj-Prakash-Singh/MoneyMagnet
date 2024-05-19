import { useEffect, useState } from "react";
import Users from "./Users";
import SendMoney from "./SendMoney";

const Dashboard = () => {
    const authToken = localStorage.getItem("token");
    const [userList, setUserList] = useState([]);
    const [userBalance, setuserBalance] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getUserBalance();
        getUserList();
    }, [])

    async function getUserBalance(){
        const response = await fetch(`http://localhost:3000/api/v1/account/balance`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        })

        const data = await response.json();
        setuserBalance(data?.balance);
    }

    async function getUserList(){
        const response = await fetch(`http://localhost:3000/api/v1/user/bulk`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        })
        const data = await response.json();
        setUserList(data?.users);
    }


    return (
        <>
            {!showModal && 
            <div className="w-screen h-screen flex justify-center">
                <div className="w-[90%] h-auto flex-col flex items-center">
                    <div className="w-full flex justify-between mt-10">
                        <h1 className="font-bold text-2xl">Money Magnet</h1>
                        <div className="flex items-center gap-2 font-medium text-xl">
                            <p>Hello, User</p>
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">U</div>
                        </div>
                    </div>
                    <hr className="h-[2px] w-full bg-slate-200 my-8"></hr>
                    <div className="w-full flex items-start font-bold text-xl">
                        <p>Your Balance: <span className="text-green-500">₹{parseInt(userBalance).toFixed(2)}</span></p>
                    </div>
                    <Users usersList={userList} setShowModal={setShowModal}/>
                </div>
                </div>
            }
            <SendMoney open={showModal} setShowModal={setShowModal}/>
        </>
    )
}

export default Dashboard;