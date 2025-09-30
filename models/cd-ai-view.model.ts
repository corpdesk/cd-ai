import { ViewEntity, ViewColumn } from "typeorm";
import { IQuery } from "../../../sys/base/i-base";

export function siGet(q: IQuery) {
  return {
    serviceModel: CdAiViewModel,
    docName: "CdAiViewModel::siGet",
    cmd: {
      action: "find",
      query: q,
    },
    dSource: 1,
  };
}

@ViewEntity({
  name: "cd_ai_view",
  synchronize: false,
  expression: `
          SELECT 
            cd_ai.cd_ai_id AS cd_ai_id,
            cd_ai.cd_ai_guid AS cd_ai_guid,
            cd_ai.cd_ai_name AS cd_ai_name,
            cd_ai.cd_ai_description AS cd_ai_description,
            cd_ai.doc_id AS docId,
            cd_ai_view_type.cd_ai_view_type_id AS cd_ai_view_type_id
          FROM
            cd_ai
          JOIN
            cd_ai_view_type ON cd_ai_view_type.cd_ai_view_type_id = cd_ai.cd_ai_view_type_id
        `,
})
export class CdAiViewModel {
  @ViewColumn({ name: "cd_ai_id" })
  cdAiId!: number;

  @ViewColumn({ name: "cd_ai_guid" })
  cdAiGuid!: string;

  @ViewColumn({ name: "cd_ai_name" })
  cdAiName!: string;

  @ViewColumn({ name: "cd_ai_description" })
  cdAiDescription!: string;

  @ViewColumn({ name: "doc_id" })
  docId!: number;

  @ViewColumn({ name: "cd_ai_view_type_id" })
  cdAiViewTypeId!: number;
}
