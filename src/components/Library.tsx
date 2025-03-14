import React from 'react';
import RenderComponent from './RenderComponent';
import SidePanel from './SidePanel';
import { Stack } from '@mui/material';
import { uiElements } from './uiElements';
import { useDragDrop } from '../context/DragDropProvider';

const Library: React.FC = () => {
    const { setDraggedItem, setIsDragging } = useDragDrop();

    const handleDragStart = (element: any) => {
        setDraggedItem(element);
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <SidePanel>
            <Stack sx={{ p: 1 }} direction={'row'} flexWrap={'wrap'} gap={1}>
                {uiElements.map((element, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(element)}
                        onDragEnd={handleDragEnd}
                    >
                        <RenderComponent element={element} />
                    </div>
                ))}
            </Stack>
        </SidePanel>
    );
};

export default Library;

