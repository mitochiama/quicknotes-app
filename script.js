const form = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const categorySelect = document.getElementById("category-select");
const errorMessage = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");
const noteCount = document.getElementById("note-count");
const notesList = document.getElementById("notes-list");

const categoryLabels = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

let notes = [];

function createNoteElement(note) {
  const li = document.createElement("li");
  li.classList.add("note-card", `category-${note.category}`);

  const body = document.createElement("div");
  body.classList.add("note-body");

  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text;

  const meta = document.createElement("p");
  meta.classList.add("note-meta");

  const label = document.createElement("span");
  label.classList.add("category-label");
  label.textContent = categoryLabels[note.category];

  const date = document.createElement("span");
  date.classList.add("note-date");
  date.textContent = note.createdAt;

  meta.append(label, date);
  body.append(text, meta);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.dataset.id = note.id;
  deleteBtn.textContent = "Delete";

  li.append(body, deleteBtn);
  return li;
}

function render() {
  notesList.replaceChildren();

  for (const note of notes) {
    notesList.append(createNoteElement(note));
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.unshift(note);
  saveNotes();
  render();

  noteInput.value = "";
  noteInput.focus();
});
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}
function getVisibleNotes() {
  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    return notes;
  }

  return notes.filter((note) => note.text.toLowerCase().includes(query));
}

function render() {
  updateCount();
  notesList.replaceChildren();

  const visibleNotes = getVisibleNotes();

  if (visibleNotes.length === 0 && notes.length > 0) {
    const message = document.createElement("li");
    message.classList.add("empty-message");
    message.textContent = "No notes match your search.";
    notesList.append(message);
    return;
  }

  for (const note of visibleNotes) {
    notesList.append(createNoteElement(note));
  }
}
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);

  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

notesList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    deleteNote(Number(event.target.dataset.id));
  }
});
const STORAGE_KEY = "quicknotes-notes";

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === null) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}
const clearAllBtn = document.getElementById("clear-all-btn");

clearAllBtn.addEventListener("click", function () {
  if (notes.length === 0) {
    return;
  }

  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});
searchInput.addEventListener("input", render);

notes = loadNotes();
render();
