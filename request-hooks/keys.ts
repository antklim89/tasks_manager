

export type AuthKey = ['AUTH']
export type CreateProjectKey = ['CREATE_NEW_PROJECT']
export type FetchColumnsKey = ['COLUMNS', { projectId: number }]
export type FetchProjectsKey = ['PROJECTS']
export type FetchProjectKey = ['PROJECT', { projectId: number }]
export type FetchTasksKey = ['TASKS', { columnId: number }]
export type FetchCommentsKey = ['COMMENTS', { taskId: number, projectId: number }]
export type FetchCommentsCountKey = ['COMMENTS_COUNT', { taskId: number, projectId: number }]
export type FetchMembersKey = ['MEMBERS', { projectId: number }]
export type MemberKey = ['MEMBER', { projectId: number }]
export type ProfileKey = ['PROFILE']
export type HistoryKey = ['HISTORY', { projectId: number, lastId?: number, startDate?: string, search?: string }]
