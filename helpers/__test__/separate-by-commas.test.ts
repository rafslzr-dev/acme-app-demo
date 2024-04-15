import { separateByCommas } from '../separate-by-commas'

describe('separateByCommass functionality', () => {

  it(`Returns single value if there's no comma separator`, () => {
    expect(separateByCommas('Oreo')).toEqual(['Oreo'])
    expect(separateByCommas(' Oreo Cream    ')).toEqual(['Oreo Cream'])
  })

  it('Converts string separated by commas to array of strings', () => {
    const stringWithComma = separateByCommas('Oreo,Reese,Doggo')
    const correctAssertion = ['Oreo', 'Reese', 'Doggo']

    expect(stringWithComma.sort()).toEqual(correctAssertion.sort());
  })

  it('Trims leading/trailing spaces', () => {
    const stringWithComma = separateByCommas('Oreo, Reese Puffs, Doggo')
    const stringWithCommaAndSpaces = separateByCommas('Oreo    , Reese Puffs, Doggo    ')
    const correctAssertion = ['Oreo', 'Reese Puffs', 'Doggo']

    expect(stringWithComma.sort()).toEqual(correctAssertion.sort());
    expect(stringWithCommaAndSpaces.sort()).toEqual(correctAssertion.sort());
  })

  it('Removes extra/blank string', () => {
    const stringWithComma = separateByCommas('Oreo, Reese, Doggo, , ,,')
    const correctAssertion = ['Oreo', 'Reese', 'Doggo']

    expect(stringWithComma.sort()).toEqual(correctAssertion.sort());
  })
})
