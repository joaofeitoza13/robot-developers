import React,{Component} from 'react'
import CardList from './cardList'
import {robots} from './robots'
import SearchBox from './SearchBox'
import Scroll from './Scroll'




class App extends Component{
    constructor(){
        super()
        this.state = {
            robots: robots,
            searchfield: ''
        };
    };

    onSearchChange = (event) => {
            console.log(event.target.value);
            this.setState({ searchfield:event.target.value});
        } 

    render(){
        const filteredRobots = this.state.robots.filter(robot => 
             robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase()))
             
        return (
        <div className = 'tc' >
            <h1 id = "robotitle" >Robo Friends</h1>
            <SearchBox searchChange = {this.onSearchChange} />
            <Scroll>            
                <CardList robots={filteredRobots}/>
            </Scroll>
        </div>
    )
    }
}

export default App;