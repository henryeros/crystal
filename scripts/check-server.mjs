async function check() {
  try {
    const res = await fetch("http://localhost:3000");
    const html = await res.text();
    console.log("HTML Status:", res.status, "Length:", html.length);
    const cssMatches = html.match(/href="([^"]+\.css[^"]*)"/g);
    console.log("CSS Matches:", cssMatches);
    if (cssMatches && cssMatches[0]) {
      const url = cssMatches[0].replace('href="', '').replace('"', '');
      const cssRes = await fetch("http://localhost:3000" + url);
      const css = await cssRes.text();
      console.log("CSS file status:", cssRes.status, "Length:", css.length, "First 100:", css.slice(0, 100));
    }
  } catch (err) {
    console.error("Error checking dev server:", err.message);
  }
}
check();
