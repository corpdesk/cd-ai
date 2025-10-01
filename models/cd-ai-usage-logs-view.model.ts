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
            cd_ai_usage_logs.cd_ai_usage_logs_id AS cd_ai_usage_logs_id,
            cd_ai_usage_logs.cd_ai_usage_logs_guid AS cd_ai_usage_logs_guid,
            cd_ai_usage_logs.cd_ai_usage_logs_name AS cd_ai_usage_logs_name,
            cd_ai_usage_logs.cd_ai_usage_logs_description AS cd_ai_usage_logs_description,
            cd_ai_usage_logs.doc_id AS docId,
            cd_ai_usage_logs_type.cd_ai_usage_logs_type_id AS cd_ai_usage_logs_type_id,
            cd_ai_usage_logs_type.cd_ai_usage_logs_type_guid AS cd_ai_usage_logs_type_guid
          FROM
            cd_ai_usage_logs
          JOIN
            cd_ai_usage_logs_type ON cd_ai_usage_logs_type.cd_ai_usage_logs_type_id = cd_ai_usage_logs.cd_ai_usage_logs_type_id
        `,
})
export class CdAiUsageLogsViewModel {
  @ViewColumn({ name: "cd_ai_usage_logs_id" })
  cdAiUsageLogsId!: number;

  @ViewColumn({ name: "cd_ai_usage_logs_guid" })
  cdAiUsageLogsGuid!: string;

  @ViewColumn({ name: "cd_ai_usage_logs_name" })
  cdAiUsageLogsName!: string;

  @ViewColumn({ name: "cd_ai_usage_logs_description" })
  cdAiUsageLogsDescription!: string;

  @ViewColumn({ name: "doc_id" })
  docId!: number;

  @ViewColumn({ name: "cd_ai_usage_logs_type_id" })
  cdAiUsageLogsTypeId!: number;

  @ViewColumn({ name: "cd_ai_usage_logs_type_guid" })
  cdAiUsageLogsTypeGuid!: string;
}
