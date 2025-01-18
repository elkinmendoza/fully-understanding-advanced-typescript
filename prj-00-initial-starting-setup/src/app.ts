// AutoBind Decorator

enum projectStatus {
  Active,
  Finished,
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public people: number,
    public status: projectStatus
  ) {}
}

type Listener = (items: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, des: string, people: number) {
    interface newProject {
      id: string;
      title: string;
      desc: string;
      people: number;
    }
    const newProject = new Project(
      Math.random().toString(),
      title,
      des,
      people,
      projectStatus.Active
    );

    this.projects.push(newProject);

    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid &&
      validatableInput.value.trim().length > validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length < validatableInput.maxLength;
  }
  if (validatableInput.min && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value > validatableInput.min;
  }

  if (validatableInput.max && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value < validatableInput.max;
  }

  return isValid;
}

const autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
};

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
  
    constructor(
      templateID: string,
      HostElementId: string,
      insertAtStart:boolean,
      newElementId?: string
    ) {
      this.templateElement = <HTMLTemplateElement>(
        document.getElementById(templateID)!
      );
      this.hostElement = document.getElementById(HostElementId)! as T;
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      ); //
  
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }
      this.attach(insertAtStart);
    }
  
    private attach(inserAtBeginning:boolean) {
      this.hostElement.insertAdjacentElement(inserAtBeginning ? 'afterbegin':'beforeend', this.element);
    }
  
    abstract configure():void;
    abstract renderContent():void;
  
  
  
  }
  
class ProjectInput extends Component <HTMLDivElement,HTMLFormElement> {

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputelement: HTMLInputElement;

  /**
   * Constructs an instance of the class.
   *
   * Initializes the `templateElement` by selecting the HTML template element with the ID 'projectInput'.
   * Initializes the `hostElement` by selecting the first HTML div element with the tag name 'app'.
   *
   * @remarks
   * The `importedNode` is created by importing the content of the `templateElement` into a new document node.
   */
  constructor() {

    super('project-input','app',true,'user-input');

    this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputelement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
   
    this.configure();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDes = this.descriptionInputElement.value;
    const enteredNumber = this.peopleInputelement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descValidatable: Validatable = {
      value: enteredDes,
      required: true,
      minLength: 5,
    };

    const numbValidatable: Validatable = {
      value: enteredNumber,
      required: true,
      min: 1,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descValidatable) ||
      !validate(numbValidatable)
    ) {
      alert("Invalid input, plese try again");
      return;
    } else {
      this.clearsInputs();
      return [enteredTitle, enteredDes, +enteredNumber];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const response = this.gatherUserInput();
    if (Array.isArray(response)) {
      const [title, desc, people] = response;
      projectState.addProject(title, desc, people);
    }
  }
  private clearsInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputelement.value = "";
  }

   configure() {
   

    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {
      
  }


}



class ProjectList extends Component<HTMLDivElement,HTMLElement> {


  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super('project-list','app',false , `${type}-projects`);
    this.assignedProjects=[]
   
    this.configure();
    this.renderContent();
  }

  configure(): void {
    projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === projectStatus.Active;
          }
          return prj.status === projectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
      
  }

   renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

   renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type
      .toUpperCase()
      .concat(" PROJECTS");
  }


}

const projectInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finsihedPrjList = new ProjectList("finished");
