'use client';

import {
  Button,
  Col, FloatButton, Modal, notification, Row, Select, Tabs,
} from 'antd';
import type { TabsProps } from 'antd';
import ReactMarkdown from 'react-markdown';

import dynamic from 'next/dynamic';

import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TaskDetailData from '@/app/(app)/interfaces/taskDetailData';
import TaskTemplate from '@/app/(app)/interfaces/taskTemplate';
import { post } from '@/utils/requests';
import { errorTemplate } from '@/utils/notifications';
import TaskSubmissionResult from '@/app/(app)/interfaces/TaskSubmissionResult';
import SubmissionResultInfo from '@/app/(app)/tasks/[taskSlug]/SubmissionResultInfo';
import TaskSubmissionsTable from '@/app/(app)/tasks/[taskSlug]/TaskSubmissionsTable';

const CodeEditor = dynamic(
  () => import('@/app/(app)/tasks/[taskSlug]/CodeEditor'),
  { ssr: false },
);

interface Props {
  taskDetailData: TaskDetailData;
  taskTemplates: TaskTemplate[];
  taskSubmissions: TaskSubmissionResult[];
}

export default function TaskDetail(
  { taskDetailData, taskTemplates, taskSubmissions }: Props,
) {
  const [isSubmissionResultModalOpen, setIsSubmissionResultModalOpen]
    = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const [notificationsApi, contextHolder] = notification.useNotification();
  const [submissionResult, setSubmissionResult]
    = useState<TaskSubmissionResult>();

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: `Description`,
      children: <ReactMarkdown className="text-left">{taskDetailData.description}</ReactMarkdown>,
    },
    {
      key: '2',
      label: `Solution`,
      children: (
        <>
          <ReactMarkdown className="text-left">{taskDetailData.solution}</ReactMarkdown>
          <CodeEditor
            language={taskDetailData.code_language.toLowerCase()}
            code={taskDetailData.solution_code}
            setCode={() => {
              console.log('forbidden to change');
            }}
            readOnly
          />
        </>
      ),
    },
    {
      key: '3',
      label: `Submissions`,
      children: (
        <TaskSubmissionsTable
          taskSubmissions={taskSubmissions}
          setIsSubmissionResultModalOpen={setIsSubmissionResultModalOpen}
          setSubmissionResult={setSubmissionResult}
        />
      ),
    },
  ];

  const [code, setCode] = useState(taskTemplates[0].code_template); // TODO: save code in local storage for reloads
  const [selectedTaskTemplate, setSelectedTaskTemplate]
    = useState(taskTemplates[0] || undefined);

  function changeTaskTemplate(newTaskTemplateId: number) {
    // find taskTemplate by id
    const newTaskTemplate = taskTemplates.find(
      (taskTemplate) => taskTemplate.id === newTaskTemplateId,
    );

    setCode(newTaskTemplate?.code_template || '');
    // @ts-ignore
    setSelectedTaskTemplate(newTaskTemplate);
  }

  async function runTests() {
    const response = await post({
      url: `/api/tasks/${taskDetailData.slug}/submissions/`,
      data: { language: selectedTaskTemplate?.language_id, code },
      token: session?.access,
    });

    const data: TaskSubmissionResult = await response.json();

    if (!response.ok) {
      notificationsApi.info(errorTemplate(JSON.stringify(data)));
    }

    router.refresh();

    setSubmissionResult(data);

    setIsSubmissionResultModalOpen(true);
  }

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={10} className="p-2">
          <Tabs defaultActiveKey="1" items={tabItems} />
        </Col>
        <Col span={14} className="text-right p-2">
          <span className="float-left text-xl">Code: </span>
          <span>Language: </span>
          <Select
            defaultValue={selectedTaskTemplate.id}
            style={{ width: 120 }}
            onChange={changeTaskTemplate}
            options={taskTemplates.map((taskTemplate) => ({
              value: taskTemplate.id,
              label: taskTemplate.language,
            }))}
            className="text-center m-2"
          />
          <span className="w-full mt-10">
            <CodeEditor
              language={selectedTaskTemplate?.language.toLowerCase()}
              code={code}
              setCode={setCode}
              readOnly={false}
            />
          </span>
        </Col>
      </Row>
      <FloatButton
        icon={<SendOutlined />}
        onClick={runTests}
        description="Run tests"
        shape="square"
        type="primary"
        style={{ right: '3em', width: '100px' }}
      />
      <Modal
        open={isSubmissionResultModalOpen}
        closable={false}
        onCancel={() => setIsSubmissionResultModalOpen(false)}
        maskClosable
        keyboard
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setIsSubmissionResultModalOpen(false);
            }}
          >
            OK
          </Button>,
        ]}
      >
        <SubmissionResultInfo submissionResult={submissionResult} />
      </Modal>
    </>
  );
}
