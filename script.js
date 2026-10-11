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

    const note = {
        id: Date.now(),
        text: noteInput.value.trim(),
        category: categorySelect.value,
        createdAt: new Date().toLocaleString(),
    };

    notes.unshift(note);
    render();

    noteInput.value = "";
    noteInput.focus();
});

render();