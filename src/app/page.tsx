'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, firestore } from '@/app/firbase';
import { signOut } from 'firebase/auth';
import { collection, query, onSnapshot, addDoc, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import './page.module.css';

const ChatPage = () => {
  const [user, loading] = useAuthState(auth);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for loading to finish
    if (!user) router.push('/Login'); // Redirect to login if not authenticated

    const messagesQuery = query(collection(firestore, 'messages'));
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const msgs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(msgs);
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [user, loading, router]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return; // Ignore empty messages

    try {
      await addDoc(collection(firestore, 'messages'), {
        text: message,
        uid: user?.uid,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push('/Login');
    });
  };

  return (
    <div className="chat-body">
      <header className="chat-header">
        <h1>Chat Room</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </header>
      <main className="chat-container">
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id}className={`message ${msg.uid === user?.uid ? "sent" : "received"}`} >
              {/* Escape any special characters if necessary */}
              {msg.text}
            </div>
          ))}
        </div>
        <form className="message-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            required
          />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
};

export default ChatPage;
