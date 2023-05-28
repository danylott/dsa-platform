import { getAuthServer } from '@/utils/authServerRequests';
import TaskDetailData from '@/app/(app)/interfaces/taskDetailData';

export async function getTaskDetailData(slug: string) {
  const res = await getAuthServer(`/api/tasks/${slug}/`);

  const taskData: TaskDetailData = await res.json();

  return taskData;
}
