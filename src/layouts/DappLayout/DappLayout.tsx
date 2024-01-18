import WavesBackground from 'components/WavesBackground';
import useWidgetBotScript from 'hooks/useWidgetBotScript';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { useTheme } from 'styled-components';
import { Background } from 'styles/common';
import { isAndroid, isMetamask } from 'thales-utils';
import DappFooter from './DappFooter';
import DappHeader from './DappHeader';
import { Wrapper } from './styled-components';

const DappLayout: React.FC = ({ children }) => {
    const theme = useTheme();
    const isMobile = useSelector(getIsMobile);
    const [preventDiscordWidgetLoad, setPreventDiscordWidgetLoad] = useState(true);

    useEffect(() => {
        const checkMetamaskBrowser = async () => {
            const isMetamaskBrowser = isMobile && (await isMetamask());
            // Do not load Discord Widget Bot on Android MM browser due to issue with MM wallet connect
            // issue raised on https://github.com/rainbow-me/rainbowkit/issues/1181
            setPreventDiscordWidgetLoad(isMetamaskBrowser && isAndroid());
        };
        checkMetamaskBrowser();
    }, [isMobile]);

    useWidgetBotScript(preventDiscordWidgetLoad, theme);

    return (
        <div>
            {!isMobile && <Background id="radial-background" />}
            {!isMobile && <WavesBackground />}
            <Wrapper>
                <DappHeader />
                {children}
                <DappFooter />
            </Wrapper>
        </div>
    );
};

export default DappLayout;
