import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const ChatContext = createContext();

export const ChatState = () => {
    return useContext(ChatContext);
}

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (userInfo) {
            navigate("/chat"); 
        }
    }, [navigate]); 
    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatProvider;
