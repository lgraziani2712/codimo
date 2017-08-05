## HEAD

### 🌎 codimo-activity-hello-codimo

- Version: `1.0.0`.
- Description: It's the introductory activity to Códimo.

### 📏 codimo-activity-numeric-line

- Version: `1.0.0`.
- Description: It's a 6-8 years old mathematical activity. The objective is to move the number into the numeric line while trying to leave a maze without falling in the attempt.

#### Technical Description

For the engine was necessary to add components for the number, the maze and the numeric line. New processors were required for the end-game instruction and the actor's representation change on reset. Also was required to add new functionalities for the actor.

Was added a new block: `leave_maze`. Is an end-game block specific for this activity.

The folder structure of this activity is de-facto structure for codimo's activities.
