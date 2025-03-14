import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DragDropContextProps {
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
    draggedItem: any;
    setDraggedItem: (item: any) => void;
    canvasElements: any[];
    setCanvasElements: React.Dispatch<React.SetStateAction<any[]>>;
    addElementToCanvas: (element: any) => void;
}

const DragDropContext = createContext<DragDropContextProps | undefined>(undefined);

export const DragDropProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedItem, setDraggedItem] = useState<any>(null);
    const [canvasElements, setCanvasElements] = useState<any[]>([]);

    const addElementToCanvas = (element: any) => {
        setCanvasElements((prev) => [...prev, element]);
    };

    return (
        <DragDropContext.Provider
            value={{
                isDragging,
                setIsDragging,
                draggedItem,
                setDraggedItem,
                canvasElements,
                setCanvasElements,
                addElementToCanvas,
            }}
        >
            {children}
        </DragDropContext.Provider>
    );
};

export const useDragDrop = (): DragDropContextProps => {
    const context = useContext(DragDropContext);
    if (!context) {
        throw new Error('useDragDrop must be used within a DragDropProvider');
    }
    return context;
};