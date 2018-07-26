/*  Import default React from react.
    React allows JSX to work.
 */
import React from 'react';
/*  Import default ReactDom from react-dom.
    This provides the user with some DOM-specific methods, such as render().
*/
import ReactDOM from 'react-dom';
/*  Import default App from file App within this directory.
    This is the entry point for our app.
*/
import App from './App';
/*  Import default registerServiceWorker from file registerServiceWorker in this
    directory.

    registerServiceWorker helps caching assets and other files so that when the
    user is offline or on a slow network, they can still see results on the
    screen.
*/
import registerServiceWorker from './registerServiceWorker';








// Render element <App /> inside container 'root'.
ReactDOM.render(<App />, document.getElementById('root'));
// Register a service worker to serve assets from local cache.
registerServiceWorker();
