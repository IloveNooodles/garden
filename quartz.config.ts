import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "mgarebaldhie's digital garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "garden.mgarebaldhie.com",
    ignorePatterns: ["Private", "Templates", "Excalidraw", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Exo 2",
        body: "Noto Sans",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fafafa",
          lightgray: "#e4e6eb",
          gray: "#8b92a7",
          darkgray: "#3d4451",
          dark: "#1a1d29",
          secondary: "#4a7ba7",
          tertiary: "#7c6baf",
          highlight: "rgba(74, 123, 167, 0.1)",
          textHighlight: "#e0a95088",
        },
        darkMode: {
          light: "#0d1117",
          lightgray: "#1c2128",
          gray: "#4a5568",
          darkgray: "#adb5bd",
          dark: "#e8eaed",
          secondary: "#5b8fb9",
          tertiary: "#8b7ab8",
          highlight: "rgba(91, 143, 185, 0.15)",
          textHighlight: "#d4a57388",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
};

export default config;
