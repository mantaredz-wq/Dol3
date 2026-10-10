function parseDmsOrderForm(entries) {
  const orders = [];
  for (const [index, rawEntry] of entries.entries()) {
    const value = String(rawEntry ?? '').trim();
    if (!value) {
      if (index === 0) return { error: 'Enter the first item and its order link.' };
      continue;
    }

    const separator = value.indexOf('|');
    if (separator < 0) {
      return { error: `Enter item ${index + 1} and its link separated by |.` };
    }
    const item = value.slice(0, separator).trim();
    const link = value.slice(separator + 1).trim();
    let parsedLink;
    try {
      parsedLink = new URL(link);
    } catch {
      return { error: `Enter a valid http or https link for item ${index + 1}.` };
    }
    if (item.length < 1 || item.length > 200
      || !['http:', 'https:'].includes(parsedLink.protocol)
      || /[|\s]/.test(link)
      || link.length > 1024) {
      return { error: `Enter a nonblank item (up to 200 characters) and a valid http or https link for item ${index + 1}.` };
    }
    orders.push({ item, link });
  }
  return { value: orders };
}

module.exports = { parseDmsOrderForm };
