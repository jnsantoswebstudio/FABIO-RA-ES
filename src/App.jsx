import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronDown, ChevronRight, ClipboardList,
  Camera as Instagram, Clock3, Copy, Dog, HeartHandshake, Leaf, MapPin, Menu, MessageCircle,
  Minus, PackageCheck, PackageOpen, Phone, Plus, Search, Send, Share2, ShieldCheck,
  ShoppingBag, SlidersHorizontal, Sparkles, Store, ThumbsUp as Facebook, Trash2, Truck, X
} from 'lucide-react'
import { categories, products } from './data'

const WHATSAPP_NUMBER = '5521975118696'
const INSTAGRAM_URL = 'https://www.instagram.com/fabioracoesitaipuacu/'

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function openWhatsApp(message) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
}

function Brand({ compact = false }) {
  return (
    <Link className={`brand ${compact ? 'brand--compact' : ''}`} to="/" aria-label="Fábio Rações — início">
      <span className="brand__mark"><Dog size={25} strokeWidth={1.55} /><Leaf size={13} /></span>
      <span className="brand__copy">
        <strong>Fábio Rações</strong>
        <small>PET · HORSE · ITAIPUAÇU</small>
      </span>
    </Link>
  )
}

function Header({ cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  useEffect(() => { setMenuOpen(false) }, [location.pathname, location.search])

  const navItems = [
    ['/', 'Início'], ['/produtos', 'Produtos'], ['/entrega', 'Entrega'], ['/sobre', 'Sobre'], ['/contato', 'Contato']
  ]

  return (
    <>
      <div className="service-bar">
        <span><MapPin size={13} /> Atendimento em Itaipuaçu e região</span>
        <span className="service-bar__right">Preço e disponibilidade pelo WhatsApp</span>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'}>{label}{label === 'Produtos' && <ChevronDown size={14} />}</NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button className="cart-trigger" onClick={onCartOpen} aria-label={`Abrir lista com ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`}>
              <ShoppingBag size={19} /><span className="cart-trigger__label">Minha lista</span><b>{cartCount}</b>
            </button>
            <a className="button button--gold desktop-whatsapp" href={whatsappUrl('Olá! Gostaria de falar com a Fábio Rações Itaipuaçu.')} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> Falar no WhatsApp
            </a>
            <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <div className="container">
              {navItems.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}<ChevronRight size={17} /></NavLink>)}
              <div className="mobile-menu__categories">
                {categories.map(category => <Link key={category.id} to={`/produtos?animal=${encodeURIComponent(category.name)}`}>{category.name}</Link>)}
              </div>
              <a className="button button--gold button--full" href={whatsappUrl('Olá! Gostaria de falar com a Fábio Rações Itaipuaçu.')} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

function SectionHeading({ eyebrow, title, copy, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  )
}

function CategoryCard({ category }) {
  const Icon = category.icon
  return (
    <Link className={`category-card category-card--${category.tone}`} to={`/produtos?animal=${encodeURIComponent(category.name)}`}>
      <span className="category-card__eyebrow">{category.eyebrow}</span>
      <span className="category-card__icon"><Icon size={31} strokeWidth={1.45} /></span>
      <div><h3>{category.name}</h3><p>{category.description}</p></div>
      <span className="round-arrow"><ArrowRight size={18} /></span>
    </Link>
  )
}

function ProductVisual({ product, large = false }) {
  const Icon = product.icon
  return (
    <div className={`product-visual product-visual--${product.tone} ${large ? 'product-visual--large' : ''}`}>
      <div className="product-pack">
        <div className="product-pack__seam" />
        <span>LINHA</span>
        <Icon size={large ? 68 : 46} strokeWidth={1.25} />
        <strong>{product.animal}</strong>
        <small>FOTO A CADASTRAR</small>
      </div>
    </div>
  )
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <Link to={`/produto/${product.id}`} aria-label={`Ver ${product.name}`}><ProductVisual product={product} /></Link>
      <div className="product-card__body">
        <div className="product-card__meta"><span>{product.animal}</span><span>·</span><span>{product.category}</span></div>
        <Link to={`/produto/${product.id}`}><h3>{product.name}</h3></Link>
        <p>{product.size}</p>
        <div className="product-card__price"><strong>Sob consulta</strong><small>Preço e estoque</small></div>
        {product.pending && <span className="pending-badge">Linha a confirmar</span>}
        <div className="product-card__actions">
          <Link className="button button--outline button--small" to={`/produto/${product.id}`}>Ver produto</Link>
          <button className="button button--green button--square" onClick={() => onAdd(product)} aria-label={`Adicionar ${product.name} à lista`}><Plus size={20} /></button>
        </div>
        <button className="text-action" onClick={() => openWhatsApp(`Olá! Gostaria de consultar preço e disponibilidade de: ${product.name}.`)}>
          <MessageCircle size={16} /> Consultar no WhatsApp
        </button>
      </div>
    </article>
  )
}

function Home({ onAdd }) {
  return (
    <main>
      <section className="hero">
        <img className="hero__image" src={`${import.meta.env.BASE_URL}images/hero-pet-horse.webp`} alt="Cão, gato e cavalo em ambiente de campo" fetchPriority="high" />
        <div className="hero__veil" />
        <div className="container hero__content">
          <span className="eyebrow eyebrow--light">Pet & Horse em Itaipuaçu</span>
          <h1>O cuidado certo<br />para quem faz parte<br />da sua vida.<i><Leaf /></i></h1>
          <p>Rações, produtos e cuidados para cães, gatos, equinos e muito mais, com atendimento próximo em Itaipuaçu.</p>
          <div className="hero__actions">
            <Link className="button button--green" to="/produtos">Ver produtos <ArrowRight size={18} /></Link>
            <a className="button button--cream" href={whatsappUrl('Olá! Vim pelo site da Fábio Rações e gostaria de atendimento.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Falar no WhatsApp</a>
          </div>
          <div className="hero__trust"><BadgeCheck size={19} /><span>Atendimento local</span><i /><span>Escolha orientada</span><i /><span>Pet & Horse</span></div>
        </div>
        <span className="hero__caption">Imagem ilustrativa — substituir por foto oficial da loja</span>
      </section>

      <section className="category-section">
        <div className="container">
          <SectionHeading eyebrow="Encontre com facilidade" title="Tudo para o cuidado deles" copy="Escolha uma área e vá direto ao que você procura." />
          <div className="category-grid">{categories.map(c => <CategoryCard key={c.id} category={c} />)}</div>
        </div>
      </section>

      <section className="benefit-strip">
        <div className="container benefit-grid">
          <div><span><MapPin /></span><p><strong>Atendimento local</strong>Para Itaipuaçu e região</p></div>
          <div><span><HeartHandshake /></span><p><strong>Orientação na compra</strong>Converse antes de escolher</p></div>
          <div><span><PackageCheck /></span><p><strong>Entrega ou retirada</strong>Sempre mediante consulta</p></div>
          <div><span><ShieldCheck /></span><p><strong>Pet & Horse</strong>Diferentes animais, um só lugar</p></div>
        </div>
      </section>

      <section className="section products-featured">
        <div className="container">
          <SectionHeading eyebrow="Catálogo demonstrativo" title="Comece sua lista de consulta" copy="Os itens abaixo mostram como o catálogo funcionará. Marcas, fotos e medidas reais serão cadastradas pela loja." action={<Link className="link-arrow" to="/produtos">Ver catálogo completo <ArrowRight size={17} /></Link>} />
          <div className="product-grid product-grid--home">{products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}</div>
        </div>
      </section>

      <section className="equine-feature">
        <img src={`${import.meta.env.BASE_URL}images/equinos-feature.webp`} alt="Cavalo em estábulo com itens de cuidado equino" loading="lazy" />
        <div className="equine-feature__shade" />
        <div className="container equine-feature__content">
          <span className="eyebrow eyebrow--light">Área Horse</span>
          <h2>Um espaço especial<br />para quem vive o campo.</h2>
          <p>Alimentação, suplementos, cuidados e acessórios para equinos — uma seleção que diferencia a Fábio Rações de um pet shop comum.</p>
          <div>
            <Link className="button button--gold" to="/produtos?animal=Equinos">Ver linha equina <ArrowRight size={17} /></Link>
            <button className="button button--glass" onClick={() => openWhatsApp('Olá! Gostaria de consultar os produtos para equinos disponíveis.')}>Consultar no WhatsApp</button>
          </div>
        </div>
        <span className="equine-feature__caption">Imagem ilustrativa</span>
      </section>

      <section className="section how-section">
        <div className="container">
          <SectionHeading eyebrow="Simples e direto" title="Do catálogo ao WhatsApp em 4 passos" copy="Sem checkout complicado: você monta a lista e a loja confirma tudo com você." />
          <div className="steps-grid">
            {[
              [Search, 'Explore', 'Pesquise ou filtre os produtos.'],
              [ShoppingBag, 'Monte sua lista', 'Adicione itens e ajuste quantidades.'],
              [MessageCircle, 'Envie pelo WhatsApp', 'A mensagem sai pronta e organizada.'],
              [Truck, 'Combine', 'Confirme preço, estoque, entrega ou retirada.']
            ].map(([Icon, title, text], i) => <div className="step-card" key={title}><b>0{i + 1}</b><span><Icon /></span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <DeliveryBand />
      <Faq />

      <section className="social-section">
        <div className="container social-card">
          <div><span className="eyebrow">Acompanhe de perto</span><h2>Do Instagram para a sua lista.</h2><p>Veja novidades nas redes, encontre o produto no site e consulte pelo WhatsApp.</p></div>
          <a className="button button--green" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={18} /> @fabioracoesitaipuacu</a>
        </div>
      </section>
    </main>
  )
}

function Catalog({ onAdd }) {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('busca') || '')
  const selectedAnimal = params.get('animal') || 'Todos'
  const selectedCategory = params.get('categoria') || 'Todos'

  const filtered = useMemo(() => products.filter(product => {
    const matchesSearch = `${product.name} ${product.animal} ${product.category} ${product.description}`.toLowerCase().includes(search.toLowerCase())
    const matchesAnimal = selectedAnimal === 'Todos' || product.animal === selectedAnimal
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    return matchesSearch && matchesAnimal && matchesCategory
  }), [search, selectedAnimal, selectedCategory])

  function updateParam(key, value) {
    const next = new URLSearchParams(params)
    value === 'Todos' ? next.delete(key) : next.set(key, value)
    setParams(next)
  }

  const productCategories = ['Todos', ...new Set(products.map(p => p.category))]

  return (
    <main className="catalog-page">
      <section className="page-hero page-hero--catalog">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Início</Link><ChevronRight size={14} /><span>Produtos</span></div>
          <span className="eyebrow">Catálogo inteligente</span>
          <h1>Encontre o cuidado certo<br />para cada necessidade.</h1>
          <p>Busque, filtre e monte uma lista. A loja confirma preço e disponibilidade pelo WhatsApp.</p>
        </div>
      </section>
      <div className="catalog-animal-tabs">
        <div className="container">
          {['Todos', ...categories.map(c => c.name)].map(name => (
            <button key={name} className={selectedAnimal === name ? 'active' : ''} onClick={() => updateParam('animal', name)}>{name}</button>
          ))}
        </div>
      </div>
      <section className="section catalog-main">
        <div className="container">
          <div className="catalog-toolbar">
            <label className="search-field"><Search size={19} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Busque por produto, animal ou necessidade..." /><kbd>{filtered.length}</kbd></label>
            <span className="catalog-note"><BadgeCheck size={17} /> Catálogo demonstrativo</span>
          </div>
          <div className="catalog-layout">
            <aside className="filter-panel">
              <div className="filter-title"><span><SlidersHorizontal size={18} /> Filtros</span><button onClick={() => { setSearch(''); setParams({}) }}>Limpar</button></div>
              <fieldset><legend>Animal / área</legend>{['Todos', ...categories.map(c => c.name)].map(name => <label key={name}><input type="radio" name="animal" checked={selectedAnimal === name} onChange={() => updateParam('animal', name)} /><span>{name}</span></label>)}</fieldset>
              <fieldset><legend>Tipo de produto</legend>{productCategories.map(name => <label key={name}><input type="radio" name="category" checked={selectedCategory === name} onChange={() => updateParam('categoria', name)} /><span>{name}</span></label>)}</fieldset>
              <div className="filter-pending"><Clock3 size={18} /><p><strong>Marcas, pesos e preços</strong>Serão adicionados quando confirmados pela empresa.</p></div>
            </aside>
            <div className="catalog-results">
              <div className="results-head"><p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'resultado' : 'resultados'}</p><span>Consulta de preço e estoque via WhatsApp</span></div>
              {filtered.length ? <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}</div> : <div className="empty-state"><Search size={34} /><h3>Nenhum item encontrado</h3><p>Tente outro termo ou limpe os filtros.</p><button className="button button--green" onClick={() => { setSearch(''); setParams({}) }}>Limpar busca</button></div>}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProductDetail({ onAdd }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === id)
  if (!product) return <main className="not-found"><h1>Produto não encontrado</h1><Link to="/produtos">Voltar ao catálogo</Link></main>
  const related = products.filter(p => p.id !== product.id && (p.animal === product.animal || p.category === product.category)).slice(0, 3)

  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href) } catch { /* browser fallback intentionally quiet */ }
  }

  return (
    <main className="product-page">
      <div className="container">
        <button className="back-link" onClick={() => navigate(-1)}><ArrowLeft size={17} /> Voltar</button>
        <div className="product-detail">
          <div className="product-detail__visual"><ProductVisual product={product} large /><span>Imagem demonstrativa — foto oficial a cadastrar</span></div>
          <div className="product-detail__info">
            <span className="eyebrow">{product.animal} · {product.category}</span>
            <h1>{product.name}</h1>
            <p className="product-detail__lead">{product.description}</p>
            <div className="info-table">
              <div><span>Marca</span><strong>Informação a confirmar</strong></div>
              <div><span>Peso / tamanho</span><strong>{product.size}</strong></div>
              <div><span>Disponibilidade</span><strong>Consulte a loja</strong></div>
              <div><span>Preço</span><strong>Sob consulta</strong></div>
            </div>
            <div className="notice"><ShieldCheck size={21} /><p><strong>Compre com segurança</strong>A equipe confirma o item correto, preço e estoque antes de combinar entrega ou retirada.</p></div>
            <div className="product-detail__actions">
              <button className="button button--green" onClick={() => openWhatsApp(`Olá! Gostaria de consultar preço e disponibilidade de: ${product.name}.`)}><MessageCircle size={19} /> Consultar este produto</button>
              <button className="button button--gold" onClick={() => onAdd(product)}><Plus size={19} /> Adicionar à lista</button>
            </div>
            <div className="share-row"><span>Compartilhar:</span><button onClick={() => openWhatsApp(`Veja este produto da Fábio Rações: ${product.name} — ${window.location.href}`)}><Share2 size={16} /> WhatsApp</button><button onClick={copyLink}><Copy size={16} /> Copiar link</button></div>
          </div>
        </div>
        {related.length > 0 && <section className="related"><SectionHeading eyebrow="Complete sua consulta" title="Você também pode precisar" /><div className="product-grid">{related.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}</div></section>}
      </div>
    </main>
  )
}

function DeliveryBand() {
  const [region, setRegion] = useState('')
  function consult(e) {
    e.preventDefault()
    const value = region.trim()
    if (!value) return
    openWhatsApp(`Olá! Gostaria de consultar a possibilidade de entrega para o bairro/CEP: ${value}.`)
  }
  return (
    <section className="delivery-band">
      <div className="container delivery-band__inner">
        <div className="delivery-band__title"><span><Truck /></span><div><small>Entrega ou retirada</small><h2>Consulte sua região</h2></div></div>
        <form onSubmit={consult}><label htmlFor="region">Seu bairro ou CEP</label><div><input id="region" value={region} onChange={e => setRegion(e.target.value)} placeholder="Ex.: Itaipuaçu ou 249xx-xxx" required /><button className="button button--gold">Consultar <ArrowRight size={17} /></button></div></form>
        <p>A disponibilidade será confirmada pela equipe.</p>
      </div>
    </section>
  )
}

function Delivery() {
  return (
    <main>
      <section className="page-hero page-hero--delivery"><div className="container"><div className="breadcrumb"><Link to="/">Início</Link><ChevronRight size={14} /><span>Entrega e retirada</span></div><span className="eyebrow">Pedido sem complicação</span><h1>Escolha no seu tempo.<br />Confirme com a nossa equipe.</h1><p>Monte sua lista e combine a melhor opção diretamente pelo WhatsApp.</p><a className="button button--green" href={whatsappUrl('Olá! Gostaria de saber como funciona a entrega ou retirada.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Falar com a equipe</a></div></section>
      <section className="section delivery-page"><div className="container"><SectionHeading eyebrow="Como funciona" title="Da escolha à confirmação" copy="A loja confirma todas as informações antes de finalizar o atendimento." /><div className="delivery-flow">{[
        [ShoppingBag, 'Escolha seus produtos', 'Use a busca e os filtros do catálogo.'], [ClipboardList, 'Monte sua lista', 'Adicione produtos e ajuste as quantidades.'], [MessageCircle, 'Envie pelo WhatsApp', 'Sua mensagem será montada automaticamente.'], [PackageCheck, 'Aguarde a confirmação', 'Preço, estoque e entrega ou retirada são combinados com a equipe.']
      ].map(([Icon, title, text], i) => <div key={title}><b>{i + 1}</b><span><Icon /></span><h3>{title}</h3><p>{text}</p>{i < 3 && <ArrowRight className="delivery-flow__arrow" />}</div>)}</div></div></section>
      <DeliveryBand />
      <section className="section pickup-section"><div className="container pickup-grid"><div><span><Truck /></span><h3>Consultar entrega</h3><p>Informe seu bairro ou CEP. A loja verifica possibilidade, prazo e demais condições.</p><button className="link-arrow" onClick={() => openWhatsApp('Olá! Gostaria de consultar a possibilidade de entrega para minha região.')}>Consultar agora <ArrowRight size={16} /></button></div><div><span><Store /></span><h3>Combinar retirada</h3><p>A equipe confirma a disponibilidade e orienta sobre a retirada na loja.</p><button className="link-arrow" onClick={() => openWhatsApp('Olá! Gostaria de consultar um produto e combinar retirada na loja.')}>Falar com a loja <ArrowRight size={16} /></button></div></div></section>
    </main>
  )
}

function About() {
  return (
    <main>
      <section className="about-hero"><img src={`${import.meta.env.BASE_URL}images/hero-pet-horse.webp`} alt="Cão, gato e cavalo representando a área Pet & Horse" /><div className="about-hero__veil" /><div className="container"><span className="eyebrow eyebrow--light">Sobre a Fábio Rações</span><h1>Próxima de quem cuida.<br />Preparada para ajudar.</h1><p>Uma vitrine Pet & Horse criada para organizar a busca e aproximar clientes da loja em Itaipuaçu.</p></div><span className="hero__caption">Imagem ilustrativa</span></section>
      <section className="section about-content"><div className="container about-grid"><div><span className="eyebrow">Quem somos</span><h2>Uma loja local,<br />com atenção a cada escolha.</h2></div><div className="about-copy"><p>A Fábio Rações Itaipuaçu atende pessoas que cuidam de cães, gatos, cavalos e outros animais. O site foi pensado para apresentar as categorias com clareza e tornar o contato mais simples.</p><p>A história da empresa, o propósito detalhado e outras informações institucionais serão incluídos após validação com o proprietário.</p><div className="confirm-box"><Clock3 /><p><strong>História da empresa</strong>Informação a confirmar.</p></div></div></div></section>
      <section className="values-section"><div className="container values-grid">{[[MapPin, 'Atendimento local', 'Um canal próximo para clientes de Itaipuaçu e região.'],[HeartHandshake, 'Orientação na compra', 'Converse com a equipe para encontrar o produto adequado.'],[ShieldCheck, 'Informação responsável', 'Sem promessas de preço, estoque ou entrega antes da confirmação.'],[Dog, 'Identidade Pet & Horse', 'Uma seleção voltada a animais domésticos e equinos.']].map(([Icon,title,text]) => <div key={title}><span><Icon /></span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
      <section className="section gallery-placeholder"><div className="container"><SectionHeading eyebrow="Nossa loja" title="Galeria em preparação" copy="As fotos reais da fachada, interior, prateleiras, linha equina e atendimento entrarão aqui." /><div className="gallery-grid">{['Fachada', 'Interior da loja', 'Área de rações', 'Linha equina', 'Produtos', 'Atendimento'].map((label,i)=><div key={label}><Store size={i===3?30:26}/><span>{label}</span><small>Foto a cadastrar</small></div>)}</div></div></section>
    </main>
  )
}

function Faq() {
  const items = [
    ['Vocês fazem entrega?', 'A possibilidade de entrega deve ser consultada com a equipe informando seu bairro ou CEP.'],
    ['Como consulto o preço?', 'Abra um produto ou monte sua lista e envie a consulta pelo WhatsApp.'],
    ['Posso retirar na loja?', 'A retirada deve ser combinada após a confirmação de disponibilidade pela equipe.'],
    ['Vocês trabalham com produtos para cavalos?', 'A empresa atende o segmento equino. Consulte a equipe para saber quais produtos estão disponíveis.'],
    ['Como sei se um produto está disponível?', 'O estoque é confirmado diretamente pela loja no momento do atendimento.'],
    ['Quais formas de pagamento são aceitas?', 'Informação a confirmar.']
  ]
  return <section className="section faq-section"><div className="container faq-grid"><div><span className="eyebrow">Dúvidas frequentes</span><h2>Informação clara antes de pedir.</h2><p>O que ainda depende da loja é confirmado diretamente no atendimento.</p></div><div className="faq-list">{items.map(([q,a])=><details key={q}><summary>{q}<Plus size={18}/></summary><p>{a}</p></details>)}</div></div></section>
}

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Consulta de produto', message: '' })
  function update(e) { setForm({ ...form, [e.target.name]: e.target.value }) }
  function submit(e) {
    e.preventDefault()
    openWhatsApp(`Olá! Meu nome é ${form.name}.\n\nAssunto: ${form.subject}\nWhatsApp: ${form.phone}\nE-mail: ${form.email || 'Não informado'}\n\n${form.message}`)
  }
  return (
    <main>
      <section className="page-hero page-hero--contact"><div className="container"><div className="breadcrumb"><Link to="/">Início</Link><ChevronRight size={14}/><span>Contato</span></div><span className="eyebrow">Estamos por perto</span><h1>Fale com a<br />Fábio Rações.</h1><p>Tire dúvidas, consulte produtos ou solicite informações pelo canal mais rápido para você.</p></div></section>
      <section className="section contact-section"><div className="container contact-grid">
        <aside className="contact-card"><span className="eyebrow">Atendimento</span><h2>Fale com a gente</h2><a className="contact-feature" href={whatsappUrl('Olá! Gostaria de falar com a Fábio Rações Itaipuaçu.')} target="_blank" rel="noreferrer"><MessageCircle/><span><small>WhatsApp</small><strong>(21) 97511-8696</strong></span><ChevronRight/></a><div className="contact-line"><Instagram/><span><small>Instagram</small><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@fabioracoesitaipuacu</a></span></div><div className="contact-line"><MapPin/><span><small>Localização</small><strong>Itaipuaçu — Maricá/RJ</strong><em>Endereço: informação a confirmar</em></span></div><div className="contact-line"><Clock3/><span><small>Horário</small><strong>Informação a confirmar</strong></span></div></aside>
        <form className="contact-form" onSubmit={submit}><span className="eyebrow">Envie sua mensagem</span><h2>Como podemos ajudar?</h2><div className="form-row"><label>Nome<input name="name" value={form.name} onChange={update} placeholder="Seu nome" required /></label><label>WhatsApp<input name="phone" value={form.phone} onChange={update} placeholder="(21) 99999-9999" required /></label></div><div className="form-row"><label>E-mail <small>(opcional)</small><input type="email" name="email" value={form.email} onChange={update} placeholder="voce@email.com" /></label><label>Assunto<select name="subject" value={form.subject} onChange={update}><option>Consulta de produto</option><option>Preço e estoque</option><option>Entrega ou retirada</option><option>Produtos para equinos</option><option>Outras dúvidas</option></select></label></div><label>Mensagem<textarea name="message" value={form.message} onChange={update} placeholder="Conte o que você procura..." required /></label><button className="button button--green button--full"><Send size={18}/> Enviar pelo WhatsApp</button><p className="form-disclaimer">Ao enviar, sua mensagem será aberta no WhatsApp. Nenhum dado é armazenado neste site.</p></form>
      </div></section>
      <Faq />
    </main>
  )
}

function CartDrawer({ open, items, onClose, onChange, onRemove, onClear }) {
  const count = items.reduce((total, item) => total + item.quantity, 0)
  function sendList() {
    const list = items.map(item => `${item.quantity}x ${item.name}`).join('\n')
    openWhatsApp(`Olá! Gostaria de consultar os seguintes produtos:\n\n${list}\n\nGostaria de saber preço, estoque e possibilidade de entrega ou retirada.`)
  }
  return (
    <>
      <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="cart-drawer__head"><div><span>Minha lista</span><p>{count} {count === 1 ? 'item' : 'itens'} para consultar</p></div><button onClick={onClose} aria-label="Fechar lista"><X/></button></div>
        <div className="cart-drawer__body">
          {items.length === 0 ? <div className="cart-empty"><span><ShoppingBag/></span><h3>Sua lista está vazia</h3><p>Adicione produtos e envie todos juntos pelo WhatsApp.</p><Link className="button button--green" to="/produtos" onClick={onClose}>Ver produtos</Link></div> : items.map(item => <div className="cart-item" key={item.id}><ProductVisual product={item}/><div><h3>{item.name}</h3><small>Sob consulta</small><div className="quantity"><button onClick={()=>onChange(item.id, -1)}><Minus size={15}/></button><b>{item.quantity}</b><button onClick={()=>onChange(item.id, 1)}><Plus size={15}/></button></div></div><button className="remove-item" onClick={()=>onRemove(item.id)} aria-label="Remover"><Trash2 size={17}/></button></div>)}
        </div>
        {items.length > 0 && <div className="cart-drawer__footer"><div className="cart-summary"><span>{count} {count === 1 ? 'item selecionado' : 'itens selecionados'}</span><button onClick={onClear}>Limpar lista</button></div><button className="button button--whatsapp button--full" onClick={sendList}><MessageCircle size={19}/> Consultar lista no WhatsApp</button><p>Preço, estoque e entrega serão confirmados pela loja.</p></div>}
      </aside>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Brand compact/><p>O cuidado certo para quem faz parte da sua vida, em Itaipuaçu.</p><div><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href={whatsappUrl('Olá! Vim pelo site da Fábio Rações.')} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a><span aria-label="Facebook"><Facebook/></span></div></div>
        <div><h3>Atendimento</h3><a href={whatsappUrl('Olá! Vim pelo site da Fábio Rações.')} target="_blank" rel="noreferrer"><Phone/> (21) 97511-8696</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram/> @fabioracoesitaipuacu</a><span><Clock3/> Horário: a confirmar</span></div>
        <div><h3>Localização</h3><span><MapPin/> Itaipuaçu — Maricá/RJ</span><small>Endereço completo: informação a confirmar.</small><a className="footer-map" href="https://www.google.com/maps/search/?api=1&query=F%C3%A1bio+Ra%C3%A7%C3%B5es+Itaipua%C3%A7u" target="_blank" rel="noreferrer">Buscar no mapa <ArrowRight size={14}/></a></div>
        <div><h3>Acesso rápido</h3><Link to="/produtos">Produtos</Link><Link to="/entrega">Entrega e retirada</Link><Link to="/sobre">Sobre nós</Link><Link to="/contato">Contato</Link><span>Política de Privacidade</span></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Fábio Rações Itaipuaçu.</span><span>Conceito visual oficial — JN Santos Web Studio</span></div>
    </footer>
  )
}

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('fabio-racoes-lista')) || []
      return saved.map(item => {
        const product = products.find(candidate => candidate.id === item.id)
        return product ? { ...product, quantity: item.quantity || 1 } : null
      }).filter(Boolean)
    } catch { return [] }
  })
  useEffect(() => {
    localStorage.setItem('fabio-racoes-lista', JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity }))))
  }, [cart])
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])

  function addToCart(product) {
    setCart(current => {
      const exists = current.find(item => item.id === product.id)
      return exists ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }
  function changeQuantity(id, change) { setCart(current => current.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)) }
  const count = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="app-shell">
      <Header cartCount={count} onCartOpen={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home onAdd={addToCart} />} />
        <Route path="/produtos" element={<Catalog onAdd={addToCart} />} />
        <Route path="/produto/:id" element={<ProductDetail onAdd={addToCart} />} />
        <Route path="/entrega" element={<Delivery />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
      </Routes>
      <Footer />
      <a className="floating-whatsapp" href={whatsappUrl('Olá! Vim pelo site da Fábio Rações e gostaria de atendimento.')} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><MessageCircle/><span>Fale com a gente</span></a>
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onChange={changeQuantity} onRemove={id => setCart(current => current.filter(item => item.id !== id))} onClear={() => setCart([])} />
    </div>
  )
}

export default App
