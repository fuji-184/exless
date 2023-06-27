import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBvmSTZ7J05ZpVUYryd8xPuwpjISQ-2vbU",
  authDomain: "exless-455f4.firebaseapp.com",
  databaseURL: "https://exless-455f4-default-rtdb.firebaseio.com",
  projectId: "exless-455f4",
  storageBucket: "exless-455f4.appspot.com",
  messagingSenderId: "661553876416",
  appId: "1:661553876416:web:31230c225771e8a8920c25",
  measurementId: "G-4Q5WRZR6MX"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

const CommunityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [messages, setMessages] = useState([]);
  const [chatBaru, setNewMessage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('userEmail')){
    navigate(`/login`, { replace: true });
    }
    const messagesRef = ref(database, `/Community/${id}/Chat`);

    const handleData = (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.keys(messagesData).map((key) => ({
          id: key,
          ...messagesData[key],
        }));
        setMessages(messagesArray);
      }
    };

    const messagesListener = onValue(messagesRef, handleData);

    return () => {
      off(messagesRef, 'value', messagesListener);
    };
  }, [database, id]);

  const sendMessage = async () => {
    const userEmail = localStorage.getItem('emailUser');
    const newMessageData = {
      user: userEmail,
      message: chatBaru,
    };
    setMessages([...messages, newMessageData]);
    setNewMessage('');

    const chatRef = ref(database, `/Community/${id}/Chat`);
    push(chatRef, newMessageData);
   
  };

  const [communityData, setCommunityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/community/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setCommunityData(data);
      } catch (error) {
        console.log('Error fetching community data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!communityData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-4">
      <div className="w-full h-64 relative">
        <img src={communityData.foto} alt={communityData.nama} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute top-4 left-4 text-white font-bold text-xl">{communityData.nama}</div>
      </div>
      <div className="p-4">
        <p className="text-gray-600">{communityData.deskripsi}</p>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Chat</h2>
        <div className="border border-gray-300 p-4 rounded-lg mb-4 h-48 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold">              {message.user}: </span>
              <span>{message.message}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={chatBaru}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border border-gray-300 rounded-l-lg px-4 py-2 flex-grow focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
