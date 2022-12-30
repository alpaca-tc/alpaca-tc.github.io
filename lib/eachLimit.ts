type CallbackFunction<T> = (value: T) => Promise<void>;

const runner = async <T>(items: Array<T>, fn: CallbackFunction<T>) => {
  while (items.length > 0) {
    const val = items.pop();
    if (val !== undefined) {
      await fn(val);
    }
  }
};

export const eachLimit = async <T>(
  items: Array<T>,
  limit: number,
  fn: CallbackFunction<T>,
) => {
  return await Promise.all([...Array(limit)].map(() => runner<T>(items, fn)));
};
