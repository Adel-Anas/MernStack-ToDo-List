/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import TaskController from '../Controllers/TaskController';
import Task from '../Models/TaskSchema';

jest.mock('../Models/TaskSchema');

describe('TaskController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTasks', () => {
    it('should get all tasks successfully', async () => {
      const req = { query: {} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Task.find.mockResolvedValueOnce([{ title: 'Task 1' }, { title: 'Task 2' }]);

      await TaskController.getAllTasks(req, res);

      expect(res.json).toHaveBeenCalledWith([{ title: 'Task 1' }, { title: 'Task 2' }]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should handle errors when getting tasks', async () => {
      const req = { query: {} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      Task.find.mockRejectedValueOnce('Some error');

      await TaskController.getAllTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('getTaskById', () => {
    it('should get a task by ID successfully', async () => {
      const req = { params: { id: 'someId' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Task.findById.mockResolvedValueOnce({ title: 'Task 1' });

      await TaskController.getTaskById(req, res);

      expect(res.json).toHaveBeenCalledWith({ title: 'Task 1' });
      expect(res.status).toHaveBeenCalledWith(200); // Adjusted to expect status 200
    });

    it('should handle errors when getting a task by ID', async () => {
      const req = { params: { id: 'someId' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      Task.findById.mockRejectedValueOnce('Some error');

      await TaskController.getTaskById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('postTask', () => {
    it('should create a new task successfully', async () => {
      const req = {
        body: {
          Title: 'New Task',
          Description: 'Task Description',
          Priority: 'High',
          CreatedBy: 'John Doe',
          Status: 'In Progress',
          DeletedAt: null,
          Deadline: '2024-12-31',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockCreatedTask = {
        _id: 'mockTaskId',
        Title: 'New Task',
        Description: 'Task Description',
        Priority: 'High',
        CreatedBy: 'Anas',
        Status: 'In Progress',
        DeletedAt: null,
        Deadline: '2024-12-31',
      };

      Task.create.mockResolvedValueOnce(mockCreatedTask);

      await TaskController.postTask(req, res);

      expect(res.json).toHaveBeenCalledWith(mockCreatedTask);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should handle errors when creating a task', async () => {
      const req = {
        body: {
          Title: 'Task Title',
          Description: 'Task Description',
          Priority: 'High',
          CreatedBy: 'Anas',
          Status: 'In Progress',
          DeletedAt: null,
          Deadline: '2024-12-31',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Mock Task.create to reject the operation (simulating an error)
      Task.create.mockRejectedValueOnce('Some error');

      await TaskController.postTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const req = { params: { id: 'taskId' }, body: { /* update fields */ } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      // Mock the Task.findByIdAndUpdate to resolve successfully
      Task.findByIdAndUpdate.mockResolvedValueOnce({ /* updated task data */ });

      await TaskController.updateTask(req, res);

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith('taskId', req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ /* updated task data */ });
      expect(res.send).not.toHaveBeenCalled();
    });

    it('should handle errors when updating a task', async () => {
      const req = { params: { id: 'taskId' }, body: { /* update fields */ } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      Task.findByIdAndUpdate.mockRejectedValueOnce('Some error');

      await TaskController.updateTask(req, res);

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith('taskId', req.body);
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should handle missing id when updating a task', async () => {
      const req = { params: {}, body: { 
        Title: 'Task Title',
        Description: 'Task Description',
        Priority: 'High',
        CreatedBy: 'Anas',
        Status: 'In Progress',
        DeletedAt: null,
        Deadline: '2024-12-31',
       } };
      const res = {
        send: jest.fn(),
      };

      await TaskController.updateTask(req, res);

      expect(res.send).toHaveBeenCalledWith("Id Not Found, can't update");
    });
  });




  describe('softDeleteTask', () => {
    it('should soft delete a task successfully', async () => {
      const req = { params: { id: 'taskId' } };
      const res = {
        send: jest.fn(),
      };

      // Mock the Task.findByIdAndUpdate to resolve successfully
      Task.findByIdAndUpdate.mockResolvedValueOnce();

      await TaskController.softDeleteTask(req, res);

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith('taskId', { DeletedAt: expect.any(String) });
      expect(res.send).toHaveBeenCalledWith('Item Deleted Successfully');
    });

    it('should handle errors when soft deleting a task', async () => {
      const req = { params: { id: 'taskId' } };
      const res = {
        send: jest.fn(),
      };

      // Mock the Task.findByIdAndUpdate to reject the operation (simulating an error)
      Task.findByIdAndUpdate.mockRejectedValueOnce('Some error');

      await TaskController.softDeleteTask(req, res);

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith('taskId', { DeletedAt: expect.any(String) });
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });


});
