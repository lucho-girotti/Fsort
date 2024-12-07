var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const FolderChooser = () => {
    const [folderHandle, setFolderHandle] = useState(null);
    const handleChooseFolder = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const handle = yield window.showDirectoryPicker();
            setFolderHandle(handle);
            console.log('Folder chosen:', handle);
        }
        catch (error) {
            console.error('Error choosing folder:', error);
        }
    });
    const handleDrop = useCallback((event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const items = event.dataTransfer.items;
        if (items.length > 0) {
            const item = items[0];
            const entry = item.webkitGetAsEntry();
            if (entry && entry.isDirectory) {
                const handle = entry;
                setFolderHandle(handle);
                console.log('Folder chosen:', handle);
            }
        }
    }), []);
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    return (_jsxs(Box, { onDrop: handleDrop, onDragOver: handleDragOver, sx: {
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '8px',
            backgroundColor: '#151b23',
        }, children: [_jsx(Button, { variant: "contained", sx: { backgroundColor: '#212830', '&:hover': { backgroundColor: '#1a1f26' } }, onClick: handleChooseFolder, children: "Choose Folder" }), _jsx(Typography, { variant: "body1", sx: { marginTop: '10px' }, children: "or drag and drop a folder here" }), folderHandle && (_jsxs(Typography, { variant: "body2", sx: { marginTop: '10px' }, children: ["Folder chosen: ", folderHandle.name] }))] }));
};
export default FolderChooser;
