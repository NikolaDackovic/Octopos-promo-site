/* Octopos API - funkcionalni prikaz u postojecem sajtu */
(() => {
'use strict';
const DICT=window.OCTOPOS_API_I18N;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let lang=new URLSearchParams(location.search).get('lang') || (()=>{try{return localStorage.getItem('octopos-lang')}catch{return null}})() || 'sr';
if(!DICT[lang])lang='sr';
function translate(){const t=k=>DICT[lang][k]??DICT.sr[k]??k;document.documentElement.lang=lang==='sr'?'sr-Latn':'en';document.title=t('meta.title');$('meta[name="description"]')?.setAttribute('content',t('meta.description'));$$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));$$('.lang button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));$('.lang').dataset.active=lang;$('.lang').setAttribute('aria-label',t('lang.label'));$('#to-top')?.setAttribute('aria-label',t('top'));$$('a[href^="index.html"]').forEach(a=>{const u=new URL(a.getAttribute('href'),location.href);if(lang==='en')u.searchParams.set('lang','en');else u.searchParams.delete('lang');a.setAttribute('href','index.html'+u.search+u.hash)})}
translate();$$('.lang button').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;try{localStorage.setItem('octopos-lang',lang)}catch{}const u=new URL(location.href);if(lang==='en')u.searchParams.set('lang','en');else u.searchParams.delete('lang');history.replaceState(null,'',u);translate()}));
const menu=$('#menu-btn'),nav=$('#nav-links');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav?.addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}});
const header=$('#header'),bar=$('#progress'),up=$('#to-top'),ring=$('.tt-ring circle');if(ring)ring.style.strokeDasharray=String(2*Math.PI*22);const upd=()=>{const h=Math.max(1,document.documentElement.scrollHeight-innerHeight),p=scrollY/h;header?.classList.toggle('scrolled',scrollY>10);if(bar)bar.style.transform=`scaleX(${p})`;if(ring)ring.style.strokeDashoffset=String(2*Math.PI*22*(1-p));up?.classList.toggle('show',scrollY>innerHeight*.6)};addEventListener('scroll',upd,{passive:true});upd();up?.addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.05});$$('.reveal').forEach(el=>io.observe(el))}else $$('.reveal').forEach(el=>el.classList.add('in'));
$('#year').textContent=new Date().getFullYear();requestAnimationFrame(()=>document.documentElement.classList.add('loaded'));
})();
