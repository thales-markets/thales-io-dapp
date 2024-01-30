import SPAAnchor from 'components/SPAAnchor';
import { Description, HomeIcon } from 'pages/LandingPage/styled-components';
import { useGetEcosystemAppsQuery } from 'queries/landing/useGetEcosystemAppsQuery';
import { useMemo } from 'react';
import { FlexDivColumn } from 'styles/common';
import { EcosystemAppsContainer } from './styled-components';
import { EcosystemApp } from './types';

const EcosystemApps: React.FC = () => {
    const ecosystemAppsQuery = useGetEcosystemAppsQuery();

    const ecosystemApps: EcosystemApp[] = useMemo(() => {
        return ecosystemAppsQuery.isSuccess && ecosystemAppsQuery.data ? ecosystemAppsQuery.data : [];
    }, [ecosystemAppsQuery.isSuccess, ecosystemAppsQuery.data]);

    return (
        <EcosystemAppsContainer>
            {ecosystemApps.map((app, index) => (
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
