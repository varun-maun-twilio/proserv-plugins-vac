// Export the template names as an enum for better maintainability when accessing them elsewhere


export enum StringTemplates {
  SignatureManagement = 'PSSignatureManagement',
  SelectQueue = 'PSSignatureManagementSelectQueue',
  
}

export const stringHook = () => ({
  'en-US': {
    [StringTemplates.SignatureManagement]: 'Email Signatures',
    [StringTemplates.SelectQueue]: 'Select Queue',
    
  },
  
});
