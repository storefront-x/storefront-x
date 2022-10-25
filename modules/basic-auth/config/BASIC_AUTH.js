import { panic } from '@sfx/utils/CoreUtils'
import { runtimeEnv } from '@sfx/utils/EnvUtils'

// Format: user1:password1|user2:password2
export default runtimeEnv('BASIC_AUTH') ||
  (process.env.NODE_ENV === 'production' ? panic('Missing "BASIC_AUTH" env variable!') : '')
