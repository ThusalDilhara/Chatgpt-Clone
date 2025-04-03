import { createContext, useState } from 'react';
import run from '../config/chatgpt';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading,setLoading]=useState(false);
  const [showResults, setShowResults] = useState(false);

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

  const newChat=()=>{
      setLoading(false);
      setShowResults(false);
      setChatHistory([]);
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
      const responseArray=result.split("**");
      let newResponse="";
      responseArray.forEach((text, index) => {
        
        newResponse += index % 2 === 1 ? `<b>${text}</b>` : text;
      });
      let newResponse2= newResponse.split("*").join("<br/>");

      let finalResponse= newResponse2.split(" ");
      for (let i = 0; i < finalResponse.length; i++) {
        const nextword = finalResponse[i];
        delaypara(i,nextword+" ");
      }
      
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }finally{
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
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
