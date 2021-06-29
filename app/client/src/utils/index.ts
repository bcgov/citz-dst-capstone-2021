export default {
  getISODateString(input: Date | string): string {
    try {
      const date = input instanceof Date ? input : new Date(input);
      return date.toISOString().slice(0, 10);
    } catch {
      return '';
    }
  },
};
