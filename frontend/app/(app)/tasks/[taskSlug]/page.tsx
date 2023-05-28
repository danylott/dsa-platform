import React from 'react';
import {
  getTaskDetailData,
} from '@/app/(app)/tasks/[taskSlug]/utils';
import TaskDetail from '@/app/(app)/tasks/[taskSlug]/TaskDetail';

interface Params {
  params: {
    taskSlug: string;
  };
}

export default async function TaskDetailPage({ params }: Params) {
  const { taskSlug } = params;

  const taskDetailData = await getTaskDetailData(taskSlug);

  return (
    <TaskDetail
      taskDetailData={taskDetailData}
    />
  );
}
