import Banner from 'components/Banner';
import WavesBackground from 'components/WavesBackground';
import Footer from 'pages/LandingPage/Footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getIsMobile } from 'redux/modules/ui';
import { Background } from 'styles/common';
import { isAndroid, isMetamask } from 'thales-utils';
import DappHeader from './DappHeader';
import { ChildWrapper, Wrapper } from './styled-components';

const DappLayout: React.FC = ({ children }) => {
    const isMobile = useSelector(getIsMobile);
    const [, setPreventDiscordWidgetLoad] = useState(true);

    useEffect(() => {
        const checkMetamaskBrowser = async () => {
            const isMetamaskBrowser = isMobile && (await isMetamask());
            // Do not load Discord Widget Bot on Android MM browser due to issue with MM wallet connect
            // issue raised on https://github.com/rainbow-me/rainbowkit/issues/1181
            setPreventDiscordWidgetLoad(isMetamaskBrowser && isAndroid());
        };
        checkMetamaskBrowser();
    }, [isMobile]);

    // useWidgetBotScript(preventDiscordWidgetLoad, theme);

    return (
        <>
            <Background id="radial-background" />
            {!isMobile && <WavesBackground />}
            <Banner />
            <Wrapper>
                <DappHeader />
                <ChildWrapper>{children}</ChildWrapper>
                <Footer />
            </Wrapper>
            <ToastContainer theme={'colored'} />
        </>
    );
};

export default DappLayout;
