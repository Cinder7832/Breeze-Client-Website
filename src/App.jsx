import { useMemo, useState } from 'react'
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronDown,
  Download,
  GitBranch,
  MessageSquare,
  RefreshCcw,
  Search,
  UserCircle,
  Users,
} from 'lucide-react'
import { features, siteConfig, versions } from './siteData'

const featureIcons = {
  chart: BarChart3,
  library: BookOpen,
  message: MessageSquare,
  refresh: RefreshCcw,
  user: UserCircle,
  users: Users,
}

function BreezeLogo() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={`${siteConfig.name} home`}>
        <BreezeLogo />
        <span>{siteConfig.name}</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
          <GitBranch size={17} />
          GitHub
        </a>
        <a href="#versions">Versions</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" />
      <div className="hero-inner">
        <BreezeLogo />
        <h1>{siteConfig.name}</h1>
        <p>{siteConfig.tagline}</p>
        <a className="download-button" href={siteConfig.downloadUrl}>
          <Download size={20} />
          Download for Windows
        </a>
        <span className="hero-version">
          {versions[0].version} · {versions[0].date}
        </span>
      </div>
      <a className="scroll-cue" href="#features" aria-label="Scroll to features">
        <ChevronDown size={22} />
      </a>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="section" id="features">
      <div className="section-heading">
        <h2>Features</h2>
      </div>

      <div className="features-grid">
        {features.map((feature) => {
          const Icon = featureIcons[feature.icon]

          return (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{Icon ? <Icon size={25} /> : null}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function VersionCard({ release }) {
  const [expanded, setExpanded] = useState(false)
  const visibleSections = expanded ? release.sections : release.sections.slice(0, 2)

  return (
    <article className="version-card">
      <div className="version-topline">
        <div className="version-title-row">
          <h3>{release.version}</h3>
          {release.label ? <span className="release-label">{release.label}</span> : null}
        </div>

        <div className="version-meta">
          <span>
            <Calendar size={16} />
            {release.date}
          </span>
          <span>
            <Download size={16} />
            {release.downloads}
          </span>
          <a className="small-download" href={release.downloadUrl}>
            <Download size={17} />
            Download
          </a>
        </div>
      </div>

      <h4>{release.title}</h4>

      <div className="release-notes">
        {visibleSections.map((section) => (
          <section key={section.heading}>
            <h5>{section.heading}</h5>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {release.sections.length > 2 ? (
        <button className="show-more" type="button" onClick={() => setExpanded((value) => !value)}>
          <ChevronDown size={17} className={expanded ? 'rotated' : ''} />
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </article>
  )
}

function VersionHistory() {
  const [query, setQuery] = useState('')

  const filteredVersions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return versions
    }

    return versions.filter((release) => {
      const searchable = [
        release.version,
        release.label,
        release.date,
        release.title,
        ...release.sections.flatMap((section) => [section.heading, ...section.items]),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchable.includes(normalizedQuery)
    })
  }, [query])

  return (
    <section className="section version-section" id="versions">
      <div className="section-heading version-heading">
        <span>Releases</span>
        <h2>Version History</h2>
      </div>

      <label className="search-box">
        <Search size={22} />
        <input
          type="search"
          placeholder="Search versions or changes..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="versions-list">
        {filteredVersions.map((release) => (
          <VersionCard key={release.version} release={release} />
        ))}
      </div>

      {filteredVersions.length === 0 ? (
        <p className="empty-state">No releases match that search.</p>
      ) : null}
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <BreezeLogo />
      <span>{siteConfig.name}</span>
      <p>© 2026 Devanand Asai. All rights reserved.</p>
    </footer>
  )
}

function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <VersionHistory />
      </main>
      <Footer />
    </div>
  )
}

export default App
