# Task It

Welcome to TaskIt, a web application that helps you manage your tasks and categories. This README will guide you through the installation process and provide an overview of the app's features.

## Installation

Follow these steps to get the project up and running on your local machine:

1. Clone the repository:
git clone https://github.com/LawrenceDarko/task-it.git

2. Change to the project directory:
cd task-it

3. Install the project dependencies using npm or yarn:

npm install
or
yarn install


4. Start the development server:
npm start
or
yarn start


5. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.

## Features

### Categories

- On the left sidebar, you can add new categories by clicking on the "+ Add category" button. These categories are saved to the local storage.

- When the app is loaded for the first time, it checks if there are no categories, and if true, it creates a default category item called 'All Tasks.'

### Tasks

- In the content area, you can add new tasks by clicking on the "+ Add Task" button located at the bottom of the content area. This action transforms the button into an input box where you can input task details.

- The input box has placeholders for task name, date, and a dropdown to select a category. You must provide values for name, category, and date to add a task.

- Tasks can be marked as complete by clicking on the ring icon next to them. Completed tasks are moved to the complete list, and clicking the ring icon again moves them back to the main list.

- Clicking on the name or date of a task opens a side modal displaying task details, which can be closed.

- Clicking on the green icon next to the date copies the task details to the clipboard.

### Search

- The app features a search function in the main content area. You can search for tasks by name, status, or date by typing in the search input field.

Feel free to explore and use these features to manage your tasks efficiently.

## Contributors

- [Lawrence Darko](https://github.com/LawrenceDarko)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

