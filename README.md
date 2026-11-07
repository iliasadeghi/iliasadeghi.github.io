# Ilia Sadeghi: Portfolio

A fast, frontend-only portfolio for showcasing projects. Plain HTML, CSS and vanilla JavaScript. There is no framework, no build step, no npm and no backend.

```
index.html          page structure + SEO meta tags
css/styles.css      all styles; design tokens at the top
js/projects.js      <- your project data (edit this to add projects)
js/reviews.js       <- reviews and scores from clients, mentors, teammates
js/main.js          theme, menu, filters, modal, toast, scroll animations
assets/images/      project images (placeholders for now)
```

## Run locally

Easiest: double-click `index.html`. It works straight from the file system.

Or serve it (closer to production):

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Add or edit a project

Open `js/projects.js` and add an object to the `PROJECTS` array:

```js
{
  title: "My New Project",
  description: "One or two sentences for the card.",
  longDescription: "Fuller write-up for the popup.\n\nBlank lines make new paragraphs.",
  tags: ["Python", "Machine Learning"],      // each tag becomes a filter chip automatically
  image: "assets/images/my-new-project.png", // 800x500 (16:10) works best
  imageAlt: "Screenshot of the dashboard showing ...",
  liveUrl: "https://example.com",            // optional: remove or "" to hide the Live button
  codeUrl: "https://github.com/you/repo",    // optional: remove or "" to hide the Code button
  featured: false                            // true = "Featured" badge + larger card
}
```

1. Put the image in `assets/images/` (PNG, JPG, WebP or SVG).
2. Save and refresh. Cards, filter chips and the modal update on their own.
3. Delete the sample projects (they are marked `TODO: replace`) when you have your own.

If an image path is wrong, the card shows a coloured placeholder with the project's initial instead of a broken image.

## Add or edit reviews

Open `js/reviews.js` and edit the `REVIEWS` array (one object per review: `name`, `role`, `company`, `rating` out of 5, `quote`, optional `project`). The average score at the top is calculated automatically, and decimal ratings like `4.5` show as partial stars.

The list starts **empty**, so the Reviews section and its nav link are hidden until you add a real review. Only publish words the reviewer actually wrote (or approved) and ask their permission first. Good sources: internship or co-op supervisors, professors and TAs, hackathon mentors, club or team leads, freelance clients.

A set of six fictional **mock reviews** for a class exercise is saved in `mock-data/reviews.mock.js` (not part of the deployed site). To show them locally, copy its contents over `js/reviews.js`. Each mock card displays a "Mock" badge, but don't publish them as if they were real.

## The character illustration

The boy in the nav, hero, About and Contact sections is one inline SVG drawn once in `index.html` (`<symbol id="boy-bust">`) and reused everywhere. `assets/images/avatar.svg` is the same character as a standalone file.

- **Make it look like you:** change the character tokens at the top of `css/styles.css`: `--skin`, `--skin-shade`, `--hair`, `--hair-hi`, `--glasses`, `--shirt`, `--shirt-dark`. To remove the glasses, delete the `<!-- polygonal glasses -->` group in the sprite. Every copy updates at once.
- **Use a real photo instead:** in the About section, replace the `<svg>` inside `<figure class="portrait">` with `<img src="assets/images/me.jpg" alt="Ilia Sadeghi" width="400" height="440">` (the CSS already crops it to fit). Do the same for the hero if you like.
- **Floating cards in the hero** (code, neural net, badges): edit the text and shapes in the `<svg>` inside `.hero__art`. They stop moving for visitors who prefer reduced motion.

## Replace the placeholders

Search the project for `TODO` to find everything to personalise:

- LinkedIn URL: `index.html`, Contact section (the GitHub link already points to github.com/iliasadeghi)
- Bio, quick facts and skills list: `index.html`, About section (the "projects shown" number updates itself from `js/projects.js`)
- Canonical URL and social preview image (`og:image`, `twitter:image`): already set for `https://iliasadeghi.github.io/` in the `<head>` of `index.html`; change them if you move to another address. The preview image is `assets/images/og-image.png` (1200x630)
- The eight sample projects and their images
- Real reviews in `js/reviews.js` (the list is empty, so the Reviews section is hidden until you add some)

## Change colors and fonts

**Colors.** Everything is driven by CSS custom properties at the top of `css/styles.css`.

- `:root`: light theme
- `:root[data-theme="dark"]` and the `prefers-color-scheme: dark` block: dark theme. Keep these two blocks identical.
- `--color-accent` and `--color-accent-hover` are the only accent colours. Change them in both themes. If you pick a new accent, check text contrast is at least 4.5:1 (for example with the WebAIM contrast checker).

Spacing, radius, type sizes, shadows and animation durations are tokens in the same block.

**Fonts.** The site uses Inter (body) and Space Grotesk (headings).

1. Change the `family=` parts of the Google Fonts `<link>` in `index.html` (keep `display=swap`).
2. Update `--font-body` and `--font-display` in `css/styles.css`.

To avoid Google Fonts entirely, delete the three font `<link>` tags. The system font fallback stack in the tokens takes over.

## Deploy for free

### GitHub Pages

1. Create a repository on GitHub (for a personal site, name it `YOUR-USERNAME.github.io`).
2. Upload or push all files, with `index.html` at the repository root.
3. In the repository go to **Settings, Pages**. Under **Build and deployment** choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/`.

### Netlify

- **Drag and drop:** open <https://app.netlify.com/drop> and drop this whole folder.
- **From Git:** *Add new site, Import an existing project*, pick your repository. Leave the build command empty and set the publish directory to `/` (the repository root).

After deploying, update the canonical URL and the `og:image` / `twitter:image` URLs in `index.html` to your live address.

## Notes

- No cookies, trackers or API keys. The only external request is Google Fonts.
- The theme choice is saved in `localStorage` (the site still works if storage is blocked).
- The contact section uses `mailto:` and social links only, with no form and no backend.
- Animations are short and switch off when the visitor has "reduce motion" enabled.
