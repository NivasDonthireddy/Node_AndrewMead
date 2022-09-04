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
    handler: ()=> console.log('removing a note..')
})

yargs.command({
    command: 'read',
    describe: 'read a note',
    handler: ()=> console.log('reading a note..')
})

yargs.command({
    command: 'list',
    describe: 'lists all the notes',
    handler: ()=> console.log('list notes..')
})
yargs.parse();
// console.log(yargs.argv);