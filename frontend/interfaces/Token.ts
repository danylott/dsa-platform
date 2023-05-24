export default interface Token {
  email?: string | null | undefined;
  user_id: number;
  access: string;
  refresh: string;
  exp: number;
}
