# felixmokross.dev

This is the source code of my personal blog
[felixmokross.dev](https://felixmokross.dev). It is built with Next.js and
Tailwind CSS. See
[this post](https://www.felixmokross.dev/blog/build-nextjs-blog) for more
information on the tech stack and how the blog works.

## Tech Stack

- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Framework:** [Next.js](https://nextjs.org), [React](https://reactjs.org)
- **Hosting:** [Vercel](https://vercel.com/dashboard)
- **Content Source:** [GitHub](https://github.com)
- **Content Processing:** [unified](https://unifiedjs.com)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Package Manager:** [pnpm](https://pnpm.io)
- **Analytics:** [Plausible](https://plausible.io/)

## How the Blog Works

The blog posts are hosted in a separate GitHub repository, the _content
repository_. It has the following file structure:

- `posts/` – All published posts are located in this directory.
  - `example-post/` – Each post has a directory. The name of the directory is
    used as the post's slug.
    - `post.md` – This file contains the Markdown content of the post (including
      front matter).
    - … – The directory can contain any further assets used for the post.
  - `another-post/`
  - `third-post/`
  - …
- `drafts/` – Drafts posts are created in this folder and are moved to `posts`
  to publish them. The blog does not read this folder.

The blog uses **Static Site Generation** (SSG) and therefore needs to be rebuilt
and deployed when a post is added or updated. For this, the app exposes a deploy
hook on Vercel. Whenever a pull request is merged on the main branch of the
content repository, a GitHub Action calls the deploy hook, triggering a rebuild
and deployment of the app. In the build, the posts are retrieved from the
content repository to generate the static pages.

## File Structure

In the `/app` directory the routes are defined. They are:

- `blog/` – Home page
  - `[slug]/` – Post page

## System Requirements

- [Node.js 18.0.0](https://nodejs.org/) or later (needed for the Fetch API to be
  available, which is used in the RSS Feed and Sitemap scripts)
- [pnpm](https://pnpm.io)

## Running Locally

1. Create a `.env` file in the root directory to set the environment variables.
   [`.env.example`](./.env.example) can be used as a template.

2. Clone the repository and run the app in development mode.

   ```shell
   $ git clone https://github.com/felixmokross/felixmokross.dev
   $ cd felixmokross.dev
   $ pnpm install
   $ pnpm dev
   ```

## Scripts

| Command                 | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `pnpm dev`              | Run in development mode                                     |
| `pnpm build`            | Create production build                                     |
| `pnpm analyze`          | Create production build and analyze bundles                 |
| `pnpm start`            | Serve production build                                      |
| `pnpm lint`             | Run linter                                                  |
| `pnpm format`           | Format all files using [Prettier](https://prettier.io)      |
| `pnpm generate-rss`     | Generate the RSS feed for the blog (run as part of `build`) |
| `pnpm generate-sitemap` | Generate the sitemap (run as part of `build`)               |
