## HEAD

- 🚀 Add introductory message to exercises.
- 🚀 Add video for the first exercise to show how to use the actor_process block.
- 🚀 [v1.0.0] `actor_processor`: Block that generates the process for an specific actor. Wraps the list of instruction for each actor with `ACTOR_PROCESS_STOP` and `ACTOR_PROCESS_START` instructions.
- 🚀 [v1.0.0] `actorProcessBeforeStartChecker`: Verify that all the parsed instructions are valid.
- 🚀 [v1.0.0] `actorProcessEndProcessor`: Process the `ACTOR_PROCESS_STOP` instruction.
- 🚀 [v1.0.0] `actorProcessStartProcessor`: Process the `ACTOR_PROCESS_START` instruction.
- 🚀 [v1.0.0] `hasLeftTheMazeProcessorBuilder`: Process the `LEAVE_MAZE` instruction, and it verifies if the number has entered the numeric lineand in which empty slot.
- 🚀 [v1.0.0] `atLeastOneNumberInTheLineBeforeEndChecker`: Check that at least one number is in the numeric line.
- 🚀 [v1.0.0] `allNumbersInOrderBeforeEndChecker`: Executes the verification that check if all the numbers are in order.
