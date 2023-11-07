import { useEffect } from 'react';
import { startAnimation } from './waves';
import { getGPUTier } from 'detect-gpu';

const WavesBackground: React.FC = ({ children }) => {
    useEffect(() => {
        getGPUTier()
            .then((gpuTier) => {
                if (gpuTier.tier > 1) {
                    startAnimation();
                }
            })
            .catch(console.error);
    }, []);

    return <div id="waves-background">{children}</div>;
};

export default WavesBackground;
