"use client";
import Head from "next/head";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <Head>
        <title>Welcome to BodyBuildingAI</title>
      </Head>
      <div className="landing-container">
        <div className="landing-content">
          <h1 className="landing-title">Welcome to BodyBuildingAI</h1>
          <p className="landing-description">
            Your personal AI-powered bodybuilding assistant. Get customized workout plans,
            nutrition advice, and track your progress with advanced AI technology.
          </p>
          <button 
            className="get-started-btn"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
