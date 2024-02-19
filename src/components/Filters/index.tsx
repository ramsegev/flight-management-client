import React, {ChangeEvent, useContext} from "react";
import {observer} from 'mobx-react';
import {SocketStoreContext} from "../../stores/socketStore";
import './filterStyle.scss'

const Filters: React.FC = (() => {
    const socketStore = useContext(SocketStoreContext);
    const {searchQuery} = socketStore;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        socketStore.setSearchQuery && socketStore.setSearchQuery(event.target.value)
    }
    return (
        <div className="search-wrapper">
            <input
                type="text"
                name="searchQuery"
                placeholder="Search..."
                className="search-input"
                value={searchQuery && searchQuery}
                onChange={handleChange}
            />
        </div>
    );
});

export default observer(Filters);
