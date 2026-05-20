import { Platform } from 'react-native';

import { WEB_CONTENT_MAX_WIDTH } from '../theme/webLayout';

export const webContentWidth = Platform.select({
  web: {
    width: '100%',
    maxWidth: WEB_CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
  default: {},
});
