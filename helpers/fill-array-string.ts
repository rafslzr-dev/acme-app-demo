type FillArrayStringTypes = (args: {
  array: string[],
  maxCount: number,
  filler?: string,
  fillerIndexSuffix?: boolean
}) => string[]

export const fillArrayString: FillArrayStringTypes = ({
  array,
  maxCount = 1,
  filler,
  fillerIndexSuffix = false
}): string[] => {
  const additionalElementsCount = maxCount - array.length
  const splicedArray = array.slice(0, maxCount)

  // if filler is not specified, use the last value of the filler
  const defaultFiller = array.length > 0 && !filler ? array.at(-1) : 'Value'

  // Generate additional values if additionalElementCount is more than 0
  // Also facilitate generating names depending on the args condition
  const generatedAdditionalElements = additionalElementsCount > 0 ?
    [...splicedArray,
        ...Array.from({
          length: additionalElementsCount})
          .map((_, index) =>
          `${ filler || defaultFiller }${ fillerIndexSuffix ? index + 1: '' }`)
      ] : splicedArray

  return generatedAdditionalElements
}

