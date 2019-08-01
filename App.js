$(function() {
	const model = new TaskModel(),
		view = new TaskView(),
		controller = new TaskController(model, view);
});
