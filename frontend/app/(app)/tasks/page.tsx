import { getTasksData } from '@/app/(app)/tasks/utils';
import TasksTable from '@/app/(app)/tasks/TasksTable';

export default async function TasksPage() {
  const tasksData = await getTasksData();

  return (
    <TasksTable tasksData={tasksData} />
  );
}
