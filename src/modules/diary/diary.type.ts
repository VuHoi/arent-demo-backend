export type Diary = {
  title?: string;
  description?: string;
  created_by?: string;
};

export interface DiaryQuery {
  start_date?: Date;
  end_date?: Date;
}
