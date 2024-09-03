// v3

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Define paths
const redirectsPath = path.resolve('./public/_redirects');
const netlifyTomlPath = path.resolve('./public/netlify.toml');
const outputRedirectsPath = redirectsPath;

// Fetch posts with proper error handling
const fetchPostsByMetaValue = async (metaValue, page = 1, perPage = 100) => {
  try {
    const url = new URL('https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts');
    url.searchParams.append('meta_key', 'category_name');
    url.searchParams.append('meta_value', metaValue);
    url.searchParams.append('page', page);
    url.searchParams.append('per_page', perPage);

    console.log(`Fetching URL: ${url.toString()}`);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}: ${response.status} ${response.statusText}`);
    }

    const responseText = await response.text();

    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return [];
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

// Fetch all posts handling pagination
const fetchAllPosts = async (metaValues) => {
  let allPosts = [];

  for (const metaValue of metaValues) {
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const posts = await fetchPostsByMetaValue(metaValue, page);
      if (posts.length > 0) {
        allPosts = allPosts.concat(posts);
        page += 1;
      } else {
        hasMorePages = false;
      }
    }
  }

  return allPosts;
};

// Read and parse redirects from a file
const readRedirectsFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#')) // Ignore empty lines and comments
      .map(line => {
        const [from, to, status] = line.split(' ');
        return { from, to, status };
      });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
};

// Write redirects to a file
const writeRedirectsToFile = (redirects) => {
  try {
    fs.writeFileSync(
      outputRedirectsPath,
      redirects.map(rule => `${rule.from} ${rule.to} ${rule.status}`).join('\n') + '\n',
      'utf8'
    );
    console.log('Deduplicated redirects file generated successfully.');
  } catch (error) {
    console.error('Error writing redirects file:', error);
  }
};

// Generate redirects based on fetched posts
const generateRedirects = async () => {
  try {
    // Define category meta values
    const metaValues = ['news', 'reviews', 'insights', 'guides', 'deals', 'about'];

    // Fetch all posts
    const posts = await fetchAllPosts(metaValues);

    // Create a map for category slugs based on fetched data
    const categoryMap = posts.reduce((map, post) => {
      const categoryName = post.category_name; // Ensure this field is correct
      const slug = post.slug;

      if (categoryName && slug) {
        map[slug] = categoryName; // Map slug to categoryName
      }
      return map;
    }, {});

    console.log('Category Map:', categoryMap);

    // Generate redirects
    const redirects = Object.keys(categoryMap).map(slug => ({
      from: `/uncategorized/${slug}`,
      to: `/${categoryMap[slug]}/${slug}`,
      status: '301'
    }));

    // Read existing redirects
    const existingRedirects = [
      ...readRedirectsFromFile(redirectsPath),
      ...readRedirectsFromFile(netlifyTomlPath)
    ];

    // Debug output to verify what is being combined
    console.log('New Redirects:', redirects);
    console.log('Existing Redirects:', existingRedirects);

    // Combine and deduplicate redirects
    const combinedRedirects = [...redirects, ...existingRedirects];
    console.log('Combined Redirects:', combinedRedirects);

    // Remove duplicate redirects by using a map
    const uniqueRedirects = new Map();
    combinedRedirects.forEach(redirect => {
      if (redirect.from) {
        uniqueRedirects.set(redirect.from, redirect);
      }
    });

    // Write unique redirects to file
    writeRedirectsToFile(Array.from(uniqueRedirects.values()));
  } catch (error) {
    console.error('Error generating redirects:', error);
  }
};

// Run the function
generateRedirects();




// v2 that works locally but not in netlify
// import fetch from 'node-fetch';
// import fs from 'fs';
// import path from 'path';

// // Define paths
// const redirectsPath = path.resolve('./public/_redirects');
// const netlifyTomlPath = path.resolve('./public/netlify.toml');
// const outputRedirectsPath = redirectsPath;

// // Fetch posts with proper error handling
// const fetchPostsByMetaValue = async (metaValue, page = 1, perPage = 100) => {
//   try {
//     const url = new URL('https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts');
//     url.searchParams.append('meta_key', 'category_name');
//     url.searchParams.append('meta_value', metaValue);
//     url.searchParams.append('page', page);
//     url.searchParams.append('per_page', perPage);

//     console.log(`Fetching URL: ${url.toString()}`);

//     const response = await fetch(url.toString());

//     console.log(`Response Status: ${response.status}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch from ${url}: ${response.status} ${response.statusText}`);
//     }

//     const responseText = await response.text();

//     console.log(`Response Text: ${responseText}`);

//     try {
//       return JSON.parse(responseText);
//     } catch (e) {
//       console.error('Failed to parse JSON:', e);
//       return [];
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//     return [];
//   }
// };

// // Fetch all posts handling pagination
// const fetchAllPosts = async (metaValues) => {
//   let allPosts = [];

//   for (const metaValue of metaValues) {
//     let page = 1;
//     let hasMorePages = true;

//     while (hasMorePages) {
//       const posts = await fetchPostsByMetaValue(metaValue, page);
//       if (posts.length > 0) {
//         allPosts = allPosts.concat(posts);
//         page += 1;
//       } else {
//         hasMorePages = false;
//       }
//     }
//   }

//   return allPosts;
// };

// // Read and parse redirects from a file
// const readRedirectsFromFile = (filePath) => {
//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     return data
//       .split('\n')
//       .filter(line => line.trim() && !line.startsWith('#')) // Ignore empty lines and comments
//       .map(line => {
//         const [from, to, status] = line.split(' ');
//         return { from, to, status };
//       });
//   } catch (error) {
//     console.error(`Error reading file ${filePath}:`, error);
//     return [];
//   }
// };

// // Write redirects to a file
// const writeRedirectsToFile = (redirects) => {
//   try {
//     fs.writeFileSync(
//       outputRedirectsPath,
//       redirects.map(rule => `${rule.from} ${rule.to} ${rule.status}`).join('\n') + '\n',
//       'utf8'
//     );
//     console.log('Deduplicated redirects file generated successfully.');
//   } catch (error) {
//     console.error('Error writing redirects file:', error);
//   }
// };

// // Generate redirects based on fetched posts
// const generateRedirects = async () => {
//   try {
//     // Define category meta values
//     // const metaValues = ['reviews'];
//     const metaValues = ['news', 'reviews', 'insights', 'guides', 'deals', 'about'];

//     // Fetch all posts
//     const posts = await fetchAllPosts(metaValues);

//     // Create a map for category slugs based on fetched data
//     const categoryMap = posts.reduce((map, post) => {
//       const categoryName = post.category_name; // Ensure this field is correct
//       const slug = post.slug;

//       if (categoryName && slug) {
//         map[slug] = categoryName; // Map slug to categoryName
//       }
//       return map;
//     }, {});

//     console.log('Category Map:', categoryMap);

//     // Generate redirects
//     const redirects = Object.keys(categoryMap).map(slug => {
//       const categoryName = categoryMap[slug];
//       return {
//         from: `/uncategorized/${slug}`,
//         to: `/${categoryName}/${slug}`,
//         status: '301'
//       };
//     });

//     // Read existing redirects
//     const existingRedirects = readRedirectsFromFile(redirectsPath).concat(readRedirectsFromFile(netlifyTomlPath));

//     // Combine and deduplicate redirects
//     const combinedRedirects = [...redirects, ...existingRedirects];
//     const uniqueRedirects = new Map();

//     combinedRedirects.forEach(redirect => {
//       if (redirect.from) {
//         uniqueRedirects.set(redirect.from, redirect);
//       }
//     });

//     writeRedirectsToFile(Array.from(uniqueRedirects.values()));
//   } catch (error) {
//     console.error('Error generating redirects:', error);
//   }
// };

// // Run the function
// generateRedirects();





// OG Working code to fetch posts from all categories, replace all  posts with uncategorized with the value of category_name

// import fetch from 'node-fetch';
// import fs from 'fs';
// import path from 'path';

// // Fetch posts with proper error handling
// const fetchPostsByMetaValue = async (metaValue, page = 1, perPage = 100) => {
//   try {
//     const url = new URL('https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts');
//     url.searchParams.append('meta_key', 'category_name');
//     url.searchParams.append('meta_value', metaValue);
//     url.searchParams.append('page', page);
//     url.searchParams.append('per_page', perPage);

//     // Log URL and parameters for debugging
//     console.log(`Fetching URL: ${url.toString()}`);

//     const response = await fetch(url.toString());

//     // Log response status
//     console.log(`Response Status: ${response.status}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch from ${url}: ${response.status} ${response.statusText}`);
//     }

//     const responseText = await response.text();

//     // Log raw response text for debugging
//     console.log(`Response Text: ${responseText}`);

//     // Ensure that the response is valid JSON
//     try {
//       return JSON.parse(responseText);
//     } catch (e) {
//       console.error('Failed to parse JSON:', e);
//       return [];
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//     return [];
//   }
// };

// // Fetch all posts handling pagination
// const fetchAllPosts = async (metaValues) => {
//   let allPosts = [];

//   for (const metaValue of metaValues) {
//     let page = 1;
//     let hasMorePages = true;

//     while (hasMorePages) {
//       const posts = await fetchPostsByMetaValue(metaValue, page);
//       if (posts.length > 0) {
//         allPosts = allPosts.concat(posts);
//         page += 1;
//       } else {
//         hasMorePages = false;
//       }
//     }
//   }

//   return allPosts;
// };

// // Generate redirects based on fetched posts
// const generateRedirects = async () => {
//   try {
//     // Define category meta values
//     // const metaValues = ['news'];
//     const metaValues = ['news', 'reviews', 'insights', 'guides', 'deals', 'about'];

//     // Fetch all posts
//     const posts = await fetchAllPosts(metaValues);

//     // Create a map for category slugs based on fetched data
//     const categoryMap = posts.reduce((map, post) => {
//       const categoryName = post.category_name; // Ensure this field is correct
//       const slug = post.slug;

//       if (categoryName && slug) {
//         map[slug] = categoryName; // Map slug to categoryName
//       }
//       return map;
//     }, {});

//     console.log('Category Map:', categoryMap);

//     // Generate redirects
//     const redirects = Object.keys(categoryMap).map(slug => {
//       const categoryName = categoryMap[slug];
//       return {
//         from: `/uncategorized/${slug}`,
//         to: `/${categoryName}/${slug}`,
//       };
//     });

//     // Write redirects to the _redirects file in the public directory
//     const redirectsPath = path.resolve('./public/_redirects');
//     fs.writeFileSync(redirectsPath, redirects.map(rule => `${rule.from} ${rule.to} 301`).join('\n'));
//     console.log('Redirects file generated successfully.');
//   } catch (error) {
//     console.error('Error generating redirects:', error);
//   }
// };

// // Run the function
// generateRedirects();
