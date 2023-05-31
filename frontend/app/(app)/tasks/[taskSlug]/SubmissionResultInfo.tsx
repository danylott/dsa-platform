import ReactMarkdown from 'react-markdown';
import TaskSubmissionResult from '@/app/(app)/interfaces/TaskSubmissionResult';
import CodeEditor from '@/app/(app)/tasks/[taskSlug]/CodeEditor';

interface Props {
  submissionResult?: TaskSubmissionResult;
}

export default function SubmissionResultInfo({ submissionResult }: Props) {
  return (
    <>
      <h1>
        Submission Result #
        {submissionResult?.id}
      </h1>
      <h3>
        Status:
        {' '}
        {submissionResult?.status}
      </h3>
      <p>
        Runtime:
        {' '}
        {submissionResult?.runtime}
        ms
      </p>
      <p>
        Code:
        <br />
        <CodeEditor
          language={submissionResult?.language_name.toLowerCase() || ''}
          code={submissionResult?.code || ''}
          setCode={() => ({})}
          readOnly
        />
      </p>
      <p>
        Result message:
        <ReactMarkdown>
          {`\`\`\`\n${(submissionResult?.result_message || '')}\n\`\`\``}
        </ReactMarkdown>
      </p>
    </>
  );
}
