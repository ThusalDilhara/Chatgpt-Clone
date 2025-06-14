import { createContext, useEffect, useState } from 'react';
import run from '../config/chatgpt';
import { account,client } from '../config/appwriteConfig';
import { Databases, ID, Query } from 'appwrite';
import Swal from 'sweetalert2';
import '../index.css'

export const ChatContext = createContext();

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
        Query.limit(10)
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

          const formattedMessages = response.messages.map((msg) => {
            const [sender, ...messageParts] = msg.split(": ");
            return {
                sender: sender.trim(), 
                message: messageParts.join(": ").trim(),
            };
          });
          setChatHistory(formattedMessages);
          setCurrentChatId(chatID);
          setShowResults(true);
          setLoading(false);
          
       }
       catch (error){
          console.log("Error loading chat:", error);
          

       }
    }

    //delete the chat when clicked on trash bucket
    const deleteChat = async (chatID) => {
      try {
        const result = await Swal.fire({
          title: 'Delete Chat?',
          text: 'You will not be able to recover this chat!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          background:'#3a3a3a',
          color:'white',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          width: '350px',
          customClass: {
            popup: 'custom-swal'
            
          }
          
        });
    
        if (!result.isConfirmed) return;
    
        const deletedResponse = await databases.deleteDocument(databaseId, collectionId, chatID);
        console.log("Deleted chat:", deletedResponse);
        setShowResults(false);
        fetchChats(user.$id);
      } catch (error) {
        console.log("Error deleting chat", error);
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
    }, 2 * index);
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
        setLoading(false);
        setShowResults(true);
        
        // Sanitize leading bullet stars (* )
         let cleanedResult = result.replace(/^\* /gm, '&bull; '); 


        
        const responseArray = cleanedResult.split("**");
        let newResponse = "";
        
        // Handle bold text
        responseArray.forEach((text, index) => {
            newResponse += index % 2 === 1 ? `<b>${text}</b>` : text;
        });
        
       
        let newResponse2="";
        // Handle line breaks for global.that means all in the string.
        newResponse2 = newResponse.replace(/\n/g, "<br/>");
        
        // Handle code blocks
        newResponse2 = newResponse2.replace(/```([^`]+)```/g, "<pre>$1</pre>"); 
        newResponse2 = newResponse2.replace(/`([^`]+)`/g, "<code>$1</code>");
        
      
        newResponse2.split("").forEach((char, index) => {
          delaypara(index, char);
        });

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
    recentChats,
    deleteChat
  };

  return <ChatContext.Provider value={contextValue}>{props.children}</ChatContext.Provider>;
};

export default ContextProvider;
