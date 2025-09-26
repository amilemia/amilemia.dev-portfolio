export type MetricProps = {
  label: string;
  value: string;
};

export function Metric({ label, value }: MetricProps) {
  return (
    <dl className="rounded-2xl border bg-background/80 p-6 shadow-inner backdrop-blur-sm">
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </dd>
    </dl>
  );
}
