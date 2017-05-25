/**
 * @author Luciano Graziani @lgraziani2712
 *
 * @flow
 */

declare module '@storybook/addon-actions' {
  declare module.exports: {
    action(description: string): (event: SyntheticEvent) => void;
  };
}

declare module '@storybook/addon-links' {
  declare module.exports: {
    /**
     * With this, you can link an event in a component to any story in the Storybook.
     *  First parameter is the the story kind name (what you named with storiesOf).
     *  Second parameter is the story name (what you named with .add).
     */
    linkTo(storiesOfName: string, addName: string): (event: SyntheticEvent) => void;
  };
}
