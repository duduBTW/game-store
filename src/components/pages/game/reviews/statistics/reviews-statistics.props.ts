export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number;
  total: number;
  title: string;
  chart: React.ReactNode;
}
