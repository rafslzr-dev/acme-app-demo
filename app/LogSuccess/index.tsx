
import { Button, Result } from 'antd';
import { AppLayout} from '@/components'
import { useRouter } from 'next/router';

const LogSuccess: React.FC = () => {
  const router = useRouter()
  return <AppLayout>
    <Result
      status="success"
      title="Dog Walk Logs Submitted Successfully!"
      subTitle="Thank you for taking your time logging your dog walk data."
      extra={[
        <Button
          type="primary"
          key="home-button"
          size='large'
          onClick={() => {
            router.push('/')
          }}>
          Go Back to Homepage
        </Button>
      ]}
    />
  </AppLayout>
}

export default LogSuccess;
