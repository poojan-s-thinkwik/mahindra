interface HeadingProps {
  data: Array<{
    key: string;
    value: string | number;
  }>;
}

const ReportHeading: React.FC<HeadingProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap">
      {data.map((item) => (
        <div key={item.key} className="flex flex-col m-2 items-center">
          <p className="text-md font-semibold">{item.key}</p>
          <p className="text-md">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportHeading;
