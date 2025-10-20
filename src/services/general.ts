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

export const ageCalculatorFromNationalityID = (nationalityID: string) => {
  if (!/^\d{14}$/.test(nationalityID)) return null;

  // 1st digit = century of birth
  const centuryDigit = Number(nationalityID[0]);
  if (centuryDigit < 1 || centuryDigit > 9) return null;

  // next 6 digits = YYMMDD
  const yy = Number(nationalityID.slice(1, 3));
  const mm = Number(nationalityID.slice(3, 5));
  const dd = Number(nationalityID.slice(5, 7));

  // map century
  const baseCenturyYear = 1800 + 100 * (centuryDigit - 1);
  const fullYear = baseCenturyYear + yy;

  // validate date
  const birthDate = new Date(fullYear, mm - 1, dd);
  if (
    birthDate.getFullYear() !== fullYear ||
    birthDate.getMonth() !== mm - 1 ||
    birthDate.getDate() !== dd
  ) {
    return null;
  }

  // compute age
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) age--;

  return {
    age: age >= 0 ? age : null,
    birthDate: `${String(birthDate.getDate()).padStart(2, "0")}/${
      birthDate.getMonth() + 1
    }/${birthDate.getFullYear()}`,
  };
};
