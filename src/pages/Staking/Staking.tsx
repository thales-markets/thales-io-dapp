import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import { Trans, useTranslation } from 'react-i18next';
import { MigrationContainer } from './styled-components';

const Staking: React.FC = () => {
    const { t } = useTranslation();

    return (
        <MigrationContainer>
            <p>
                <Trans
                    i18nKey={t('staking.deprecation-notice')}
                    components={{
                        oip: <SPAAnchor href={LINKS.Token.OIP260} />,
                        discord: <a href={LINKS.Discord} target="_blank" rel="noreferrer" />,
                    }}
                />
            </p>
            <p>
                <strong>{t('staking.deprecation-lp-label')}</strong>{' '}
                <a href={LINKS.Token.V1LpPoolsSheet} target="_blank" rel="noreferrer">
                    {t('staking.deprecation-lp-link')}
                </a>
            </p>
            <p>
                <strong>{t('staking.deprecation-staked-label')}</strong>{' '}
                <a href={LINKS.Token.V1ThalesStakedSheet} target="_blank" rel="noreferrer">
                    {t('staking.deprecation-staked-link')}
                </a>
            </p>
        </MigrationContainer>
    );
};

export default Staking;
