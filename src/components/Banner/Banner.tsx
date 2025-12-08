import SPAAnchor from 'components/SPAAnchor';
import ThalesToOverMigrationModal from 'components/ThalesToOverMigrationModal';
import { VOTING_COUNCIL_PROPOSAL_ID } from 'constants/governance';
import { SpaceKey } from 'enums/governance';
import { ScreenSizeBreakpoint } from 'enums/ui';
import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { buildGovernanceHref } from 'utils/routes';

const IS_VISIBLE = true;
const IS_SECOND_BANNER_VISIBLE = true;

const Banner: React.FC = () => {
    const [showThalesToOverMigrationModal, setShowThalesToOverMigrationModal] = useState<boolean>(false);

    if (!IS_VISIBLE) {
        return <></>;
    }

    return (
        <>
            <Container onClick={() => setShowThalesToOverMigrationModal(true)}>
                <Label>{<Trans i18nKey={'common.banner.migration'} components={{ bold: <Bold /> }} />}</Label>
            </Container>
            {IS_SECOND_BANNER_VISIBLE && (
                <SPAAnchor href={buildGovernanceHref(SpaceKey.COUNCIL, VOTING_COUNCIL_PROPOSAL_ID)}>
                    <Container isSecondBanner>
                        <Label isSecondBanner>
                            {
                                <Trans
                                    i18nKey={'common.banner.elections-banner-message'}
                                    components={{ bold: <Bold /> }}
                                />
                            }
                        </Label>
                    </Container>
                </SPAAnchor>
            )}
            {showThalesToOverMigrationModal && (
                <ThalesToOverMigrationModal onClose={() => setShowThalesToOverMigrationModal(false)} />
            )}
        </>
    );
};

const Container = styled(FlexDiv)<{ isSecondBanner?: boolean }>`
    position: relative;
    top: 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props.isSecondBanner ? props.theme.background.primary : props.theme.background.quaternary};
    min-height: 30px;
    z-index: 102;
    cursor: pointer;
    text-align: center;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        min-height: 24px;
    }
`;

const Label = styled.span<{ isSecondBanner?: boolean }>`
    color: ${(props) => (props.isSecondBanner ? props.theme.textColor.tertiary : props.theme.button.textColor.primary)};
    font-size: 15px;
    padding: 5px 0px;
    font-weight: 500;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
        padding: 4px 7px;
    }
`;

const Bold = styled.span`
    font-weight: bold;
`;

export default Banner;
