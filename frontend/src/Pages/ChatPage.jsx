import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
   
    // const fetchChat = async () => {
    //     try {
    //         const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    //         if (!userInfo || !userInfo.token) {
    //             console.error("No user token found");
    //             return;
    //         }

    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${userInfo.token}`,  
    //                 "Content-Type": "application/json"
    //             },
    //         };

    //         const { data } = await axios.get("/api/chat", config);
    //         setChats(data);
    //     } catch (error) {
    //         console.error("Error fetching chat:", error.response?.data || error.message);
    //     }
    // };

    const { user } = ChatState()

   

    return (
        <div style={{ width: "100%"}}>
           {
             user && <SideDrawer/>
           }

           <Box  display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="9px" >
            { user && <MyChats/>}
             {user && <ChatBox/>}
           </Box>
        </div>
    );
};

export default ChatPage;
