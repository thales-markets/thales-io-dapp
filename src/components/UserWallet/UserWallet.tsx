import NetworkSwitch from 'components/NetworkSwitch';
import { ScreenSizeBreakpoint } from 'enums/ui';
import React from 'react';
import styled from 'styled-components';

const UserWallet: React.FC = () => {
    return (
        <Container>
            <Wrapper>
                <NetworkSwitch isWalletConnectorSwitch={true} />
            </Wrapper>
        </Container>
    );
};

const Container = styled.div<{ hidden?: boolean }>`
    visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
    display: flex;
    z-index: 4;
    height: 30px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        justify-content: flex-end;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: 1px solid ${(props) => props.theme.borderColor.primary};
    border-radius: 8px;
    @media (max-width: 500px) {
        height: 26px;
    }
    > div > div {
        width: 150px;
        height: 30px;
    }
`;

export default UserWallet;
