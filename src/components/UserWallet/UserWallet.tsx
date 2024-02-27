import NetworkSwitch from 'components/NetworkSwitch';
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
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: 1px solid ${(props) => props.theme.borderColor.senary};
    border-radius: 8px;
    @media (max-width: 500px) {
        height: 26px;
    }
    > div > div {
        width: 150px;
    }
`;

export default UserWallet;
