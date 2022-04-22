import { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommendations from './components/Recommendations';
import { useApolloClient, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from './apollo/queries';
import { updateCache } from './apollo/updateCache';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);

  const client = useApolloClient();

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const addedBook = subscriptionData.data.bookAdded;
      showMessage(`${addedBook.title} has been added`);
      alert(`${addedBook.title} has been added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const setAuthenticated = (tokenVal) => {
    setToken(tokenVal);
    setPage('authors');
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    showMessage('logged out');
    setPage('authors');
  };

  return (
    <div>
      {message && (
        <div>
          <p style={{ color: 'red' }}>{message}</p>
        </div>
      )}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommendations')}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} showMessage={showMessage} />

      <Books show={page === 'books'} />

      {token && (
        <NewBook
          show={page === 'add'}
          showMessage={showMessage}
          setPage={setPage}
        />
      )}

      {token && (
        <Recommendations
          show={page === 'recommendations'}
          showMessage={showMessage}
          setPage={setPage}
        />
      )}

      {!token && (
        <Login
          show={page === 'login'}
          setAuthenticated={setAuthenticated}
          showMessage={showMessage}
        />
      )}
    </div>
  );
};

export default App;
