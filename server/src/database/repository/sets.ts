import { EntityRepository, Repository, getManager } from 'typeorm';
import { sets } from '../entity/sets';
import { convertRawObject } from '../../utils/custom';
import { IOrigin } from 'src/interface/ISets';

@EntityRepository(sets)
export class SetsRepository extends Repository<sets> {
  // title로 세트 검색
  async findSetsByTitle(title: string) {
    const manager = getManager();
    return await manager
      .query(
        `SELECT s.id, s.title, s.description, s.createdAt, u.username FROM sets AS s LEFT OUTER JOIN users AS u ON s.userId=u.id WHERE s.title LIKE '%${title}%';`
      )
      .then((sets: Object[]) => {
        return sets.map((set: Object) => convertRawObject(set));
      });
  }
  // 세트의 제작자와 최초 생성 시간 반환
  async findOrogin(id: number): Promise<IOrigin> {
    return await this.findOne(id).then((set) => {
      return {
        creator: set.creator ? set.creator['id'] : null,
        createdAt: String(set.createdAt),
      };
    });
  }
  //삭제된 세트의 userId 반환
  async getRemovedUser(id: number) {
    return await this.findOne(id).then(async (set) => {
      await this.delete(id);
      if (!set) {
        return null;
      } else {
        return set.creator;
      }
    });
  }
}
