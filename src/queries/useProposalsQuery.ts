import { EXCLUDED_PROPOSALS, SNAPSHOT_GRAPHQL_URL } from 'constants/governance';
import QUERY_KEYS from 'constants/queryKeys';
import { SpaceKey } from 'enums/governance';
import request, { gql } from 'graphql-request';
import { UseQueryOptions, useQuery } from 'react-query';
import { Proposal } from 'types/governance';

const useProposalsQuery = (spaceKey: SpaceKey, limit: number, options?: UseQueryOptions<Proposal[]>) => {
    return useQuery<Proposal[]>(
        QUERY_KEYS.Governance.Proposals(spaceKey, limit),
        async () => {
            const { proposals }: { proposals: Proposal[] } = await request(
                SNAPSHOT_GRAPHQL_URL,
                gql`
                    query ProposalsForSpace($spaceKey: String!, $limit: Int) {
                        proposals(
                            first: $limit
                            where: { space: $spaceKey }
                            orderBy: "created"
                            orderDirection: desc
                        ) {
                            id
                            title
                            body
                            choices
                            start
                            end
                            snapshot
                            state
                            author
                            type
                            scores
                            space {
                                id
                                name
                                symbol
                                network
                            }
                            strategies {
                                name
                                params
                            }
                        }
                    }
                `,
                { spaceKey: spaceKey, limit: limit }
            );

            return proposals.filter((proposal: Proposal) => !EXCLUDED_PROPOSALS.includes(proposal.id));
        },
        {
            ...options,
        }
    );
};

export default useProposalsQuery;
