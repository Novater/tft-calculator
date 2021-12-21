import ProbabilityChart from "../components/ProbabilityChart";

export default function Home() {
  return (
    <div className="homepage-container flex">
      <section className="banner-container font-sans font-semibold" />
      <section className="calculator-container">
        <div className="input-container">INPUT</div>
        <div className="graph-container"><ProbabilityChart /></div>
      </section>
      <section className="footer-container">FOOTER</section>
    </div>
  );
}
