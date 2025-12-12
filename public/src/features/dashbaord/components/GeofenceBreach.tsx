import BarChart from '../charts/BarChart';

export default function GeofenceBreach() {
  return (
    <BarChart
      data={[1, 2, 3, 4, 5, 6, 7]}
      categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      text="Geo-fence Breach"
    />
  );
}
