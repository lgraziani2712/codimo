# Códimo core

## Structure

Códimo is structured in the following way:

- `engines/`
  - `{engine-name}/`
    - `components/`
      - `functionalities/`
        - Every functionality builder. Extends `FunctionalityBuilder` interface.
      - `componentGenerator.js`
      - Every `{componentName}Generator.js`. Extends `ComponentGenerator` interface. May have predefined functionalities.
    - `engineGenerator/`
      - `processors/`
        - `checkers/`
          - `engineErrorBuilder.js`.
          - Every `{checkerName}Builder.js`. Extends `CheckerBuilder` interface. Validates the processor state.
          - Every `{errorName}Generator.js`. Extends `EngineError` interface.
        - `processorGenerator.js`.
        - Every `{processorName}Builder.js`. Extends `ProcessorBuilder` interface. Builds a processor. Can be an `ExecutionProcessor` or a `ResetProcessor`.
      - `index.js`. The main `engineGenerator` function.
    - `executorGenerator/`
      - TODO.
