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
// remove carriage return character
cleanString(inputString) {
    // Check if the string contains \r\n
    if (/(\r\n|\n|\r)/.test(inputString)) {
        // If it does, clean the string
        return inputString.replace(/\r\n\r\n/g, "<br><br>").replace(/(\r\n|\n|\r|\t)/gm, "<br>");
    } else {
        // If it doesn't, return the original string
        return inputString;
    }
},
// Utility function to remove shortcodes, convert carriage return to <br>, 
// and modify API response to convert internal links from pftravel => princeoftravel.com/

cleanAndModifyApiResponse(apiResponse) {
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

removeCarriageReturn(apiResponse) {
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

        // Check if cleaned text contains line breaks
        if (/\r\n|\n|\r/.test(obj)) {
          // Clean the string with line breaks
        //   obj = obj.replace(/(\r\n|\n|\r|\t)/gm, "<br>");
          obj = obj.replace(/\r\n\r\n/g, "<span class='d-table mt-3'></span>").replace(/(\r\n|\n|\r|\t)/gm, "");
        }
      }
      // Return modified or unchanged obj
      return obj;
    }
    // Apply recursiveModify to apiResponse
    return recursiveModify(apiResponse);
  },
cleanAndModifyApiResponse(apiResponse) {
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
  
        // Check if cleaned text contains line breaks
        if (/\r\n|\n|\r/.test(obj)) {
          // Clean the string with line breaks
          obj = obj.replace(/\r\n\r\n/g, "<br>").replace(/(\r\n|\n|\r|\t)/gm, "<br>");
        }
      }
      // Return modified or unchanged obj
      return obj;
    }
    // Apply recursiveModify to apiResponse
    return recursiveModify(apiResponse);
  },
  formatDate(dateTimeString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', options);
}

//   formatDate(dateTimeString) {
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     const date = new Date(dateTimeString);
//     return date.toLocaleDateString('en-US', options);
// }

   };
