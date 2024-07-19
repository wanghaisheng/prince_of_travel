# Prince of Travel

```sh
npm create astro@latest -- --template basics
```

# Welcome to Prince of Travel

## Notes

### redirects

- Redirects live in the **netlify.toml** files in the /public folder.
- Rules in this file are processed from **bottom to top**, in reverse order. More general rules should be at the bottom (processed first) and more specific rules, at the top (processed last).
- Important redirects like credit card apply links were initially in the middle/top and didn't work. Moving them to the bottom (higher priority) worked. 

## 🚀 Project Structure

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

