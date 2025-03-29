/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval' https://challenges.cloudflare.com https://www.apple.com https://www.apple.com/apple-pay/ https://apple.com/apple-pay/ https://www.googletagmanager.com;
              style-src 'self' 'unsafe-inline';
              img-src * 'self' data: blob: https:;
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              child-src https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://dexscreener.com https://www.apple.com https://www.apple.com/apple-pay/ https://apple.com/apple-pay/;
              frame-src 'self' blob: https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://challenges.cloudflare.com https://dexscreener.com https://www.apple.com https://www.apple.com/apple-pay/ https://apple.com/apple-pay/;
              connect-src 'self' https://saveload.tradingview.com http://localhost:3000 https://datapi.jup.ag https://dexscreener.com https://*.privy.io https://auth.privy.io https://api.privy.io wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org wss://*.zan.top https://*.rpc.privy.systems https://api.relay.link https://api.testnets.relay.link https://explorer-api.walletconnect.com https://lp-agent-api.getnimbus.io https://rpc-aggregator.service.getnimbus.xyz https://api.lpagent.io https://*.block-engine.jito.wtf https://bundles.jito.wtf https://*.apple.com https://*.google.com https://google.com https://apple.com https://www.apple.com https://apple.com/apple-pay/ https://*.google-analytics.com https://www.google-analytics.com https://api.zan.top;
              worker-src 'self';
              manifest-src 'self' https://www.apple.com https://www.apple.com/apple-pay/ https://apple.com/apple-pay/
            `
              .replace(/\s+/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
