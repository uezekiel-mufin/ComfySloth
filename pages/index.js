import { useEffect } from 'react';
import { useState } from 'react';
import HomePage from '../components/HomePage';
import Layout from '../components/Layout';

export default function Home() {
  const [ssr, setSsr] = useState(true);

  useEffect(() => {
    setSsr(false);
  }, []);

  if (ssr) return;
  return (
    <div>
      <Layout title='Home'>
        <HomePage />
      </Layout>
    </div>
  );
}
