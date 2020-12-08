import React, {Component} from 'react'
import Notes from './Notes'
class App extends Component {

    state = {
        dayMode: false
    }

    handleDay = () => {
        this.setState({dayMode: true})
        document.querySelector('.icon__icon.day').classList.add('display-none')
        document.querySelector('.icon__icon.night').classList.remove('display-none')
        document.querySelector('body').style.transition = "0.5s background-color"
        document.querySelector('body').style.backgroundColor = "white"
    }

    handleNight = () => {
        this.setState({dayMode: false})
        document.querySelector('.icon__icon.night').classList.add('display-none')
        document.querySelector('.icon__icon.day').classList.remove('display-none')
    }

    dayOrNight = () => {
        if(this.state.dayMode) {
            return 'darkTheme-app-title'
        } else {
            return ''
        }
    }
    dayOrNightIcons = () => {
        if(this.state.dayMode) {
            return 'darkTheme-app-icons'
        } else {
            return ''
        }
    }
    render() {
        if(!this.state.dayMode) {
            document.querySelector('body').style.backgroundColor = "black"  
        }
        return (
                <div>
                    <div className="dayNightMode">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -2 24 24" width="24" height="24" preserveAspectRatio="xMinYMin" className="icon__icon night nightIcon display-none" onClick={() => this.handleNight()} id={this.dayOrNightIcons()}><path d="M2 10c0 4.43 3.478 8 7.742 8 .658 0 1.302-.085 1.922-.248-2.996-2.2-4.896-5.786-4.896-9.752 0-2.09.527-4.095 1.489-5.853C4.699 2.863 2 6.097 2 10zm6.768-2c0 4.632 3.068 8.528 7.232 9.665A9.555 9.555 0 0 1 9.742 20C4.362 20 0 15.523 0 10S4.362 0 9.742 0c.868 0 1.71.117 2.511.335A10.086 10.086 0 0 0 8.768 8z"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" preserveAspectRatio="xMinYMin" className="icon__icon day dayIcon" onClick={() => this.handleDay()} id={this.dayOrNightIcons()}><path d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM1 9h2a1 1 0 1 1 0 2H1a1 1 0 0 1 0-2zm16 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm.071-6.071a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM5.757 14.243a1 1 0 0 1 0 1.414L4.343 17.07a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM4.343 2.929l1.414 1.414a1 1 0 0 1-1.414 1.414L2.93 4.343A1 1 0 0 1 4.343 2.93zm11.314 11.314l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 1 1 1.414-1.414z"></path></svg>
                    </div>  
           
                    <div className="app-title-container">
                         <h2 className="app-title" id={this.dayOrNight()}>Yote</h2>
                    </div>

                    <Notes dayMode={this.state.dayMode}/>
                </div>
        )
    }
}

export default App