import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormControl from 'react-bootstrap/FormControl'

class Form extends Component {

    state = {
        title: '',
        note: '',
        date: '',
        id: '',
        count: 0,
    }
    dayOrNight = () => {
      if(this.props.dayMode) {
          return this.props.darkTheme
      } 
      else {
          return ''
      }
  }
  
  dayOrNightButton = () => {
    if(this.props.dayMode) {
      return `darkTheme-button-form`
  } 
  else {
      return ''
  }
  }
    render() {
        return(
            <form className={`form-container ${this.props.formContainerId}`} id={this.dayOrNight()}>
            <FormControl
              type="text"
              name="title"
              id={this.props.titleId}
              value={this.props.titleValue}
              onChange={(e) => this.props.handleTitleChange(e)} 
              maxLength={14}
              placeholder={this.props.titlePlaceholder}
              onKeyDown={(event) => {
                if(event.key === "Enter") {
                    document.querySelector('#note')
                    event.preventDefault();
                    return false;
                 }
              }}
            />
            <FormControl
              as="textarea"
              name="note"
              id={this.props.noteId}
              value={this.props.noteValue}
              onChange={(e) => this.props.handleNoteChange(e)} 
              placeholder={this.props.notePlaceholder}
              rows={this.props.textAreaRows}
              />
              <Button className={this.dayOrNightButton()} onClick={(e) => this.props.submitNote(e)} id={this.props.buttonId}>{this.props.buttonValue}</Button>
          </form>
        )
    }

}

export default Form