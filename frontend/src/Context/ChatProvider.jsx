import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const ChatContext = createContext();

export const ChatState = () => {
    return useContext(ChatContext);
}

const ChatProvider = ({ children }) => {
    const [selectedChat , setSelectedChat] = useState([]);
    const [user, setUser] = useState(null);
    const [chats , setChats] = useState([])
    const navigate = useNavigate(); 

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (userInfo) {
            navigate("/chat"); 
        }
    }, [navigate]); 
    return (
        <ChatContext.Provider value={{ user, setUser  , selectedChat , setSelectedChat , chats , setChats}}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatProvider;
