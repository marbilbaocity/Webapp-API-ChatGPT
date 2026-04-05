import React, { useState } from 'react';
import { generarTexto } from './openaiClient';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Agregamos mensaje del usuario
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // Llamamos a OpenAI
    const respuesta = await generarTexto(input);

    // Agregamos respuesta de ChatGPT
    const botMessage = { role: 'bot', content: respuesta };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>ChatGPT Simple</h2>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 10,
        height: 400,
        overflowY: 'auto',
        marginBottom: 10,
        backgroundColor: '#f9f9f9'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 10, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: 16,
              backgroundColor: msg.role === 'user' ? '#007bff' : '#e0e0e0',
              color: msg.role === 'user' ? '#fff' : '#000',
              maxWidth: '80%',
              wordWrap: 'break-word'
            }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p>ChatGPT está escribiendo...</p>}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Escribe un mensaje..."
        style={{ width: '80%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
      />
      <button onClick={handleSend} style={{ padding: 10, marginLeft: 10, borderRadius: 8, cursor: 'pointer' }}>
        Enviar
      </button>
    </div>
  );
}