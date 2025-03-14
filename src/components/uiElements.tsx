import React from 'react';
import { RxButton, RxCardStack } from 'react-icons/rx';
import { BsInputCursorText } from 'react-icons/bs';
import ButtonElement from './ui-elements/ButtonElement';
import CardElement from './ui-elements/CardElement';
import TextFieldElement from './ui-elements/TextFieldElement';

// Define the type for a UI component
export interface UIElement {
    type: string; // Unique type identifier for the component
    id: string; // Unique ID for the element
    name: string; // Display name of the element
    icon: React.ReactNode; // Icon representing the element
    activated: boolean; // Whether the element is active or not
    component: React.FC<any>; // The React component to render
    props?: Record<string, any>; // Optional props for the component
    draggable: boolean; // Whether the element can be dragged or not
    droppable: boolean; // Whether the element can be dropped on or not
}

// Define the uiElements array with proper types
export const uiElements: UIElement[] = [
    {
        type: 'button',
        id: 'button-1',
        name: 'Button',
        icon: <RxButton />,
        activated: true,
        component: ButtonElement,
        props: { variant: 'contained', children: 'Click Me' },
        draggable: true,
        droppable: false,
    },
    {
        type: 'card',
        id: 'card-1',
        name: 'Card',
        icon: <RxCardStack />,
        activated: true,
        component: CardElement,
        props: {},
        draggable: true,
        droppable: true,
    },
    {
        type: 'textfield',
        id: 'textfield-1',
        name: 'TextField',
        icon: <BsInputCursorText />,
        activated: true,
        component: TextFieldElement,
        props: { label: 'Enter Text', variant: 'outlined' },
        draggable: true,
        droppable: false,
    },
];
