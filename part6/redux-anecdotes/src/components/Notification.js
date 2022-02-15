import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { hideNotification } from '../redux/actions/actions';

const Notification = (props) => {
  // const notification = useSelector((state) => state.notification);
  // const dispatch = useDispatch();
  const notification = props.notification;

  const hideNotif = () => {
    // dispatch(hideNotification());
    props.hideNotification();
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

const mapStateToProps = (state) => {
  return { notification: state.notification };
};

const mapDispatchToProps = {
  hideNotification,
};

const CNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default CNotification;
