import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// KV 인크리멘털 캐시: 더미 캐시로는 프리렌더 페이지가 요청마다 200/404를
// 오가는 문제가 있었다(실측). R2는 카드 등록이 필요해 KV 사용.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
