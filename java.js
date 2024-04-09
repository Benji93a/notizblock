
let titles = ['Titel'];
let notes = [`Deine Notiz`];
let trashTitles = [];
let trashNotes = [];
load();

function toggleMenu() {
    document.getElementById('add').classList.toggle('d-none')
}

function toggleTrash() {
    document.getElementById('trash').classList.toggle('d-none')
}

function render() {
    noteContainer();
    trashContainer();
}

function noteContainer() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const note = notes[i];

        content.innerHTML += /*html*/`
            <div class="note-container">
                <div class="trash-container-btn remove " onclick="deleteNote(${i})"><img src="./bilder/cross_icon-icons.com_72347.png" alt=""></div>
                <h2 class="title">${title}</h2>
                <p class="note">${note}</p>
            </div>
        `;
    } 
}

function trashContainer() {
    let trash = document.getElementById('trash-content');
    trash.innerHTML = '';
    
    for (let i = 0; i < trashTitles.length; i++) {
        const trashTitle = trashTitles[i];
        const trashNote = trashNotes[i];

        trash.innerHTML += /*html*/ `
            <div class="note-container">
                <div class="trash-container-btn restore" onclick="restoreNote(${i})"><img src="./bilder/back_main_page_icon_124174.png" alt=""></div>
                <div class="trash-container-btn remove " onclick="deleteTrash(${i})"><img src="./bilder/cross_icon-icons.com_72347.png" alt=""></div>
                <h2 class="title">${trashTitle}</h2>
                <p class="note">${trashNote}</p>
            </div>
        `
    }
}

function addNote() {
    let title = document.getElementById('title');
    let note = document.getElementById('note');

    if (title.value == '' || note.value == '') {
        alert('Notiz fehlgeschlagen! Keine Eingabe.')
    } else {
        titles.push(title.value);
        notes.push(note.value);
        title.value = '';
        note.value = '';
        toggleMenu();
        render();
        save();
    }
}

function deleteNote(i) {
    trashTitles.push(titles[i])
    trashNotes.push(notes[i])
    titles.splice(i,1);
    notes.splice(i,1);
    render();
    save();
}

function deleteTrash(i) {
    trashTitles.splice(i,1);
    trashNotes.splice(i,1);
    render();
    save();
}

function restoreNote(i) {
    titles.push(trashTitles[i])
    notes.push(trashNotes[i])
    trashTitles.splice(i,1);
    trashNotes.splice(i,1);
    render();
    save();
}

function save() {
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);

    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);

    let trashTitlesAsText = JSON.stringify(trashTitles);
    localStorage.setItem('trashTitles', trashTitlesAsText);

    let trashNotesAsText = JSON.stringify(trashNotes);
    localStorage.setItem('trashNotes', trashNotesAsText);
}

function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    let trashTitlesAsText = localStorage.getItem('trashTitles')
    let trashNotesAsText = localStorage.getItem('trashNotes')

    if (titlesAsText && notesAsText && trashTitlesAsText && trashNotesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
        trashTitles = JSON.parse(trashTitlesAsText);
        trashNotes = JSON.parse(trashNotesAsText);
    }
}