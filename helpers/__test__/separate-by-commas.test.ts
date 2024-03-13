import { separateByComma } from '../separate-by-commas'

describe('separateByCommas functionality', () => {

  it(`Returns single value if there's no comma separator`, () => {
    expect(separateByComma('Oreo')).toEqual(['Oreo'])
    expect(separateByComma(' Oreo Cream    ')).toEqual(['Oreo Cream'])
  })

  it('Converts string separated by commas to array of strings', () => {
    const stringWithComma = separateByComma('Oreo,Reese,Doggo')
    const correctAssertion = ['Oreo', 'Reese', 'Doggo']

    expect(stringWithComma.sort()).toEqual(correctAssertion.sort());
  })

  it('Trims leading/trailing spaces', () => {
    const stringWithComma = separateByComma('Oreo, Reese Puffs, Doggo')
    const stringWithCommaAndSpaces = separateByComma('Oreo    , Reese Puffs, Doggo    ')
    const correctAssertion = ['Oreo', 'Reese Puffs', 'Doggo']

    expect(stringWithComma.sort()).toEqual(correctAssertion.sort());
    expect(stringWithCommaAndSpaces.sort()).toEqual(correctAssertion.sort());
  })

  it('Removes extra/blank string', () => {
    const stringWithComma = separateByComma('Oreo, Reese, Doggo, , ,,')
    const correctAssertion = ['Oreo', 'Reese', 'Doggo']

    expect(stringWithComma.sort()).toEqual(correctAssertion.sort());
  })
})
