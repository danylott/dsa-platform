import { getAuthServer } from '@/utils/authServerRequests';
import { TaskData } from '@/app/(app)/tasks/TasksTable';

export async function getTasksData() {
  const res = await getAuthServer('/api/tasks/');

  const tasksData: TaskData[] = await res.json();

  return tasksData;
}

export async function getTaskDetailsData(id: string) {
  const res = await getAuthServer(`/api/tasks/${id}/`);

  const projectData: TaskData = await res.json();

  return projectData;
}
