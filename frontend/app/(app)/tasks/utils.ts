import { getAuthServer } from '@/utils/authServerRequests';
import TaskData from '@/app/(app)/interfaces/taskData';

export async function getTasksData({ difficulty }: { difficulty?: string }) {
  const res = await getAuthServer(`/api/tasks/?difficulty=${difficulty}`);

  const tasksData: TaskData[] = await res.json();

  return tasksData;
}
