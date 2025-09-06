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
  name: "cd_ai_view_view",
  synchronize: true,
  expression: `
          SELECT 
            cd_ai_view.cd_ai_view_id AS cdAiViewId,
            cd_ai_view.cd_ai_view_guid AS cdAiViewGuid,
            cd_ai_view.cd_ai_view_name AS cdAiViewName,
            cd_ai_view.cd_ai_view_description AS cdAiViewDescription,
            cd_ai_view.doc_id AS docId,
            cd_ai_view.cd_ai_view_type_id AS cdAiViewTypeId
          FROM
            cd_ai_view
          JOIN
            cd_ai_view_type ON cd_ai_view_type.cd_ai_view_type_id = cd_ai_view.cd_ai_view_type_id
        `,
})
export class CdAiViewModel {
  @ViewColumn({ name: "cd_ai_view_id" })
  cdAiViewId!: number;

  @ViewColumn({ name: "cd_ai_view_guid" })
  cdAiViewGuid!: string;

  @ViewColumn({ name: "cd_ai_view_name" })
  cdAiViewName!: string;

  @ViewColumn({ name: "cd_ai_view_description" })
  cdAiViewDescription!: string;

  @ViewColumn({ name: "doc_id" })
  docId!: number;

  @ViewColumn({ name: "cd_ai_view_type_id" })
  cdAiViewTypeId!: number;
}
