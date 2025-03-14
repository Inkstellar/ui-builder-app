import React from 'react';
import Button from '@mui/material/Button';

const ButtonElement: React.FC<any> = (props) => {
    return <Button {...props} sx={{minWidth:100}}>{props.children || 'Click Me'}</Button>;
};

export default ButtonElement;