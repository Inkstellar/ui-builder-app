import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CardElement: React.FC<any> = (props) => {
    return (
        <Card {...props} sx={{ minHeight: 100, minWidth:240, padding: 2 }}>
            <CardContent>{props.children || 'Card Content'}</CardContent>
        </Card>
    );
};

export default CardElement;