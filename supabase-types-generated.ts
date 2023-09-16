export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      columns: {
        Row: {
          description: string | null
          id: number
          name: string
          owner: string
          project: number
          taskOrder: number[] | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string
          owner: string
          project: number
          taskOrder?: number[] | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
          owner?: string
          project?: number
          taskOrder?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "columns_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "columns_project_fkey"
            columns: ["project"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          id: number
          name: string
          owner: string | null
        }
        Insert: {
          id?: number
          name: string
          owner?: string | null
        }
        Update: {
          id?: number
          name?: string
          owner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          atartAt: string | null
          columnId: number
          completeAt: string | null
          createdAt: string
          description: string
          id: number
          owner: string
          shouldByIn: number | null
          title: string
        }
        Insert: {
          atartAt?: string | null
          columnId: number
          completeAt?: string | null
          createdAt?: string
          description?: string
          id?: number
          owner: string
          shouldByIn?: number | null
          title: string
        }
        Update: {
          atartAt?: string | null
          columnId?: number
          completeAt?: string | null
          createdAt?: string
          description?: string
          id?: number
          owner?: string
          shouldByIn?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_columnId_fkey"
            columns: ["columnId"]
            referencedRelation: "columns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_shouldByIn_fkey"
            columns: ["shouldByIn"]
            referencedRelation: "columns"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
