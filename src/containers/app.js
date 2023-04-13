import React, { useState, useEffect } from "react";
import CardList from "../components/cardlist";
import SearchBox from "../components/searchbox";
import './app.css';
import Scroll from "../components/scroll";
import ErrorBoundry from "../components/errorboundry";

function App() {

    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield ] = useState('')

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users))
    }, [])

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return !robots.length
        ? <h1>Loading</h1>
        : <div className="tc">
            <h1 className="f1">RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filteredRobots} />
                </ErrorBoundry>
            </Scroll>
        </div>
}

export default App;