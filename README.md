# siddhuv.com

A personal site — writing + a live index of my GitHub repos. Built with
[Jekyll](https://jekyllrb.com), hosted free on GitHub Pages, served over HTTPS
at **siddhuv.com**.

---

## 1. First-time setup

1. **Create the repo.** On GitHub, make a repo named exactly
   `your-username.github.io` (this special name makes it your root Pages site).
   Push everything in this folder to it.

2. **Fill in your details** in `_config.yml`:
   - `github_username` — your handle (this is what powers the live repo list)
   - `featured_repos` — the repos to show, in order, each with a one-line blurb
   - `social` links, `email`, `title`, `tagline`

3. **Turn on Pages.** Repo → Settings → Pages → Source: *Deploy from a branch*
   → Branch: `main` / root. Save. Your site builds in ~1 minute.

4. **Connect the domain.**
   - The `CNAME` file already contains `siddhuv.com`.
   - At your registrar's DNS, add these records:

     | Type  | Name | Value |
     |-------|------|-------|
     | A     | @    | 185.199.108.153 |
     | A     | @    | 185.199.109.153 |
     | A     | @    | 185.199.110.153 |
     | A     | @    | 185.199.111.153 |
     | CNAME | www  | your-username.github.io |

   - Back in Settings → Pages, enter `siddhuv.com` as the custom domain and
     tick **Enforce HTTPS** (available once the cert provisions, ~15–30 min).

That's it. The site is live.

---

## 2. Writing a blog post

Add a file to `_posts/` named `YYYY-MM-DD-a-slug.md`:

```markdown
---
layout: post
title: "Your title here"
date: 2026-07-15 09:00:00 +0300
tags: [risk, method]
excerpt: "One sentence that shows on the home page."
---

Your article, in Markdown.
```

Commit and push. GitHub rebuilds and the post appears automatically, newest
first. You can do this from the GitHub web editor, VS Code, or your phone —
no local setup needed.

---

## 3. Showing repositories

Two layers, so the list is never empty and never stale:

- **`featured_repos` in `_config.yml`** renders instantly and controls the
  order + blurbs.
- **`assets/js/repos.js`** then fetches live data from the GitHub API on page
  load and enriches each row with language, stars, and last-updated. If the API
  is offline or rate-limited, the config version stays. No API token is used
  (and none should ever go in client-side JS).

To auto-list *every* public repo instead of curating, uncomment the marked
block near the bottom of `repos.js`.

---

## 4. Running it locally (optional)

Only needed if you want to preview before pushing.

```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

---

## Structure

```
_config.yml          site settings, repo list, social links
CNAME                custom domain (siddhuv.com)
index.html           home page — hero, repo ledger, writing index
about.md             about page
_layouts/            default (shell) + post (article) templates
_includes/           (reserved for shared partials)
_posts/              blog posts — one Markdown file each
assets/css/main.css  the whole design system
assets/js/repos.js   live GitHub repo enrichment
```
