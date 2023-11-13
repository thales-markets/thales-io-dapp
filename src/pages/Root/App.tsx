import { Suspense, lazy } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from 'utils/routes';
import ROUTES from 'constants/routes';
import Loader from 'components/Loader';
import ThemeProvider from 'layouts/Theme';
import DappLayout from 'layouts/DappLayout';
import 'i18n';
import Staking from 'pages/Staking';
import queryConnector from 'utils/queryConnector';
import { QueryClientProvider } from 'react-query';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../LandingPage'));
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ '../Dashboard'));

const App: React.FC = () => {
    queryConnector.setQueryClient();

    return (
        <div className="App">
            <ThemeProvider>
                <QueryClientProvider client={queryConnector.queryClient}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path={ROUTES.Home}>
                                <Suspense fallback={<Loader />}>
                                    <DappLayout>
                                        <Home />
                                    </DappLayout>
                                </Suspense>
                            </Route>
                            <Route exact path={ROUTES.Dashboard}>
                                <Suspense fallback={<Loader />}>
                                    <DappLayout>
                                        <Dashboard />
                                    </DappLayout>
                                </Suspense>
                            </Route>
                            <Route exact path={ROUTES.Staking}>
                                <Suspense fallback={<Loader />}>
                                    <DappLayout>
                                        <Staking />
                                    </DappLayout>
                                </Suspense>
                            </Route>
                        </Switch>
                    </Router>
                </QueryClientProvider>
            </ThemeProvider>
        </div>
    );
};

export default App;
