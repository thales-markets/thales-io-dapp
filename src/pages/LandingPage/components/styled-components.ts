import styled from 'styled-components';

export const CollapseContainer = styled.div`
    margin-bottom: 20px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor.quaternary};
`;

export const CollapseIcon = styled.i`
    padding-left: 3px;
    font-size: 13px;
`;
