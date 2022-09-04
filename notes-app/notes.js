const fs = require('fs');
const chalk = require('chalk');
const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalk.bgGreen('Your Notes'));
    notes.forEach(x => {
        console.log(x.title);
    })
};

const addNote = (title,body)=> {
    const notes = loadNotes();
    if(!notes.find(x => x.title===title)){
        notes.push({
            title,
            body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen('New Note added'));
    } else {
        console.log(chalk.bgRed('Note title taken'));
    }
}

const removeNote = (title)=>{
    const notes = loadNotes();
    if(notes.find(x => x.title===title)){
        const filteredNotes = notes.filter(x => x.title!=title);
        saveNotes(filteredNotes);
        console.log(chalk.default.bgGreen('Note removed!'));
    } else {
        console.log(chalk.default.bgRed('No Note found!'));
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(e){
        return [];
    }
}

const readNotes = (title) => {
    const notes = loadNotes();
    const note  = notes.find(x => x.title===title);
    if(note){
        console.log(chalk.bgGreen(`${note.title}`));
        console.log(note.body);
    } else {
        console.log(chalk.bgRed('note not found!'));
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJson);
}

module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNotes
};