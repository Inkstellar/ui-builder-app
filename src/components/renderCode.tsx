import React from 'react';
import MonacoEditor from '@monaco-editor/react';

export function renderCode(generatedCode: string) {
    return (
        <div style={{ height: '400px', border: '1px solid #ccc',margin:'10px' }}>
            <MonacoEditor
                height="100%"
                theme='vs-dark'
                defaultLanguage="javascript"
                value={generatedCode}
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
}
