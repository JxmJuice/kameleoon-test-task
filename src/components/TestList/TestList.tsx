import classNames from 'classnames';
import cls from './TestList.module.scss';
import { Sort, Test, TestWithSite } from '../../types/types';
import { TestItem } from '../TestItem/TestItem';
import { MouseEvent, useMemo } from 'react';
import { sortTests } from '../../helpers';
import { NotFoundComponent } from '../NotFoundComponent/NotFoundComponent';

interface TestListProps {
  className?: string;
  tests: TestWithSite[];
  sort: Sort;
  setSort: (sort: Sort) => void;
  resetSearch: () => void;
}

export const TestList = ({ className, tests, sort, setSort, resetSearch }: TestListProps) => {
  const selectSort = (event: MouseEvent<HTMLSpanElement>) => {
    setSort({
      name: (event.target as HTMLSpanElement).dataset.sort as keyof Test,
      order: sort.order === 'ASC' ? 'DESC' : 'ASC'
    });
  }

  const sortedTests = useMemo(() => sortTests(tests, sort), [tests, sort]);

  if (tests.length === 0) return <NotFoundComponent resetSearch={resetSearch} />

  return (
    <table className={classNames(cls.TestList, {}, [className])}>
      <tr className={cls.header}>
        <td className={classNames(cls.name, { [cls.selected]: sort.name === "name", [cls.desc]: sort.name === "name" && sort.order === "DESC" })}>
          <span data-sort="name" onClick={selectSort}>name</span>
        </td>
        <td className={classNames(cls.type, { [cls.selected]: sort.name === "type", [cls.desc]: sort.name === "type" && sort.order === "DESC" })} data-sort="type">
          <span data-sort="type" onClick={selectSort}>type</span>
        </td>
        <td className={classNames(cls.status, { [cls.selected]: sort.name === "status", [cls.desc]: sort.name === "status" && sort.order === "DESC" })} >
          <span data-sort="status" onClick={selectSort}>status</span>
        </td>
        <td className={classNames(cls.site, { [cls.selected]: sort.name === "site", [cls.desc]: sort.name === "site" && sort.order === "DESC" })}>
          <span data-sort="site" onClick={selectSort}>site</span>
        </td>
      </tr>
      {
        sortedTests.map(test => {
          const { name, status, type, site, id } = test;
          return <TestItem id={id} name={name} type={type} site={site} status={status} key={name} />
        })
      }
    </table >
  );
};