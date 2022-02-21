import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return (
    notification?.length > 0 && (
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
    )
  );
};

export default Notification;
