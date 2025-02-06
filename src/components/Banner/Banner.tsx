import ThalesToOverMigrationModal from 'components/ThalesToOverMigrationModal';
import { ScreenSizeBreakpoint } from 'enums/ui';
import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

const IS_VISIBLE = true;

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
            {showThalesToOverMigrationModal && (
                <ThalesToOverMigrationModal onClose={() => setShowThalesToOverMigrationModal(false)} />
            )}
        </>
    );
};

const Container = styled(FlexDiv)`
    position: relative;
    top: 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.button.textColor.primary};
    background-color: ${(props) => props.theme.background.quaternary};
    min-height: 35px;
    z-index: 102;
    cursor: pointer;
    text-align: center;
`;

const Label = styled.span`
    color: ${(props) => props.theme.button.textColor.primary};
    font-size: 18px;
    padding: 9px 0px;
    font-weight: 500;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 13px;
        padding: 5px 7px;
    }
`;

const Bold = styled.span`
    font-weight: bold;
`;

export default Banner;
