

// Export the template names as an enum for better maintainability when accessing them elsewhere
export enum StringTemplates {
  OutboundRecordingBroken = 'PSOutboundRecordingBroken',
}

export const stringHook = () => ({
  'en-US': {
    [StringTemplates.OutboundRecordingBroken]:
      'The outbound recording feature will not work because it has not been configured correctly.',
  }
});
