type HeadingProps = {
  title: string;
  description: string;
};

export default function Heading({ title, description }: HeadingProps) {
  return (
    <div>
      <div className="font-semibold text-4xl">{title}</div>
      <div className="text-slate-600">{description}</div>
    </div>
  );
}
