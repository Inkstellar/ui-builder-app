import React from "react";
import { Paper, Typography } from '@mui/material';

const elementStyle = {
    width: 50,
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    boxShadow: 'none',
    overflow: 'hidden',
    "& span": {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    "&:hover": {
        boxShadow: '1',
        cursor: 'pointer'
    },
    "&:active": {
        cursor: 'grab'
    }
};

interface RenderComponentProps {
    element: {
        name: string;
        icon?: React.ReactNode;
    };
}

const RenderComponent: React.FC<RenderComponentProps> = ({ element }) => {
    return (
        <Paper sx={elementStyle}>
            {element.icon && element.icon}
            <Typography variant="caption">{element.name}</Typography>
        </Paper>
    );
};

export default RenderComponent;