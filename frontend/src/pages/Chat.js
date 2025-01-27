
import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [chatQuery, setChatQuery] = useState('');
  const [chatResults, setChatResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const faqDatabase = {
    shipping: {
      question: 'What are your shipping policies?',
      answer: 'We offer free shipping on orders over $50. Shipping takes 5-7 business days.',
    },
    returns: {
      question: 'What is your return policy?',
      answer: 'You can return items within 30 days of receiving them. Make sure the product is unused and in original packaging.',
    },
    hours: {
      question: 'What are your store hours?',
      answer: 'We are open Monday to Friday, from 9:00 AM to 6:00 PM.',
    },
    payment: {
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa, MasterCard, PayPal, and Apple Pay.',
    },
  };

  const handleChatQuery = () => {
    setLoading(true);
    const queryLower = chatQuery.toLowerCase();

    if (queryLower.includes('shipping')) {
      setChatResults([
        { Title: 'Shipping Policy', Body: faqDatabase.shipping.answer },
      ]);
      setLoading(false);
    } else if (queryLower.includes('return')) {
      setChatResults([
        { Title: 'Return Policy', Body: faqDatabase.returns.answer },
      ]);
      setLoading(false);
    } else if (queryLower.includes('hours')) {
      setChatResults([
        { Title: 'Store Hours', Body: faqDatabase.hours.answer },
      ]);
      setLoading(false);
    } else if (queryLower.includes('payment')) {
      setChatResults([
        { Title: 'Payment Methods', Body: faqDatabase.payment.answer },
      ]);
      setLoading(false);
    } else {
      axios
        .post('http://localhost:5000/chat', { query: chatQuery })
        .then((response) => {
          setChatResults(response.data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error handling chat query:', err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat Interface</h1>
      <div className="chat-bar">
        <input
          type="text"
          placeholder="Ask a question"
          value={chatQuery}
          onChange={(e) => setChatQuery(e.target.value)}
        />
        <button onClick={handleChatQuery}>Send</button>
      </div>
      <div className="chat-results">
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : chatResults.length === 0 ? (
          <p className="no-results">No results found.</p>
        ) : (
          chatResults.map((result, index) => (
            <div className="chat-result" key={index}>
              <h3>{result.Title}</h3>
              <p>{result.Body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Chat;
