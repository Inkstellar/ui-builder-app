import React from 'react';

export interface CanvasElementProps {
    element: any;
    index: number;
    parentId: string | null;
    canvasElements: any[];
    setCanvasElements: React.Dispatch<React.SetStateAction<any[]>>;
    draggedItemIndex: number | null;
    setDraggedItemIndex: React.Dispatch<React.SetStateAction<number | null>>;
    nestedElements: Record<string, any[]>;
    setNestedElements: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
}
