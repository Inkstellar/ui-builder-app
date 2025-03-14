import React from 'react'
import './App.css';
import Layout from './layout/Layout';
import { DragDropProvider } from './context/DragDropProvider';

function App() {
  return (
    <DragDropProvider>
         <Layout />
     </DragDropProvider>
  )
}

export default App
