export const compareAndGetChangedFields = (
  newData: Record<string, any>,
  originalData: Record<string, any>,
): Record<string, any> => {
  const changedFields: Record<string, any> = {};

  Object.keys(newData).forEach((key) => {
    const newValue = newData[key];
    const originalValue = originalData[key];

    // Special handling for date comparisons
    const isDate =
      newValue instanceof Date ||
      (typeof newValue === "string" && /\d{4}-\d{2}-\d{2}/.test(newValue));

    if (isDate) {
      const newDateStr = new Date(newValue).toISOString().split("T")[0];
      const originalDateStr = originalValue
        ? new Date(originalValue).toISOString().split("T")[0]
        : null;

      if (newDateStr !== originalDateStr) {
        changedFields[key] = newValue;
      }
    } else {
      if (newValue !== originalValue && newValue !== "") {
        changedFields[key] = newValue;
      }
    }
  });

  return changedFields;
};
