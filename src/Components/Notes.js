import React, { Component } from 'react'
import NoteBody from './NoteBody'
import MonModal from './MonModal'
import MyForm from './Form'
import localforage from 'localforage'


class Notes extends Component {

    state = {
        notes: [],
        isModalOpen: false,
        newNote: {
            id: '',
            title: '',
            note: '',
            date: '',
        },
        modalText : {
            id: '',
            title: '',
            note: '',
            date: '',
        },
        count: 0,
    }
    handleSubmit = (note) => {
        console.log(`Note that has been submited : `)
        console.log(note)
        localforage.setItem(`${note.id}`, note)
        .then(data => console.log(data))

        this.setState({notes: [...this.state.notes, note]})
    }

    openModal = (note, index) => {
        this.setState({
            isModalOpen: true,
            modalText : {
                id: index,
                title: note.title,
                note: note.note,
                date: note.date
            }
        })
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            modalText : {
                id: '',
                title: '',
                note: '',
                date: ''
            }
        })
    }

    handleTitleModalChange = (e) => {
        e.preventDefault()
        this.setState({            
            modalText : {
                id: this.state.modalText.id,
                title:  e.target.value,
                note:  this.state.modalText.note,
                date:  this.state.modalText.date
             }
        })
    }

    handleNoteModalChange = (e) => {
        e.preventDefault()
        this.setState({            
            modalText : {
                id: this.state.modalText.id,
                title:  this.state.modalText.title,
                note:  e.target.value,
                date:  this.state.modalText.date
             }
        })
    }

    editTheModal = () => {
        const getDate = () => {
            const d = new Date();
            return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`
        }
        
        const getHour = () => {
            const d = new Date();
            return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        }
        this.setState({ 
                notes : this.state.notes.filter(note => {
                         if (note.id === this.state.modalText.id) {
                            {
                            note.title = this.state.modalText.title
                            note.note = this.state.modalText.note
                            note.updated = `${getDate()} ${getHour()}`
                            }
                        }  
                        return note
                        }),
                isModalOpen: false,
        })
    }

    removeCharacter = () => {
        const {notes} = this.state
        console.log(this.state.modalText)
        this.setState({count: this.state.count-1, notes: notes.filter((notes, i) => i !== this.state.modalText.id), isModalOpen:false})
    }

    // FORM 
    handleTitleChange = (e) => {
        const getDate = () => {
            const d = new Date();
            return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`
        }
        
        const getHour = () => {
            const d = new Date();
            return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        }
        const name = e.target.name
        const value = e.target.value
        this.setState({newNote : {
                                    note: this.state.newNote.note,
                                    title : value,
                                    date: `${getDate()}`,
                                    id: this.state.count}
        })
    }

    handleNoteChange = (e) => {
        const getDate = () => {
            const d = new Date();
            return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`
        }
        
        const getHour = () => {
            const d = new Date();
            return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        }
        const value = e.target.value
        this.setState({newNote : {
                                    title: this.state.newNote.title,
                                    note : value,
                                    date: `${getDate()}`,
                                    id: this.state.count}
        })
    }

    submitNote = async (e) => {
        e.preventDefault()
        if(this.state.newNote.note !== '' && this.state.newNote.title !== '') {
            this.setState({            
                count: this.state.count + 1
            })
            this.handleSubmit(this.state.newNote)
            this.setState( {newNote: {date: '', title: '', note: '', id: ''}})
        }
    }

    render() {
        const {notes} = this.state

           return (
               <div className="container-fluid">
                  <MyForm 
                     notes={notes}
                     modalText={this.state.modalText}
                     handleSubmit={this.handleSubmit} 
                     titlePlaceholder="Give a title..." 
                     notePlaceholder="Write here"
                     handleTitleChange = {this.handleTitleChange}
                     handleNoteChange={this.handleNoteChange}
                     titleValue={this.state.newNote.title}
                     noteValue={this.state.newNote.note}
                     submitNote={this.submitNote}
                     titleId="new-title"
                     noteId="new-note"
                     buttonValue={<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" preserveAspectRatio="xMinYMin" className="icon__icon addIcon"><path d="M11 11h4a1 1 0 0 0 0-2h-4V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4zm-1 9C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg>}
                     buttonId="addButton"
                     formContainerId="addNoteContainer"
                     dayMode = {this.props.dayMode}
                     darkTheme = 'darkTheme'
                  />
                  <div className="maNoteContainer">
                    <NoteBody 
                    notes={notes} 
                    openModal={(row, index) => this.openModal(row, index)}
                    dayMode = {this.props.dayMode}
                    darkTheme = 'darkTheme-noteBody'
                    />
                    <MonModal 
                    notes={notes} 
                    isModalOpen={this.state.isModalOpen} 
                    closeModal={this.closeModal} 
                    infos={this.state.modalText} 
                    removeCharacter={() => this.removeCharacter()}
                    handleNoteModalChange={this.handleNoteModalChange}
                    handleTitleModalChange={this.handleTitleModalChange}
                    editTheModal={() => this.editTheModal()}
                    dayMode = {this.props.dayMode}
                    /> 
                </div>
               </div>
               
        )
}
}
export default Notes