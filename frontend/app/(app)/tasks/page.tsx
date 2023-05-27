import { getTasksData } from '@/app/(app)/tasks/utils';
import TasksTable from '@/app/(app)/tasks/TasksTable';
import DifficultySelectFilter from '@/app/(app)/tasks/DifficultySelectFilter';

interface Props {
  searchParams: {
    difficulty?: string;
  };
}

export default async function TasksPage({ searchParams }: Props) {
  const tasksData = await getTasksData({ difficulty: searchParams.difficulty || '' });

  return (
    <>
      <span className="float-right m-2"><DifficultySelectFilter currentDifficulty={searchParams.difficulty || ''} /></span>
      <h2 className='text-left'>Tasks</h2>
      <TasksTable tasksData={tasksData} />
    </>
  );
}
