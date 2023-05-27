import AppLayout from './AppLayout';

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout(
  { children }: Props,
) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}
