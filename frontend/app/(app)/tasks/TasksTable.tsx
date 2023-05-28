'use client';

import { Tooltip, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  CheckCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import TaskData from '@/app/(app)/interfaces/taskData';

const getStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case 'solved':
      return <CheckCircleOutlined style={{ color: 'green' }} />;
    case 'attempted':
      return <SyncOutlined style={{ color: 'orange' }} />;
    default:
      return <></>;
  }
};

const getDifficulty = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return <span style={{ color: 'green' }}>{difficulty}</span>;
    case 'medium':
      return <span style={{ color: 'orange' }}>{difficulty}</span>;
    case 'hard':
      return <span style={{ color: 'red' }}>{difficulty}</span>;
    default:
      return <></>;
  }
};

const columns: ColumnsType<TaskData> = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => (
      <Tooltip title={text} placement='right'>
        <span className="text-2xl">
          {getStatus(text)}
        </span>
      </Tooltip>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, task) => <Link href={`/tasks/${task.slug}`}>{task.name}</Link>,
  },
  {
    title: 'Acceptance',
    dataIndex: 'acceptance_rate',
    key: 'acceptance_rate',
  },
  {
    title: 'Difficulty',
    dataIndex: 'difficulty',
    key: 'difficulty',
    render: (text) => getDifficulty(text),
  },
  {
    title: 'Topics',
    dataIndex: 'topics',
    key: 'topics',
    render: (_, task) => (
      task.topics
        .map((topic) => (
          <Tag color='geekblue' key={topic.id}>
            {topic.name}
          </Tag>
        ))
    ),
  },
];

interface Props {
  tasksData: TaskData[];
}

export default function TasksTable({ tasksData }: Props) {
  return (
    <>
      <Table
        columns={columns}
        dataSource={tasksData}
        rowKey={(record) => record.slug}
        pagination={false}
      />
    </>
  );
}
