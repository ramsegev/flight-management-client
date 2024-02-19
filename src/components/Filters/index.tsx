import React, {ChangeEvent, useContext} from "react";
import {observer} from 'mobx-react';
import {SocketStoreContext} from "../../stores/socketStore";


const Filters: React.FC = (() => {
    const socketStore = useContext(SocketStoreContext);
    const {searchQuery} = socketStore;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        socketStore.setSearchQuery && socketStore.setSearchQuery(event.target.value)
    }
    console.log('filter')
    return (
        <div>
            <input
                type="text"
                name="searchQuery"
                placeholder="Search..."
                value={searchQuery && searchQuery}
                onChange={handleChange}
            />
        </div>
    );
});

export default observer(Filters);
