import { createContext, useState } from 'react';
import run from '../config/chatgpt';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // Stores both prompts and responses

  const onsent = async () => {
    if (!input.trim()) return;

    const userPrompt = input;
    setInput('');

   
    setChatHistory((prev) => [...prev, { sender: 'user', message: userPrompt }]);

    
    try {
      const result = await run(userPrompt);
      setChatHistory((prev) => [...prev, { sender: 'gpt', message: result }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  const contextValue = {
    input,
    setInput,
    onsent,
    chatHistory,
    setChatHistory,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
