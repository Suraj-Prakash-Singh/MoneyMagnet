import { useEffect, useState } from "react";
import Users from "./Users";

const Dashboard = () => {
    const authToken = localStorage.getItem("token");
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getUserList();
    }, [])

    async function getUserList(){
        console.log("auth token", authToken);
        const filter = "Suraj";
        const response = await fetch(`http://localhost:3000/api/v1/user/bulk?${filter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        })
        const data = await response.json();
        setUserList(data?.users);
        console.log("res data: ", data);
    }


    return (
        <div className="w-screen h-screen flex justify-center">
            <div className="w-[90%] h-auto flex-col flex items-center">
                <div className="w-full flex justify-between mt-10">
                    <h1 className="font-bold text-2xl">Payments App</h1>
                    <div className="flex items-center gap-2 font-medium text-xl">
                        <p>Hello, User</p>
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">U</div>
                    </div>
                </div>
                <hr className="h-[2px] w-full bg-slate-200 my-8"></hr>
                <div className="w-full flex items-start font-bold text-xl">
                    <p>Your Balance -----</p>
                </div>
                <Users usersList={userList}/>
            </div>
        </div>
    )
}

export default Dashboard;