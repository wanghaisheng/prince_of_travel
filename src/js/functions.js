export default {
    // reduce length of post description to closest full word
    shorten: (text, max) => {
        return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') : text
    },
    thanks: (inputID, modalID) => {
        const inpObj = document.getElementById(inputID);
        if (inpObj.checkValidity() === false) {
        // alert("Please include a valid email address");
        return false;
        } else {
        var modal1 = new bootstrap.Modal(document.getElementById(modalID)); 
        function showhide() { 
            // show Modal 
            modal1.show(); 
            // hide the modal after 5 seconds 
            setTimeout(() => { 
                modal1.hide(); 
            }, 5500) 
        } 
        showhide();
        }
    },
    // not using but works
    isPortraitOrientation: (imgSrc) => {
          // Get the natural width and height of the image element
        const width = imgSrc.naturalWidth || imgSrc.width;
        const height = imgSrc.naturalHeight || imgSrc.height;
        // Check if the image is in portrait orientation
        return height > width;
    }
   };

 