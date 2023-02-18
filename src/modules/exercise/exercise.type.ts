export type Exercise = {
  title?: string;
  duration?: number;
  kcal?: number;
  created_by?: string;
};

export interface ExerciseQuery {
  start_date?: Date;
  end_date?: Date;
}
