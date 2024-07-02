export default {
    // reduce length of post description to closest full word
    shorten: (text, max) => {
        return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') : text
    },
    shortenToClosestPeriod: (str, maxLength) => {
        // Check if the string is longer than the maxLength
    // Check if the string length is greater than the maxLength
    if (str.length > maxLength) {
        // Find the index of the first period within the specified maxLength
        let periodIndex = -1;
        for (let i = 0; i < maxLength; i++) {
            if (str[i] === '.') {
                periodIndex = i;
                break;
            }
        }

        // If period is found within maxLength, truncate at the period
        if (periodIndex !== -1) {
            return str.slice(0, periodIndex + 1); // Include the period in the result
        } else {
            // If no period is found within maxLength, truncate at maxLength and add ellipsis
            return str.slice(0, maxLength) + "...";
        }
    } else {
        // If the string length is less than or equal to maxLength, return the original string
        return str;
    }
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
    },
    removeShortcodes: (text) => {
        // Regular expression to match any shortcode pattern inside square brackets
        const shortcodeRegex = /\[[^\]]+\]/gi;

        // Remove all matched shortcodes from the text
        return text.replace(shortcodeRegex, '');
    },
    
    modifyApiResponse(apiResponse) {
    // Helper function to recursively modify values
    function recursiveModify(obj) {
        // Check if obj is an object (excluding null, which typeof 'object' would also include)
        if (typeof obj === 'object' && obj !== null) {
            // Iterate through each key in the object
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // Recursively call recursiveModify for nested objects or arrays
                    obj[key] = recursiveModify(obj[key]);
                }
            }
        } else if (typeof obj === 'string') {
            // Perform the URL replacement for strings
            obj = obj.replace(/pftraveldev\.wpengine\.com/g, 'princeoftravel.com');
            // Regular expression to match any shortcode pattern inside square brackets
            const shortcodeRegex = /\[[^\]]+\]/gi;

            // Remove all matched shortcodes from the string
            obj = obj.replace(shortcodeRegex, '');
        }
        // Return modified or unchanged obj
        return obj;
    }

    // Apply recursiveModify to apiResponse
    return recursiveModify(apiResponse);
},
    // cleanString:(inputString) => {
    //     // Replace single line breaks with <br>, double line breaks with <br><br>, and remove tabs
    //     return inputString.replace(/\r\n\r\n/g, "<br><br>").replace(/(\r\n|\n|\r|\t)/gm, "<br>");
    //   },

    // removeShortcodes: (str) => {
    //     // Regular expression to match shortcodes
    //     const shortcodeRegex = /\[\/?([a-z]+_[a-z]+).*?\]/gi;
      
    //     // Replace matched shortcodes with an empty string
    //     return str.replace(shortcodeRegex, '');
    //   },

    // addPTagsToText: (text) => {
    //     // Split the text into paragraphs using \r\n\r\n as delimiter
    //     let paragraphs = text.split(/\r\n\r\n/);
    
    //     // Map over each paragraph to wrap them in <p> tags
    //     let paragraphsWithTag = paragraphs.map(paragraph => `<p>${paragraph}</p>`);
    
    //     // Join paragraphs into a single string with <p> tags
    //     let textWithTag = paragraphsWithTag.join('');
    
    //     return textWithTag;
    // }
   };
