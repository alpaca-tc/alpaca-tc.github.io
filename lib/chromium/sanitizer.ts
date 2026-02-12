const entityMap: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "-": "&hyphen;",
  "/": '&#x2F;'
};

export const sanitizeHtml = (html: string): string => {
  return html.replace(/[&<>"'\/]/g, key => entityMap[key]);
}
