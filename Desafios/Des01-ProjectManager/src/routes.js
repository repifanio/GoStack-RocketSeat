const { Router } = require('express');
const projectController = require('./controllers/projectsController');

const routes = Router();

routes.get('/projects', projectController.index);
routes.post('/projects', projectController.store);
routes.put('/projects/:_id', projectController.checkIdValid, projectController.update);
routes.delete('/projects/:_id', projectController.checkIdValid, projectController.destroy);
routes.post('/projects/:_id/tasks', projectController.checkIdValid, projectController.addTask);

module.exports = routes; 
