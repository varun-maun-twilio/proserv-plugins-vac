export enum FlexAction {
  AcceptTask = 'AcceptTask',
  ApplyTeamsViewFilters = 'ApplyTeamsViewFilters',
  CompleteTask = 'CompleteTask',
  HangupCall = 'HangupCall',
  HoldCall = 'HoldCall',
  UnholdCall = 'UnholdCall',
  HoldParticipant = 'HoldParticipant',
  KickParticipant = 'KickParticipant',
  MonitorCall = 'MonitorCall',
  StopMonitoringCall = 'StopMonitoringCall',
  SelectTask = 'SelectTask',
  SetWorkerActivity = 'SetWorkerActivity',
  StartOutboundCall = 'StartOutboundCall',
  ToggleMute = 'ToggleMute',
  UnholdParticipant = 'UnholdParticipant',
  NavigateToView = 'NavigateToView',
  RejectTask = 'RejectTask',
  SendMessage = 'SendMessage',
  SetActivity = 'SetActivity',
  StartExternalWarmTransfer = 'StartExternalWarmTransfer',
  ShowDirectory = 'ShowDirectory',
  TransferTask = 'TransferTask',
  WrapupTask = 'WrapupTask',
  Logout = 'Logout'
}

export enum FlexActionEvent {
  before = 'before',
  after = 'after',
  replace = 'replace',
}
