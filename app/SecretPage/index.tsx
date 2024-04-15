import { AppLayout } from "@/components";

const SecretApp: React.FC = () =>
  <AppLayout>
    <h2>What to improve?</h2>
      <h3>Short Term </h3>
      <ul className='ulist -large'>
        <li>Receipt/Summary</li>
        <li>Persistent Data</li>
        <li>Affinity and Traits Slider/Graph</li>
        <li>Multiple Rating Instance</li>
        <li>Option to copy other form&apos;s value.</li>
      </ul>
      <h3>Long Term</h3>
      <ul className='ulist -large'>
        <li>Geolocation tracking with mobile/watch devices. See Strava, Garmin Connect and other sports apps.</li>
      </ul>
  </AppLayout>

export default SecretApp;

