import SPAAnchor from 'components/SPAAnchor';
import { Description, HomeIcon } from 'pages/LandingPage/styled-components';
import { FlexDivColumn } from 'styles/common';
import { ECOSYSTEM_APPS } from './apps';
import { EcosystemAppsContainer } from './styled-components';

const EcosystemApps: React.FC = () => {
    return (
        <EcosystemAppsContainer>
            {ECOSYSTEM_APPS.map((app, index) => (
                <FlexDivColumn key={index}>
                    <SPAAnchor href={app.link}>
                        <HomeIcon style={{ height: '80px' }} fontSize={app.size} className={`icon icon--${app.icon}`} />
                    </SPAAnchor>
                    <Description>{app.description}</Description>
                </FlexDivColumn>
            ))}
        </EcosystemAppsContainer>
    );
};

export default EcosystemApps;
