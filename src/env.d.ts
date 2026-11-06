/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * The Cloudflare Web Analytics token (#8, #38). Set it in the build's
   * environment; without it the beacon isn't added at all, so a local build
   * or a fork sends nothing.
   */
  readonly CF_ANALYTICS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
