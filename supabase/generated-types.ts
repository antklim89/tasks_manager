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
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      history: {
        Row: {
          body: string
          createdAt: string
          id: number
          projectId: number
          userId: string | null
        }
        Insert: {
          body?: string
          createdAt?: string
          id?: number
          projectId: number
          userId?: string | null
        }
        Update: {
          body?: string
          createdAt?: string
          id?: number
          projectId?: number
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "history_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "history_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
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
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
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
            isOneToOne: true
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
          color: string | null
          columnId: number
          completeAt: string | null
          createdAt: string
          creator: string | null
          description: string
          id: number
          priority: Database["public"]["Enums"]["priorities"] | null
          projectId: number
          shouldByIn: number | null
          startAt: string | null
          title: string
        }
        Insert: {
          color?: string | null
          columnId: number
          completeAt?: string | null
          createdAt?: string
          creator?: string | null
          description?: string
          id?: number
          priority?: Database["public"]["Enums"]["priorities"] | null
          projectId: number
          shouldByIn?: number | null
          startAt?: string | null
          title: string
        }
        Update: {
          color?: string | null
          columnId?: number
          completeAt?: string | null
          createdAt?: string
          creator?: string | null
          description?: string
          id?: number
          priority?: Database["public"]["Enums"]["priorities"] | null
          projectId?: number
          shouldByIn?: number | null
          startAt?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_columnId_fkey"
            columns: ["columnId"]
            isOneToOne: false
            referencedRelation: "columns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_shouldByIn_fkey"
            columns: ["shouldByIn"]
            isOneToOne: false
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
      can_change_role: {
        Args: {
          project_id: number
          member_id: number
          role?: Database["public"]["Enums"]["roles"]
        }
        Returns: boolean
      }
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
      operations: "INSERT" | "UPDATE" | "DELETE"
      priorities: "very low" | "low" | "medium" | "high" | "very high"
      roles: "admin" | "user" | "guest" | "invited"
      tables: "tasks" | "projects" | "columns" | "members"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
