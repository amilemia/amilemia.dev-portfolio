export function interpolate(
  template: string,
  values: Record<string, string | number | undefined>
): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_match, key: string) => {
    const value = values[key];
    return value === undefined || value === null ? "" : String(value);
  });
}
