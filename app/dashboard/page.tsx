"use client";
import { useState } from "react";
import Link from "next/link";

export default function Dashboard(){
  const [prompt,setPrompt]=useState("cinematic motorcycle photoshoot at night, realistic lighting, premium editorial style");
  const [mode,setMode]=useState("photoshoot");
  const [result,setResult]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  async function generate(){setLoading(true);setError("");setResult(null);try{const r=await fetch("/api/generate",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({prompt,mode})});const data=await r.json();if(!r.ok)throw new Error(data.error||"Generation failed");setResult(data.imageUrl)}catch(e){setError(e instanceof Error?e.message:"Generation failed")}finally{setLoading(false)}}
  return <div className="dashboard"><aside className="side"><Link href="/" className="brand">ALTER<span>AI</span></Link><div className="menu"><a className="active">Create</a><a>My images</a><a>Identity profiles</a><a>Billing</a><a>Settings</a></div></aside><main className="main"><div className="toprow"><div><div className="small">CREATOR STUDIO</div><h1 style={{margin:"5px 0"}}>Create something worth posting.</h1></div><div className="credits">50 credits</div></div><div className="studio"><div className="card"><div className="field"><label>Mode</label><select className="select" value={mode} onChange={e=>setMode(e.target.value)}><option value="photoshoot">AI Photoshoot</option><option value="recreate">Recreate reference</option><option value="outfit">Outfit Studio</option><option value="portrait">Portrait</option></select></div><div className="field"><label>Reference image</label><div className="drop">Drop an image here<br/><span className="small">Upload wiring is ready for R2/Supabase Storage</span></div></div><div className="field"><label>What should ALTER create?</label><textarea className="input textarea" value={prompt} onChange={e=>setPrompt(e.target.value)}/></div><button className="btn primary" onClick={generate} disabled={loading} style={{width:"100%"}}>{loading?"Creating…":"Generate · 1 credit"}</button>{error&&<div className="error">{error}</div>}</div><div className="result"><div className="resultbox">{result?<img src={result} alt="AI generation"/>:<span>Your generation will appear here.</span>}</div></div></div></main></div>
}
