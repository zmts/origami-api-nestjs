import { Injectable } from '@nestjs/common';
import { EntityManager, FindOneOptions, UpdateResult } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class BaseRepo<Entity extends { [key: string]: any }> {
  protected abstract table: string;

  constructor(protected entityManager: EntityManager) {}

  find(findManyOptions: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.entityManager.find(this.table, findManyOptions);
  }

  findOne(findOneOptions: FindOneOptions<Entity>): Promise<Entity | null> {
    return this.entityManager.findOne(this.table, findOneOptions);
  }

  findOneById({ id }: { id: number }, relations?: FindOneOptions<Entity>['relations']): Promise<Entity | null> {
    return this.entityManager.findOne<Entity>(this.table, { where: { id: id as any }, relations });
  }

  findOneByUuid({ uuid }: { uuid: string }, relations?: FindOneOptions<Entity>['relations']): Promise<Entity | null> {
    return this.entityManager.findOne<Entity>(this.table, { where: { uuid: uuid as any }, relations });
  }

  async insertOrIgnore(item: Entity): Promise<Entity | null> {
    const insertResult = await this.entityManager.createQueryBuilder().insert().into(this.table).values(item).orIgnore().execute();
    return insertResult?.raw[0] || null;
  }

  save(entity: Entity): Promise<Entity> {
    return this.entityManager.save(entity);
  }

  saveMany(entities: Entity[]): Promise<Entity[]> {
    return this.entityManager.save(entities);
  }

  async update(entity: Entity, options: { relations?: FindOneOptions<Entity>['relations'] } = {}): Promise<Entity> {
    await this.entityManager.update(this.table, entity.id, entity);
    return this.findOneById(entity.id, options?.relations);
  }

  async updateWhere(where: FindOneOptions<Entity>['where'], partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
    const result = this.entityManager.update(this.table, where, partialEntity);
    return result;
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.entityManager.delete(this.table, { id });
    return !!result?.affected;
  }

  async softDeleteById(id: number): Promise<{ id: number }> {
    const result = await this.entityManager.softRemove(this.table, { id });
    return result;
  }
}
