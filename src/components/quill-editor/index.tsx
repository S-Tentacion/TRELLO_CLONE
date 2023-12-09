/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React from 'react';
//https://github.com/zenoamaro/react-quill/issues/122
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import { Box } from '@chakra-ui/react';

interface QuillEditorProps {
  value: any;
  onChange: any;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }): JSX.Element => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];

  return (
    <Box className="text-editor">
      <ReactQuill
        theme="snow"
        style={{ height: '120px' }}
        value={value}
        onChange={(value) => onChange(value)}
        modules={modules}
        formats={formats}></ReactQuill>
    </Box>
  );
};

export default QuillEditor;
