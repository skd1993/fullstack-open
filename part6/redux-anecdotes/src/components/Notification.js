import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../redux/actions/actions';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const hideNotif = () => {
    dispatch(hideNotification());
  };

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  
  return (
    notification.length > 0 && (
      <div onClick={hideNotif} style={style}>
        {notification}
      </div>
    )
  );
};

export default Notification;
