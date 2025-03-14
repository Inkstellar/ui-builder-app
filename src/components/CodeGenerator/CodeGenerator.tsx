import React, { useEffect, useState } from 'react';
import { useDragDrop } from '../../context/DragDropProvider';
import yaml from 'js-yaml';
import { renderCode } from './renderCode';

const CodeGenerator: React.FC<{ nestedElements: Record<string, any[]> }> = ({ nestedElements }) => {
    const { canvasElements } = useDragDrop();
    const [generatedCode, setGeneratedCode] = useState<string>('');
    const [format, setFormat] = useState<'json' | 'yaml'>('json');

    useEffect(() => {
        const generateCode = (elements: any[], nestedElements: Record<string, any[]>): any[] => {
            const renderElements = (elements: any[]): any[] => {
                return elements.map((element) => {
                    const children = nestedElements[element.id]
                        ? renderElements(nestedElements[element.id])
                        : undefined;

                    return {
                        type: element.type,
                        id: element.id,
                        props: element.props,
                        ...(children ? { children } : {}),
                    };
                });
            };

            return renderElements(elements);
        };

        const structuredData = generateCode(canvasElements, nestedElements);

        if (format === 'json') {
            setGeneratedCode(JSON.stringify(structuredData, null, 2));
        } else if (format === 'yaml') {
            setGeneratedCode(yaml.dump(structuredData));
        }
    }, [canvasElements, nestedElements, format]);

    return (
        <div>
            <h3>Generated Code:</h3>
            <div>
                <label>
                    <input
                        type="radio"
                        value="json"
                        checked={format === 'json'}
                        onChange={() => setFormat('json')}
                    />
                    JSON
                </label>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="radio"
                        value="yaml"
                        checked={format === 'yaml'}
                        onChange={() => setFormat('yaml')}
                    />
                    YAML
                </label>
            </div>
            {renderCode(generatedCode)}
        </div>
    );
};

export default CodeGenerator;

