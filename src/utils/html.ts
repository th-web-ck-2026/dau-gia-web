const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
};

export const decodeHtmlEntities = (input?: string | null): string => {
  if (!input) return "";

  return input.replace(
    /&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g,
    (match, entity: string) => {
      if (entity[0] === "#") {
        const isHex = entity[1]?.toLowerCase() === "x";
        const rawNumber = entity.slice(isHex ? 2 : 1);
        const codePoint = Number.parseInt(rawNumber, isHex ? 16 : 10);
        if (!Number.isFinite(codePoint)) return match;
        try {
          return String.fromCodePoint(codePoint);
        } catch {
          return match;
        }
      }

      const replacement = NAMED_ENTITIES[entity.toLowerCase()];
      return replacement ?? match;
    }
  );
};
