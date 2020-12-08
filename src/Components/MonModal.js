import React, { Component } from 'react'
import Modal from 'react-modal'
import Button from 'react-bootstrap/Button';
import MonForm from './Form'

class MonModal extends Component {
    state = {
            notes: [],
            isModalOpen: false,
            modalText : {
                id: '',
                title: '',
                note: '',
                date: ''
            },
            count: 0,
            lines : 0,
    }
    handleTitleChange = (e) => {
        const getDate = () => {
            const d = new Date();
            return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`
        }
        
        const getHour = () => {
            const d = new Date();
            return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        }
        const value = e.target.value
        this.setState({modalText : {
                                    note: this.state.modalText.note,
                                    title : value,
                                    date: `${getDate()} ${getHour()}`,
                                    id: this.state.count}
        })
    }

    dayOrNight = () => {
        if(this.props.dayMode) {
            return 'white'
        } else {
            return 'black'
        }
    }

    dayOrNightButton = () => {
        if(this.props.dayMode) {
          return `deleteButton darkTheme-button-form`
      } 
      else {
          return 'deleteButton'
      }
      }

render() {
    const {isModalOpen} = this.props
    Modal.setAppElement('#root')

    return (
        <Modal
            style={
                {
                    overlay: {
                        backgroundColor: '#000000de'
                    },
                    content: {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        transform             : 'translate(-50%, -50%)',
                        width: '90vw',
                        height: '90vh',
                        backgroundColor: this.dayOrNight(),
                        color: 'black',
                        border: '3px solid rgba(104, 207, 255, 0.885)',
                        borderRadius: '12px'
                    }
                }
            }
            isOpen={isModalOpen}
            >   

            <div className="date">
                        <span className="hour">{this.props.infos.date}</span>
                </div>
                <MonForm 
                    titleValue={this.props.infos.title}
                    noteValue={this.props.infos.note}
                    handleTitleChange={(e)=>this.props.handleTitleModalChange(e)}
                    handleNoteChange={(e) => this.props.handleNoteModalChange(e)}
                    titleId="title-modal-input"
                    noteId="note-modal-input"
                    submitNote={() => this.props.editTheModal()}
                    buttonValue={<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -7 24 24" width="24" height="24" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M5.486 9.73a.997.997 0 0 1-.707-.292L.537 5.195A1 1 0 1 1 1.95 3.78l3.535 3.535L11.85.952a1 1 0 0 1 1.415 1.414L6.193 9.438a.997.997 0 0 1-.707.292z"></path></svg>}
                    buttonId="edit-note"
                    textAreaRows={5}
                    darkTheme = 'darkTheme'
                    dayMode = {this.props.dayMode}
                />
                <Button className={this.dayOrNightButton()} onClick={() => this.props.removeCharacter()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -2 24 24" width="24" height="24" preserveAspectRatio="xMinYMin" className="icon__icon"><path d="M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zm10 2H2v1h14V4zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7h-9.72zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"></path></svg></Button>
                <Button className="closeModalButton" onClick={() => this.props.closeModal()}> X </Button>
               
            </Modal>
    )
}

}

export default MonModal