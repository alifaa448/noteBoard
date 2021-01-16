'use strict';

const notes = [];
const board = document.getElementById('board'),
    newNoteBtn = document.getElementById('newnote');

/// 1. Creating Note Data

class Note {
    constructor(text = 'New text is here', posX = 10, posY = 10) {
        this.text = text;
        this.posX = posX;
        this.posY = posY;
    }
}

function createNote() {
    notes.push(new Note());
    createHtml();
}

function createEachNote(text, posX, posY, index) {
    let deltaX, deltaY, noteWidth, noteHeight;
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.style.left = posX;
    newNote.style.top = posY;
    newNote.style.transform = `transform: rotate(${15 - index}deg)`;

    const textDiv = document.createElement('div');
    textDiv.innerHTML = text;
    newNote.append(textDiv);

    const textarea = document.createElement('textarea');
    if (text !== 'New text is here') {
        textarea.value = text;
    }
    newNote.append(textarea);

    const delBtn = document.createElement('img');
    delBtn.setAttribute('src', 'img/010_x-3-512.png');
    delBtn.setAttribute('class', 'removebtn');
    delBtn.addEventListener('click', function () {
        notes.splice(index, 1);
        createHtml();
    });
    newNote.append(delBtn);


    newNote.addEventListener('dblclick', function () {
        newNote.style.transform = '';
        textDiv.style.display = 'none';
        textarea.style.display = 'block';
        textarea.focus();
    });

    textarea.addEventListener('keypress', function (ev) {
        if (ev.key === 'Enter' && ev.shiftKey === false) {
            ev.preventDefault();
            textarea.removeAttribute('style');
            textDiv.removeAttribute('style');
            if (textarea.value) {
                notes[index].text = textarea.value;
            }
            newNote.style.transform = `transform: rotate(${15 - index}deg)`;

            createHtml();
        }

    });

    textarea.addEventListener('focusout', function () {
        textarea.removeAttribute('style');
        textDiv.removeAttribute('style');
        if (textarea.value) {
            notes[index].text = textarea.value;
        }
        createHtml();
        newNote.style.transform = `transform: rotate(${15 - index}deg)`;
    });

    newNote.addEventListener('mousedown', function (ev) {
        deltaX = ev.pageX - newNote.offsetLeft;
        deltaY = ev.pageY - newNote.offsetTop;
        noteWidth = newNote.offsetWidth;
        noteHeight = newNote.offsetHeight;
        window.addEventListener('mousemove', getMousePos);
    });

    window.addEventListener('mouseup', function (ev) {
        window.removeEventListener('mousemove', getMousePos);
    });


    board.appendChild(newNote);

    function getMousePos(e) {
        const pX = e.pageX;
        const pY = e.pageY;
        if (pX - deltaX < 0) {
            notes[index].posX = 0;

            if (pY - deltaY < 0) {
                notes[index].posY = 0;

            } else if ((pY - deltaY + noteHeight) > board.offsetHeight) {
                notes[index].posY = `${board.offsetHeight - noteHeight}px`;

            } else {
                notes[index].posY = `${pY - deltaY}px`;
            }
        } else if (pY - deltaY < 0) {
            notes[index].posY = 0;

            if (pX - deltaX < 0) {
                notes[index].posX = 0;

            } else if ((pX - deltaX + noteWidth) > board.offsetWidth) {
                notes[index].posX = `${board.offsetWidth - noteWidth}px`;

            } else {
                notes[index].posX = `${pX - deltaX}px`;
            }
        } else if ((pX - deltaX + noteWidth) > board.offsetWidth) {
            notes[index].posX = `${board.offsetWidth - noteWidth}px`;

            if ((pY - deltaY + noteHeight) > board.offsetHeight) {
                notes[index].posY = `${board.offsetHeight - noteHeight}px`;

            } else {
                notes[index].posY = `${pY - deltaY}px`;
            }


        } else if ((pY - deltaY + noteHeight) > board.offsetHeight) {
            notes[index].posY = `${board.offsetHeight - noteHeight}px`;
            notes[index].posX = `${pX - deltaX}px`;
        } else {
            notes[index].posX = `${pX - deltaX}px`;
            notes[index].posY = `${pY - deltaY}px`;
        }

        createHtml();

    }

}

function createHtml() {
    board.innerHTML = '';
    notes.map(function (note, index) {
        createEachNote(note.text, note.posX, note.posY, index);
    });
}

newNoteBtn.addEventListener('click', function () {
    createNote();
});


