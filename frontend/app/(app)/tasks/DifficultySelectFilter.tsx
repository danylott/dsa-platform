'use client';

import { Select } from 'antd';

import { useCallback } from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Props {
  currentDifficulty: string;
}

export default function DifficultySelectFilter({ currentDifficulty }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams);

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const changeDifficulty = (difficulty: string) => {
    router.push(`${pathname}?${createQueryString('difficulty', difficulty)}`);
  };

  return (
    <>
      <span className='text-left'>Difficulty: </span>
      <Select
        defaultValue={currentDifficulty}
        style={{ width: 120 }}
        onChange={changeDifficulty}
        options={[
          { value: '', label: 'All' },
          { value: '1', label: 'Easy' },
          { value: '2', label: 'Medium' },
          { value: '3', label: 'Hard' },
        ]}
      />
    </>
  );
}
