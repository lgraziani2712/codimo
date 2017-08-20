## HEAD

### 🌎 codimo-activity-hello-codimo

- Version: `1.0.0`.
- Description: It's the introductory activity to Códimo.

### 📏 codimo-activity-numeric-line

- Version: `1.0.1`.
- Description: It's a 6-8 years old mathematical activity. The objective is to move the number into the numeric line while trying to leave a maze without falling in the attempt.

#### Updates

##### v1.0.1

- Add SVG image instead of emoji to `leave_maze` block. This homogenize the icon through every OS and browser, and ensures is going to be rendered as expected.
- Remove text from `leave_maze` block.

#### Technical Description

For the engine was necessary to add components for the number, the maze and the numeric line. New processors were required for the end-game instruction and the actor's representation change on reset. Also was required to add new functionalities for the actor.

Was added a new block: `leave_maze`. Is an end-game block specific for this activity.

The folder structure of this activity is de-facto structure for codimo's activities.
