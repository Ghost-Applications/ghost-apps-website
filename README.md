# Ghost Apps Website

Static site for Ghost Apps LLC, built with [Eleventy](https://www.11ty.dev/) and [Tailwind CSS](https://tailwindcss.com/), deployed to GitHub Pages.

## Development

    npm install
    npm run dev

Serves the site at http://localhost:8080 with live reload.

## Build

    npm run build

Outputs the production site to `_site/`.

## Deploy

Push to `main` — the `.github/workflows/deploy.yml` workflow builds and publishes to GitHub Pages automatically. Repo Settings → Pages → "Build and deployment source" must be set to **GitHub Actions**.

## Adding a blog post

Add a new Markdown file to `src/blog/posts/`. Front matter needs `title`, `date`, and `author`; `featured_image` and `featured_image_caption` are optional. Layout, tags, and the URL permalink are supplied automatically via `src/blog/posts/posts.json`.

## mise tasks

[mise](https://mise.jdx.dev/) installs the Node version and provides these tasks (defined in `.mise.toml`):

| Task | What it does |
|---|---|
| `mise run dev` | Run the development server (`npm run dev`). |
| `mise run newblog` | Create `src/blog/posts/<today>.md` with starter front matter. |
| `mise run fmt [file]` | Wrap Markdown at 80 columns with Prettier. Defaults to `src/**/*.md`. |
| `mise run sign [file]` | PGP-sign pages and posts with the Ghost Apps key, writing `<file>.asc`. Defaults to every page/post without an up-to-date signature. |

Typical flow for a post: `newblog` → write → `fmt` → `sign` → commit. Always run `sign` after any edit to a signed file, or the published signature won't match.

Signed files get a "source · signature" footer, and their `.md` and `.md.asc` are published under `/sources/`. Verify with `gpg --verify <file>.md.asc <file>.md` after importing `/pgp.asc`.
