import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useDragDrop } from '../context/DragDropProvider';
import { uiElements } from '../components/uiElements';
import { uid } from '../util/uid';

const Canvas: React.FC = () => {
    const { canvasElements, setCanvasElements, draggedItem, setDraggedItem, setIsDragging } = useDragDrop();
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [nestedElements, setNestedElements] = useState<Record<string, any[]>>({}); // Track nested elements

    const handleDragStart = (index: number) => {
        setDraggedItemIndex(index); // Track the index of the dragged item
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Allow dropping
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, parentId?: string, targetIndex?: number) => {
        event.stopPropagation();
        if (draggedItem) {
            if (parentId) {
                // Handle nested dropping
                const parentElement = canvasElements.find((element) => element.id === parentId);
                const uiElement = uiElements.find((ui) => ui.type === parentElement?.type);

                if (uiElement?.droppable) {
                    setNestedElements((prev) => ({
                        ...prev,
                        [parentId]: [...(prev[parentId] || []), { ...draggedItem, id: `${draggedItem.type}-${uid()}` }],
                    }));

                    // Update the props of the parent component (e.g., Card)
                    const updatedCanvasElements = [...canvasElements];
                    const parentElementIndex = canvasElements.findIndex((element) => element.id === parentId);
                    updatedCanvasElements[parentElementIndex] = {
                        ...parentElement,
                        props: {
                            ...parentElement.props,
                            children: [
                                ...(parentElement.props.children || []),
                                { type: draggedItem.type, id: `${draggedItem.type}-${uid()}`, props: draggedItem.props },
                            ],
                        },
                    };
                    setCanvasElements(updatedCanvasElements);
                } else {
                    console.warn(`Cannot drop inside ${parentElement?.type} as it is not droppable.`);
                }
            } else {
                // Drop on the canvas
                const newElement = { ...draggedItem, id: `${draggedItem.type}-${uid()}` }; // Ensure unique id for new element
                setCanvasElements((prev) => [...prev, newElement]);
            }
            setDraggedItem(null);
            setIsDragging(false);
        } else if (draggedItemIndex !== null && typeof targetIndex === 'number' && draggedItemIndex !== targetIndex) {
            // Handle rearranging items within the Canvas
            const updatedElements = [...canvasElements];
            const [draggedElement] = updatedElements.splice(draggedItemIndex, 1); // Remove the dragged item
            updatedElements.splice(targetIndex, 0, draggedElement); // Insert the dragged item at the new position
            setCanvasElements(updatedElements); // Update the state
        }
        setDraggedItemIndex(null); // Reset the dragged item index
    };

    const renderElement = (element: any, index: number, parentId?: string) => {
        const uiElement = uiElements.find((ui) => ui.type === element.type);
        if (uiElement) {
            const Component = uiElement.component;
            return (
                <Box
                    key={element.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={(event: React.DragEvent<HTMLDivElement>) => handleDrop(event, parentId, index)}
                    sx={{
                        border: '1px dashed #ccc',
                        padding: '10px',
                        backgroundColor: '#fff',
                        cursor: 'move',
                       
                    }}
                >
                    <Component {...element.props}>
                        {/* Render nested elements if any */}
                        {nestedElements[element.id]?.map((nestedElement, nestedIndex) =>
                            renderElement(nestedElement, nestedIndex, element.id)
                        )}
                    </Component>
                </Box>
            );
        }
        return null;
    };

    return (
        <Box
            sx={{ flex: 1, background: "#efefef", p: 2, minHeight: '400px' , display:'flex', alignContent: 'baseline',
                alignItems: 'flex-start',flexWrap:'wrap'}}
            onDragOver={handleDragOver}
            onDrop={(event: React.DragEvent<HTMLDivElement>) => handleDrop(event)} // Handle dropping from the Library
        >
            {canvasElements.map((element, index) => renderElement(element, index))}
        </Box>
    );
};

export default Canvas;
