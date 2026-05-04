export const checkAllspace = (message: string) => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validator(_: any, value: string) {
    if (value && value.trim() === "") {
      return Promise.reject(new Error(message));
    }
    return Promise.resolve();
  },
});
