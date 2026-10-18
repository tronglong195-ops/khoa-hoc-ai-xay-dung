// Direct import of pre-bundled documents
import docsMap from './docsMap.json';

export function getDocContent(safeDocId: string): string {
  if (safeDocId in docsMap) {
    return (docsMap as Record<string, string>)[safeDocId];
  }
  for (const [k, v] of Object.entries(docsMap)) {
    if (k.endsWith(safeDocId)) {
      return v;
    }
  }
  return '';
}

export function getAllDocKeys(): string[] {
  return Object.keys(docsMap);
}
