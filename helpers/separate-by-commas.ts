type SeparateByCommasTypes = (str: string) => string[]

export const separateByCommas: SeparateByCommasTypes = (str): string[] =>
  str.split(',')
    .map((value) => value.trim())
    .filter((value) => !!value)

