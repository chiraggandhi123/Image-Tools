export const handleExtractText = async (imageUrl) => {
    try {
      const response = await fetch('/api/extract-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({imageUrl}),
      });

      const data = await response.json();
      if (response.ok) {
        setExtractedText(data.text);
      } else {
        setError(data.error || 'Error extracting text');
      }
    } catch (err) {
      setError('Error extracting text');
    }
  };

  export const convertStaticImageDataToBase64 = async (staticImageData) => {
    const img = new Image();
    img.src = staticImageData.src;
  
    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl.split(',')[1]); // Return Base64 string without the prefix
      };
      img.onerror = reject;
    });
  };
  