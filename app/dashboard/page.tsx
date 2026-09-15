"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

const modes = [
  ["photoshoot","Photoshoot"],
  ["recreate","Recreate"],
  ["outfit","Outfit"],
  ["portrait","Portrait"],
] as const;

const presets = [
  "Editorial rooftop",
  "Night city",
  "Luxury hotel",
  "Streetwear",
  "Gym campaign",
  "Automotive",
];

const presetPrompts: Record<string,string> = {
  "Editorial rooftop":"cinematic rooftop portrait at blue hour, premium editorial lighting, realistic skin texture, luxury fashion campaign",
  "Night city":"neon city portrait at night, shallow depth of field, cinematic reflections, premium creator photography",
  "Luxury hotel":"luxury hotel lobby photoshoot, warm ambient lighting, elegant editorial styling, high-end campaign aesthetic",
  "Streetwear":"urban streetwear campaign, concrete architecture, natural confident pose, crisp editorial photography",
  "Gym campaign":"premium fitness campaign, modern gym environment, dramatic side lighting, clean commercial photography",
  "Automotive":"cinematic automotive portrait beside a sports car at dusk, glossy reflections, premium campaign lighting",
};

export default function Dashboard(){
  const [prompt,setPrompt]=useState(presetPrompts["Editorial rooftop"]);
  const [mode,setMode]=useState("photoshoot");
  const [preset,setPreset]=useState("Editorial rooftop");
  const [ratio,setRatio]=useState("4:5");
  const [result,setResult]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const creditCost = useMemo(()=> mode === "recreate" ? 2 : 1,[mode]);

  function choosePreset(name:string){setPreset(name);setPrompt(presetPrompts[name] || prompt)}
  async function generate(){
    setLoading(true);setError("");setResult(null);
    try{
      const r=await fetch("/api/generate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({prompt,mode,ratio,preset})});
      const data=await r.json();
      if(!r.ok)throw new Error(data.error||"Generation failed");
      setResult(data.imageUrl)
    }catch(e){setError(e instanceof Error?e.message:"Generation failed")}finally{setLoading(false)}
  }

  return <div className="dashboard">
    <aside className="side">
      <Link href="/" className="brand">ALTER<span>AI</span></Link>
      <div className="menu"><a className="active">Create</a><a>My images</a><a>Identity profiles</a><a>Templates</a><a>Billing</a><a>Settings</a></div>
      <div style={{position:"absolute",bottom:24,left:24,right:24}}><div className="small">CREATOR PLAN</div><div className="upsell" style={{display:"block"}}><b style={{display:"block",color:"white",marginBottom:5}}>50 credits left</b><span>Top up before your next batch.</span><div style={{marginTop:9}}><a href="/api/checkout?plan=creator">Manage plan →</a></div></div></div>
    </aside>

    <main className="main">
      <div className="toprow"><div><div className="small">CREATOR STUDIO</div><h1 style={{margin:"5px 0",fontSize:34,letterSpacing:"-.04em"}}>Create something worth posting.</h1></div><div className="credits">50 credits</div></div>

      <div className="studio">
        <div className="card">
          <div className="field"><label>Creation mode</label><div className="modeTabs">{modes.map(([value,label])=><button key={value} className={`modeTab ${mode===value?"active":""}`} onClick={()=>setMode(value)}>{label}</button>)}</div></div>
          <div className="field"><label>Reference image</label><div className="drop"><b style={{display:"block",color:"#d4d8e1",marginBottom:6}}>Drop a reference here</b><span className="small">JPG or PNG · user-owned or consented images only</span></div></div>
          <div className="field"><label>Quick presets</label><div className="quickPresets">{presets.map(name=><button key={name} className={`presetBtn ${preset===name?"active":""}`} onClick={()=>choosePreset(name)}>{name}</button>)}</div></div>
          <div className="field"><label>Creative direction</label><textarea className="input textarea" value={prompt} onChange={e=>setPrompt(e.target.value)}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div className="field"><label>Aspect ratio</label><select className="select" value={ratio} onChange={e=>setRatio(e.target.value)}><option>4:5</option><option>1:1</option><option>9:16</option><option>16:9</option></select></div>
            <div className="field"><label>Quality</label><select className="select"><option>HD</option><option>Standard</option></select></div>
          </div>
          <button className="btn primary" onClick={generate} disabled={loading} style={{width:"100%",padding:14}}>{loading?"Creating your shot…":`Generate · ${creditCost} credit${creditCost>1?"s":""}`}</button>
          {error&&<div className="error">{error}</div>}
          <div className="upsell"><span><b style={{color:"white"}}>Batch mode</b><br/>Generate 4 variations at once on Pro.</span><a href="/api/checkout?plan=pro">Unlock →</a></div>
        </div>

        <div className="result"><div className="resultbox">{result?<img src={result} alt="AI generation"/>:<div style={{textAlign:"center",maxWidth:320,padding:30}}><div style={{width:54,height:54,borderRadius:16,border:"1px solid #34394a",margin:"0 auto 16px",display:"grid",placeItems:"center",fontSize:20}}>✦</div><b style={{display:"block",color:"#c8cdd8",marginBottom:8}}>Your next shot appears here</b><span className="small">Pick a preset, describe the scene and generate your first variation.</span></div>}</div></div>
      </div>
    </main>
  </div>
}
