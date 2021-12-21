import ProbabilityChart from '../components/ProbabilityChart';

export default function Home() {
  return (
    <div className="homepage-container flex">
      <section className="banner-container font-sans font-semibold" />
      <section className="calculator-container">
        <div className="input-container">
          <h2>Champion Tier:</h2>
          <h2>Level:</h2>
          <h2>Gold To Roll:</h2>
        </div>
        <div className="graph-container"><ProbabilityChart /></div>
      </section>
      <section className="footer-container">
        <h1 className="font-sans">Tool by Novater.io</h1>
      </section>
    </div>
  );
}
