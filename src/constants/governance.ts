export const SNAPSHOT_GRAPHQL_URL = `https://hub.snapshot.org/graphql?apiKey=${process.env.REACT_APP_SNAPSHOT_API_KEY}`;
export const SNAPSHOT_SCORE_URL = `https://score.snapshot.org/?apiKey=${process.env.REACT_APP_SNAPSHOT_API_KEY}`;

export const VOTING_COUNCIL_PROPOSAL_ID = '0x6da7b67682cacbd9f7c1cdea88438dc8a42ddd6445fad4251e2ab50be6734e4e';
export const COUNCIL_PROPOSAL_ID = '0x22ad5b531b6efa86e56bef8206bad55e441d9c9144afde854f7b15194dc89778';
export const VOTING_ORACLE_COUNCIL_PROPOSAL_ID = '0xb94b357561a620ab38777f75aba7f6d14d21e019911c2c1ff5cd88e5f1b18eeb';
export const FIRST_COUNCIL_ELECTIONS_ID = 'QmcKWQZYyj6Z7iaWpUR3unjNU5otchQsARSVjE4utYSyv3';

export const NUMBER_OF_COUNCIL_MEMBERS_OLD = 4;
export const PROPOSAL_APPROVAL_VOTES_OLD = 3;

export const NUMBER_OF_COUNCIL_MEMBERS = 7;
export const PROPOSAL_APPROVAL_VOTES = 5;

export const NUMBER_OF_ORACLE_COUNCIL_MEMBERS = 5;

export const OLD_COUNCIL_END_DATE = new Date('Dec 22 2021 00:00:00 UTC');

export const EXCLUDED_PROPOSALS = [
    'QmNhZzp96fEzA4LFBnARKw2A4SYBQRaftzR3cRw3NqC2Yb',
    '0x1aa3a61f66ab80e62f13f7eecd7572b33d90302af1e8d5e2ffbee48d01ce18bc',
    '0x72bdc463650871385f9bbdbd305692815ced46ed1dd818af9fed06608e7984bb',
    '0xe0c4ba01615dee690d1d5ba2706198e3f1d6093648a17ccab974eeb490e15396',
    '0x02c58007afeb961e6105528842ea5c1e99bc9dbc503ce6f1b7b6d9d35a6aca64',
    '0x9bf817cf8b313757ae1e4ee6d2250e6fb549a9883f6e353f30c530ba0ee02bac',
    '0x769f4e8875cf3f4e12a6e02938c03add0002cfd49275de6d6264282b5104c46c',
    'Qme3bpMQbuczQ4pfqsBxEbMj3FhdqipD5TbWSfenxUX2Vv',
    '0xab831f0a6faf785b1829f343ad744b89fa87b0e9d0dc76232affe43ae76111a6',
    '0xbe858d9db6b9abc060bcf2c064f642a1dd3f8dd3ba396328938dee87c51dbd25',
];

export const BLOCK_OPTIMISM = 108648155;
export const BLOCK_ARBITRUM = 124559462;
