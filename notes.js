const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...'

const addNote = (title,body) =>
{
    const notes = loadNotes()
    //const duplicatedNotes = notes.filter((note) => note.title === title)
    //console.log(duplicatedNotes)
    const duplicatednote = notes.find((note) => note.title === title)
    //if(duplicatedNotes.length == 0)

    debugger
    
    if(!duplicatednote)
    {
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse('note added!'))
    }
    else{
        console.log(chalk.red.inverse('note title taken!'))
    }
    saveNotes(notes)  
    //console.log(notes)
}

const saveNotes = (notes) =>
{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const removeNotes = (title) => {
    // try{
    //     const notes = loadNotes()
    //     notes.pop(title)
    //     saveNotes(notes)
    // }catch(e)
    // {
    //     console.log('no such title exist')
    // }
    const notes = loadNotes()
    const noteskeep = notes.filter((note) => note.title !== title)
    if(noteskeep.length == notes.length)
    {
        console.log(chalk.red('no note found!'))
    }
    else{
        console.log(chalk.green('note removed!'))
    }

    saveNotes(noteskeep)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log('listing your notes! \n')
    console.log(chalk.yellow('title     ') + chalk.blue('body'))
    notes.forEach((note) => console.log(note.title + '  ' + note.body));
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteRead = notes.find((note) => note.title === title)
    if(noteRead)
    {
        console.log(chalk.inverse.yellow(noteRead.title) + '  ' + noteRead.body)
    }
    else{
        console.log(chalk.red('Error, no note found!'))
    }
}

module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNotes:removeNotes,  
    listNotes:listNotes,
    readNotes:readNotes
}
