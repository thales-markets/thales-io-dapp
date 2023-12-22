import { Collapse as MaterialCollapse } from '@material-ui/core';
import { useState } from 'react';
import { Highlight } from '../styled-components';
import { CollapseContainer, CollapseIcon } from './styled-components';

type CollapseProps = {
    title: string;
};

const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <CollapseContainer>
            <Highlight
                cursor="pointer"
                marginBottom={20}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {title}
                <CollapseIcon className={`icon ${isOpen ? 'icon--caret-up' : 'icon--caret-down'}`} />
            </Highlight>
            <MaterialCollapse in={isOpen}>{children}</MaterialCollapse>
        </CollapseContainer>
    );
};

export default Collapse;
