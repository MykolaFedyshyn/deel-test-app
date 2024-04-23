# Part 2

## Questions

1. What is the difference between Component and PureComponent?
   Give an example where it might break my app.
   > The main difference between the Component and PureComponent is in implementaion of shouldComponentUpdate() lifecycle method, this means that if the props and state remain shallowly equal (i.e., their references remain the same), the pure component will not re-render.
   >
   > > Example where PureComponent might break the app: Suppose we have a parent component that passes an array prop to a child component. In the child component, we use this array prop to render a list of items but the array itself remains the same reference in memory even if its contents change. This scenario can lead to issues with pure components because they rely on shallow comparisons to determine whether to re-render.
2. Context + ShouldComponentUpdate might be dangerous. Why is
   that?
   > Context provides a way to pass data through the component tree without having to pass props down manually at every level. However, changes in context values can trigger re-renders in components that consume the context, even if their props or state haven't changed. If we use shouldComponentUpdate to optimize rendering based on props or state, changes in context could bypass this optimization and lead to unnecessary re-renders.
  
3. Describe 3 ways to pass information from a component to its
   PARENT.
   > - Callback Functions: Child components call callback functions passed as props by their parent to send information back.
   > - Context API: Parents provide context values that child components consume to communicate indirectly.
   > - Prop drilling: Shared state is managed by a common parent, passed down as props to children for updates
4. Give 2 ways to prevent components from re-rendering.
   > - We can use Pure components for classes or React.memo() for functional components
   >
   > - Implement conditional rendering to render components or elements only when necessary. 
5. What is a fragment and why do we need it? Give an example where it
   might break my app.
   > A fragment in React is a lightweight syntax for grouping multiple elements without introducing extra DOM nodes. We use fragments to keep component structure clean and improve performance by avoiding unnecessary container elements.
   >
   > > I assume there might be some performance issues in case when we use a large amount of fragments in some complex DOM structures like list, etc
6. Give 3 examples of the HOC pattern.
   > The HOC (High Order Component) pattern is used to wrap a component in another component that adds some functionality.
   >
   > - HOC for Authentication: we can check if the user is authenticated before rendering the component and i.e redirect to the login page if not.
   > - HOC for Loading: add loading state to a component, display it only when loading is complete, or show a spinner etc.
   > - HOC for Error Handling: wrap a component to manage errors
7. What's the difference in handling exceptions in promises,
   callbacks and async…await?

   > In general, promises offer a structured approach to asynchronous programming with clear error handling, while callbacks are flexible but can lead to callback hell. Async...await combines the best of both worlds by providing a synchronous-like syntax with improved error handling, making code more readable and maintainable. 

8. How many arguments does setState take and why is it async.
   > The setState function takes two arguments: new state and an optional callback function. React handles state updates asynchronously, scheduling them for future execution and combining multiple updates into one batch for optimization. After updating the state and re-rendering the component, the optional callback, if provided, is executed.
9. List the steps needed to migrate a Class to Function Component.
    > Main steps needed to migrate a Class to Function Component:
    > - Convert State to Hooks: Replace class-based state (this.state) with the useState hook.
    > - Migrate Lifecycle and Side Effects: Move lifecycle methods and side effects (e.g., data fetching) to the useEffect hook.
    > - Refactor Class Methods: Convert class methods to regular functions outside the component or custom hooks.
    > - Replace this References: Replace references to this.props and this.state with function arguments and useState/setState hooks, respectively.
    > - Remove Class Syntax: Replace the class component syntax with a function component and remove the render method.
10. List a few ways styles can be used with components.
    > Inline Styles: Styles can be applied directly to JSX elements using the style attribute. For example:

    ```javascript
    <div style={{ color: 'red', fontSize: '16px' }}>Inline Styles</div>

    ```

    > CSS modules. This prevents style conflicts and makes styling more maintainable. For example:

    ```javascript
    import styles from './MyComponent.module.css';

    const MyComponent = () => {
      return <div className={styles.container}>My Component</div>;
    };
    ```

    > CSS-in-JS Libraries, i.e. Styled Components: Styled Components is a library that allows to write CSS directly with JavaScript code using tagged template literals. For example:

    ```javascript
    import styled from 'styled-components';

    const StyledDiv = styled.div`
      color: blue;
      font-size: 16px;
    `;
    
    function Component() {
      return <StyledDiv>Styled Components</StyledDiv>;
    }

    ```

    > Global Stylesheets: CSS stylesheets can be imported directly or added to the HTML file

     ```javascript
    import './styles.css';

    const SomeComponent = () => {
      return <div className="container">text</div>;
    };
    ```


12. How to render an HTML string coming from the server.

    > We can use the `dangerouslySetInnerHTML` attribute. But we need to be cautious when we use dangerouslySetInnerHTML attr, as it bypasses React's built-in XSS protections.  For example:

    ```javascript
    const SomeComponent = () => {
      return (
        <div dangerouslySetInnerHTML={{ __html: '<h1>Hello World</h1>' }} />
      );
    };
    ```
