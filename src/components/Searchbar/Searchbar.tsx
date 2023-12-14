import classNames from 'classnames';
import cls from './Searchbar.module.scss';
import { ChangeEvent, memo, useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg';

interface SearchbarProps {
    className?: string;
    onChange: (search: string) => void;
    resultsNumber: number;
}

export const Searchbar = memo(({ className, onChange, resultsNumber }: SearchbarProps) => {
    const [input, setInput] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className={classNames(cls.Searchbar, {}, [className])} data-testid='searchbar'>
            <SearchIcon className={cls.searchIcon} />
            <input
                className={cls.input}
                placeholder='What test are you looking for?'
                type='text'
                value={input}
                onChange={handleChange}
                data-testid='searchbar-input'
            />
            <span className={cls.results}>{`${resultsNumber} ${resultsNumber === 1 ? 'test' : 'tests'}`}</span>
        </div>
    );
});