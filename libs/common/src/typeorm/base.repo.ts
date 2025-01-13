import { Injectable } from '@nestjs/common';
import { EntityManager, FindOneOptions, FindOptionsWhere, UpdateResult } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { AppError, ErrorCode } from '@libs/common/errors';

@Injectable()
export abstract class BaseRepo<Entity extends { [key: string]: any }> {
  protected abstract table: string;

  constructor(protected entityManager: EntityManager) {}

  find(where: FindManyOptions<Entity>['where']): Promise<Entity[]> {
    return this.entityManager.find(this.table, { where });
  }

  async findOne(
    where: FindOneOptions<Entity>['where'],
    options?: { relations?: FindOneOptions<Entity>['relations']; findOrThrow?: boolean },
  ): Promise<Entity | null> {
    const data = await this.entityManager.findOne(this.table, { where });
    if (!data && options?.findOrThrow) throw new AppError(ErrorCode.NOT_FOUND);
    return data;
  }

  async findOneById(
    { id }: { id: number },
    options?: { relations?: FindOneOptions<Entity>['relations']; findOrThrow?: boolean },
  ): Promise<Entity | null> {
    const data = await this.entityManager.findOne<Entity>(this.table, { where: { id: id as any }, relations: options?.relations });
    if (!data && options?.findOrThrow) throw new AppError(ErrorCode.NOT_FOUND);
    return data;
  }

  async findOneByUuid(
    { uuid }: { uuid: string },
    options?: { relations?: FindOneOptions<Entity>['relations']; findOrThrow?: boolean },
  ): Promise<Entity | null> {
    const data = await this.entityManager.findOne<Entity>(this.table, { where: { uuid: uuid as any }, relations: options?.relations });
    if (!data && options?.findOrThrow) throw new AppError(ErrorCode.NOT_FOUND);
    return data;
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
    return this.findOneById(entity.id, { relations: options?.relations });
  }

  async updateWhere(where: FindOneOptions<Entity>['where'], partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
    const result = this.entityManager.update(this.table, where, partialEntity);
    return result;
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.entityManager.delete(this.table, { id });
    return !!result?.affected;
  }

  async deleteWhere(where: FindOptionsWhere<Entity>): Promise<boolean> {
    const result = await this.entityManager.delete(this.table, where);
    return !!result?.affected;
  }

  async softDeleteById(id: number): Promise<{ id: number }> {
    const result = await this.entityManager.softRemove(this.table, { id });
    return result;
  }

  countBy(where?: FindOptionsWhere<Entity>): Promise<number> {
    return this.entityManager.countBy(this.table, where);
  }
}
