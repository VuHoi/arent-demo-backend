export type Record = {
  weight?: number;
  created_at?: Date;
};

export interface RecordQuery {
  start_date?: Date;
  end_date?: Date;
}
