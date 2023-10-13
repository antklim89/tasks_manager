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
          projectId: number
          taskOrder: number[] | null
        }
        Insert: {
          id?: number
          name?: string
          projectId: number
          taskOrder?: number[] | null
        }
        Update: {
          id?: number
          name?: string
          projectId?: number
          taskOrder?: number[] | null
        }
        Relationships: [
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
          id: number
          inviteToken: string | null
          projectId: number
          role: Database["public"]["Enums"]["roles"]
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          inviteToken?: string | null
          projectId: number
          role?: Database["public"]["Enums"]["roles"]
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          inviteToken?: string | null
          projectId?: number
          role?: Database["public"]["Enums"]["roles"]
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          description: string
          email: string
          firstName: string
          id: string
          lastName: string
        }
        Insert: {
          created_at?: string
          description?: string
          email: string
          firstName?: string
          id: string
          lastName?: string
        }
        Update: {
          created_at?: string
          description?: string
          email?: string
          firstName?: string
          id?: string
          lastName?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          description: string
          id: number
          name: string
        }
        Insert: {
          description?: string
          id?: number
          name: string
        }
        Update: {
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          columnId: number
          completeAt: string | null
          createdAt: string
          description: string
          id: number
          projectId: number
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
          projectId: number
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
          projectId?: number
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
            foreignKeyName: "tasks_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
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
      create_project: {
        Args: {
          name: string
          description?: string
        }
        Returns: {
          description: string
          id: number
          name: string
        }
      }
      get_user_id_by_email: {
        Args: {
          email: string
        }
        Returns: string
      }
      is_admin: {
        Args: {
          project_id: number
        }
        Returns: boolean
      }
      is_admin_or_user: {
        Args: {
          project_id: number
        }
        Returns: boolean
      }
      is_member: {
        Args: {
          project_id: number
        }
        Returns: boolean
      }
      is_user: {
        Args: {
          project_id: number
        }
        Returns: boolean
      }
    }
    Enums: {
      roles: "admin" | "user" | "guest" | "invited"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
