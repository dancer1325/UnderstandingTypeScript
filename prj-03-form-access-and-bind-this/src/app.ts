// It can be built of multiple ways, but we will follow an OOP
// Create an instance of the class, and render a form which belongs to that instance


class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  // Add specific HTML elements of the first template
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';   // Add css style

    // Get specific fields from the parent, based on the id, and cast them
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private submitHandler(event: Event) {
    event.preventDefault();   // Avoid triggering an HTTP request after submitting
    console.log(this.titleInputElement.value);
  }

  private configure() {
    // this  when it's passed to submitHandler, will be the current target of the event
    // this.element.addEventListener('submit', this.submitHandler);
    // submitHandler.bind(this)     this when the execution goes to submitHandler, will be this
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
