import classNames from 'classnames';
import cls from './Dashboard.module.scss';
import axios from 'axios';
import { useState, useCallback, useEffect, memo } from 'react';
import { Searchbar } from '../../components/Searchbar/Searchbar';
import { TestList } from '../../components/TestList/TestList';
import { generateColor, trimProtocol } from '../../helpers';
import { TestWithSite, Sort, Test, Site } from '../../types/types';

interface DashboardProps {
    className?: string;
}

export const Dashboard = memo(({ className }: DashboardProps) => {
    const [tests, setTests] = useState<TestWithSite[]>([]);
    const [sort, setSort] = useState<Sort>({ name: 'name', order: 'ASC' });
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(tests);

    const onSearch = useCallback((search: string) => {
        setSearch(search);
    }, []);

    useEffect(() => {
        async function fetchTests() {
            try {
                const [testResponse, sitesResponse] = await Promise.all([
                    axios.get<Test[]>('http://localhost:3100/tests'),
                    axios.get<Site[]>('http://localhost:3100/sites')
                ]);

                const sites = sitesResponse.data.map(site => {
                    site.color = generateColor();
                    return site;
                });

                const testsArr = (testResponse.data as TestWithSite[]).map((test) => {
                    sites.forEach(site => {
                        if (test.siteId === site.id) {
                            site.url = trimProtocol(site.url);
                            test.site = site;
                        }
                    });
                    return test;
                });
                setTests(testsArr);
            } catch (error) {
                console.log(error)
            }
        }
        fetchTests();
    }, [setTests]);

    useEffect(() => {
        const searchedTests = tests.filter((test) => test.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        setSearchResults(searchedTests);
    }, [search, tests]);

    const resetSearch = useCallback(() => {
        setSearchResults(tests);
        setSearch('');
    }, [tests]);

    return (
        <div className={classNames(cls.Dashboard, {}, [className])}>
            <h1>Dashboard</h1>
            <Searchbar onChange={onSearch} resultsNumber={searchResults.length} />
            <TestList resetSearch={resetSearch} tests={searchResults} sort={sort} setSort={setSort} />
        </div>
    );
});