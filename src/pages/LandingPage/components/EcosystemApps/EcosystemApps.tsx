import SPAAnchor from 'components/SPAAnchor';
import { Description, HomeIcon } from 'pages/LandingPage/styled-components';
import { useGetEcosystemAppsQuery } from 'queries/landing/useGetEcosystemAppsQuery';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import styled from 'styled-components';
import { FlexDivColumn } from 'styles/common';
import { Dot, DotContainer, EcosystemAppsContainer } from './styled-components';
import { EcosystemApp } from './types';

const EcosystemApps: React.FC = () => {
    const ecosystemAppsQuery = useGetEcosystemAppsQuery();
    const isMobile = useSelector(getIsMobile);

    const displayedAppsCount = useMemo(() => (isMobile ? 1 : 4), [isMobile]);

    const ecosystemApps: EcosystemApp[] = useMemo(() => {
        return ecosystemAppsQuery.isSuccess && ecosystemAppsQuery.data ? ecosystemAppsQuery.data : [];
    }, [ecosystemAppsQuery.isSuccess, ecosystemAppsQuery.data]);

    const [appsCount, setAppsCount] = useState<number>(displayedAppsCount);

    const carouselChangeHandler = (change: number) => {
        if (change < 0) {
            return appsCount + change < displayedAppsCount
                ? setAppsCount(displayedAppsCount)
                : setAppsCount(appsCount + change);
        }

        setAppsCount(appsCount + change);

        if (ecosystemApps) {
            if (appsCount == ecosystemApps.length) {
                setAppsCount(ecosystemApps.length ? ecosystemApps.length : displayedAppsCount);
            }
        }
    };

    const slicedApps = ecosystemApps.slice(appsCount - displayedAppsCount, appsCount);

    return (
        <EcosystemAppsContainer>
            <Arrow
                disabled={appsCount - displayedAppsCount === 0}
                className="thales-icon thales-icon--left"
                style={{ fontSize: 35, left: '-50px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => carouselChangeHandler(-1)}
            />
            {slicedApps.map((app, index) => (
                <FlexDivColumn key={index} style={{ minHeight: '210px' }}>
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
            {isMobile && (
                <DotContainer>
                    {ecosystemApps.map((_app, index) => {
                        return (
                            <Dot
                                className={appsCount === displayedAppsCount + index ? 'selected' : ''}
                                onClick={setAppsCount.bind(this, displayedAppsCount + index)}
                                key={index}
                            />
                        );
                    })}
                </DotContainer>
            )}
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
