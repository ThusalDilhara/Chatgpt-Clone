import { createContext, useEffect, useState } from 'react';
import run from '../config/chatgpt';
import { account,client } from '../config/appwriteConfig';
import { Databases, ID, Query } from 'appwrite';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading,setLoading]=useState(false);
  const [showResults, setShowResults] = useState(false);
  const [user,setUser]= useState(null);
  const [recentChats,setRecentChats]=useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

   const databaseId="67ee17d300285e079bd3";
   const collectionId="67ee17f10005822e432f";
   const databases= new Databases(client);

  //  get user id
   useEffect(()=>{
     
     const getUser=async()=>{
      
      try{
        
            const userData = await account.get();
            setUser(userData);
            fetchChats(userData.$id);
          
      }
      catch(error){
        console.log("Error fetching user data:", error);
        
      }
     }

     getUser();
   },[]);
   
  //  fetch all chats
   const fetchChats=async (userId)=>{

    try{
      const response = await databases.listDocuments(databaseId,collectionId,[
        Query.equal("userID", userId),
        Query.orderDesc("$createdAt"),
      ])
      setRecentChats(response.documents);
     
    }catch(error){
      console.log("Error fetching user data:", error);
    }
   }

    // load the chat when clicked 
    const loadChat=async (chatID)=>{

       try{
          const response= await databases.getDocument(databaseId,collectionId,chatID);
          setChatHistory(response.messages);
          setCurrentChatId(chatID);
          setShowResults(true);
          setLoading(false);
       }
       catch (error){
          console.log("Error loading chat:", error);

       }
    }

  
  // typing effect for gpt response
  const delaypara = (index, nextword) => {
    setTimeout(() => {
      setChatHistory((prev) => {
        // Get the last message (GPT's response)
        const lastMessage = prev.length > 0 && prev[prev.length - 1].sender === 'gpt'
          ? prev[prev.length - 1].message
          : '';
  
        // Update the last message instead of pushing a new object
        const newHistory = [...prev];
        if (newHistory.length > 0 && newHistory[newHistory.length - 1].sender === 'gpt') {
          newHistory[newHistory.length - 1].message = lastMessage + nextword;
        } else {
          newHistory.push({ sender: 'gpt', message: nextword });
        }
  
        return newHistory;
      });
    }, 20 * index);
  };

  // new chat window 
  const newChat=()=>{
      setLoading(false);
      setShowResults(false);
      setChatHistory([]);
      setCurrentChatId(null);
  }
  

  const onsent = async () => {
    if (!input.trim()) return;
  
    const userPrompt = input;
    setInput('');

    setChatHistory((prev) => [...prev, { sender: 'user', message: userPrompt }]);
    setLoading(true);

    try {
        const result = await run(userPrompt);
        setShowResults(true);

        
        const responseArray = result.split("**");
        let newResponse = "";
        responseArray.forEach((text, index) => {
            newResponse += index % 2 === 1 ? `<b>${text}</b>` : text;
        });
        let newResponse2 = newResponse.split("*").join("<br/>");

       
        setChatHistory((prev) => [
            ...prev,
            { sender: 'gpt', message: newResponse2 } // Append GPT response
        ]);

        // Convert messages to string for database storage
        const updatedChatHistory = [
            ...chatHistory.map(msg => `${msg.sender}: ${msg.message}`), 
            `user: ${userPrompt}`,
            `gpt: ${newResponse2}`
        ];

        if (user) {
            if (currentChatId) { 
                // Update existing chat
                await databases.updateDocument(databaseId, collectionId, currentChatId, {
                    messages: updatedChatHistory,
                });
            } else {
                // Create a new chat if not exits
                let title = userPrompt;
                if(title.length > 20) {
                  title = title.slice(0,20) + "...";
                }
                
                const newChat = await databases.createDocument(databaseId, collectionId, ID.unique(), {
                    title: title,
                    messages: updatedChatHistory,
                    userID: user.$id,
                });

                setCurrentChatId(newChat.$id);
                fetchChats(user.$id);
            }
        }
    } catch (error) {
        console.error('Error fetching AI response:', error);
    } finally {
        setLoading(false);
    }
};

  const contextValue = {
    input,
    setInput,
    onsent,
    chatHistory,
    setChatHistory,
    loading,
    setLoading,
    showResults,
    newChat,
    loadChat,
    recentChats
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
