import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { getAuthServer } from '@/utils/authServerRequests';
import TaskDetailData from '@/app/(app)/interfaces/taskDetailData';
import TaskTemplate from '@/app/(app)/interfaces/taskTemplate';
import TaskSubmissionResult from '@/app/(app)/interfaces/TaskSubmissionResult';

export async function getTaskDetailData(slug: string) {
  const res = await getAuthServer(`/api/tasks/${slug}/`);

  const taskData: TaskDetailData = await res.json();

  return taskData;
}

export async function getTaskTemplates(slug: string) {
  const res = await getAuthServer(`/api/tasks/${slug}/templates/`);

  const taskTemplates: TaskTemplate[] = await res.json();

  return taskTemplates;
}

export async function getTaskSubmissions(slug: string) {
  const res = await getAuthServer(`/api/tasks/${slug}/submissions/`);

  const taskSubmissions: TaskSubmissionResult[] = await res.json();

  return taskSubmissions;
}

export const createFormattedDate = (dateString: string) => {
  if (dateString === '') {
    return '';
  }

  const date = parseISO(dateString);
  const currentDate = new Date();

  if (currentDate.getFullYear() === date.getFullYear()) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return format(date, 'yyyy-MM-dd');
};
