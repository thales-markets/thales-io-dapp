import { Suspense, useMemo } from 'react';
import Loader from 'components/Loader';
import { BottomRight, Container, Left, Line, MiddleRight, NavContainer, UpperRight } from './styled-components';
import NavLinks from 'components/NavLinks';
import { useTranslation } from 'react-i18next';
import { NavItem } from 'components/NavLinks/NavLinks';

const Staking: React.FC = () => {
    const { t } = useTranslation();

    const navItems: NavItem[] = useMemo(() => {
        return [
            {
                href: '',
                title: t('staking.nav.rewards'),
                active: true,
            },
            {
                href: '',
                title: t('staking.nav.staking'),
            },
            {
                href: '',
                title: t('staking.nav.vesting'),
            },
            {
                href: '',
                title: t('staking.nav.leaderboard'),
            },
            {
                href: '',
                title: t('staking.nav.acc-preferences'),
            },
        ];
    }, [t]);

    return (
        <Suspense fallback={<Loader />}>
            <Line />
            <NavContainer>
                <NavLinks items={navItems} />
            </NavContainer>

            <Container>
                <Left></Left>
                <UpperRight></UpperRight>
                <MiddleRight></MiddleRight>
                <BottomRight></BottomRight>
            </Container>
        </Suspense>
    );
};

export default Staking;
