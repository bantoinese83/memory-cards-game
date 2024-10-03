# Memory Cards Game

Memory Cards Game is a web-based card matching game built with Flask, JavaScript, and CSS. The game features multiple themes, difficulty levels, score tracking, timer, hint, and restart options. It also includes a two-player mode with alternating turns. The game is designed to test your memory and concentration skills while providing an enjoyable and interactive experience.

## Features

- Multiple themes: Emojis, Animals, Fruits
- Three difficulty levels: Easy, Medium, Hard
- Score, moves, and misses tracking
- Timer and remaining moves display
- Hint and restart buttons
- Best record saved in local storage
- Two-player mode with alternating turns
- Cool match animation and sound effects

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/bantoinese83/memory-cards-game.git
    cd memory-cards-game
    ```

2. Create a virtual environment and activate it:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Install the necessary npm packages:
    ```sh
    npm install
    ```

## Usage

1. Run the Flask application:
    ```sh
    python app.py
    ```

2. Open your web browser and navigate to `http://127.0.0.1:5000/`.

3. Select a theme and difficulty level, then click "Start Game" to begin.

## Features

- Multiple Themes: Choose from a variety of themes including Emojis, Animals, and Fruits.

- Difficulty Levels: Select from Easy, Medium, or Hard to adjust the number of cards and challenge.

- Two Player Mode: Play against another player with separate scores.

- Score Tracking: View your score, moves, misses, remaining moves, and best record.

- Timer: Keep track of your time with a countdown timer.

- Hint Feature: Get a hint by temporarily flipping two cards to reveal their values.

- Restart Option: Restart the game at any time to start fresh.

- Game Over Screen: Displays the final score and the winner at the end of the game.



## How to Play
1. Select Theme: Choose the theme for the game.

2. Select Difficulty: Choose the difficulty level (Easy, Medium, or Hard).

3. Start Game: Click "Start Game" to begin.

4. Flip Cards: Click on cards to flip them and reveal their values.

5. Match Pairs: Try to find matching pairs by flipping two cards.

6. Score Points: Earn points for matching pairs.

7. Keep Track: Monitor your score, moves, misses, and remaining moves.

8. Use a Hint: Click "Hint" to temporarily reveal a matching pair.

9. Restart: Click "Restart" to start a new game.

10. Game Over: The game ends when all pairs are matched or time runs out.


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

