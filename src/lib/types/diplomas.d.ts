export interface Diploma {
  id: string;
  title: string;
  description: string;
  image?: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  exams: Exam[];
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: PaginationMetadata;
}