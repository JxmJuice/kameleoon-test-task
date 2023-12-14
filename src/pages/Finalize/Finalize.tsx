import classNames from 'classnames';
import cls from './Finalize.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Test } from '../../types/types';
import { Link, LinkType } from '../../components/Link/Link';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';

interface FinalizeProps {
    className?: string;
}

export const Finalize = ({ className }: FinalizeProps) => {
    const [data, setData] = useState<Test>();
    const { testId } = useParams();
    useEffect(() => {
        async function fetchTests() {
            try {
                const response = await axios.get(`http://localhost:3100/tests/${testId}`)
                setData(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchTests();
    }, [testId]);

    return (
        <div className={classNames(cls.Finalize, {}, [className])}>
            <h1>Finalize</h1>
            <span className={cls.name}>{data?.name}</span>
            <Link className={cls.Link} href='/' type={LinkType.CLEAR}>
                <ArrowIcon className={cls.arrow} />
                <span>Back</span>
            </Link>
        </div>
    );
};