import { Suspense, lazy } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from 'utils/routes';
import ROUTES from 'constants/routes';
import Loader from 'components/Loader';
import ThemeProvider from 'layouts/Theme';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../LandingPage'));

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider>
                <Router history={history}>
                    <Switch>
                        <Route exact path={ROUTES.Home}>
                            <Suspense fallback={<Loader />}>
                                <Home />
                            </Suspense>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
};

export default App;
