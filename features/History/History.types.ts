import { HistoryTables } from '@/schemas';


export interface HistoryPanelProps {
    onStartDateChange: (arg?: Date) => void
    onTableChange: (arg?: HistoryTables) => void
}
