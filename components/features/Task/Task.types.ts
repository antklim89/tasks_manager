

export interface TaskProps {
    index: number
}

export interface TaskCommentsProps {
    isOpen: boolean;
    close: () => void;
    commentCount?: number;
}

export interface TaskUpdateProps {
    isOpen: boolean;
    close: () => void;
}
