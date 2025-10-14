export const splitTextIntoLines = (n: number, text: string) => {
  const words = text.trim().split(" ").filter(Boolean);
  const lines: string[][] = Array.from({ length: n }, () => []);
  const lineChars = new Array(n).fill(0);
  for (const w of words) {
    let idx = 0;
    for (let i = 1; i < n; i++) {
      if (lineChars[i] < lineChars[idx]) idx = i;
    }
    lines[idx].push(w);
    lineChars[idx] += w.length + 1;
  }
  return lines.map((l) => l.join(" "));
};
