
let projects = {
  id: String,
  title: String,
  tasks: [

  ]
}

let arrayProjects = [];

module.exports = {

  async checkIdValid(request, response, next) {
    const { _id } = request.params;

    await arrayProjects.map((project) => {
      if (_id != project.id) {
        return response.status(400).json({ message: "Project not found with this ID." });
      }

      next();
    })
  },

  index(request, response) {
    return response.json(arrayProjects);
  },

  async store(request, response) {
    const { id, title, tasks = [] } = request.body;

    projects = {
      id,
      title,
      tasks
    };

    await arrayProjects.push(projects);

    return response.json(arrayProjects);
  },

  async update(request, response) {
    const { _id } = request.params;
    const { title } = request.body;

    await arrayProjects.map((project) => {
      if (_id == project.id) {
        projects.title = title;
      }
    })

    return response.json(arrayProjects);
  },

  async destroy(request, response) {
    const { _id } = request.params;
    await arrayProjects.map((project, index) => {
      if (_id == project.id) {
        arrayProjects.splice(index, 1);
      }
    })
    return response.send();
  },

  async addTask(request, response) {
    const { _id } = request.params;
    const { title } = request.body;

    await arrayProjects.map((project) => {
      if (_id == project.id) {
        project.tasks.push(title);
      }
    });

    return response.json(arrayProjects);
  }
}
