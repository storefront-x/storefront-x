export default function min(value: any, length: number) {
  return value?.length >= length || `At least ${length} characters`
}
