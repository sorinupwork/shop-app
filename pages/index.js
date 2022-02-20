import axios from "axios";
import Head from "next/head";
import Add from "../components/Add";
import { useState } from "react";
import AddButton from "../components/AddButton";
import ProductList from "../components/ProductList";
import Slider from "../components/Slider";
import styles from "../styles/Home.module.css";

export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in NY</title>
        <meta name="description" content="Best pizza shop in town." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      {admin && <AddButton setClose={setClose} />}
      <ProductList productList={productList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("https://shop-app-liart.vercel.app/api/products");
  return {
    fallback: "blocking",
    props: {
      productList: res.data,
      admin,
    },
  };
};
