# Push this redesign to GitHub

Your repository already has `origin` configured to:
https://github.com/ken2025mendoza11/the-infinite-library.git

From PowerShell:

```powershell
cd C:\Users\admin\the-infinite-library
git status
git diff
npm run lint
npm run build
git add app components lib README.md GITHUB-PUSH.md
git commit -m "Redesign literary museum and refine transitions"
git push origin main
```

Review `git status` and `git diff` before staging. These commands assume you are still on `main`, as you were when this guide was created. Git may open a browser to sign in to GitHub.

If the push is rejected because GitHub has newer commits, run `git pull --rebase origin main`, resolve any reported conflicts, then push again. Do not force-push.

To review through a pull request instead, run `git switch -c codex/editorial-redesign` before staging, then push with `git push -u origin codex/editorial-redesign`. GitHub will offer a “Compare & pull request” button.

## Local preview

The production preview for this redesign was started at http://localhost:3001.
To start it again after stopping the preview:

```powershell
npm run build
node node_modules/next/dist/bin/next start -p 3001
```

## Verification

- Production build generates all 27 pages.
- ESLint passes.
- Browser checks cover desktop and phone layouts, book selection, author search, empty-result reset, collection filters, and mobile navigation.
- Existing author biographies, works, and sources remain available through the collection pages.
- Further browser checks cover author chapter tracking, expandable works, and the constellation-to-author handoff.
