const entityMap: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

export const sanitizeHtml = (html: string): string => {
  /* eslint-disable no-useless-escape */
  return html.replace(/[&<>"'\/]/g, key => entityMap[key]);
}

