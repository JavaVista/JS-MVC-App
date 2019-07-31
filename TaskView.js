const TaskView = function (model) {
    this.model = model;
    this.addTaskEvent = new Event(this);
    this.selectTaskEvent = new Event(this);
    this.unselectTaskEvent = new Event(this);
    this.completeTaskEvent = new Event(this);
    this.deleteTaskEvent = new Event(this);

    this.init();
};

TaskView.prototype = {

    init: function () {
        this.createChildren()
            .setupHandlers()
            .enable();
    },

    createChildren: function () {
        // cache the document object
        this.$container = $('.js-container');
        this.$addTaskButton = this.$container.find('.js-add-taskbutton');
        this.$taskTextBox = this.$container.find('js-task.textbox');
        this.$tasksContainer = this.$container.find('js-task-container');

        return this;
    },

    setupHandlers: function () {

        this.addTaskButtonHandler = this.addTaskButton.bind(this);
        this.selectOrUnselectTaskHandler = this.selectOrUnselectTask.bind(this);
        this.completeTaskButtonHandler = this.completeTaskButton.bind(this);
        this.deleteTaskButtonHandler = this.deleteTaskButton.bind(this);

        // Handlers from Event Dispatcher
        this.addTaskHandler = this.addTask.bind(this);
        this.clearTaskTextBoxHandler = this.clearTaskTextBox.bind(this);
        this.setTaskAsCompletedHandler = this.setTaskAsCompleted.bind(this);
        this.deleteTasksHandler = this.deleteTasks.bind(this);

        return this;
    },

    enable: function () {

        this.$addTaskButton.click(this.addTaskButtonHandler);
        this.$container.on('click', '.js-task', this.selectOrUnselectTaskHandler);
        this.$container.on('click', '.js-complete-task-button', this.completeTaskButtonHandler);
        this.$container.on('click', 'js-delete-task-button', this.deleteTaskButtonHandler);

        // Event Dispatcher
        this.model.addTaskEvent.attach(this.addTaskHandler);
        this.model.addTaskEvent.attach(this.clearTaskTextBoxHandler);
        this.model.setTasksAsCompletedEvent.attach(this.setTaskAsCompletedHandler);
        this.model.deleteTasksEvent.attach(this.deleteTasksHandler);

        return this;
    },

    addTaskButton: function () {
        this.addTaskEvent.notify({
            task: this.$taskTextBox.val()
        });
    },

    completedTaskButton: function () {
        this.completeTaskEvent.notify();
    },

    deleteTaskButton: function () {
        this.deleteTaskEvent.notify();
    },

    selectOrUnselectTask: function () {

        let taskIndex = $(event.target).attr("data-index");

        if ($(event.target).attr('data-task-selected') === 'false') {
            $(event.target).attr('data-task-selected', true);
            this.selectTaskEvent.notify({
                taskIndex: taskIndex
            });
        } else {
            $(event.target).attr('data-task-selected', false);
            this.unselectTaskEvent.notify({
                taskIndex: taskIndex
            });
        }
    },

    show: function () {
        this.buildList();
    },

    buildList: function () {
        let tasks = this.model.getTasks();
        let html = "";
        let $tasksContainer = this.$tasksContainer;

        $tasksContainer.html('');
        for (const task in tasks) {

            if (tasks[task].taskStatus === 'completed') {
                html += "<div style="color:green;">";

            } else {
                html += "<div>";
            }

            $tasksContainer.append(html + "<label><input type="checkbox" class="js - task" data-index="" + index + "" data-task-selected="false">" + tasks[task].taskName + "</label></div>");

            index++
        }
    },

    /* ---- Handlers from Event Dispatcher ----*/

    clearTaskTextBox: function () {
        this.$taskTextBox.val('');
    },

    addTask: function () {
        this.show();
    },

    setTaskAsCompleted: function () {
        this.show();
    },

    deleteTasks: function () {
        this.show();
    }

    /* ---- End Handlers from Event Dispatcher ----*/
};