// @ts-ignore
import { DisclaimerComponent } from '@rainbow-me/rainbowkit';
// @ts-ignore
import disclaimer from 'assets/docs/overtime-disclaimer.pdf';
// @ts-ignore
import privacyPolicy from 'assets/docs/overtime-privacy-policy.pdf';
// @ts-ignore
import termsOfUse from 'assets/docs/overtime-terms-of-use.pdf';
import { Trans } from 'react-i18next';
import styled from 'styled-components';

const WalletDisclaimer: DisclaimerComponent = ({ Text, Link }) => {
    return (
        <Wrapper>
            <Text>
                <Trans
                    i18nKey="common.wallet.disclaimer"
                    components={{
                        disclaimer: (
                            <Link href={disclaimer}>
                                <></>
                            </Link>
                        ),
                        privacyPolicy: (
                            <Link href={privacyPolicy}>
                                <></>
                            </Link>
                        ),
                        terms: (
                            <Link href={termsOfUse}>
                                <></>
                            </Link>
                        ),
                    }}
                />
            </Text>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    @media (max-width: 767px) {
        margin-top: -15px;
        margin-bottom: -15px;
    }
`;

export default WalletDisclaimer;
