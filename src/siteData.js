export const siteConfig = {
  name: 'Breeze Client',
  tagline: 'Electron Based Game Client',
  githubUrl: 'https://github.com/Cinder7832/Nexus-Launcher',
  releasesApiUrl: 'https://api.github.com/repos/Cinder7832/Nexus-Launcher/releases?per_page=100',
  downloadUrl:
    'https://github.com/Cinder7832/Nexus-Launcher/releases/download/v5.0.1/Breeze.Client.Setup.5.0.1.exe',
}

const downloadUrls = {
  'v5.0.1':
    'https://github.com/Cinder7832/Nexus-Launcher/releases/download/v5.0.1/Breeze.Client.Setup.5.0.1.exe',
  'v5.0.0':
    'https://github.com/Cinder7832/Nexus-Launcher/releases/download/v5.0.0/Breeze.Client.Setup.5.0.0.exe',
  'v4.0.1':
    'https://github.com/Cinder7832/Nexus-Launcher/releases/download/v4.0.1/Nexus.Launcher.Setup.4.0.1.exe',
  'v4.0.0':
    'https://github.com/Cinder7832/Nexus-Launcher/releases/download/v4.0.0/Nexus.Launcher.Setup.4.0.0.exe',
  'v3.0.2':
    'https://github.com/Cinder7832/Nexus-Launcher/releases/download/v3.0.2/Nexus.Launcher.Setup.3.0.2.exe',
  'v3.0.1':
    'https://github.com/Cinder7832/Nexus-Launcher/releases/download/v3.0.1/Nexus.Launcher.Setup.3.0.1.exe',
  'v3.0.0':
    'https://github.com/Cinder7832/Nexus-Launcher/releases/download/v3.0.0/Nexus.Launcher.Setup.3.0.0.exe',
  'v2.0.0':
    'https://github.com/Cinder7832/Nexus-Launcher/releases/download/v2.0.0/Nexus.Launcher.Setup.2.0.0.exe',
}

export const features = [
  {
    title: 'Accounts',
    description: 'Syncs important data across the launcher.',
    icon: 'user',
  },
  {
    title: 'Game Library',
    description:
      'Games can be organised in one place, with playtime tracking, adding and launching games, as well as adding external apps from your PC.',
    icon: 'library',
  },
  {
    title: 'Game Updates',
    description: 'Keep games up to date with the latest features and fixes.',
    icon: 'refresh',
  },
  {
    title: 'Comments',
    description: 'Share feedback, suggestions and bug reports on games.',
    icon: 'message',
  },
  {
    title: 'Friends',
    description: 'Connect with friends and see what they are playing.',
    icon: 'users',
  },
  {
    title: 'Analytics',
    description: 'Track developers, games, and see detailed statistics.',
    icon: 'chart',
  },
]

export const versions = [
  {
    version: 'v5.0.1',
    label: 'Latest',
    date: 'May 28, 2026',
    downloads: 46,
    downloadUrl: downloadUrls['v5.0.1'],
    title: 'Breeze Client 5.0.1 Update',
    sections: [
      {
        heading: 'Headline Features',
        items: [
          'Added title bar quick launch, letting you pin up to 3 games and access 2 recently played games directly from the title bar.',
          'Added Settings controls to enable or disable quick launch and manage pinned games.',
          'Added profile banners that display an image behind your name in the chat header and Friends sidebar.',
          'Added Settings and Details page options to control whether your game activity is visible in Socials.',
        ],
      },
      {
        heading: 'Socials & Messaging',
        items: [
          'Added toast notifications for new group chat invites.',
          'Refactored the emoji and GIF picker layout with clearer header and body sections.',
          'Updated pinned message animations and selection states.',
          'Fixed a bug where favouriting GIFs in chat stopped working.',
        ],
      },
      {
        heading: 'Performance & Rendering',
        items: [
          'Added Chromium command line switches to improve responsiveness when switching between applications.',
          'Updated CSS with isolation and transform properties for smoother rendering and layout performance.',
          'Optimized profile data fetching by requesting specific fields across multiple components.',
        ],
      },
      {
        heading: 'Bug Fixes & Quality of Life',
        items: [
          'Reimplemented scrolling for long announcements.',
          'Updated the App ID so pinned taskbar shortcuts group correctly on Windows.',
          'Fixed additional DOM flash issues, although some may still remain.',
        ],
      },
    ],
  },
  {
    version: 'v5.0.0',
    date: 'May 18, 2026',
    downloads: 24,
    downloadUrl: downloadUrls['v5.0.0'],
    title: 'Breeze Client 5.0.0 Update',
    sections: [
      {
        heading: 'Headline Features',
        items: [
          'Nexus Launcher has been renamed to Breeze Client.',
          'The Friends page has been fully revamped and is now called Socials.',
          'Added group chats, profiles, feature suggestions, and bug reports.',
          'Replaced the old Windows title bar with a custom title bar.',
        ],
      },
      {
        heading: 'Downloads & Game Management',
        items: [
          'Downloads can now be switched to queued download mode.',
          'Game updates now show progress like regular downloads.',
          'You can now create and remove desktop shortcuts for games.',
          'Recently played games now appear in the system tray menu.',
        ],
      },
      {
        heading: 'User Interface & Visual Improvements',
        items: [
          'Updated UI modals and animations across the app.',
          'Added a brand-new tooltip system for several UI elements.',
          'Added a new title design for all changelogs.',
        ],
      },
    ],
  },
  {
    version: 'v4.0.1',
    date: 'Apr 14, 2026',
    downloads: 43,
    downloadUrl: downloadUrls['v4.0.1'],
    title: 'Headline Features and Fixes',
    sections: [
      {
        heading: 'Improvements',
        items: [
          'Added a brand-new download progress bar to both the Store and Details pages.',
          'Redesigned toast notifications with a cleaner look and more detailed messaging.',
          'You can now favourite GIFs for quicker access.',
          'The GIF and emoji picker window can now be resized.',
        ],
      },
      {
        heading: 'Bug Fixes',
        items: [
          'Fixed an issue where Downloads and Recents did not update properly.',
          'Fixed a visual issue where hovered media items could appear cut off.',
          'Fixed UI issues at 150% DPI on 1920x1080 displays.',
        ],
      },
    ],
  },
  {
    version: 'v4.0.0',
    date: 'Apr 3, 2026',
    downloads: 56,
    downloadUrl: downloadUrls['v4.0.0'],
    title: 'Breeze Client 4.0.0 Update',
    sections: [
      {
        heading: 'Headline Features',
        items: [
          'A completely new account system has been added with Google sign in and launcher accounts.',
          'You can now add external apps directly through the Library page.',
          'The Friends system has been significantly improved and now uses an account-based system.',
          'The Details page now loads significantly faster with improved offline support.',
        ],
      },
      {
        heading: 'Social & Account Features',
        items: [
          'Added support for profile pictures.',
          'Playtime for games now syncs to your account.',
          'Names can now include apostrophes.',
          'Friends are now sorted by activity.',
        ],
      },
    ],
  },
  {
    version: 'v3.0.2',
    label: 'Unsupported',
    date: 'Apr 1, 2026',
    downloads: 5,
    downloadUrl: downloadUrls['v3.0.2'],
    title: 'Maintenance Update',
    sections: [
      {
        heading: 'Changes',
        items: [
          'Friends chat now updates in realtime.',
          'Changed the design of the delete message button.',
          'Fixed an issue that caused the friends game details button to stop working.',
        ],
      },
    ],
  },
  {
    version: 'v3.0.1',
    label: 'Unsupported',
    date: 'Apr 10, 2026',
    downloads: 2,
    downloadUrl: downloadUrls['v3.0.1'],
    title: 'Small Fixes',
    sections: [
      {
        heading: 'Changes',
        items: [
          'Updated and refined the Friends page UI for better clarity and usability.',
          'Fixed an issue where parts of the UI were slightly misaligned at 150% DPI scaling.',
          'Improved the carousel transition animation for smoother visual flow.',
        ],
      },
    ],
  },
  {
    version: 'v3.0.0',
    label: 'Unsupported',
    date: 'Apr 10, 2026',
    downloads: 3,
    downloadUrl: downloadUrls['v3.0.0'],
    title: 'Breeze Client 3.0.0 Update',
    sections: [
      {
        heading: 'Headline Features',
        items: [
          'Added Collections for browsing games by category.',
          'Added a Friends page with requests, messages, and activity status.',
          'Video support has been added to the launcher.',
          'You can now reply to comments.',
        ],
      },
      {
        heading: 'User Interface & Visuals',
        items: [
          'Announcements and changelogs now render bullet points as proper list items.',
          'Added a new Back to top button for easier navigation.',
          'Toast notifications now use a more opaque background for improved readability.',
        ],
      },
    ],
  },
  {
    version: 'v2.0.0',
    label: 'Unsupported',
    date: 'Apr 10, 2026',
    downloads: 0,
    downloadUrl: downloadUrls['v2.0.0'],
    title: 'Breeze Client 2.0.0 Update',
    sections: [
      {
        heading: 'Changes',
        items: [
          'The UI has been revamped with better animations and a nicer look and feel.',
          'Added a new analytics tab with detailed developer and game statistics.',
          'Added a new announcements section.',
          'You can view recent updates or installs in the downloads page.',
        ],
      },
    ],
  },
]
