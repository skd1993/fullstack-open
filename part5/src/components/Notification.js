import React from 'react';

const Notification = ({ notification }) => {
  return (
    <div
      className='notification'
      style={{
        borderRadius: '10px',
        borderColor: 'red',
        borderWidth: '5px',
        padding: '10px',
        backgroundColor: '#eee',
      }}
    >
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
