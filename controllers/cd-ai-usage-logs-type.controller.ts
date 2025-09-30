import { BaseService } from "../../../sys/base/base.service";
import {
  IQuery,
  IRespInfo,
  ICdRequest,
  IServiceInput,
} from "../../../sys/base/i-base";
import { Logging } from "../../../sys/base/winston.log";
import { CdAiService } from "../services/cd-ai.service";
import { CdAiTypeService } from "../services/cd-ai-type.service";
import { CdAiUsageLogsService } from "../services/cd-ai-usage-logs.service";
import { CdAiUsageLogsTypeService } from "../services/cd-ai-usage-logs-type.service";

export class CdAiUsageLogsTypeController {
  private b: BaseService;

  private svCdAiUsageLogs: CdAiUsageLogsService;

  private svCdAiUsageLogsType: CdAiUsageLogsTypeService;

  // <<cd:method:constructor:start>>
  constructor() {
    this.b = new BaseService();
    this.svCdAiUsageLogsType = new CdAiUsageLogsTypeService();
  }
  // <<cd:method:constructor:end>>

  // <<cd:method:Create:start>>
  /**
     * curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "CdAiUsageLogsTypes",
        "c": "CdAiUsageLogsTypeRef",
        "a": "Create",
        "dat": {
            "f_vals": [
            {
                "data": {
                "cdAiUsageLogsTypeRefName": "DemoRef:28:11:2024:11:55",
                "cdAiUsageLogsTypeRefDescription": "test create"
                }
            }
            ],
            "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
        },
        "args": {}
        }' https://localhost:3001/api -v | jq '.'\
     * @param req
     * @param res
     */
  async Create(req, res) {
    try {
      await this.svCdAiUsageLogsType.create(req, res);
    } catch (e) {
      await this.b.serviceErr(
        req,
        res,
        e,
        "CdAiUsageLogsTypeController:Create",
      );
    }
  }
  // <<cd:method:Create:end>>

  // <<cd:method:Get:start>>
  // /**
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "CdAiUsageLogsType",
  //         "a": "Get",
  //         "dat": {
  //             "f_vals": [
  //                 {
  //                     "query": {
  //                         "where": {"companyId": 45763}
  //                     }
  //                 }
  //             ],
  //             "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
  //         },
  //         "args": null
  //     }
  //  * @param req
  //  * @param res
  //  */
  async Get(req, res) {
    try {
      await this.svCdAiUsageLogsType.getCdAiUsageLogsType(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiUsageLogsTypeController:Get");
    }
  }
  // <<cd:method:Get:end>>

  // <<cd:method:GetType:start>>
  async GetType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetType:end>>

  // <<cd:method:GetCount:start>>
  // async GetType(req, res) {
  //     try {
  //         await this.svCdAiUsageLogsType.getCdAiUsageLogsTypeCount(req, res);
  //     } catch (e) {
  //         this.b.serviceErr(req, res, e, 'CdAiUsageLogsTypeController:Get');
  //     }
  // }

  /** Pageable request:
    curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "CdAiUsageLogsTypes",
        "c": "CdAiUsageLogsTypeRef",
        "a": "GetCount",
        "dat": {
          "f_vals": [
            {
              "query": {
                "select": [
                  "cdAiUsageLogsTypeRefId",
                  "cdAiUsageLogsTypeRefName"
                ],
                "where": {}
              }
            }
          ],
          "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
        },
        "args": null
      }' https://localhost:3001/api -v | jq '.'
    //  * @param req
    //  * @param res
    //  */
  async GetCount(req, res) {
    try {
      await this.svCdAiUsageLogsType.getCdAiUsageLogsTypeCount(req, res);
    } catch (e) {
      await this.b.serviceErr(
        req,
        res,
        e,
        "CdAiUsageLogsTypeController:GetCount",
      );
    }
  }
  // <<cd:method:GetCount:end>>

  // <<cd:method:GetPaged:start>>
  async GetPaged(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetPaged:end>>

  // <<cd:method:Update:start>>
  /**
    curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "CdAiUsageLogsTypes",
        "c": "CdAiUsageLogsTypeRef",
        "a": "Update",
        "dat": {
          "f_vals": [
            {
              "query": {
                "update": {
                  "cdAiUsageLogsTypeRefDescription": "updated version"
                },
                "where": {
                  "cdAiUsageLogsTypeRefId": 114
                }
              }
            }
          ],
          "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
        },
        "args": null
      }' https://localhost:3001/api -v | jq '.'
    //  * @param req
    //  * @param res
    //  */
  async Update(req, res) {
    console.log("CdAiUsageLogsTypeController::Update()/01");
    try {
      console.log("CdAiUsageLogsTypeController::Update()/02");
      await this.svCdAiUsageLogsType.update(req, res);
    } catch (e) {
      await this.b.serviceErr(
        req,
        res,
        e,
        "CdAiUsageLogsTypeController:Update",
      );
    }
  }
  // <<cd:method:Update:end>>

  // <<cd:method:Delete:start>>
  /**
    //  * curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "CdAiUsageLogsTypes",
        "c": "CdAiUsageLogsTypeRef",
        "a": "Delete",
        "dat": {
            "f_vals": [
            {
                "query": {
                "where": {
                    "cdAiUsageLogsTypeRefId": 114
                }
                }
            }
            ],
            "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
        },
        "args": null
        }' https://localhost:3001/api -v | jq '.'
    //  * @param req
    //  * @param res
    //  */
  async Delete(req, res) {
    try {
      await this.svCdAiUsageLogsType.delete(req, res);
    } catch (e) {
      await this.b.serviceErr(
        req,
        res,
        e,
        "CdAiUsageLogsTypeController:Update",
      );
    }
  }
  // <<cd:method:Delete:end>>

  // <<cd:method:LogUsage:start>>
  async LogUsage(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:LogUsage:end>>

  // <<cd:method:GetUsageSummary:start>>
  async GetUsageSummary(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetUsageSummary:end>>
}
