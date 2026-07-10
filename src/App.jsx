import { useCallback, useEffect, useMemo, useState } from 'react'
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

const featureIcons = {
  chart: BarChart3,
  library: BookOpen,
  message: MessageSquare,
  refresh: RefreshCcw,
  user: UserCircle,
  users: Users,
}

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
      downloads: installer?.download_count ?? version.downloads,
      downloadUrl: installer?.browser_download_url ?? version.downloadUrl,
    }
  })
}

function useLiveVersions() {
  const [liveVersions, setLiveVersions] = useState(versions)

  const loadReleaseData = useCallback(async (signal) => {
    try {
      const response = await fetch(siteConfig.releasesApiUrl, { signal })

      if (!response.ok) {
        return
      }

      const githubReleases = await response.json()
      setLiveVersions(mergeGitHubReleaseData(versions, githubReleases))
    } catch (error) {
      if (error.name !== 'AbortError') {
        setLiveVersions(versions)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    loadReleaseData(controller.signal)

    return () => controller.abort()
  }, [loadReleaseData])

  return [liveVersions, loadReleaseData]
}

function BreezeLogo() {
  return (
    <img className="logo-mark" src="/icon.png" alt="" aria-hidden="true" />
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

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={`${siteConfig.name} home`}>
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

function Hero({ latestRelease, onDownload }) {
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
      <div className="hero-inner">
        <BreezeLogo />
        <h1>{siteConfig.name}</h1>
        <p>{siteConfig.tagline}</p>
        <a className="download-button" href={latestRelease.downloadUrl} download onClick={onDownload}>
          <Download size={20} />
          Download for Windows
        </a>
        <span className="hero-version">
          {latestRelease.version} · {latestRelease.date}
        </span>
      </div>
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

function VersionCard({ release, onDownload }) {
  const [expanded, setExpanded] = useState(false)
  const visibleSections = expanded ? release.sections : release.sections.slice(0, 2)

  return (
    <article className="version-card">
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
            <a className="small-download" href={release.downloadUrl} download onClick={onDownload}>
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
          <VersionCard key={release.version} release={release} onDownload={onDownload} />
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
  const [liveVersions, refreshReleaseData] = useLiveVersions()
  const handleDownloadClick = () => {
    window.setTimeout(() => refreshReleaseData(), 4000)
  }

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero latestRelease={liveVersions[0]} onDownload={handleDownloadClick} />
        <FeaturesSection />
        <VersionHistory releases={liveVersions} onDownload={handleDownloadClick} />
      </main>
      <Footer />
    </div>
  )
}

export default App
