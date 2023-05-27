import { getAuthServer } from '@/utils/authServerRequests';
import { TaskData } from '@/app/(app)/tasks/TasksTable';

export async function getTasksData({ difficulty }: { difficulty?: string }) {
  const res = await getAuthServer(`/api/tasks/?difficulty=${difficulty}`);

  const tasksData: TaskData[] = await res.json();

  return tasksData;
}

export async function getTaskDetailsData(id: string) {
  const res = await getAuthServer(`/api/tasks/${id}/`);

  const taskData: TaskData = await res.json();

  return taskData;
}
