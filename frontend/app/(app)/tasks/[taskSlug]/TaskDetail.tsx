'use client';

import { Col, Row, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ReactMarkdown from 'react-markdown';

import dynamic from 'next/dynamic';

import { useState } from 'react';
import TaskDetailData from '@/app/(app)/interfaces/taskDetailData';

const CodeEditor = dynamic(
  () => import('@/app/(app)/tasks/[taskSlug]/CodeEditor'),
  { ssr: false },
);

interface Props {
  taskDetailData: TaskDetailData;
}

export default function TaskDetail({ taskDetailData }: Props) {
  function onCodeChange(newValue: string) {
    console.log('change', newValue);
  }

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
              console.log('forbidden');
            }}
            readOnly
          />
        </>
      ),
    },
    {
      key: '3',
      label: `Submissions`,
      children: `Content of Tab Pane 3`,
    },
  ];

  const [code, setCode] = useState(taskDetailData.solution_code); // TODO: save code in local storage for reloads

  return (
    <>
      <Row>
        <Col span={10}>
          <Tabs defaultActiveKey="1" items={tabItems} />
        </Col>
        <Col span={14}>
          hehe
        </Col>
      </Row>
    </>
  );
}
