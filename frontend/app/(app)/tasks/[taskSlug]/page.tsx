import React from 'react';
import {
  getTaskDetailData, getTaskSubmissions,
  getTaskTemplates,
} from '@/app/(app)/tasks/[taskSlug]/utils';
import TaskDetail from '@/app/(app)/tasks/[taskSlug]/TaskDetail';

interface Params {
  params: {
    taskSlug: string;
  };
}

export default async function TaskDetailPage({ params }: Params) {
  const { taskSlug } = params;

  const [taskDetailData, taskTemplates, taskSubmissions] = await Promise.all([
    getTaskDetailData(taskSlug),
    getTaskTemplates(taskSlug),
    getTaskSubmissions(taskSlug),
  ]);

  return (
    <TaskDetail
      taskDetailData={taskDetailData}
      taskTemplates={taskTemplates}
      taskSubmissions={taskSubmissions}
    />
  );
}
