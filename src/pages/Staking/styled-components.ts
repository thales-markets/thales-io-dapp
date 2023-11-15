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

export const SectionTitle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: ${(props) => props.theme.textColor.primary};
    font-family: NunitoBold;
    font-size: 18px;
    font-style: normal;
    line-height: 24px;
    text-transform: uppercase;
    > span > i {
        margin-right: 5px;
    }
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

export const InfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span:nth-child(2) {
        color: ${(props) => props.theme.textColor.primary};
        text-align: right;
        font-family: NunitoBold;
        line-height: 155%;
    }
`;
