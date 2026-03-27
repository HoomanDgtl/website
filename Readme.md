# Akash Network Website

The official website for [Akash Network](https://akash.network/) — the decentralized cloud computing marketplace. Built with [Astro](https://astro.build/), React, Tailwind CSS, and TypeScript.

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
  - [General Guidelines](#general-guidelines)
  - [File Naming Convention](#file-naming-convention)
  - [Commit Message Format](#commit-message-format)
  - [Pull Request Process](#pull-request-process)
- [Content Guides](#content-guides)
  - [Writing a Blog Post](#writing-a-blog-post)
  - [Contributing a Community Blog](#contributing-a-community-blog)
  - [Adding a Community Event](#adding-a-community-event)
  - [Adding an Ecosystem Project](#adding-an-ecosystem-project)
  - [Editing Documentation](#editing-documentation)
- [Contact](#contact)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Local Development

```bash
# Clone the repository
git clone https://github.com/akash-network/website
cd website

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Available Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start local development server       |
| `npm run build`     | Build the site for production        |
| `npm run preview`   | Preview the production build locally |
| `npm run astro`     | Run Astro CLI commands directly      |

---

## Project Structure

```
src/
├── content/                          # All site content (Astro Content Collections)
│   ├── Blog/                         # Official blog posts
│   ├── Community_Contributions_Page/ # Community-authored blogs & content
│   ├── Community_Akash_Events_Page/  # Community events
│   ├── Ecosystem_Page/               # Ecosystem project showcases
│   ├── Docs/                         # Documentation pages
│   └── config.ts                     # Content collection schemas
├── components/                       # Reusable Astro & React components
├── layouts/                          # Page layout wrappers
├── pages/                            # File-based routing (Astro pages)
├── lib/                              # Utilities and helpers
└── styles/                           # Global styles
```

---

## Contributing

### General Guidelines

1. **Fork** the repository and create a new branch from `main`.
2. Make your changes locally and test with `npm run build` to ensure the site compiles without errors.
3. Commit your changes following the [commit message format](#commit-message-format) below.
4. Open a **Pull Request** against `main` with a clear description of the changes.

### File Naming Convention

Use **kebab-case** (lowercase words separated by hyphens) for all content folders and filenames.

```
src/content/Blog/my-new-blog-post/index.md     ✅
src/content/Blog/MyNewBlogPost/index.md         ❌
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/). Each commit message starts with a **type** followed by a short description:

| Type         | Purpose                                              | Example                                  |
| ------------ | ---------------------------------------------------- | ---------------------------------------- |
| `feat:`      | New feature or functionality                         | `feat: implement user authentication`    |
| `fix:`       | Bug fix                                              | `fix: resolve issue with login page`     |
| `docs:`      | Documentation changes                                | `docs: update contribution guide`        |
| `style:`     | Code style / formatting (no logic change)            | `style: reformat CSS styles`             |
| `refactor:`  | Code restructuring (no new features or bug fixes)    | `refactor: extract reusable function`    |
| `perf:`      | Performance improvements                             | `perf: optimize image loading`           |
| `test:`      | Adding or updating tests                             | `test: add test cases for login`         |
| `chore:`     | Maintenance or housekeeping                          | `chore: update dependencies`             |
| `ci:`        | CI/CD pipeline changes                               | `ci: add deploy workflow`                |
| `build:`     | Build system changes                                 | `build: update Astro config`             |
| `deps:`      | Dependency updates                                   | `deps: upgrade astro to v4.1`            |
| `revert:`    | Revert a previous commit                             | `revert: undo changes from abc123`       |

**Tips:**
- Keep messages concise and use the imperative mood ("add", "fix", "update").
- Add context in the description when necessary.

### Pull Request Process

1. Ensure your branch is up to date with `main`.
2. Run `npm run build` to verify the site builds successfully.
3. Provide a clear PR title and description explaining **what** changed and **why**.
4. Add screenshots for visual changes if applicable.

---

## Content Guides

All content on the site is managed through [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) using Markdown files. Each content item lives in its own folder with an `index.md` file and any associated assets (images, etc.).

### Writing a Blog Post

Blog posts are official Akash Network articles published at [akash.network/blog](https://akash.network/blog).

**Location:** `src/content/Blog/`

**Steps:**

1. Create a new folder under `src/content/Blog/` using a descriptive kebab-case slug:
   ```
   src/content/Blog/my-blog-post-title/
   ```

2. Create an `index.md` file inside the folder with the following frontmatter:

   ```yaml
   ---
   title: "Your Blog Title"
   description: "A short summary of the blog post."
   pubDate: "2026-01-15"
   draft: false
   archive: false
   categories:
     - General
   tags:
     - Tag1
     - Tag2
   contributors:
     - Your Name
   bannerImage: ./banner-image.png
   ---

   Your blog content goes here in Markdown format.
   ```

3. Add your banner image to the same folder (e.g., `banner-image.png`).

4. Write the blog content below the frontmatter using standard Markdown.

5. Commit and open a PR. The blog will be published once merged.

**Frontmatter Reference:**

| Field             | Required | Description                                                  |
| ----------------- | -------- | ------------------------------------------------------------ |
| `title`           | Yes      | Blog post title                                              |
| `description`     | Yes      | Short summary (used in previews and SEO)                     |
| `pubDate`         | Yes      | Publication date in `YYYY-MM-DD` format                      |
| `draft`           | Yes      | Set to `true` to hide from the site                          |
| `archive`         | No       | Set to `true` to hide from archive page but show on blog page|
| `categories`      | Yes      | List of categories (e.g., General, Product, News)            |
| `tags`            | Yes      | List of tags for filtering                                   |
| `contributors`    | Yes      | List of author names                                         |
| `bannerImage`     | Yes      | Relative path to the banner image                            |
| `pinned`          | No       | Date value to pin the post to the top                        |
| `homepage`        | No       | Date value to feature on the homepage                        |
| `metaTitle`       | No       | Custom SEO title                                             |
| `metaDescription` | No       | Custom SEO description                                       |

---

### Contributing a Community Blog

Community blogs are articles written by community members and published at [akash.network/community/contributions](https://akash.network/community/contributions/). This is the best way for community members to share tutorials, guides, opinion pieces, and project showcases with the Akash ecosystem.

**Location:** `src/content/Community_Contributions_Page/`

**Steps:**

1. **Fork** the repository and create a new branch:
   ```bash
   git checkout -b community/my-blog-title
   ```

2. Create a new folder under `src/content/Community_Contributions_Page/` with a descriptive slug:
   ```
   src/content/Community_Contributions_Page/my-community-blog/
   ```

3. Create an `index.md` file inside the folder with this frontmatter:

   ```yaml
   ---
   title: "Your Community Blog Title"
   description: "A brief description of your article."
   pubDate: "2026-01-15"
   draft: false
   archive: false
   showcase: true
   featured: false
   categories:
     - General
   tags:
     - Tutorial
   contributors:
     - Your Name
   bannerImage: ./banner.png
   ---

   Your article content goes here in Markdown format.
   ```

4. Add your banner image (recommended size: 1200x630px) to the same folder.

5. Write your content below the frontmatter. You can use:
   - Standard Markdown syntax (headings, lists, bold, italic, links)
   - Code blocks with syntax highlighting
   - Images (place them in the same folder and reference with `./image-name.png`)
   - Tables

6. **If linking to external content** (e.g., a YouTube video or external blog), you can add a `link` field to the frontmatter instead of writing the full content in the file:
   ```yaml
   link: https://www.youtube.com/watch?v=your-video-id
   readTime: "10 min"
   ```

7. **Test locally** — run `npm run build` to verify your content compiles without errors.

8. Commit your changes and open a Pull Request:
   ```bash
   git add src/content/Community_Contributions_Page/my-community-blog/
   git commit -m "add: community blog - my community blog"
   git push origin community/my-blog-title
   ```

**Frontmatter Reference:**

| Field          | Required | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `title`        | Yes      | Article title                                                  |
| `description`  | Yes      | Short summary                                                  |
| `pubDate`      | Yes      | Date in `YYYY-MM-DD` format                                   |
| `draft`        | No       | Set to `true` to hide from the site (default: `false`)         |
| `archive`      | No       | Set to `true` to hide from archive listing                     |
| `showcase`     | No       | Set to `true` to highlight in the showcase section             |
| `featured`     | No       | Set to `true` to feature at the top of the page                |
| `categories`   | Yes      | List of categories                                             |
| `tags`         | Yes      | List of tags (e.g., Tutorial, Video, Guide, Opinion)           |
| `contributors` | Yes      | List of author names                                           |
| `bannerImage`  | No       | Relative path to banner image                                  |
| `link`         | No       | URL to external content (YouTube, external blog, etc.)         |
| `readTime`     | No       | Estimated read time (e.g., "5 min")                            |

**Tips for Community Blogs:**
- Choose a clear, descriptive title that tells readers what they will learn.
- Include a banner image — posts with images get more engagement.
- Use the `tags` field to help readers discover your content (e.g., `Tutorial`, `Guide`, `Video`, `Opinion`, `Showcase`).
- For video content, set the `link` field to the video URL and add a brief written summary in the body.
- Keep your writing focused and provide practical value to the Akash community.

---

### Adding a Community Event

Community events are listed at [akash.network/community/events](https://akash.network/community/events/).

**Location:** `src/content/Community_Akash_Events_Page/`

**Steps:**

1. Create a new folder under `src/content/Community_Akash_Events_Page/`:
   ```
   src/content/Community_Akash_Events_Page/my-event-name/
   ```

2. Create an `index.md` file with this frontmatter:

   ```yaml
   ---
   title: Event Name
   image: "./event-banner.png"
   eventDate: "2026"
   tbd: false
   location: City, Country
   link: "https://event-website.com"
   description: A brief description of the event and Akash's involvement.
   ---
   ```

3. Add the event banner image to the same folder.

4. Commit and open a PR.

**Notes:**
- Set `tbd: true` if the event date is not yet confirmed.
- The `eventDate` field uses `YYYY` format for year-only dates.

---

### Adding an Ecosystem Project

Ecosystem projects are showcased at [akash.network/ecosystem/showcase/latest](https://akash.network/ecosystem/showcase/latest).

**Location:** `src/content/Ecosystem_Page/`

**Steps:**

1. Create a new folder under `src/content/Ecosystem_Page/`:
   ```
   src/content/Ecosystem_Page/my-project/
   ```

2. Create an `index.md` file:

   ```yaml
   ---
   projectTitle: My Project Name
   projectImage: "./project-banner.png"
   pubDate: "2026-01-15"
   tags:
     - AI & ML
   category: deployed_on_akash
   description: A brief description of the project and how it uses Akash.
   showcase: true
   websiteLink: "https://myproject.com"
   githubLink: "https://github.com/myorg/myproject"
   twitterLink: "https://x.com/myproject"
   featured: false
   ---
   ```

3. Add the project banner image to the same folder.

4. Commit and open a PR.

**Notes:**
- `category` can be `deployed_on_akash` or `akash-tools`.
- Set `showcase: true` to display the project in the ecosystem showcase.
- Set `featured: true` to pin the project to the top of the showcase page.

---

### Editing Documentation

Documentation pages live at [akash.network/docs](https://akash.network/docs/) and are managed in `src/content/Docs/`.

#### Adding a New Doc Page

1. Create a new folder under `src/content/Docs/`:
   ```
   src/content/Docs/my-doc-topic/
   ```

2. Create an `index.md` file:

   ```yaml
   ---
   categories: ["Getting Started"]
   tags: ["Guides"]
   weight: 1
   title: "My Doc Page Title"
   linkTitle: "My Doc Page Title"
   ---

   Documentation content here.
   ```

3. For nested pages, create sub-folders:
   ```
   src/content/Docs/my-doc-topic/sub-page/index.md
   ```

#### Changing Doc Order

Edit `src/content/Docs/sequence.ts` to control the sidebar ordering:

```ts
export const docsSequence = [
  {
    label: "Docs",
    subItems: [
      {
        label: "Getting Started",
        subItems: [
          { label: "Intro To Akash" },
          { label: "Akash Overview" },
        ],
      },
    ],
  },
];
```

The `label` values must match the rendered page titles exactly.

---

## Contact

- **Discord:** [Akash Network](https://discord.com/invite/akash)
- **X / Twitter:** [Akash Network](https://x.com/akashnet)
- **Website:** [akash.network](https://akash.network/)
- **Telegram:** [Akash Network](https://t.me/AkashNW)
- **YouTube:** [Akash Network](https://www.youtube.com/c/AkashNetwork)
