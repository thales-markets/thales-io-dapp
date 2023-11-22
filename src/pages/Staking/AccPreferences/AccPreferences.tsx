import { FlexDiv, FlexDivCentered, FlexDivColumn, FlexDivColumnSpaceBetween, FlexDivSpaceBetween } from 'styles/common';
import YourTransactions from '../StakingTab/Transactions/YourTransactions';
import { SectionDescription, SectionTitle, StakingButton, StakingInput } from '../styled-components';
import { Bottom, Container, Middle, Subtitle, Top } from './styled-components';

const AccPreferences: React.FC = () => {
    return (
        <>
            <Container>
                <Top>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween gap="20px">
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--delegate" />
                                    Delegate Volume
                                </span>
                            </SectionTitle>
                            <FlexDivColumn>
                                <Subtitle>Source:</Subtitle>
                                <StakingInput />
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <Subtitle>Destination:</Subtitle>
                                <StakingInput />
                            </FlexDivColumn>
                            <FlexDivCentered>
                                <StakingButton padding="5px 30px">Delegate</StakingButton>
                            </FlexDivCentered>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn>
                            <Subtitle>HOW DELEGATE VOLUME WORKS</Subtitle>
                            <SectionDescription>
                                The "Delegate Volume" functionality gives you the ability to direct the volume generated
                                from one wallet that you own to another wallet. This simple step comes in handy for
                                those who stake their THALES with a hardware wallet but do their trading on another hot
                                wallet for convenience's sake (for example using Overtime on their mobile wallet), this
                                way the volume generated can count towards the "Protocol Volume bucket" of gamified
                                THALES staking rewards.
                            </SectionDescription>
                            <SectionDescription>
                                This delegation of volume can be stopped at any time and it has checks in place to avoid
                                a wallet directing it's volume to another while still boosting it's own.
                            </SectionDescription>
                        </FlexDivColumn>
                    </FlexDiv>
                </Top>
                <Middle>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween gap="20px">
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--merge" />
                                    Merge Account
                                </span>
                            </SectionTitle>
                            <FlexDivColumn>
                                <Subtitle>Source:</Subtitle>
                                <StakingInput />
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <Subtitle>Destination:</Subtitle>
                                <StakingInput />
                            </FlexDivColumn>
                            <FlexDivCentered>
                                <StakingButton padding="5px 30px">Delegate</StakingButton>
                            </FlexDivCentered>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn>
                            <Subtitle>HOW MERGE ACCOUNT WORKS</Subtitle>
                            <SectionDescription>
                                The "Merge Account" functionality gives a THALES staker the ability to transfer all its
                                staked THALES and staking rewards from one wallet to another. This comes in handy for
                                those who want to cycle wallets or for those whose wallet has been compromised.
                            </SectionDescription>
                            <SectionDescription>
                                This account merging only works for the entire balance of staked and vested THALES,
                                partial reassignments will not be possible. It's also worth noting that on the receiving
                                wallet, the THALES tokens staked will still need a 7-day countdown to unstake and the
                                vested rewards will also be subject to the standard 10-weeks cooldown when claiming.
                            </SectionDescription>
                        </FlexDivColumn>
                    </FlexDiv>
                </Middle>
                <Bottom>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween gap="20px">
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--claim" />
                                    Claim on Behalf
                                </span>
                            </SectionTitle>
                            <Subtitle>
                                Enter account for which you want to enable / disable claim on your behalf:
                            </Subtitle>
                            <FlexDivSpaceBetween>
                                <StakingInput width="60%"></StakingInput>
                                <StakingButton>Enter Address</StakingButton>
                            </FlexDivSpaceBetween>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn gap="20px">
                            <SectionDescription>
                                Claim on behalf has been implemented per TIP-66. Please check this guid on how to
                                automate your weekly claims.
                            </SectionDescription>
                            <Subtitle>Accounts that are enabled to claim on your behalf:</Subtitle>
                        </FlexDivColumn>
                    </FlexDiv>
                </Bottom>
            </Container>
            <YourTransactions width="60%" />
        </>
    );
};

export default AccPreferences;
