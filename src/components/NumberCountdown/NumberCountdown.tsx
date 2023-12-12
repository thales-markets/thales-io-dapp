import { useEffect, useState } from 'react';
import { formatCurrency } from 'thales-utils';

type NumberCountdownProps = {
    number: number;
    incrementCount?: number;
};

const NumberCountdown: React.FC<NumberCountdownProps> = ({ number, incrementCount = 200 }) => {
    const [numberCounter, setNumberCounter] = useState<number>(0);

    useEffect(() => {
        const animate = (counter: number) => {
            const time = number / incrementCount;
            if (counter < number) {
                const newNumberCounter = Math.ceil(counter + time);
                setNumberCounter(newNumberCounter);
                setTimeout(() => {
                    animate(newNumberCounter);
                }, 1);
            } else {
                setNumberCounter(number);
            }
        };
        if (number && incrementCount) {
            animate(0);
        }
    }, [incrementCount, number]);

    return <span>{formatCurrency(numberCounter, 0)}</span>;
};

export default NumberCountdown;
