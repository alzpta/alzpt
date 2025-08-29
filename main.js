    // Año
    document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target) } })
  }, { threshold: .12 });
  reveals.forEach(el=> io.observe(el));
}else{
  reveals.forEach(el=> el.classList.add('in'));
}

// Back-to-top
const bt = document.getElementById('backtop');
let scrollTicking = false;
const handleScroll = ()=>{
  if(window.scrollY > 420){ bt.classList.add('show') } else { bt.classList.remove('show') }
  scrollTicking = false;
};
document.addEventListener('scroll', ()=>{
  if(!scrollTicking){
    scrollTicking = true;
    requestAnimationFrame(handleScroll);
  }
}, { passive: true });

    // Nav active state
    const navLinks = [...document.querySelectorAll('[data-nav]')];
    const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const secIO = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const id = '#' + e.target.id;
          navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href')===id));
        }
      })
    }, { rootMargin: '0px 0px -70% 0px', threshold: .1 }) : null;
    sections.forEach(s=> secIO?.observe(s));

    // Form validation and submission
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return }
    document.getElementById('form-status').textContent = '';
    const data = Object.fromEntries(new FormData(form).entries());
      try{
        const res = await fetch('https://example.com/api/contact',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        if(!res.ok) throw new Error('Network response was not ok');
        document.getElementById('form-status').textContent = '¡Gracias! Te responderé pronto.';
        form.reset();
      }catch(err){
        console.error('Error al enviar contacto', err);
        document.getElementById('form-status').textContent = 'Hubo un problema al enviar el mensaje.';
      }
    });

    // Theme toggle (light/dark/auto)
    const root = document.documentElement; const LS_KEY = 'lg-theme-mode';
    const setMode = (m)=>{
      localStorage.setItem(LS_KEY, m);
      document.getElementById('themeLight').setAttribute('aria-pressed', m==='light');
      document.getElementById('themeDark').setAttribute('aria-pressed', m==='dark');
      document.getElementById('themeAuto').setAttribute('aria-pressed', m==='auto');
      if(m==='light'){ root.removeAttribute('data-theme'); }
      else if(m==='dark'){ root.setAttribute('data-theme','dark'); }
      else{ root.removeAttribute('data-theme'); }
    }
    document.getElementById('themeLight').onclick=()=>setMode('light');
    document.getElementById('themeDark').onclick=()=>setMode('dark');
    document.getElementById('themeAuto').onclick=()=>setMode('auto');
    try{ setMode(localStorage.getItem(LS_KEY) || 'auto') }catch(e){}
