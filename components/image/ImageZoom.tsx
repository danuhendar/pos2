import React from 'react';
import styles from './ImageZoom.module.css'; // Create this CSS module

const ImageZoom = ({ imageUrl, altText }) => {
  return (
    <div className={styles.imageContainer}>
      <img src={imageUrl} alt={altText} className={styles.zoomable} />
    </div>
  );
};

export default ImageZoom;