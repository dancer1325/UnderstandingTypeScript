// It can be built of multiple ways, but we will follow an OOP
// Create an instance of the class, and render a form which belongs to that instance

// Get access to the template and the div app
class ProjectInput {
  // Give access to the template which holds the content
  templateElement: HTMLTemplateElement;   // Globally available, because you use 'dom' in compilerOptions.lib into tsconfig.json

  // Element where I want to render my template content
  // We specified in the 'html' as a div --> We can specify as div as it's
  hostElement: HTMLDivElement;

  // Concrete templateElement's element to get access to the content.
  // Form in this case
  element: HTMLFormElement;

  constructor() {
    this.templateElement =
        // ways to cast it
        // 1)
    //     <HTMLTemplateElement>
    //     document.getElementById(
    //   'project-input'
    // )!
        // 2)
        <HTMLTemplateElement>
        document.getElementById(
            'project-input'
        )!as HTMLTemplateElement;      // !  handled by us, and we trust that it exists
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // Import the content of templateElement
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // firstElementChild    Because 'project-input' template just contain 1! child, which it's a form
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    // Position from tag, about where to insert
    // insertedElement    Element coming from
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

// Create an instance --> invoke the constructor --> Render the form after the begin of the tag in our case
const prjInput = new ProjectInput();
