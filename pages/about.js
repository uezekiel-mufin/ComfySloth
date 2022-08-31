import React from "react";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import Image from "next/image";

const About = () => {
  return (
    <Layout title='about'>
      <HeroSection title='About' />
      <section className='grid grid-cols-1 md:grid-cols-2 p-2 md:p-20'>
        <article className='w-full h-full p-8 '>
          <Image
            src='/hero-bcg.jpeg'
            alt='about'
            height='100px'
            width='100px'
            layout='responsive'
            className='rounded-lg'
          />
        </article>

        <article className='p-8 '>
          <h2 className='capitalize font-bold'>our story</h2>
          <div className='h-1 mt-2 w-24 bg-[#ab7a5f]' />
          <p className='text-base mt-8 leading-8 text-[#617d98]'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, sunt?
            Veniam necessitatibus, dignissimos numquam aspernatur debitis iure
            obcaecati? Veniam nesciunt minus, cum libero laudantium rerum
            doloribus quisquam sed omnis eos cumque exercitationem, dolorem
            sequi nemo delectus unde sapiente illum debitis iure vitae. Ipsa
            saepe assumenda quo voluptatem voluptates facilis tenetur
            reprehenderit aut, sapiente fugit iste vero neque quasi. Eaque,
            neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            facere dolores consequuntur id ea suscipit excepturi minima
            inventore illum officiis, numquam, est ducimus doloribus tempore
            quasi, maxime dolorum rerum ad.
          </p>
        </article>
      </section>
    </Layout>
  );
};

export default About;
