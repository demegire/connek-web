export function downsizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const image = new Image();
        image.onload = function () {
          const canvas = document.createElement('canvas');
          let width = image.width;
          let height = image.height;
  
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
  
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);
  
          const downsizedDataURL = canvas.toDataURL(file.type);
          const downsizedBlob = dataURLtoBlob(downsizedDataURL);
  
          resolve(downsizedBlob);
        };
        image.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
  
  function dataURLtoBlob(dataURL) {
    const parts = dataURL.split(',');
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }