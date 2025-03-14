import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useDragDrop } from '../../context/DragDropProvider';
import { uiElements } from '../uiElements';
import { uid } from '../../util/uid';
import CanvasElement from './CanvasElement';

const Canvas: React.FC = () => {
    const { canvasElements, setCanvasElements, draggedItem, setDraggedItem, setIsDragging } = useDragDrop();
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [nestedElements, setNestedElements] = useState<Record<string, any[]>>({}); // Track nested elements

    const handleDropOnCanvas = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (draggedItem) {
            const newElement = { ...draggedItem, id: `${draggedItem.type}-${uid()}` }; // Ensure unique id for new element
            setCanvasElements((prev) => [...prev, newElement]);
            setDraggedItem(null);
            setIsDragging(false);
        }
    };

    return (
        <Box
            sx={{ flex: 1, background: "#efefef", p: 2, minHeight: '400px' }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDropOnCanvas} // Handle dropping from the Library
        >
            {canvasElements.map((element, index) => (
                <CanvasElement
                    key={element.id}
                    element={element}
                    index={index}
                    parentId={null}
                    canvasElements={canvasElements}
                    setCanvasElements={setCanvasElements}
                    draggedItemIndex={draggedItemIndex}
                    setDraggedItemIndex={setDraggedItemIndex}
                    nestedElements={nestedElements}
                    setNestedElements={setNestedElements}
                />
            ))}
        </Box>
    );
};

export default Canvas;
