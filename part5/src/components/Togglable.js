import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false);

  const visibilityHandler = () => {
    setVisibility((prevState) => !prevState);
  };

  useImperativeHandle(ref, () => {
    return { visibilityHandler };
  });

  return (
    <div className={`${props.buttonName}-button-class`}>
      <button
        onClick={visibilityHandler}
        style={{ display: visibility ? 'none' : '' }}
      >
        {props.buttonName}
      </button>
      <div
        style={{ display: visibility ? '' : 'none' }}
        className={'togglable'}
      >
        {props.children}
        <button onClick={visibilityHandler}>{props.cancelButtonName}</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonName: PropTypes.string.isRequired,
  cancelButtonName: PropTypes.string.isRequired,
};

export default Togglable;
