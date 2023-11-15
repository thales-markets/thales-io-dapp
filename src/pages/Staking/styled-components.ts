import styled from 'styled-components';

export const Line = styled.div`
    margin: 50px 0;
    width: 50%;
    height: 4px;
    border-radius: 10px;
    background: ${(props) => props.theme.background.tertiary};
`;

export const NavContainer = styled.div`
    width: 55%;
    margin-bottom: 45px;
`;
