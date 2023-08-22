

export type AuthKey = ['AUTH']
export type CreateProjectKey = ['CREATE_NEW_PROJECT']
export type FetchColumnsKey = ['COLUMNS', { projectId: number }]
export type FetchProjectsKey = ['PROJECTS']
export type FetchTasksKey = ['TASKS', { columnId: number }]
