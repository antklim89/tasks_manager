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
          id: number
          name: string
          owner: string
          projectId: number
          taskOrder: number[] | null
        }
        Insert: {
          id?: number
          name?: string
          owner: string
          projectId: number
          taskOrder?: number[] | null
        }
        Update: {
          id?: number
          name?: string
          owner?: string
          projectId?: number
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
            foreignKeyName: "columns_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      members: {
        Row: {
          createdAt: string
          email: string
          id: number
          name: string
          projectId: number
          role: string
          userId: string
        }
        Insert: {
          createdAt?: string
          email?: string
          id?: number
          name?: string
          projectId: number
          role: string
          userId: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: number
          name?: string
          projectId?: number
          role?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          description: string | null
          id: number
          name: string
          owner: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
          owner?: string | null
        }
        Update: {
          description?: string | null
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
          columnId: number
          completeAt: string | null
          createdAt: string
          description: string
          id: number
          owner: string
          shouldByIn: number | null
          startAt: string | null
          title: string
        }
        Insert: {
          columnId: number
          completeAt?: string | null
          createdAt?: string
          description?: string
          id?: number
          owner: string
          shouldByIn?: number | null
          startAt?: string | null
          title: string
        }
        Update: {
          columnId?: number
          completeAt?: string | null
          createdAt?: string
          description?: string
          id?: number
          owner?: string
          shouldByIn?: number | null
          startAt?: string | null
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
      get_user_id_by_email: {
        Args: {
          email: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
