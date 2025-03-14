import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { ReactNode } from "react";

const SidePanel = ({ children }: { children: ReactNode }) => {
    return <Paper sx={{
        width: 320,
        height:'calc( 100vh - 64px )',
        borderRadius:0}} elevation={0} >
        <Box>
            {children}
        </Box>
    </Paper>
};

export default SidePanel;
