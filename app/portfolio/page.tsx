import Link from "next/link";
import { sitePath } from "@/lib/site-path";

export default function PortfolioPage() {
  return (
    <main className="portfolio-page">
      <header className="portfolio-page-header">
        <Link className="portfolio-back" href="/#about">← Back to site</Link>
        <h1>Portfolio</h1>
        <a className="portfolio-download" href={sitePath("/Avinash-Kotekar-Portfolio.pptx")} download>
          Download PowerPoint ↓
        </a>
      </header>
      <iframe
        className="portfolio-document"
        src={sitePath("/Avinash-Kotekar-Portfolio.pdf#toolbar=0")}
        title="Avinash Kotekar portfolio presentation"
      />
    </main>
  );
}
