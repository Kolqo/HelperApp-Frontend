import React, { useState, useEffect } from 'react';
import styles from './imageLoader.module.css';
import AddPhotoSVG from '../../assets/addPhotoSVG/addPhotoSVG';

export default function ImageLoader(props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            if (file.size > 50000) {
                setErrorMessage('Selected image exceeds the limit of 50 KB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.src = event.target.result;
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const maxSize = Math.min(image.width, image.height);
                    canvas.width = maxSize;
                    canvas.height = maxSize;
                    const offsetX = (image.width - maxSize) / 2;
                    const offsetY = (image.height - maxSize) / 2;
                    context.drawImage(image, offsetX, offsetY, maxSize, maxSize, 0, 0, maxSize, maxSize);

                    canvas.toBlob((blob) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = () => {
                            const imageUrl = reader.result;
                            setSelectedImage(imageUrl);
                            setErrorMessage('');
                        };
                    }, 'image/jpeg', 0.5);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        handleUpload();
      }, [selectedImage]);

    const handleUpload = () => {
        if (selectedImage) {
            props.setData(selectedImage)
        } 
    };

    return (
        <>
            <div className={`${styles.imageLoaderClass} ${props.className}`}>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                <div onClick={() => document.querySelector('input[type="file"]').click()} className={styles.imageAndText}>
                    <AddPhotoSVG />
                    Add a photo
                </div>
                {selectedImage && (
                    <div className={styles.selectedImage}>
                        <img src={selectedImage} alt="Selected" />
                    </div>
                )}
                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            </div>
        </>
    );
}
