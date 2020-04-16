import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// TO SCROLL TO TOP WHEN CHANGE LINK
history.listen((location, action) => {
    window.scrollTo(0, 0);
});

export { history };