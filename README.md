# QuickNotes

QuickNotes is a note-taking web app built with HTML, CSS and JavaScript. You can add short notes with a category, search and delete them, and your notes are saved in the browser so they are still there when you come back.

## Features

- Add notes with a category: Personal, Work or Study
- Delete any note
- Search notes by text (not case-sensitive), with a message when nothing matches
- Validation: empty notes and notes over 200 characters show an error message
- Note count: "You have no notes yet.", "You have 1 note." or "You have N notes."
- Notes are saved with localStorage and survive a page refresh
- Responsive layout that stacks the form on small screens

## How to run locally

1. Clone the repository:

```bash
   git clone https://github.com/mitochiama/quicknotes-app.git
```

2. Open the folder:

```bash
   cd quicknotes-app
```

3. Open `index.html` in your browser, or right-click it in your editor and choose **Open with Live Server**.

No installation or build step is needed.

## What I learned

- How to build page elements with `createElement` and `textContent` instead of `innerHTML`, which keeps user text safe.
- How localStorage only stores strings, so arrays need `JSON.stringify` to save and `JSON.parse` to load.
- How one click listener on the whole list can handle every Delete button.
