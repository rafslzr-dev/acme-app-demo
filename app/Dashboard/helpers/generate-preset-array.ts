import { WalkLogFormInputTypes } from '@/components'
import { LogPresetTypes } from '../components'
import { separateByCommas, fillArrayString } from '@/helpers'

type GeneratePresetArrayTypes = (preset: LogPresetTypes) => WalkLogFormInputTypes[]

export const generatePresetArray: GeneratePresetArrayTypes = ({
  dogCount,
  dogName,
  walkDistance,
  rating,
  notes
}) => {
  const generatedDogName = fillArrayString({
    array: separateByCommas(dogName),
    maxCount: dogCount,
    fillerIndexSuffix: true
  })

  const generatedWalkDistance = fillArrayString({
    array: separateByCommas(walkDistance),
    maxCount: dogCount,
  })

  return Array.from({
    length: dogCount})
    .map((_, index) => ({
      dogName: generatedDogName[index],
      walkDistance: Number.parseInt(generatedWalkDistance[index]),
      rating,
      notes
    }))
}
