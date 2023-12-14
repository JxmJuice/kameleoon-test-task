import classNames from 'classnames';
import cls from './NotFoundComponent.module.scss';
import { Button } from '../Button/Button';
import { memo } from 'react';

interface NotFoundComponentProps {
    className?: string;
    resetSearch: () => void;
}

export const NotFoundComponent = memo(({ className, resetSearch }: NotFoundComponentProps) => {
    return (
        <div className={classNames(cls.NotFoundComponent, {}, [className])}>
            <span>Your search did not match any results.</span>
            <Button onClick={resetSearch}>Reset</Button>
        </div>
    );
});