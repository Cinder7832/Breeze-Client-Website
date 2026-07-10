import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronDown,
  Download,
  MessageSquare,
  RefreshCcw,
  Search,
  UserCircle,
  Users,
} from 'lucide-react'
import { features, siteConfig, versions } from './siteData'

const assetBaseUrl = import.meta.env.BASE_URL

const featureIcons = {
  chart: BarChart3,
  library: BookOpen,
  message: MessageSquare,
  refresh: RefreshCcw,
  user: UserCircle,
  users: Users,
}

const releaseRefreshIntervalMs = 60_000

function formatReleaseDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(date))
}

function getInstallerAsset(release) {
  return release.assets?.find((asset) => asset.name.toLowerCase().endsWith('.exe'))
}

function mergeGitHubReleaseData(baseVersions, githubReleases) {
  const releasesByTag = new Map(githubReleases.map((release) => [release.tag_name, release]))

  return baseVersions.map((version) => {
    const release = releasesByTag.get(version.version)
    const installer = release ? getInstallerAsset(release) : null

    return {
      ...version,
      date: release?.published_at ? formatReleaseDate(release.published_at) : version.date,
      downloads:
        typeof installer?.download_count === 'number' ? installer.download_count : version.downloads,
      downloadUrl: installer?.browser_download_url ?? version.downloadUrl,
    }
  })
}

function useLiveVersions() {
  const [releaseVersions, setReleaseVersions] = useState(versions)
  const [pendingClickCounts, setPendingClickCounts] = useState({})

  const liveVersions = useMemo(
    () =>
      releaseVersions.map((version) => ({
        ...version,
        downloads: version.downloads + (pendingClickCounts[version.version] ?? 0),
      })),
    [pendingClickCounts, releaseVersions],
  )

  const loadReleaseData = useCallback(async (signal) => {
    try {
      const response = await fetch(siteConfig.releasesApiUrl, { signal })

      if (!response.ok) {
        return
      }

      const githubReleases = await response.json()
      setReleaseVersions(mergeGitHubReleaseData(versions, githubReleases))
      setPendingClickCounts({})
    } catch (error) {
      if (error.name !== 'AbortError') {
        setReleaseVersions(versions)
      }
    }
  }, [])

  const registerDownloadClick = useCallback((version) => {
    setPendingClickCounts((currentCounts) => ({
      ...currentCounts,
      [version]: (currentCounts[version] ?? 0) + 1,
    }))
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    loadReleaseData(controller.signal)
    const refreshId = window.setInterval(() => loadReleaseData(controller.signal), releaseRefreshIntervalMs)

    return () => {
      controller.abort()
      window.clearInterval(refreshId)
    }
  }, [loadReleaseData])

  return [liveVersions, registerDownloadClick]
}

function BreezeLogo() {
  return (
    <img className="logo-mark" src={`${assetBaseUrl}icon.png`} alt="" aria-hidden="true" />
  )
}

function Reveal({ as: Component = 'div', children, className = '', delay = 0, ...props }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <Component
      ref={ref}
      className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  )
}

function GitHubLogo() {
  return (
    <svg
      className="github-mark"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.18 10.18 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  )
}

function Header({ onCraigSurprise }) {
  return (
    <header className="site-header">
      <a
        className="brand"
        href="#top"
        aria-label={`${siteConfig.name} home`}
        onClick={(event) => onCraigSurprise('header', event)}
      >
        <BreezeLogo />
        <span>{siteConfig.name}</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
          <GitHubLogo />
          GitHub
        </a>
        <a href="#versions">Versions</a>
      </nav>
    </header>
  )
}

function Hero({ activeCraigTarget, craigDropId, latestRelease, onCraigSurprise, onDownload }) {
  const [showScrollCue, setShowScrollCue] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollCue(window.scrollY < 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero-glow" />
      {craigDropId > 0 ? (
        <div key={`wind-${craigDropId}`} className="wind-burst" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      ) : null}
      <div className="hero-inner">
        <button
          className={`hero-logo-button ${activeCraigTarget === 'hero' ? 'craig-shake' : ''}`}
          type="button"
          aria-label="Drop Craig"
          onClick={() => onCraigSurprise('hero')}
        >
          <BreezeLogo />
        </button>
        <h1>
          <button
            className={`hero-title-button ${activeCraigTarget === 'hero' ? 'craig-shake' : ''}`}
            type="button"
            onClick={() => onCraigSurprise('hero')}
          >
            {siteConfig.name}
          </button>
        </h1>
        <p>{siteConfig.tagline}</p>
        <a
          className="download-button"
          href={latestRelease.downloadUrl}
          download
          onClick={() => onDownload(latestRelease.version)}
        >
          <Download size={20} />
          Download for Windows
        </a>
        <span className="hero-version">
          {latestRelease.version} · {latestRelease.date}
        </span>
      </div>
      {craigDropId > 0 ? (
        <img
          key={craigDropId}
          className="craig-sprite"
          src={`${assetBaseUrl}craig.png`}
          alt=""
          aria-hidden="true"
        />
      ) : null}
      <a
        className={`scroll-cue ${showScrollCue ? '' : 'scroll-cue-hidden'}`}
        href="#features"
        aria-label="Scroll to features"
      >
        <ChevronDown size={22} />
      </a>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="section" id="features">
      <Reveal className="section-heading">
        <h2>Features</h2>
      </Reveal>

      <div className="features-grid">
        {features.map((feature, index) => {
          const Icon = featureIcons[feature.icon]

          return (
            <Reveal as="article" className="feature-card" delay={index * 65} key={feature.title}>
              <div className="feature-icon">{Icon ? <Icon size={25} /> : null}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function VersionCard({ release, onDownload, delay = 0 }) {
  const [expanded, setExpanded] = useState(false)
  const visibleSections = release.sections.slice(0, 2)
  const extraSections = release.sections.slice(2)

  return (
    <Reveal as="article" className="version-card" delay={delay}>
      <div className="version-topline">
        <div className="version-title-row">
          <h3>{release.version}</h3>
          {release.label ? (
            <span
              className={`release-label ${
                release.label.toLowerCase() === 'unsupported' ? 'release-label-danger' : ''
              }`}
            >
              {release.label}
            </span>
          ) : null}
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
          {release.downloadUrl ? (
            <a
              className="small-download"
              href={release.downloadUrl}
              download
              onClick={() => onDownload(release.version)}
            >
              <Download size={17} />
              Download
            </a>
          ) : (
            <span
              className="small-download small-download-disabled"
              title="No installer is available for this version"
              aria-disabled="true"
            >
              <Download size={17} />
              Unavailable
            </span>
          )}
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
        {extraSections.length > 0 ? (
          <div className={`release-notes-extra ${expanded ? 'expanded' : ''}`}>
            <div className="release-notes-extra-inner">
              {extraSections.map((section) => (
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
          </div>
        ) : null}
      </div>

      {extraSections.length > 0 ? (
        <button className="show-more" type="button" onClick={() => setExpanded((value) => !value)}>
          <ChevronDown size={17} className={expanded ? 'rotated' : ''} />
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </Reveal>
  )
}

function VersionHistory({ releases, onDownload }) {
  const [query, setQuery] = useState('')

  const filteredVersions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return releases
    }

    return releases.filter((release) => {
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
  }, [query, releases])

  return (
    <section className="section version-section" id="versions">
      <Reveal className="section-heading version-heading">
        <span>Releases</span>
        <h2>Version History</h2>
      </Reveal>

      <Reveal as="label" className="search-box" delay={70}>
        <Search size={22} />
        <input
          type="search"
          placeholder="Search versions or changes..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Reveal>

      <div className="versions-list">
        {filteredVersions.map((release, index) => (
          <VersionCard
            key={release.version}
            release={release}
            onDownload={onDownload}
            delay={Math.min(index * 55, 220)}
          />
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
  const [liveVersions, handleDownloadClick] = useLiveVersions()
  const [craigDropId, setCraigDropId] = useState(0)
  const [activeCraigTarget, setActiveCraigTarget] = useState(null)
  const craigTimerRef = useRef(null)
  const craigLockRef = useRef(false)

  const triggerCraigSurprise = useCallback((target, event) => {
    if (craigLockRef.current) {
      event?.preventDefault()
      return
    }

    craigLockRef.current = true
    setCraigDropId((currentId) => currentId + 1)
    setActiveCraigTarget(target)

    if (craigTimerRef.current) {
      window.clearTimeout(craigTimerRef.current)
    }

    craigTimerRef.current = window.setTimeout(() => {
      setActiveCraigTarget(null)
      craigLockRef.current = false
    }, 1800)
  }, [])

  useEffect(() => {
    return () => {
      if (craigTimerRef.current) {
        window.clearTimeout(craigTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="site-shell">
      <Header onCraigSurprise={triggerCraigSurprise} />
      <main>
        <Hero
          activeCraigTarget={activeCraigTarget}
          craigDropId={craigDropId}
          latestRelease={liveVersions[0]}
          onCraigSurprise={triggerCraigSurprise}
          onDownload={handleDownloadClick}
        />
        <FeaturesSection />
        <VersionHistory releases={liveVersions} onDownload={handleDownloadClick} />
      </main>
      <Footer />
    </div>
  )
}

export default App
