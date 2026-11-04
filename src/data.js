// Static content for the portfolio. Edit text here, not in the components.

// Logos are plain .svg files in src/assets/logos and are rendered with <img>,
// so they can never run scripts (safer than injecting raw SVG markup).
const logoFiles = import.meta.glob('./assets/logos/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});
export const logo = (key) => logoFiles[`./assets/logos/${key}.svg`];

// Split so the address isn't sitting in the page source as one plain string.
export const EMAIL = ['kjcmartinez.misc', 'gmail.com'].join('@');
export const GITHUB_URL = 'https://github.com/karlomartinez-eng';
export const LINKEDIN_URL = 'https://linkedin.com/in/karlo-joseph-martinez';

// [name, logoKey, isLearning?]
export const STACK = [
  {
    t: "Main Stacks", d: "The core of my work for the past 10+ years.", c: "#5B4BD6",
    items: [
    ["WPF C#", "csharp"],
    [".NET", "dotnet"],
    ["Microsoft SQL Server", "sql"],
    ["Crystal Reports", "crystal"],
    ["Swift", "swift"],
    ["SwiftUI", "swiftui", 1],
    ["Objective-C", "objc"],
    ],
  },
  {
    t: "Integrations & APIs", d: "Connecting stores, couriers, and payment providers.", c: "#0B7285",
    items: [
    ["Shopify", "shopify"],
    ["ShippIT", "shippit"],
    ["StarShipIT", "starshipit"],
    ["Linkly", "linkly"],
    ["Tyro", "tyro"],
    ["Windcave", "windcave"],
    ["Klaviyo", "klaviyo"],
    ["Loyalty Lion", "loyaltylion"],
    ["Yotpo", "yotpo"],
    ["Omneo", "omneo"],
    ],
  },
  {
    t: "Tools & delivery", d: "How I ship and maintain code.", c: "#2B8A3E",
    items: [
    ["Git & GitHub", "git"],
    ["Azure DevOps Server", "azuredevops"],
    ["Postman", "postman"],
    ["Xcode", "xcode"],
    ["VS Code", "vscode"],
    ["Visual Studio", "vs"],
    ],
  },
  {
    t: "AI automation", d: "Workflow automation for small businesses and agencies.", c: "#C2255C",
    items: [
    ["n8n", "n8n", 1],
    ["Make", "make", 1],
    ["GoHighLevel", "ghl", 1],
    ["Claude", "claude"],
    ["GitHub Copilot", "copilot"],
    ["Codex", "codex"],
    ],
  },
];

export const PROJECTS = [
  {
    "t": "Enterprise Point-of-Sale platform",
    "tags": [
      "C#",
      "WPF",
      "ASP.NET",
      "SQL Server",
      "iOS",
      "Shopify API"
    ],
    "p": [
      "A cross-platform POS for Windows and iOS used by retail stores. It takes secure card payments through Australian banking APIs and keeps stock in sync with Shopify.",
      "Built with MVVM and MVC, with unit tests covering the payment and inventory modules."
    ]
  },
  {
    "t": "Pick & Pack warehouse mobile app",
    "tags": [
      "Swift",
      "iOS SDK",
      "REST APIs",
      "MVVM"
    ],
    "p": [
      "A native iOS app for warehouse staff to pick, pack, and dispatch orders. It talks to several courier APIs for live dispatch and tracking.",
      "Reusable components make it quick to add features and cheap to maintain."
    ]
  },
  {
    "t": "Multi-carrier shipping integration",
    "tags": [
      "ShippIT",
      "StarShipIT",
      "REST",
      "CRON jobs"
    ],
    "p": [
      "Automated order fulfillment for fashion retail clients by connecting their systems to ShippIT and StarShipIT.",
      "Scheduled background jobs and event triggers cut out manual logistics work."
    ]
  }
];
