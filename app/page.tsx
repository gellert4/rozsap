import Link from "next/link";

const useCases = [
  ["Creator Photos", "Turn a few references into polished social-ready shoots without booking a studio.", "01"],
  ["Outfit Studio", "Test new looks, colors and styling while keeping the person visually consistent.", "02"],
  ["Recreate", "Use a reference for composition, mood and framing, then rebuild it around your identity.", "03"],
  ["Brand Content", "Create clean campaign concepts, thumbnails and creator assets in multiple formats.", "04"],
];

const steps = [
  ["Upload", "Add a reference or start from a saved identity profile."],
  ["Direct", "Pick a mode, preset and describe the scene you want."],
  ["Generate", "Get polished outputs sized for social, profile or campaign use."],
];

const faqs = [
  ["Do I need to know how to prompt?", "No. ALTER is built around guided modes and presets, so you can get useful results without learning model syntax."],
  ["Can I use my own photos?", "Yes. The product is designed around user-owned or consented reference images and synthetic subjects."],
  ["What happens to my uploads?", "The production architecture is designed for private storage and user-controlled deletion. Configure your storage retention policy before launch."],
  ["Can I use results commercially?", "Commercial usage depends on the final model/provider license you connect. The Pro plan is structured for creator and commercial workflows."],
];

export default function Home() {
  return <main>
    <div className="glow glowOne"/><div className="glow glowTwo"/>
    <div className="shell">
      <nav className="nav">
        <Link href="/" className="brand">ALTER<span>AI</span></Link>
        <div className="navlinks"><a href="#product">Product</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div>
        <div className="navActions"><Link className="textLink" href="/dashboard">Open studio</Link><Link className="btn primary" href="/dashboard">Start free</Link></div>
      </nav>

      <section className="hero premiumHero">
        <div className="heroCopy">
          <span className="eyebrow"><i/>AI CREATOR STUDIO</span>
          <h1>Create the shot<br/><span>before the shoot.</span></h1>
          <p>Premium AI photos, outfit edits and reference recreations built around one thing that matters: keeping your visual identity consistent.</p>
          <div className="actions"><Link className="btn primary btnLarge" href="/dashboard">Create your first image</Link><a className="btn btnLarge ghost" href="#product">See how it works</a></div>
          <div className="heroMeta"><span>5 free credits</span><span>Guided presets</span><span>HD-ready workflow</span></div>
        </div>

        <div className="productFrame">
          <div className="windowBar"><div className="dots"><i/><i/><i/></div><span>ALTER Studio</span><b>50 credits</b></div>
          <div className="previewGrid">
            <div className="previewSide">
              <small>MODE</small><div className="miniSelect">AI Photoshoot <span>⌄</span></div>
              <small>PRESET</small><div className="presetRow"><span className="active">Editorial</span><span>Night</span><span>Travel</span></div>
              <small>DIRECTION</small><div className="fakePrompt">Cinematic rooftop portrait at blue hour, premium editorial lighting, realistic details...</div>
              <div className="generateFake">Generate <span>1 credit</span></div>
            </div>
            <div className="visualStage"><div className="personSilhouette"><div className="head"/><div className="body"/></div><div className="stageBadge">IDENTITY LOCKED</div><div className="stageCaption"><b>Editorial Blue Hour</b><span>4:5 · HD</span></div></div>
          </div>
        </div>
      </section>

      <section className="proofStrip"><span>Built for</span><b>CREATORS</b><b>FREELANCERS</b><b>PERSONAL BRANDS</b><b>SMALL TEAMS</b></section>

      <section id="product" className="section productSection">
        <div className="sectionHead"><div><span className="kicker">ONE STUDIO, MULTIPLE USE CASES</span><h2>Make content faster without making it look generic.</h2></div><p>Instead of exposing dozens of model controls, ALTER turns common creator workflows into simple tools people can understand in seconds.</p></div>
        <div className="useGrid">{useCases.map(([t,d,n])=><article className="useCard" key={t}><div className="useNumber">{n}</div><div className="useVisual"><span>{t}</span></div><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className="section workflowSection">
        <div className="workflowPanel"><div className="workflowIntro"><span className="kicker">SIMPLE BY DESIGN</span><h2>From reference to post in three steps.</h2><p>No node graphs. No sampler jargon. No model hunting.</p></div><div className="steps">{steps.map(([t,d],i)=><div className="step" key={t}><span>0{i+1}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div></div>
      </section>

      <section id="pricing" className="section pricingSection">
        <div className="sectionHead centered"><div><span className="kicker">PRICING THAT SCALES WITH USE</span><h2>Start free. Upgrade when ALTER becomes part of your workflow.</h2></div></div>
        <div className="pricing premiumPricing">
          <div className="priceCard"><div><span className="plan">FREE</span><div className="price">€0</div><p>Try the workflow before committing.</p></div><ul><li>5 starter credits</li><li>Basic presets</li><li>Watermarked previews</li></ul><Link className="btn full" href="/dashboard">Start free</Link></div>
          <div className="priceCard featured"><div className="popular">MOST POPULAR</div><div><span className="plan">CREATOR</span><div className="price">€12.99 <small>/ month</small></div><p>For people posting consistently.</p></div><ul><li>100 monthly credits</li><li>HD exports</li><li>Identity profiles</li><li>Outfit + recreate modes</li><li>No watermark</li></ul><a className="btn primary full" href="/api/checkout?plan=creator">Choose Creator</a></div>
          <div className="priceCard"><div><span className="plan">PRO</span><div className="price">€24.99 <small>/ month</small></div><p>For heavier creator and client work.</p></div><ul><li>350 monthly credits</li><li>Priority generation queue</li><li>Multiple identity profiles</li><li>Commercial workflow tier</li><li>Early access features</li></ul><a className="btn full" href="/api/checkout?plan=pro">Choose Pro</a></div>
        </div>
        <div className="pricingNote">Annual billing can later be added at a discount to improve retention and upfront cash flow.</div>
      </section>

      <section id="faq" className="section faqSection"><div className="faqTitle"><span className="kicker">FAQ</span><h2>Before you create.</h2></div><div className="faqList">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

      <section className="finalCta"><span className="eyebrow"><i/>ALTER YOUR CONTENT</span><h2>Stop scrolling for the perfect reference.<br/>Turn it into your own.</h2><p>Start with five free credits and build from there.</p><Link className="btn primary btnLarge" href="/dashboard">Open ALTER Studio</Link></section>

      <footer className="footer premiumFooter"><div className="brand">ALTER<span>AI</span></div><p>Creator-first AI image generation.</p><div><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><Link href="/dashboard">Studio</Link></div></footer>
    </div>
  </main>;
}
