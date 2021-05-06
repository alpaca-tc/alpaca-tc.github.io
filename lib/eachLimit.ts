type CallbackFunction = (value: any) => Promise<void>

const runner = async (items: Array<any>, fn: CallbackFunction) => {
  while (items.length > 0) {
    await fn(items.pop());
  }
}

export const eachLimit = async (items: Array<any>, limit: number, fn: CallbackFunction) => {
  return Promise.all([...Array(limit)].map(() => runner(items, fn)));
}
