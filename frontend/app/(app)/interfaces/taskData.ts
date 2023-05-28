import Topic from '@/app/(app)/interfaces/topic';

export default interface TaskData {
  slug: string;
  name: string;
  difficulty: string;
  topics: Topic[];
  status: string;
  acceptance_rate: string;
}
