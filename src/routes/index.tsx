import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CircleUserRound,
  Clock3,
  Heart,
  Leaf,
  Mail,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Quote,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/condirico-hero.jpg";
import productsImage from "@/assets/condirico-products.jpg";
import promoImage from "@/assets/condirico-promo.jpg";
import categoriesImage from "@/assets/condirico-categories.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CondiRico | Tu supermercado, más cerca" },
      { name: "description", content: "Compra alimentos, productos del hogar y esenciales con entrega rápida en CondiRico." },
      { property: "og:title", content: "CondiRico | Todo lo que necesitas" },
      { property: "og:description", content: "Tu supermercado de confianza, ahora más cerca de ti." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

const categories = [
  { name: "Alimentos Sellados", pos: "bg-[position:0%_50%]" },
  { name: "Productos de Primera Necesidad", pos: "bg-[position:33.33%_50%]" },
  { name: "Limpieza del Hogar", pos: "bg-[position:66.66%_50%]" },
  { name: "Útiles del Hogar", pos: "bg-[position:100%_50%]" },
];

const products = [
  { id: 1, name: "Arroz Premium", detail: "Bolsa 1 kg", price: 2.85, old: 3.20, pos: "bg-[position:0%_0%]", badge: "-11%" },
  { id: 2, name: "Aceite de Oliva", detail: "Botella 750 ml", price: 8.45, pos: "bg-[position:50%_0%]" },
  { id: 3, name: "Pasta Corta", detail: "Paquete 500 g", price: 1.95, old: 2.30, pos: "bg-[position:100%_0%]", badge: "Oferta" },
  { id: 4, name: "Leche Entera", detail: "Envase 1 L", price: 1.40, pos: "bg-[position:0%_100%]" },
  { id: 5, name: "Detergente Líquido", detail: "Botella 2 L", price: 6.90, old: 7.80, pos: "bg-[position:50%_100%]", badge: "-12%" },
  { id: 6, name: "Papel Higiénico", detail: "Paquete 6 rollos", price: 4.25, pos: "bg-[position:100%_100%]" },
];

const benefits = [
  { icon: Truck, title: "Envíos rápidos", text: "Recibe hoy mismo" },
  { icon: ShieldCheck, title: "Compra segura", text: "Tus datos protegidos" },
  { icon: PackageCheck, title: "Calidad garantizada", text: "Productos seleccionados" },
  { icon: Clock3, title: "Siempre contigo", text: "Atención todos los días" },
  { icon: Leaf, title: "Selección fresca", text: "Lo mejor para tu hogar" },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`flex shrink-0 items-center gap-2 font-extrabold text-xl sm:text-2xl ${light ? "text-primary-foreground" : "text-brand-deep"}`} aria-label="CondiRico, inicio">
      <span className={`grid size-9 place-items-center rounded-full ${light ? "bg-primary-foreground text-brand-deep" : "bg-primary text-primary-foreground"}`}><Leaf className="size-5 -rotate-12" /></span>
      <span>Condi<span className={light ? "text-sun" : "text-offer"}>Rico</span></span>
    </a>
  );
}

function Storefront() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const productRail = useRef<HTMLDivElement>(null);
  const testimonialRail = useRef<HTMLDivElement>(null);

  const cartCount = Object.values(cart).reduce((sum, amount) => sum + amount, 0);
  const cartTotal = products.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);
  const visibleProducts = useMemo(() => products.filter((product) => `${product.name} ${product.detail}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: number) => ref.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  const toggleFavorite = (id: number) => setFavorites((current) => {
    const next = new Set(current);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const changeCart = (id: number, amount: number) => setCart((current) => {
    const next = Math.max(0, (current[id] ?? 0) + amount);
    const updated = { ...current, [id]: next };
    if (!next) delete updated[id];
    return updated;
  });

  return (
    <main id="inicio" className="overflow-hidden">
      <div className="bg-brand-deep px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm">
        Envío gratis en compras mayores a $35 <span className="mx-2 text-sun">•</span> Entregas de lunes a domingo
      </div>

      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Brand />
          <nav className="mx-auto hidden items-center gap-6 text-[13px] font-semibold lg:flex">
            <a href="#inicio" className="text-primary">Inicio</a>
            <a href="#categorias" className="transition-colors hover:text-primary">Categorías</a>
            <a href="#destacados" className="transition-colors hover:text-primary">Productos</a>
            <a href="#ofertas" className="flex items-center gap-1 transition-colors hover:text-primary">Ofertas <ChevronDown className="size-3" /></a>
          </nav>
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <label className="relative hidden xl:block">
              <span className="sr-only">Buscar productos</span>
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") document.querySelector("#destacados")?.scrollIntoView({ behavior: "smooth" }); }} placeholder="¿Qué estás buscando?" className="h-9 w-56 rounded-full border bg-muted/50 pl-9 pr-3 text-xs outline-none transition-all focus:w-64 focus:bg-background focus:ring-2 focus:ring-ring" />
            </label>
            <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" aria-label="Mi cuenta"><CircleUserRound /></Button>
            <Button variant="ghost" size="icon" className="relative rounded-full" onClick={() => setCartOpen(true)} aria-label={`Carrito con ${cartCount} productos`}>
              <ShoppingCart />
              {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-offer text-[9px] font-bold text-offer-foreground animate-cart-pop">{cartCount}</span>}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && <nav className="border-t bg-background px-4 py-4 lg:hidden animate-in slide-in-from-top-2"><div className="mx-auto grid max-w-7xl gap-1">{["Inicio", "Categorías", "Productos", "Ofertas"].map((item) => <a key={item} href={`#${item === "Productos" ? "destacados" : item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-muted">{item}</a>)}</div></nav>}
      </header>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-[1536px] lg:grid-cols-2">
          <div className="flex items-center px-4 py-14 sm:px-10 sm:py-16 lg:min-h-[570px] lg:justify-end lg:px-14 lg:py-20">
            <div className="w-full max-w-xl animate-rise">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary sm:text-xs"><Leaf className="size-3.5" /> Tu supermercado de confianza</span>
              <h1 className="text-4xl font-extrabold leading-[1.07] text-brand-deep sm:text-5xl lg:text-6xl">Todo lo que necesitas<br /><span className="text-offer">en un solo lugar</span></h1>
              <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Productos de calidad, precios que te convienen y la comodidad de recibirlos donde quieras.</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button asChild size="lg" className="h-12 rounded-full bg-offer px-7 font-bold text-offer-foreground shadow-lg transition-all hover:-translate-y-1 hover:bg-offer/90 hover:shadow-xl"><a href="#destacados">Comprar ahora <ArrowRight /></a></Button>
                <span className="flex items-center gap-2 text-sm font-semibold text-primary"><span className="size-2 rounded-full bg-primary" /> Más de 1.500 productos</span>
              </div>
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[570px]">
            <img src={heroImage} width={1536} height={1024} alt="Bolsa de compras con alimentos frescos y productos de despensa" className="absolute inset-0 h-full w-full object-cover object-[68%_center] transition-transform duration-1000 hover:scale-[1.02]" />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-3 divide-x rounded-lg border bg-card px-3 py-5 shadow-xl shadow-primary/10 sm:px-8">
          {[ ["+1.5K", "Productos"], ["24h", "Entrega rápida"], ["4.9", "Valoración"] ].map(([value, label]) => <div key={label} className="text-center"><strong className="block text-xl text-primary sm:text-2xl">{value}</strong><span className="text-[10px] font-semibold text-muted-foreground sm:text-xs">{label}</span></div>)}
        </div>
      </section>

      <section id="categorias" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionTitle eyebrow="Encuentra lo que buscas" title="Compra por categoría" />
        <div className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {categories.map((category) => <a key={category.name} href="#destacados" className="group relative aspect-[4/5] overflow-hidden rounded-lg border bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:aspect-[4/3] lg:aspect-[4/5]">
            <div className={`absolute inset-0 bg-cover transition-transform duration-500 group-hover:scale-105 ${category.pos}`} style={{ backgroundImage: `url(${categoriesImage})`, backgroundSize: "400% 100%" }} />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-deep via-brand-deep/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-primary-foreground sm:p-5"><h3 className="max-w-[85%] text-sm font-bold leading-tight sm:text-lg">{category.name}</h3><ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" /></div>
          </a>)}
        </div>
      </section>

      <section id="destacados" className="bg-muted/70 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <SectionTitle eyebrow="Elegidos para ti" title="Productos destacados" align="left" />
            <div className="flex gap-2"><Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll(productRail, -1)} aria-label="Productos anteriores"><ArrowLeft /></Button><Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll(productRail, 1)} aria-label="Productos siguientes"><ArrowRight /></Button></div>
          </div>
          <div className="relative mt-6 max-w-lg sm:max-w-xl">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar productos..." aria-label="Buscar productos" className="h-11 w-full rounded-full border bg-background pl-11 pr-10 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring" />
            {query && <Button variant="ghost" size="icon" className="absolute right-1 top-1 size-9 rounded-full" onClick={() => setQuery("")} aria-label="Borrar búsqueda"><X /></Button>}
          </div>
          <div ref={productRail} className="mt-8 flex snap-x gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {visibleProducts.map((product) => <article key={product.id} className="group w-[78vw] max-w-[278px] shrink-0 snap-start overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[278px]">
              <div className="relative aspect-square overflow-hidden bg-background">
                <div className={`absolute inset-0 bg-cover transition-transform duration-500 group-hover:scale-105 ${product.pos}`} style={{ backgroundImage: `url(${productsImage})`, backgroundSize: "300% 200%" }} />
                {product.badge && <span className="absolute left-3 top-3 rounded-full bg-offer px-2.5 py-1 text-[10px] font-bold text-offer-foreground">{product.badge}</span>}
                <Button variant="outline" size="icon" className={`absolute right-3 top-3 rounded-full bg-background/90 shadow-sm ${favorites.has(product.id) ? "text-destructive" : "text-muted-foreground"}`} onClick={() => toggleFavorite(product.id)} aria-label={favorites.has(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}><Heart className={favorites.has(product.id) ? "fill-current" : ""} /></Button>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground">{product.detail}</p>
                <h3 className="mt-1 font-bold">{product.name}</h3>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div><strong className="text-lg text-primary">${product.price.toFixed(2)}</strong>{product.old && <span className="ml-2 text-xs text-muted-foreground line-through">${product.old.toFixed(2)}</span>}</div>
                  <Button size="icon" className="rounded-full bg-primary text-primary-foreground" onClick={() => changeCart(product.id, 1)} aria-label={`Agregar ${product.name} al carrito`}><Plus /></Button>
                </div>
              </div>
            </article>)}
            {visibleProducts.length === 0 && <div className="w-full py-14 text-center text-muted-foreground">No encontramos productos con “{query}”.</div>}
          </div>
        </div>
      </section>

      <section id="ofertas" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative min-h-[380px] overflow-hidden rounded-lg bg-brand-deep">
          <img src={promoImage} loading="lazy" width={1536} height={768} alt="Compra semanal con alimentos y productos del hogar" className="absolute inset-0 h-full w-full object-cover object-[64%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/90 to-brand-deep/5" />
          <div className="relative flex min-h-[380px] max-w-xl flex-col justify-center p-7 text-primary-foreground sm:p-12">
            <span className="w-fit rounded-full bg-sun px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-deep">Oferta de la semana</span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">Llena tu carrito.<br /><span className="text-sun">Ahorra en grande.</span></h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-primary-foreground/80 sm:text-base">Hasta 30% de descuento en productos seleccionados. Por tiempo limitado.</p>
            <Button asChild size="lg" className="mt-7 w-fit rounded-full bg-offer px-7 text-offer-foreground hover:bg-offer/90"><a href="#destacados">Ver ofertas <ArrowRight /></a></Button>
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 sm:px-6 md:grid-cols-5 lg:px-8">
          {benefits.map(({ icon: Icon, title, text }, index) => <div key={title} className={`flex flex-col items-center px-3 text-center ${index === 4 ? "col-span-2 md:col-span-1" : ""}`}><span className="grid size-12 place-items-center rounded-full bg-background text-primary shadow-sm"><Icon className="size-5" /></span><h3 className="mt-3 text-sm font-bold">{title}</h3><p className="mt-1 text-xs text-muted-foreground">{text}</p></div>)}
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-7 px-4 text-center sm:px-6 md:flex-row md:text-left">
          <div><p className="text-xs font-bold uppercase tracking-widest text-sun">Ahorra cada semana</p><h2 className="mt-2 text-3xl font-extrabold">Más productos. Mejores precios.</h2><p className="mt-2 text-sm text-primary-foreground/75">Tu compra completa sin salir de casa.</p></div>
          <Button asChild size="lg" className="shrink-0 rounded-full bg-primary-foreground px-7 text-primary hover:bg-primary-foreground/90"><a href="#destacados">Explorar productos <ArrowRight /></a></Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><SectionTitle eyebrow="Clientes felices" title="Lo que dicen de nosotros" align="left" /><div className="flex gap-2"><Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll(testimonialRail, -1)} aria-label="Testimonio anterior"><ArrowLeft /></Button><Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll(testimonialRail, 1)} aria-label="Testimonio siguiente"><ArrowRight /></Button></div></div>
        <div ref={testimonialRail} className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            ["María G.", "La compra llegó rapidísimo y todo estaba perfectamente empacado. Ya es mi supermercado de confianza.", "MG"],
            ["Carlos R.", "Encuentro todo lo de la semana en minutos. Los precios y las ofertas realmente valen la pena.", "CR"],
            ["Ana P.", "La experiencia es muy sencilla y la calidad de los productos siempre supera mis expectativas.", "AP"],
          ].map(([name, quote, initials]) => <article key={name} className="w-[84vw] max-w-[390px] shrink-0 snap-start rounded-lg border bg-card p-6 shadow-sm"><div className="flex justify-between"><Quote className="size-7 text-offer" /><div className="flex text-sun">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div></div><p className="mt-5 text-sm leading-7 text-muted-foreground">“{quote}”</p><div className="mt-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-brand-soft text-xs font-extrabold text-primary">{initials}</span><div><strong className="block text-sm">{name}</strong><span className="text-xs text-muted-foreground">Cliente verificado</span></div></div></article>)}
        </div>
      </section>

      <section className="bg-sun-soft py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-sun text-brand-deep"><Mail /></span>
          <h2 className="mt-5 text-3xl font-extrabold text-brand-deep">Ofertas frescas en tu correo</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Suscríbete y recibe promociones exclusivas, novedades y descuentos especiales.</p>
          {subscribed ? <p className="mt-7 font-bold text-primary animate-in fade-in">¡Listo! Pronto recibirás nuestras mejores ofertas.</p> : <form className="mx-auto mt-7 flex max-w-lg flex-col gap-2 sm:flex-row" onSubmit={(event: FormEvent) => { event.preventDefault(); setSubscribed(true); }}><input required type="email" placeholder="Tu correo electrónico" aria-label="Correo electrónico" className="h-12 min-w-0 flex-1 rounded-full border bg-background px-5 text-sm outline-none focus:ring-2 focus:ring-ring" /><Button type="submit" className="h-12 rounded-full bg-primary px-7 text-primary-foreground">Suscribirme</Button></form>}
        </div>
      </section>

      <footer className="bg-brand-deep text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div><Brand light /><p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/65">Todo lo que tu hogar necesita, con calidad, confianza y precios que te convienen.</p></div>
          <FooterLinks title="CondiRico" links={["Sobre nosotros", "Nuestras tiendas", "Trabaja con nosotros", "Contacto"]} />
          <FooterLinks title="Ayuda" links={["Preguntas frecuentes", "Envíos y entregas", "Cambios y devoluciones", "Términos y condiciones"]} />
          <div><h3 className="font-bold">Contáctanos</h3><p className="mt-4 text-sm leading-7 text-primary-foreground/65">hola@condirico.com<br />+1 800 CONDI RICO<br />Lun–Dom, 8:00–20:00</p></div>
        </div>
        <div className="border-t border-primary-foreground/10 px-4 py-5 text-center text-xs text-primary-foreground/50">© 2026 CondiRico. Todos los derechos reservados.</div>
      </footer>

      {cartOpen && <div className="fixed inset-0 z-50 bg-brand-deep/40" onClick={() => setCartOpen(false)}><aside className="ml-auto flex h-full w-full max-w-md flex-col bg-background p-5 shadow-2xl animate-in slide-in-from-right" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Tu compra</p><h2 className="text-2xl font-extrabold">Carrito</h2></div><Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"><X /></Button></div><div className="mt-6 flex-1 space-y-3 overflow-y-auto">{cartCount === 0 ? <div className="grid h-full place-content-center text-center"><ShoppingCart className="mx-auto size-10 text-muted-foreground" /><p className="mt-3 font-bold">Tu carrito está vacío</p><p className="mt-1 text-sm text-muted-foreground">Agrega productos para comenzar.</p></div> : products.filter((product) => cart[product.id]).map((product) => <div key={product.id} className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border p-3"><div className={`size-16 rounded-md bg-cover ${product.pos}`} style={{ backgroundImage: `url(${productsImage})`, backgroundSize: "300% 200%" }} /><div className="min-w-0"><h3 className="truncate text-sm font-bold">{product.name}</h3><p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p></div><div className="flex items-center gap-1"><Button variant="outline" size="icon" className="size-7 rounded-full" onClick={() => changeCart(product.id, -1)} aria-label="Quitar uno"><Minus /></Button><span className="w-5 text-center text-sm font-bold">{cart[product.id]}</span><Button variant="outline" size="icon" className="size-7 rounded-full" onClick={() => changeCart(product.id, 1)} aria-label="Agregar uno"><Plus /></Button></div></div>)}</div>{cartCount > 0 && <div className="border-t pt-5"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Total estimado</span><strong className="text-2xl text-primary">${cartTotal.toFixed(2)}</strong></div><Button className="mt-4 h-12 w-full rounded-full bg-offer text-offer-foreground hover:bg-offer/90" onClick={() => setCartOpen(false)}>Continuar comprando</Button><p className="mt-3 text-center text-xs text-muted-foreground">Prototipo sin pagos habilitados</p></div>}</aside></div>}
    </main>
  );
}

function SectionTitle({ eyebrow, title, align = "center" }: { eyebrow: string; title: string; align?: "center" | "left" }) {
  return <div className={align === "center" ? "text-center" : "min-w-0"}><p className="text-xs font-extrabold uppercase tracking-widest text-offer">{eyebrow}</p><h2 className="mt-2 text-2xl font-extrabold text-brand-deep sm:text-4xl">{title}</h2></div>;
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return <div><h3 className="font-bold">{title}</h3><ul className="mt-4 space-y-3">{links.map((link) => <li key={link}><a href="#inicio" className="text-sm text-primary-foreground/65 transition-colors hover:text-sun">{link}</a></li>)}</ul></div>;
}