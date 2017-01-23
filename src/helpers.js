export function convertFromSchemaToLodash(path) {
  return path.replace(/\.schema/g, '');
}
