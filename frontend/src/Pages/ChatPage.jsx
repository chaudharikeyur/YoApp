import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
    const [chats, setChats] = useState([]);

    const fetchChat = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            if (!userInfo || !userInfo.token) {
                console.error("No user token found");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,  
                    "Content-Type": "application/json"
                },
            };

            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            console.error("Error fetching chat:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchChat();
    }, []);

    return (
        <div>
            <h1>Chat Page</h1>
            {chats.map((chat) => (
                <p key={chat._id}>{chat.name}</p>
            ))}
        </div>
    );
};

export default ChatPage;
