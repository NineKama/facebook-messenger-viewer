import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function JSONFileReader() {
    const [jsonData, setJsonData] = useState(null);

    const handleFileRead = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                setJsonData(json);
            } catch (error) {
                console.error('Error reading the JSON file:', error);
                message.error('Failed to read the JSON file');
            }
        };
        reader.readAsText(file);
        // Prevent upload
        return false;
    };

    return (
        <div>
            <Upload
                beforeUpload={handleFileRead}
                accept=".json"
                showUploadList={false}
            >
                <Button icon={<UploadOutlined />}>Click to Upload JSON</Button>
            </Upload>
            {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
        </div>
    );
}

export default JSONFileReader;
