import React from 'react';

import Flights from "./pages/Flights";
import Filters from "./components/Filters";

function App() {
    return (
        <div className="App">
            <Filters />
            <Flights />
        </div>
    );
}

export default App;
