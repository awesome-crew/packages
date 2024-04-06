import React from 'react';

import { Provider } from '../src/components';

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    Story => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
