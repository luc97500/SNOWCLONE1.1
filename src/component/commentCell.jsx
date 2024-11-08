import React, { useRef, useEffect } from 'react';

export const CommentCell = ({ row, onChange, isEditable, columnWidth, focus }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (focus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [focus]);

  const handleCommentChange = (event) => {
    onChange(row.id, event.target.value);
  };

  const textareaStyle = {
    width: columnWidth ? columnWidth : '100%',
    height: '100%',
    boxSizing: 'border-box',
  };

  return (
    <textarea
      ref={textareaRef}
      value={row.comment || ''}
      onChange={handleCommentChange}
      disabled={!isEditable}
      placeholder={isEditable ? 'Add a comment' : ''}
      style={textareaStyle}
    />
  );
};
