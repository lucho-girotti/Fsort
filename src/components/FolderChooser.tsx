import React, { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Extend FileSystemDirectoryHandle to include 'entries' method
interface ExtendedFileSystemDirectoryHandle extends FileSystemDirectoryHandle {
  entries(): AsyncIterable<[string, FileSystemHandle]>;
}

const FolderChooser: React.FC = () => {
  const [folderHandle, setFolderHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleChooseFolder = async () => {
    try {
      const handle = (await window.showDirectoryPicker()) as ExtendedFileSystemDirectoryHandle;
      setFolderHandle(handle);
      console.log('Folder chosen:', handle);

      // Retrieve file names
      const files: string[] = [];
      console.log('Iterating over folder entries...');
      for await (const [name, entryHandle] of handle.entries()) {
        console.log(`Entry: ${name}, Kind: ${entryHandle.kind}`);
        if (entryHandle.kind === 'file') {
          files.push(name);
        }
      }
      setFileNames(files);
      console.log('Files in folder:', files);
    } catch (error) {
      console.error('Error choosing folder:', error);
    }
  };

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const items = event.dataTransfer.items;
    if (items.length > 0) {
      const item = items[0];
      const entry = item.webkitGetAsEntry();
      if (entry && entry.isDirectory) {
        const handle = entry as unknown as ExtendedFileSystemDirectoryHandle;
        setFolderHandle(handle);
        console.log('Folder chosen via drag-and-drop:', handle);

        // Retrieve file names
        const files: string[] = [];
        console.log('Iterating over folder entries (drag-and-drop)...');
        for await (const [name, entryHandle] of handle.entries()) {
          console.log(`Entry: ${name}, Kind: ${entryHandle.kind}`);
          if (entryHandle.kind === 'file') {
            files.push(name);
          }
        }
        setFileNames(files);
        console.log('Files in folder (drag-and-drop):', files);
      }
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '8px',
        backgroundColor: '#151b23',
      }}
    >
      <Button
        variant="contained"
        sx={{ backgroundColor: '#212830', '&:hover': { backgroundColor: '#1a1f26' } }}
        onClick={handleChooseFolder}
      >
        Choose Folder
      </Button>
      <Typography variant="body1" sx={{ marginTop: '10px' }}>
        or drag and drop a folder here
      </Typography>
      {folderHandle && (
        <>
          <Typography variant="body2" sx={{ marginTop: '10px' }}>
            Folder chosen: {folderHandle.name}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: '10px' }}>
            Files in folder:
          </Typography>
          <ul>
            {fileNames.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </>
      )}
    </Box>
  );
};

export default FolderChooser;
