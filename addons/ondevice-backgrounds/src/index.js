import React from 'react';

import addons, { makeDecorator } from '@storybook/addons';

import Events from './constants';
import Container from './container';

export const withBackgrounds = makeDecorator({
  name: 'withBackgrounds',
  parameterName: 'backgrounds',
  skipIfNoParametersOrOptions: true,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context, { options, parameters }) => {
    console.log('called here!');
    const data = parameters || options || [];
    const backgrounds = Array.isArray(data) ? data : Object.values(data);

    let background = 'transparent';
    if (backgrounds.length !== 0) {
      setTimeout(() => addons.getChannel().emit(Events.SET, backgrounds), 0);

      const defaultOrFirst = backgrounds.find(x => x.default) || backgrounds[0];

      if (defaultOrFirst) {
        background = defaultOrFirst.value;
      }
    }

    return (
      <Container initialBackground={background} channel={addons.getChannel()}>
        {getStory(context)}
      </Container>
    );
  },
});
