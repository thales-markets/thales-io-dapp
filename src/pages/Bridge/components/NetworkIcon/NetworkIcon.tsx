import React, { FC, memo } from 'react';
import { NETWORK_IDS_MAP } from 'utils/network';

type NetworkIconProps = {
    networkId: number;
    size?: number;
    margin?: string;
};

const NetworkIcon: FC<NetworkIconProps> = memo(({ networkId, size, margin }) => {
    return (
        <>
            {NETWORK_IDS_MAP[networkId] &&
                React.createElement(NETWORK_IDS_MAP[networkId].icon, {
                    height: `${size || 16}px`,
                    width: `${size || 16}px`,
                    style: { margin: margin || '0' },
                })}
        </>
    );
});

export default NetworkIcon;
