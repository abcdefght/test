import React from 'react';
import {RenderRoute} from '@/router';
import {Provider} from "react-redux";

const App = ({store}) => {

    return (
        <Provider store={store}>
            <RenderRoute/>
        </Provider>
    )
}

export default App;
