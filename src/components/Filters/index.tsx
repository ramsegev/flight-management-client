import React, {ChangeEvent, FC, useCallback} from "react";
import {observer} from 'mobx-react';
import flightsStore from "../../stores/FlightsStore";
import './filterStyle.scss'

const Filters: FC = () => {
    const {searchQuery} = flightsStore;
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        flightsStore.setSearchQuery(event.target.value);
    }, []);
    return <div className="search-wrapper">
        <input
            type="text"
            name="searchQuery"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={handleChange}
        />
    </div>;
};

export default observer(Filters);