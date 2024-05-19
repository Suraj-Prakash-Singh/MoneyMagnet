const Users = ( {usersList, setShowModal} ) => {
    const handleSendMoney = (user) => {
        setShowModal(true);
        localStorage.setItem("receiverId", user._id);
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);
    }
    return (
        <>
            <div className="w-full flex items-start mt-8 text-xl font-bold">
                Users
            </div>
            <div className="w-full flex items-center justify-center mt-6 border border-slate-200 rounded-lg mb-10">
                <input className="w-full h-10 placeholder:pl-3" placeholder="Search users..."></input>
            </div>

            {usersList.map((user) => {
                return (
                    <div className="w-full flex items-center justify-between mb-6">
                        <div className="flex items-center justify-center gap-4 font-semibold text-lg">
                            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">{user?.firstName.charAt(0).toUpperCase()}</div>
                            <p>{user.firstName} {user.lastName}</p>
                        </div>
                        <button className="bg-black text-white px-3 py-2 rounded-md" onClick={() => handleSendMoney(user)}>Send Money</button>
                    </div>
                )
            })}
            
        </>
    )
}

export default Users;
