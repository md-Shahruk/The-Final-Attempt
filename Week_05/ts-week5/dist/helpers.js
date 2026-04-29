function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

module.exports = { generateId, formatDate };