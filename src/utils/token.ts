import { APR_FREQUENCY } from 'constants/token';

export const aprToApy = (interest: number) => ((1 + interest / 100 / APR_FREQUENCY) ** APR_FREQUENCY - 1) * 100;
