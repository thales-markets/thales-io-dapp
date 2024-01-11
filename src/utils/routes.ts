import ROUTES from 'constants/routes';
import { SpaceKey } from 'enums/governance';
import { createBrowserHistory, createHashHistory } from 'history';

const ifIpfsDeployment = process.env.REACT_APP_IPFS_DEPLOYMENT === 'true';
const history = ifIpfsDeployment ? createHashHistory() : createBrowserHistory();

export const navigateTo = (path: string, replacePath = false, scrollToTop = false, state = '') => {
    if (scrollToTop) {
        window.scrollTo(0, 0);
    }
    replacePath ? history.replace(path, state) : history.push(path, state);
};

export const buildHref = (route: string) => `${ifIpfsDeployment ? '#' : ''}${route}`;

export const navigateToGovernance = (spaceKey?: SpaceKey, id?: string, replacePath = false) =>
    navigateTo(`${ROUTES.DAO.Home}/${spaceKey ? spaceKey : ''}/${id ? id : ''}`, replacePath);

export const getGovernanceUrl = (spaceKey?: SpaceKey, id?: string) =>
    `${ROUTES.DAO.Home}/${spaceKey ? spaceKey : ''}/${id ? id : ''}`;

export { history };
