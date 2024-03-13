type SeparateByCommaTypes = (str: string) => string[]

export const separateByComma: SeparateByCommaTypes = (str): string[] =>
  str.split(',')
    .map((value) => value.trim())
    .filter((value) => !!value)

