// Export the template names as an enum for better maintainability when accessing them elsewhere


export enum StringTemplates {
  BulkSkillsMapper = 'PSBulkSkillsMapper',
  
}

export const stringHook = () => ({
  'en-US': {
    [StringTemplates.BulkSkillsMapper]: 'Bulk Skills Mapper',
    
    
  },
  
});
