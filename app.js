// // const fs = require('fs')

// // fs.writeFileSync('note.txt','This file was created by Node.js \n')
// // fs.appendFileSync('note.txt', 'Creator is Chen')

// // const add = require('./utils.js')
// // const sum = add(2,1)

// // console.log(sum)
// const validator = require('validator')
// const chalk = require('chalk')
// const getNotes = require('./notes.js')

// console.log(getNotes())

// console.log(validator.isEmail('CHENYANGCN15@gmail.com'))
// console.log(validator.isURL('EEDCUVFJNJC'))

// console.log(chalk.green.bold.inverse('successful'))
// console.log(chalk.green('successful'))

// console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'))
// console.log(chalk.green(
//     'I am a green line ' +
//     chalk.blue.underline.bold('with a blue substring') +
//     ' that becomes green again!'
// ))

// console.log(process.argv[2])

// const command = process.argv[2]
// if (command == 'add')
// {
//     console.log('adding the notes')
// }else if(command === 'remove'){
//     console.log('removing note')
// }

const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

const log = console.log

//customized yargs version
yargs.version('1.1.0')

//create add command
yargs.command({
    command:'add',
    describe:'add a new note',
    builder:{
        title:{
            describe:'Note Title',
            demandOption: true,
            type: 'string',
        },
        body:{
            describe:'Note Body',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) 
    {notes.addNote(argv.title, argv.body)}
})

//create remove command
yargs.command({
    command:'remove',
    describe:'removing a note',
    builder:{
        title:{
            describe:'Note Title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) 
    {notes.removeNotes(argv.title)}
})

//create list command
yargs.command({
    command:'list',
    describe: 'list your notes',
    handler() 
    {notes.listNotes()}
})

//create read command
yargs.command({
    command:'read',
    describe:'read your notes',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type:String
        }
    },
    handler(argv) 
    {
        notes.readNotes(argv.title)
    }
})

//log(yargs.argv)
yargs.parse()
