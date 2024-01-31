import SPAAnchor from 'components/SPAAnchor';
import { Description, HomeIcon } from 'pages/LandingPage/styled-components';
import { useGetEcosystemAppsQuery } from 'queries/landing/useGetEcosystemAppsQuery';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';
import { EcosystemAppsContainer } from './styled-components';
import { EcosystemApp } from './types';

const DISPLAYED_APPS_COUNT = 4;

const EcosystemApps: React.FC = () => {
    const ecosystemAppsQuery = useGetEcosystemAppsQuery();

    const ecosystemApps: EcosystemApp[] = useMemo(() => {
        return ecosystemAppsQuery.isSuccess && ecosystemAppsQuery.data ? ecosystemAppsQuery.data : [];
    }, [ecosystemAppsQuery.isSuccess, ecosystemAppsQuery.data]);

    const [appsCount, setAppsCount] = useState<number>(DISPLAYED_APPS_COUNT);

    const carouselChangeHandler = (change: number) => {
        if (change < 0) {
            return appsCount + change < DISPLAYED_APPS_COUNT
                ? setAppsCount(DISPLAYED_APPS_COUNT)
                : setAppsCount(appsCount + change);
        }

        setAppsCount(appsCount + change);

        if (ecosystemApps) {
            if (appsCount == ecosystemApps.length) {
                setAppsCount(ecosystemApps.length ? ecosystemApps.length : DISPLAYED_APPS_COUNT);
            }
        }
    };

    const slicedApps = ecosystemApps.slice(appsCount - DISPLAYED_APPS_COUNT, appsCount);

    return (
        <EcosystemAppsContainer>
            <Arrow
                disabled={appsCount - DISPLAYED_APPS_COUNT === 0}
                className="thales-icon thales-icon--left"
                style={{ fontSize: 35, left: '-50px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => carouselChangeHandler(-1)}
            />
            {slicedApps.map((app, index) => (
                <FlexDivColumn key={index}>
                    <SPAAnchor href={app.link}>
                        <HomeIcon
                            style={{ height: '80px' }}
                            fontSize={app.size}
                            className={`icon icon--ecosystem-fallback icon--${app.icon}`}
                        />
                    </SPAAnchor>
                    <Description>{app.description}</Description>
                </FlexDivColumn>
            ))}
            <Arrow
                disabled={appsCount === ecosystemApps.length}
                className="thales-icon thales-icon--right"
                style={{ right: '-50px', fontSize: 35, top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => carouselChangeHandler(1)}
            />
        </EcosystemAppsContainer>
    );
};

const Arrow = styled.i<{ disabled?: boolean }>`
    position: absolute;
    color: ${(props) => props.theme.textColor.primary};
    opacity: ${(props) => (props.disabled ? '0.2' : '1')};
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    @media (max-width: 600px) {
        display: none !important;
    }
`;

export default EcosystemApps;
