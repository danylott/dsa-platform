import Topic from '@/app/(app)/interfaces/topic';
import TaskData from '@/app/(app)/interfaces/taskData';

export default interface TaskDetailData extends TaskData {
  description: string;
  solution: string;
  solution_code: string;
  my_reaction: string;
  code_language: string;
  num_submissions: number;
  num_accepted_submissions: number;
  num_likes: number;
  num_dislikes: number;
}
