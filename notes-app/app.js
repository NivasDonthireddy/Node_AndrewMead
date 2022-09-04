const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// console.log(process.argv);
yargs.command({
    command: 'add',
    describe: 'adds a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.addNote(argv.title,argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'removes a note',
    builder: {
        title: {
            describe: 'note title to remove',
            demandOption:true,
            type: 'string'
        }
    },
    handler: (argv)=> notes.removeNote(argv.title)
})

yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title : {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=> notes.readNotes(argv.title)
})

yargs.command({
    command: 'list',
    describe: 'lists all the notes',
    handler: () => notes.listNotes()
})
yargs.parse();
// console.log(yargs.argv);