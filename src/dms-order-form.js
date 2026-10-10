function parseDmsOrderForm(entries, startItemNumber = 1) {
  const orders = [];
  for (const [index, entry] of entries.entries()) {
    const itemNumber = startItemNumber + index;
    const item = String(entry.item ?? '').trim();
    const link = String(entry.link ?? '').trim();
    if (!item && !link) {
      if (index === 0) return { error: `Enter item ${itemNumber} and its order link.` };
      continue;
    }
    if (!item || !link) {
      return { error: `Enter both item ${itemNumber} and its order link.` };
    }
    let parsedLink;
    try {
      parsedLink = new URL(link);
    } catch {
      return { error: `Enter a valid http or https link for item ${itemNumber}.` };
    }
    if (item.length < 1 || item.length > 200
      || !['http:', 'https:'].includes(parsedLink.protocol)
      || /\s/.test(link)
      || link.length > 1024) {
      return { error: `Enter a nonblank item (up to 200 characters) and a valid http or https link for item ${itemNumber}.` };
    }
    orders.push({ item, link });
  }
  return { value: orders };
}

module.exports = { parseDmsOrderForm };
