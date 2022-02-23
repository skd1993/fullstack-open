import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@chakra-ui/react';

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
      <Button colorScheme='blue' size={'sm'}
        onClick={visibilityHandler}
        style={{ display: visibility ? 'none' : '' }}
      >
        {props.buttonName}
      </Button>
      <Box
        style={{ display: visibility ? '' : 'none' }}
        className={'togglable'}
      >
        {props.children}
        <Button onClick={visibilityHandler} bgColor='gray.300' isFullWidth={true}>{props.cancelButtonName}</Button>
      </Box>
    </div>
  );
});

Togglable.propTypes = {
  buttonName: PropTypes.string.isRequired,
  cancelButtonName: PropTypes.string.isRequired,
};

export default Togglable;
