// src/components/MediaUploader.js
import React from 'react';
import { updatePostWithMedia, createPostWithCategory } from '../api';

const MediaUploader = ({ postId }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('media', file);
    // Use updatePostWithMedia or createPostWithCategory based on use case
    updatePostWithMedia(formData).then(response => console.log(response));
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default MediaUploader;
