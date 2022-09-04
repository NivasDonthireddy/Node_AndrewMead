const fs = require('fs');
const getNotes = ()=>"Your Notes....";

const addNote = (title,body)=> {
    const notes = loadNotes();    
    const duplicateNotes = notes.filter(x => x.title===title);
    if(duplicateNotes.length===0){
        notes.push({
            title,
            body
        })
        saveNotes(notes);
        console.log('New Note added')
    } else {
        console.log('Note title taken');
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

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJson);
}

module.exports = {
    getNotes,
    addNote
};