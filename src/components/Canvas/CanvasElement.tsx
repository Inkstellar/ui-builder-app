import React from 'react';
import { Box } from '@mui/material';
import { uiElements } from '../uiElements';
import { CanvasElementProps } from './CanvasElementProps';

const CanvasElement: React.FC<CanvasElementProps> = ({
    element,
    index,
    parentId,
    canvasElements,
    setCanvasElements,
    draggedItemIndex,
    setDraggedItemIndex,
    nestedElements,
    setNestedElements,
}) => {
    const handleDragStart = () => {
        setDraggedItemIndex(index); // Track the index of the dragged item
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Allow dropping
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (draggedItemIndex !== null && draggedItemIndex !== index) {
            // Handle rearranging items within the Canvas
            const updatedElements = [...canvasElements];
            const [draggedElement] = updatedElements.splice(draggedItemIndex, 1); // Remove the dragged item
            updatedElements.splice(index, 0, draggedElement); // Insert the dragged item at the new position
            setCanvasElements(updatedElements); // Update the state
        }
        setDraggedItemIndex(null); // Reset the dragged item index
    };

    const handleNestedDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const uiElement = uiElements.find((ui) => ui.type === element.type);
        if (uiElement?.droppable) {
            setNestedElements((prev) => ({
                ...prev,
                [element.id]: [...(prev[element.id] || []), { ...canvasElements[draggedItemIndex!] }],
            }));
        }
    };

    const uiElement = uiElements.find((ui) => ui.type === element.type);
    if (!uiElement) return null;

    const Component = uiElement.component;

    return (
        <Box
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={parentId ? handleNestedDrop : handleDrop}
            sx={{
                border: '1px dashed #ccc',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#fff',
                cursor: 'move',
            }}
        >
            <Component {...element.props}>
                {/* Render nested elements if any */}
                {nestedElements[element.id]?.map((nestedElement, nestedIndex) => (
                    <CanvasElement
                        key={nestedElement.id}
                        element={nestedElement}
                        index={nestedIndex}
                        parentId={element.id}
                        canvasElements={canvasElements}
                        setCanvasElements={setCanvasElements}
                        draggedItemIndex={draggedItemIndex}
                        setDraggedItemIndex={setDraggedItemIndex}
                        nestedElements={nestedElements}
                        setNestedElements={setNestedElements}
                    />
                ))}
            </Component>
        </Box>
    );
};

export default CanvasElement;