import { Collapse as MaterialCollapse } from '@material-ui/core';
import { useState } from 'react';
import { CollapseContainer, CollapseIcon, Highlight } from './styled-components';

type CollapseProps = {
    headerTextAlign?: string;
    title: string;
    hideLine?: boolean;
    additionalStyling?: {
        titleFontSize?: string;
        titleFontFamily?: string;
        titleMarginBottom?: string;
        containerMarginButton?: string;
    };
};

const Collapse: React.FC<CollapseProps> = ({ title, hideLine, additionalStyling, children, headerTextAlign }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <CollapseContainer hideLine={hideLine} marginBottom={additionalStyling?.containerMarginButton}>
            <Highlight
                cursor="pointer"
                marginBottom={additionalStyling?.titleMarginBottom ? additionalStyling?.titleMarginBottom : '20px'}
                fontSize={additionalStyling?.titleFontSize}
                fontFamily={additionalStyling?.titleFontFamily}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                textAlign={headerTextAlign}
            >
                {title}
                <CollapseIcon className={`icon ${isOpen ? 'icon--caret-up' : 'icon--caret-down'}`} />
            </Highlight>
            <MaterialCollapse in={isOpen}>{children}</MaterialCollapse>
        </CollapseContainer>
    );
};

export default Collapse;
