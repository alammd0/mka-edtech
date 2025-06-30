export const formatDate = (dateString) => {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  // Check for invalid date
  if (isNaN(date.getTime())) {
    return null;
  }

  // Format date part: e.g., "June 30, 2025"
  const datePart = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Format time part: e.g., "5:30 PM"
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${datePart} | ${timePart}`;
};
