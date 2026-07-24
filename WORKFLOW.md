\# AI Development Workflow Comparison



\## Round 1 Approach



For Round 1, I used a simple and less detailed prompt to generate a settings form feature. The prompt provided limited context and did not include specific requirements, file references, design constraints, or verification instructions. The AI generated a functional implementation, but the process required more manual review because the output was created without a structured development plan.



During review, I focused on checking whether the form behavior worked correctly, whether validation handled user input properly, and whether the generated code followed good frontend practices.



\## Round 2 Approach



For Round 2, I used a more structured AI-assisted development workflow. Instead of giving only a general description, I provided detailed requirements, project context, and expected behavior. The prompt included implementation expectations, coding constraints, and a verification step after generating the solution.



The detailed approach encouraged better organization and made it easier to review the generated code. The AI output was evaluated before acceptance rather than being used immediately. This helped identify possible issues and ensured that the final implementation matched the project requirements.



\## Branch Comparison



The two branches show clear differences in project structure and development approach. The Round 2 branch contains a complete React/Vite application structure, including separate configuration files, styling files, assets, and a dedicated React entry point.



The detailed-prompt branch includes:

\- A structured React application using App.jsx and CSS files.

\- Project configuration files such as package.json and Vite configuration.

\- Updated CLAUDE.md rules based on lessons learned from AI-assisted development.



Compared with the first approach, the second workflow provides better documentation, clearer project rules, and a more organized development structure.



\## Correctness, Accessibility, and Edge Cases



The Round 2 workflow emphasized reviewing generated code before completion. Important checks included validating user inputs, ensuring form behavior worked correctly, and considering accessibility requirements such as readable labels and clear user feedback.



One AI mistake I identified during review was that generated code can appear complete while still requiring manual verification. I learned that AI output should be tested and reviewed instead of being accepted immediately.



\## Lessons Learned



This exercise showed that effective AI development depends on giving clear instructions, providing context, and using verification steps. A detailed prompt may require more planning initially, but it reduces correction time and improves the reliability of the final result.

