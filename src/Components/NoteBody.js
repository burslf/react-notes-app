import React, { Component } from "react";
import localforage from "localforage";

class NoteBody extends Component {
  constructor(props) {
    super(props);
  }
  dayOrNight = () => {
    if (this.props.dayMode) {
      return this.props.darkTheme;
    } else {
      return "";
    }
  };
  render() {
    let allNotes = [];
    localforage.length().then((data) => {
      for (let i = 0; i < data; i++) {
        localforage.getItem(`${i}`).then((data) => allNotes.push(data));
      }
    });
    const singleNote = this.props.notes.map((row, index) => {
      return (
        <div className='noteContainer' key={index}>
          <div
            className='maNote'
            id={this.dayOrNight()}
            onClick={() => this.props.openModal(row, index)}
          >
            <div className='date'>
              <span className='hour'>Created: {row.date}</span>
              {/* <div>{this.props.updated}</div> */}
            </div>
            <h2 className='noteTiItle'>{row.title}</h2>
            <div
              className='noteContent'
              onClick={() => this.props.openModal(row, index)}
            >
              {row.note}
            </div>
          </div>
        </div>
      );
    });
    return singleNote;
  }
}

export default NoteBody;
