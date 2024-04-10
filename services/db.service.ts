import { DateTime } from 'luxon';
import supabase from './supabase.service';

class DbService<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  getClient() {
    return supabase.from(this.tableName);
  }

  async create(obj: Partial<T>) {
    const entity = {
      ...obj,
      created_on: DateTime.now().toJSDate(),
      updated_on: DateTime.now().toJSDate(),
    };

    const response = await this.getClient().insert(entity);
    return response;
  }

  async insert(entities: Partial<T> | Partial<T>[]) {
    const entitiesToInsert = Array.isArray(entities) ? entities : [entities];

    const formattedEntities = entitiesToInsert.map((entity) => ({
      ...entity,
      created_on: DateTime.now().toJSDate(),
      updated_on: DateTime.now().toJSDate(),
    }));

    const response = await this.getClient().insert(formattedEntities);
    return response;
  }

  async update(
    matchQuery: Record<string, any>,
    partialUpdate: Partial<T>,
  ) {
    const update = {
      ...partialUpdate,
      updated_on: DateTime.now().toJSDate(),
    };

    return this.getClient().update(update).match(matchQuery);
  }

  select(
    columns?: string,
    {
      head = false,
      count = undefined,
    }: {
      head?: boolean;
      count?: undefined | 'exact' | 'planned' | 'estimated';
    } = {},
  ) {
    return this.getClient().select(columns, { head, count });
  }

  delete() {
    return this.getClient().delete();
  }

  async find(query: Record<string, any>): Promise<T[] | null> {
    const response = await this.getClient().select().match(query);

    if (!response || !response.data) {
      return null;
    }

    return response.data.length > 0 ? response.data : null;
  }

  async findById(id: string): Promise<T | null> {
    const response = await this.select('*').eq('id', id);

    if (!response || !response.data) {
      return null;
    }

    return response?.data.length > 0 ? (response.data[0] as T) : null;
  }

  async remove(matchQuery: Record<string, any>) {
    return this.getClient().delete().match(matchQuery);
  }
}

export default DbService;
