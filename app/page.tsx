import { UserProfile } from './components/UserProfile'
import { ComingSoon } from './components/ComingSoon'
import { LoadingScreen } from './components/LoadingScreen'
import { TelegramAccessChecker } from './components/TelegramAccessChecker'

export default function Home() {
  return <TelegramAccessChecker />
}
