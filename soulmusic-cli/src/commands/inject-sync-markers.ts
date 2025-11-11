import fs from 'fs';
export async function injectSyncMarkers(input: string, markers: string, wallet: string, output: string) {
  const markerArr = markers.split(',').map(m => m.trim());
  const meta = { input, markers: markerArr, wallet, output, injectedAt: new Date().toISOString() };
  fs.writeFileSync(output, `SYNC_MARKERS_PLACEHOLDER\n` + JSON.stringify(meta, null, 2));
  return { path: output, meta };
}