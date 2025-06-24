import SPAAnchor from 'components/SPAAnchor';
import ThalesToOverMigrationModal from 'components/ThalesToOverMigrationModal';
import { ScreenSizeBreakpoint } from 'enums/ui';
import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

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
                <SPAAnchor
                    href={
                        'https://www.overtime.io/dao/thalescouncil.eth/0x53ff4a6fb029f820792a1d1fe4c8749e861c616e1c566d83062ad47968a0065a'
                    }
                >
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
