import Link from "next/link";

const features = [
  ["Create Me", "Build a consistent visual identity from your own reference photos."],
  ["Recreate", "Use a reference image for composition and turn it into your own creator shot."],
  ["Outfit Studio", "Change clothing and styling without rebuilding the whole image."],
  ["Creator Presets", "Streetwear, gym, travel, studio, automotive and social-ready looks."],
  ["Private by default", "Uploads are treated as private working assets and can be deleted."],
  ["Safe identity rules", "No non-consensual sexual deepfakes or real-person nudification."],
];

export default function Home() {
  return <>
    <div className="shell">
      <nav className="nav"><div className="brand">ALTER<span>AI</span></div><div className="navlinks"><a href="#features">Features</a><a href="#pricing">Pricing</a><Link href="/dashboard">Studio</Link></div><Link className="btn primary" href="/dashboard">Try ALTER</Link></nav>
      <section className="hero">
        <div><span className="eyebrow">AI CREATOR STUDIO</span><h1>Your face. Any scene.</h1><p>Create creator-ready photos, outfit edits and reference-based visuals while keeping your identity consistent.</p><div className="actions"><Link className="btn primary" href="/dashboard">Start creating</Link><a className="btn" href="#features">See features</a></div></div>
        <div className="mock"><div className="mockimg"/><div className="chips"><span className="chip">Identity lock</span><span className="chip">Cinematic</span><span className="chip">4:5</span><span className="chip">HD</span></div></div>
      </section>
      <section id="features" className="section"><h2>Built for people who post.</h2><p className="sectionlead">A focused creator workflow instead of a wall of confusing model settings.</p><div className="grid3">{features.map(([t,d])=><div className="card" key={t}><b>{t}</b><p>{d}</p></div>)}</div></section>
      <section id="pricing" className="section"><h2>Simple pricing.</h2><div className="pricing"><div className="card"><b>Free</b><div className="price">€0</div><p>5 demo generations<br/>Watermarked previews<br/>Basic presets</p></div><div className="card" style={{borderColor:"#7966bb"}}><b>Creator</b><div className="price">€12.99</div><p>100 credits / month<br/>HD output<br/>Identity profile<br/>Outfit + recreate</p><a className="btn primary" style={{display:"inline-block",marginTop:20}} href="/api/checkout?plan=creator">Choose Creator</a></div><div className="card"><b>Pro</b><div className="price">€24.99</div><p>350 credits / month<br/>Priority queue<br/>Commercial creator use<br/>More identity profiles</p><a className="btn" style={{display:"inline-block",marginTop:20}} href="/api/checkout?plan=pro">Choose Pro</a></div></div></section>
      <footer className="footer">ALTER AI · Creator-first image generation.</footer>
    </div>
  </>;
}
