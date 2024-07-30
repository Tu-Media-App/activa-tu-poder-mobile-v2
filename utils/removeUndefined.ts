export const removeUndefined = (object: any) => {
  Object.keys(object).forEach(key => {
    if ((object as any)[key] === undefined) {
      delete (object as any)[key];
    }
  });
};
