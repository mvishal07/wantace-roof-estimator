# AI Log

I used ChatGPT and Claude during the project as development assistants. I mainly used them for debugging, code reviews, implementation ideas, UI/CSS improvements, and checking whether the project met the requirements.

I also used AI to think through the project architecture, configuration system, authentication, API structure, Git workflow, and possible edge cases in the estimator calculation.

One issue where the AI's first solution was not enough was with disabled questions. At first, the calculator still tried to validate questions even when the owner had disabled them. This caused errors such as `Invalid stories selection` when the `stories` question was turned off. I found this while testing the actual application and fixed the logic so disabled questions are ignored and their calculation multiplier is treated as neutral. I also made sure the public estimator does not show disabled questions.

I personally worked on and reviewed the application structure, configuration, calculator logic, admin authentication, API integration, database setup, and UI. I did not assume that AI-generated code was always correct. I tested the application, checked runtime errors, and changed the code whenever something did not meet the requirements.

Overall, AI helped me work faster by giving me implementation ideas and pointing out possible edge cases. However, I was responsible for deciding what to build, choosing the architecture within the 24-hour time limit, testing the application, and understanding the code well enough to explain and modify it myself.
