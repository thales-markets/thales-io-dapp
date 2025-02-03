import SPAAnchor from 'components/SPAAnchor';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ECOSYSTEM_DAPP, EcosystemDappType } from './apps';
import {
    Action,
    ActionContainer,
    CardContainer,
    CardContent,
    Container,
    Description,
    Icon,
    LeftContainer,
    RightContainer,
    Title,
} from './styled-components';

const EcosystemApps: React.FC = () => {
    return (
        <Container>
            <LeftContainer>
                <CardContainer image={ECOSYSTEM_DAPP[EcosystemDappType.OVERTIME].image}>
                    <CardContent>
                        <Icon
                            className={ECOSYSTEM_DAPP[EcosystemDappType.OVERTIME].icon}
                            fontSize={ECOSYSTEM_DAPP[EcosystemDappType.OVERTIME].iconSize}
                            mobileFontSize={ECOSYSTEM_DAPP[EcosystemDappType.OVERTIME].mobileIconSize}
                        ></Icon>
                        <Title>{ECOSYSTEM_DAPP[EcosystemDappType.OVERTIME].title}</Title>
                        <Description>{ECOSYSTEM_DAPP[EcosystemDappType.OVERTIME].description}</Description>
                    </CardContent>
                    <ActionContainer>
                        <SPAAnchor href={ECOSYSTEM_DAPP[EcosystemDappType.OVERTIME].link}>
                            <Action>{ECOSYSTEM_DAPP[EcosystemDappType.OVERTIME].actionText}</Action>
                        </SPAAnchor>
                    </ActionContainer>
                </CardContainer>
            </LeftContainer>
            <RightContainer>
                <CardContainer image={ECOSYSTEM_DAPP[EcosystemDappType.SPEED_MARKETS].image}>
                    <CardContent>
                        <Icon
                            className={ECOSYSTEM_DAPP[EcosystemDappType.SPEED_MARKETS].icon}
                            fontSize={ECOSYSTEM_DAPP[EcosystemDappType.SPEED_MARKETS].iconSize}
                            mobileFontSize={ECOSYSTEM_DAPP[EcosystemDappType.SPEED_MARKETS].mobileIconSize}
                        ></Icon>
                        <Title>{ECOSYSTEM_DAPP[EcosystemDappType.SPEED_MARKETS].title}</Title>
                    </CardContent>
                    <ActionContainer>
                        <SPAAnchor href={ECOSYSTEM_DAPP[EcosystemDappType.SPEED_MARKETS].link}>
                            <Action>{ECOSYSTEM_DAPP[EcosystemDappType.SPEED_MARKETS].actionText}</Action>
                        </SPAAnchor>
                    </ActionContainer>
                </CardContainer>
                <CardContainer image={ECOSYSTEM_DAPP[EcosystemDappType.THALES_MARKETS].image}>
                    <CardContent>
                        <Icon
                            className={ECOSYSTEM_DAPP[EcosystemDappType.THALES_MARKETS].icon}
                            fontSize={ECOSYSTEM_DAPP[EcosystemDappType.THALES_MARKETS].iconSize}
                            mobileFontSize={ECOSYSTEM_DAPP[EcosystemDappType.THALES_MARKETS].mobileIconSize}
                        ></Icon>
                        <Title>{ECOSYSTEM_DAPP[EcosystemDappType.THALES_MARKETS].title}</Title>
                    </CardContent>
                    <ActionContainer>
                        <SPAAnchor href={ECOSYSTEM_DAPP[EcosystemDappType.THALES_MARKETS].link}>
                            <Action>{ECOSYSTEM_DAPP[EcosystemDappType.THALES_MARKETS].actionText}</Action>
                        </SPAAnchor>
                    </ActionContainer>
                </CardContainer>
            </RightContainer>
        </Container>
    );
};

export default EcosystemApps;
