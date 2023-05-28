export default interface TaskSubmissionResult {
  id: number;
  code: string;
  status: string;
  runtime: number;
  result_message: string;
  language_name: string;
  created_at: string;
}
