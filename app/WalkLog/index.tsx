import { WalkLog } from './WalkLog'
import { useNextQueryParams } from '@/hooks'

const WalkLogApp: React.FC = () => {
  const dogCount = useNextQueryParams('dogCount') || '3'
  const formCount = Number.parseInt(dogCount)

  return <WalkLog generateFormCount={formCount}/>
}

export default WalkLogApp;
