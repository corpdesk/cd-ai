import { ViewEntity, ViewColumn } from "typeorm";
import { IQuery } from "../../../sys/base/i-base";

export function siGet(q: IQuery) {
  return {
    serviceModel: CdAiUsageLogsViewModel,
    docName: "CdAiUsageLogsViewModel::siGet",
    cmd: {
      action: "find",
      query: q,
    },
    dSource: 1,
  };
}

@ViewEntity({
  name: "cd_ai_usage_logs_view",
  synchronize: false,
  expression: `
          SELECT 
            cd_ai_usage_logs_view.cd_ai_usage_logs_view_id AS cd_ai_usage_logs_view_id,
            cd_ai_usage_logs_view.cd_ai_usage_logs_view_guid AS cd_ai_usage_logs_view_guid,
            cd_ai_usage_logs_view.cd_ai_usage_logs_view_name AS cd_ai_usage_logs_view_name,
            cd_ai_usage_logs_view.cd_ai_usage_logs_view_description AS cd_ai_usage_logs_view_description,
            cd_ai_usage_logs_view.doc_id AS docId,
            cd_ai_usage_logs_view_type.cd_ai_usage_logs_view_type_id AS cd_ai_usage_logs_view_type_id
          FROM
            cd_ai_usage_logs_view
          JOIN
            cd_ai_usage_logs_view_type ON cd_ai_usage_logs_view_type.cd_ai_usage_logs_view_type_id = cd_ai_usage_logs_view.cd_ai_usage_logs_view_type_id
        `,
})
export class CdAiUsageLogsViewModel {
  @ViewColumn({ name: "cd_ai_usage_logs_view_id" })
  cdAiUsageLogsViewId!: number;

  @ViewColumn({ name: "cd_ai_usage_logs_view_guid" })
  cdAiUsageLogsViewGuid!: string;

  @ViewColumn({ name: "cd_ai_usage_logs_view_name" })
  cdAiUsageLogsViewName!: string;

  @ViewColumn({ name: "cd_ai_usage_logs_view_description" })
  cdAiUsageLogsViewDescription!: string;

  @ViewColumn({ name: "doc_id" })
  docId!: number;

  @ViewColumn({ name: "cd_ai_usage_logs_view_type_id" })
  cdAiUsageLogsViewTypeId!: number;
}
