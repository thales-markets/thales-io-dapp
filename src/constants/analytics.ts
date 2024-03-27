import Plausible from 'plausible-tracker';

export const PLAUSIBLE = Plausible({
    domain: 'thales.io',
    trackLocalhost: true,
    apiHost: 'https://analytics-v2.thalesmarket.io',
});

export const PLAUSIBLE_KEYS = {
    depositDigitalOptionsLp: 'deposit-digital-options-lp',
    depositOvertimeSingleLp: 'deposit-overtime-single-lp',
    depositOvertimeParlayLp: 'deposit-overtime-parlay-lp',
    stake: 'stake',
    unstake: 'unstake',
    lpStake: 'lp-stake',
    lpUnstake: 'lp-unstake',
};
