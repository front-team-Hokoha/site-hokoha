import{g as o,S as a}from"./hoisted.vIIAYQEH.js";import"./hoisted.Bjy0Qoxj.js";o.registerPlugin(a);document.addEventListener("astro:page-load",()=>{document.querySelectorAll(".oka-expertise").forEach(r=>{const e=r.getAttribute("data-accroche"),c=document.getElementById("accroches");a.create({trigger:r,start:"top 80%",onEnter:()=>{if(!Array.from(c.children).some(t=>t.textContent===e)){const t=document.createElement("p");t.classList.add("accroche"),t.classList.add("oka-h"),t.classList.add("noto-serif"),e.split("").forEach(n=>{const s=document.createElement("span");s.textContent=n,t.appendChild(s)}),c.appendChild(t),o.fromTo(t.querySelectorAll("span"),{opacity:0,y:20},{opacity:1,y:0,stagger:.05,duration:.25})}}})})});o.registerPlugin(a);document.addEventListener("astro:page-load",()=>{document.querySelectorAll(".parallax-image").forEach(e=>{o.to(e,{opacity:1,filter:"blur(0px)",duration:2,ease:"power2.out",scrollTrigger:{trigger:e,start:"top 80%",toggleActions:"play none none none"}}),o.to(e,{y:"30%",scrollTrigger:{trigger:e,start:"top bottom",end:"bottom top",scrub:!0}})})});