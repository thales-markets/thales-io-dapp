import Loader from 'components/Loader';
import { SUPPORTED_NETWORKS_NAMES } from 'constants/network';
import ROUTES from 'constants/routes';
import 'i18n';
import DappLayout from 'layouts/DappLayout';
import ThemeProvider from 'layouts/Theme';
import { Suspense, lazy, useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { setAppReady } from 'redux/modules/app';
import { setIsMobile } from 'redux/modules/ui';
import { getSwitchToNetworkId, updateNetworkSettings, updateWallet } from 'redux/modules/wallet';
import { isMobile } from 'utils/device';
import networkConnector from 'utils/networkConnector';
import queryConnector from 'utils/queryConnector';
import { history } from 'utils/routes';
import { useAccount, useProvider, useSigner } from 'wagmi';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../LandingPage'));
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ '../Dashboard'));
const Staking = lazy(() => import(/* webpackChunkName: "Staking" */ '../Staking'));
const AMMLP = lazy(() => import(/* webpackChunkName: "AMMLP" */ '../AMMLP'));
const Governance = lazy(() => import(/* webpackChunkName: "Governance" */ '../Governance'));
const Bridge = lazy(() => import(/* webpackChunkName: "Bridge" */ '../Bridge'));
const WhitepaperArticle = lazy(() => import(/* webpackChunkName: "Learn" */ '../Learn/WhitepaperArticle'));
const GovernanceArticle = lazy(() => import(/* webpackChunkName: "Learn" */ '../Learn/GovernanceArticle'));
const TokenArticle = lazy(() => import(/* webpackChunkName: "Learn" */ '../Learn/TokenArticle'));
const LPStaking = lazy(() => import(/* webpackChunkName: "LPStaking" */ '../Staking/LPStaking'));

const App = () => {
    const dispatch = useDispatch();
    const switchedToNetworkId = useSelector((state) => getSwitchToNetworkId(state));
    const { address } = useAccount();
    const provider = useProvider(!address ? { chainId: switchedToNetworkId } : undefined); // when wallet not connected force chain
    const { data: signer } = useSigner();

    queryConnector.setQueryClient();

    useEffect(() => {
        const init = async () => {
            try {
                const chainIdFromProvider = (await provider.getNetwork()).chainId;
                const providerNetworkId = !!address ? chainIdFromProvider : switchedToNetworkId;

                networkConnector.setContractSettings({
                    networkId: providerNetworkId,
                    provider,
                    // @ts-ignore
                    signer,
                });

                dispatch(
                    updateNetworkSettings({
                        // @ts-ignore
                        networkId: providerNetworkId,
                        // @ts-ignore
                        networkName: SUPPORTED_NETWORKS_NAMES[providerNetworkId]?.toLowerCase(),
                    })
                );
                dispatch(setAppReady());
            } catch (e) {
                if (!e.toString().includes('Error: underlying network changed')) {
                    dispatch(setAppReady());
                    console.log(e);
                }
            }
        };
        init();
    }, [dispatch, provider, signer, switchedToNetworkId, address]);

    useEffect(() => {
        dispatch(updateWallet({ walletAddress: address }));
    }, [address, dispatch]);

    useEffect(() => {
        const handlePageResized = () => {
            dispatch(setIsMobile(isMobile()));
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handlePageResized);
            window.addEventListener('orientationchange', handlePageResized);
            window.addEventListener('load', handlePageResized);
            window.addEventListener('reload', handlePageResized);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handlePageResized);
                window.removeEventListener('orientationchange', handlePageResized);
                window.removeEventListener('load', handlePageResized);
                window.removeEventListener('reload', handlePageResized);
            }
        };
    }, [dispatch]);

    return (
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
                        <Route exact path={ROUTES.Token.Staking.Home}>
                            <Suspense fallback={<Loader />}>
                                <DappLayout>
                                    <Staking />
                                </DappLayout>
                            </Suspense>
                        </Route>
                        <Route exact path={ROUTES.AmmLP.Home}>
                            <Suspense fallback={<Loader />}>
                                <DappLayout>
                                    <AMMLP />
                                </DappLayout>
                            </Suspense>
                        </Route>
                        <Route exact path={ROUTES.Token.LPStaking}>
                            <Suspense fallback={<Loader />}>
                                <DappLayout>
                                    <LPStaking />
                                </DappLayout>
                            </Suspense>
                        </Route>
                        <Route exact path={ROUTES.Token.Bridge}>
                            <Suspense fallback={<Loader />}>
                                <DappLayout>
                                    <Bridge />
                                </DappLayout>
                            </Suspense>
                        </Route>
                        <Route
                            exact
                            path={[ROUTES.DAO.Home, ROUTES.DAO.Space, ROUTES.DAO.Proposal]}
                            render={(routeProps) => (
                                <Suspense fallback={<Loader />}>
                                    <DappLayout>
                                        <Governance {...routeProps} />
                                    </DappLayout>
                                </Suspense>
                            )}
                        />
                        <Route exact path={ROUTES.About.Whitepaper}>
                            <Suspense fallback={<Loader />}>
                                <DappLayout>
                                    <WhitepaperArticle />
                                </DappLayout>
                            </Suspense>
                        </Route>
                        <Route exact path={ROUTES.About.Governance}>
                            <Suspense fallback={<Loader />}>
                                <DappLayout>
                                    <GovernanceArticle />
                                </DappLayout>
                            </Suspense>
                        </Route>
                        <Route exact path={ROUTES.About.Token}>
                            <Suspense fallback={<Loader />}>
                                <DappLayout>
                                    <TokenArticle />
                                </DappLayout>
                            </Suspense>
                        </Route>
                    </Switch>
                </Router>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
