function addPrefixToKeys<T extends object>(
  // helper function to add prefix to data when adding to firebase
  prefix: string,
  obj: T
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`${prefix}.${key}`, value])
  );
}
export { addPrefixToKeys };
