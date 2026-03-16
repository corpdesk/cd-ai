import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({
  name: "cd_ai",
  synchronize: false,
})
export class CdAiModel {
  @PrimaryGeneratedColumn({
    name: "cd_ai_id",
  })
  cdAiId!: number;

  @Column({
    name: "cd_ai_guid",
    default: "uuid",
  })
  cdAiGuid!: string;

  @Column({
    name: "cd_ai_name",
  })
  cdAiName!: string;

  @Column({
    name: "cd_ai_description",
  })
  cdAiDescription!: string;

  @Column({
    name: "cd_ai_type_id",
  })
  cdAiTypeId!: number;

  @Column({
    name: "doc_id",
  })
  docId!: number;

  @Column({
    name: "cd_ai_enabled",
    default: true,
  })
  cdAiEnabled!: boolean;
}
