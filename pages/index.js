import Head from "next/head";
import HomePage from "../components/HomePage";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Layout title='ezzy'>
        <HomePage />
      </Layout>
    </div>
  );
}
