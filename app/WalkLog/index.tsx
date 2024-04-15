import { WalkLog } from './WalkLog'
import { useNextQueryParams } from '@/hooks'
import { WalkLogFormInputTypes } from '@/components'
const WalkLogApp: React.FC = () => {
  const dogCount = useNextQueryParams('dogCount')
  const presets = useNextQueryParams('preset')

  const formCount = Number.parseInt(dogCount || '3')

  // Should properly parse the uri query in the future.
  const formPresets = presets ? JSON.parse(presets.replaceAll('+', ' ')) as WalkLogFormInputTypes[] : undefined

  return <WalkLog
            generateFormCount={formCount}
            formPresets={formPresets}
            />
}

export default WalkLogApp;
