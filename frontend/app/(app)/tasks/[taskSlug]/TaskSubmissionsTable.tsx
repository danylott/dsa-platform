'use client';

import {
  Tooltip, Table, Tag, Button,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,

} from '@ant-design/icons';
import { createFormattedDate } from '@/app/(app)/tasks/[taskSlug]/utils';
import TaskSubmissionResult from '@/app/(app)/interfaces/TaskSubmissionResult';

const getStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case 'accepted':
      return <CheckCircleOutlined style={{ color: 'green' }} />;
    case 'wrong answer':
    case 'error':
      return <CloseCircleOutlined style={{ color: 'red' }} />;
    default:
      return <></>;
  }
};

interface Props {
  taskSubmissions: TaskSubmissionResult[];
  setIsSubmissionResultModalOpen: (newValue: boolean) => void;
  setSubmissionResult: (newSubmission: TaskSubmissionResult) => void;
}

export default function TaskSubmissionsTable(
  { taskSubmissions, setIsSubmissionResultModalOpen, setSubmissionResult }: Props,
) {
  const columns: ColumnsType<TaskSubmissionResult> = [
    {
      title: 'Submission id',
      dataIndex: 'id',
      key: 'id',
      render: (text, submission) => (
        <Button onClick={() => {
          setIsSubmissionResultModalOpen(true);
          setSubmissionResult(submission);
        }}
        >
          #
          {text}
        </Button>
      ),
    },
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
      title: 'Date & time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => createFormattedDate(created_at),
    },
    {
      title: 'Language',
      dataIndex: 'language_name',
      key: 'language_name',
      render: (language: string) => (
        <Tag color='geekblue'>
          {language}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={taskSubmissions}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </>
  );
}
