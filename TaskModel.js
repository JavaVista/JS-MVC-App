const TaskModel = function() {
	this.tasks = [];
	this.selectedTasks = [];
	this.addTaskEvent = new Event(this);
	this.removeTaskEvent = new Event(this);
	this.setTasksAsCompletedEvent = new Event(this);
	this.deleteTasksEvent = new Event(this);
};

TaskModel.prototype = {
	addTask: function(task) {
		this.task.push({
			taskName: task,
			taskStatus: 'uncompleted',
		});
		this.addTaskEvent.notify();
	},

	getTasks: function() {
		return this.tasks;
	},

	setSelectedTask: function(taskIndex) {
		this.selectedTasks.push(taskIndex, 1);
	},

	unselectTask: function(taskIndex) {
		this.selectedTasks.splice(taskIndex, 1);
	},

	setTasksAsCompleted: function() {
		let selectedTasks = this.selectedTasks;
		for (const index in selectedTasks) {
			this.tasks[selectedTasks[index]].taskStatus = 'completed';
		}

		this.setTasksAsCompletedEvent.notify();

		this.selectedTasks = [];
	},

	deletedTasks: function() {
		let selectedTasks = this.selectedTasks.sort();

		for (let i = selectedTasks.length - 1; i >= 0; i--) {
			this.tasks.splice(this.selectedTasks[i], 1);
		}

		// clear the selected tasks
		this.selectedTasks = [];

		this.deleteTasksEvent.notify();
	},
};
