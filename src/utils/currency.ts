import { COLLATERALS } from 'constants/currency';
import { Network } from 'enums/network';

export const getDefaultCollateral = (networkId: Network) => COLLATERALS[networkId][0];
