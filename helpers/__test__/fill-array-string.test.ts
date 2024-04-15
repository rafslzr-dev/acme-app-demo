
import { fillArrayString } from '../fill-array-string'

describe('fillArrayString functionality', () => {

  it(`Fills additional element with last element in an array if filler is not specified`, () => {
    const array = ['Oreo', 'Reese', 'Doggo']
    const generatedArray = fillArrayString({
      array,
      maxCount: 5,
    })
    const correctAssertion = ['Oreo', 'Reese', 'Doggo', 'Doggo', 'Doggo']

    expect(generatedArray.sort()).toEqual(correctAssertion.sort())
  })

  it(`Fills additional element with filler if filler is specified`, () => {
    const array = ['Oreo', 'Reese', 'Doggo']
    const generatedArray = fillArrayString({
      array,
      maxCount: 5,
      filler: 'Sam'
    })
    const correctAssertion = ['Oreo', 'Reese', 'Doggo', 'Sam', 'Sam']

    expect(generatedArray.sort()).toEqual(correctAssertion.sort())
  })

  it(`Slices the array if maxCount < array length`, () => {
    const array = ['Oreo', 'Reese', 'Doggo', 'Doggie']
    const generatedArray = fillArrayString({
      array,
      maxCount: 2,
    })

    const generatedArrayWithFiller = fillArrayString({
      array,
      maxCount: 3,
      filler: 'Sam'
    })
    const generatedArrayWithFillerAndIndex = fillArrayString({
      array,
      maxCount: 2,
      filler: 'Sam',
      fillerIndexSuffix: true
    })

    expect(generatedArray.sort()).toEqual(['Oreo', 'Reese'].sort())
    expect(generatedArrayWithFiller.sort()).toEqual(['Oreo', 'Reese', 'Doggo'].sort())
    expect(generatedArrayWithFillerAndIndex.sort()).toEqual(['Oreo', 'Reese'].sort())
  })

  it(`Fills additional element if fillerIndexSuffix is set to true`, () => {
    const array = ['Oreo', 'Reese', 'Doggo']
    const generatedArray = fillArrayString({
      array,
      maxCount: 5,
      fillerIndexSuffix: true
    })

    const generatedArrayWithFiller = fillArrayString({
      array,
      maxCount: 5,
      filler: 'Dog',
      fillerIndexSuffix: true
    })

    expect(generatedArray.sort()).toEqual(['Oreo', 'Reese', 'Doggo', 'Doggo1', 'Doggo2'].sort())
    expect(generatedArrayWithFiller.sort()).toEqual(['Oreo', 'Reese', 'Doggo', 'Dog1', 'Dog2'].sort())
  })

  it(`Generates elements if empty array is given`, () => {
    const array: string[] = []

    const generatedArray = fillArrayString({
      array,
      maxCount: 2,
    })

    const generatedArrayWithFiller = fillArrayString({
      array,
      maxCount: 5,
      filler: 'Dog',
    })

    const generatedArrayWithFillerAndIndex = fillArrayString({
      array,
      maxCount: 5,
      filler: 'Dog',
      fillerIndexSuffix: true
    })

    expect(generatedArray.sort()).toEqual(['Value', 'Value'].sort())
    expect(generatedArrayWithFiller.sort()).toEqual(['Dog', 'Dog', 'Dog', 'Dog', 'Dog'].sort())
    expect(generatedArrayWithFillerAndIndex.sort()).toEqual(['Dog1', 'Dog2', 'Dog3', 'Dog4', 'Dog5'].sort())
  })

  it(`Returns empty array if maxCount is 0`, () => {
    const array = ['Oreo', 'Reese', 'Doggo']
    const emptyArray: string[] = []

    const generatedArray = fillArrayString({
      array,
      maxCount: 0,
    })
    const generatedWithEmptyArray = fillArrayString({
      array: emptyArray,
      maxCount: 0,
    })

    expect(generatedArray).toEqual([])
    expect(generatedWithEmptyArray).toEqual([])
  })
})
