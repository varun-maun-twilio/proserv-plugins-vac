export enum FlexEvent {
  taskReceived = 'taskReceived',
  taskUpdated = 'taskUpdated',
  taskAccepted = 'taskAccepted',
  taskCanceled = 'taskCanceled',
  taskCompleted = 'taskCompleted',
  taskRejected = 'taskRejected',
  taskRescinded = 'taskRescinded',
  taskTimeout = 'taskTimeout',
  taskWrapup = 'taskWrapup',
  workerActivityUpdated = 'workerActivityUpdated',
  workerAttributesUpdated = 'workerAttributesUpdated',
  pluginsInitialized = 'pluginsInitialized',
  tokenUpdated = 'tokenUpdated',
  userLoggedIn = 'userLoggedIn'
}
