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

export class CdAiTypeController {
  private b: BaseService;

  private svCdAi: CdAiService;

  private svCdAiType: CdAiTypeService;

  // <<cd:method:constructor:start>>
  constructor() {
    this.b = new BaseService();
    this.svCdAiType = new CdAiTypeService();
  }
  // <<cd:method:constructor:end>>

  // <<cd:method:Create:start>>
  /**
     * curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "CdAiTypes",
        "c": "CdAiTypeRef",
        "a": "Create",
        "dat": {
            "f_vals": [
            {
                "data": {
                "cdAiTypeRefName": "DemoRef:28:11:2024:11:55",
                "cdAiTypeRefDescription": "test create"
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
      await this.svCdAiType.create(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:Create");
    }
  }
  // <<cd:method:Create:end>>

  // <<cd:method:Get:start>>
  // /**
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "CdAiType",
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
      await this.svCdAiType.getType(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:Get");
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
  //         await this.svCdAiType.getCdAiTypeCount(req, res);
  //     } catch (e) {
  //         this.b.serviceErr(req, res, e, 'CdAiTypeController:Get');
  //     }
  // }

  /** Pageable request:
    curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "CdAiTypes",
        "c": "CdAiTypeRef",
        "a": "GetCount",
        "dat": {
          "f_vals": [
            {
              "query": {
                "select": [
                  "cdAiTypeRefId",
                  "cdAiTypeRefName"
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
      await this.svCdAiType.getCount(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:GetCount");
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
        "m": "CdAiTypes",
        "c": "CdAiTypeRef",
        "a": "Update",
        "dat": {
          "f_vals": [
            {
              "query": {
                "update": {
                  "cdAiTypeRefDescription": "updated version"
                },
                "where": {
                  "cdAiTypeRefId": 114
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
    console.log("CdAiTypeController::Update()/01");
    try {
      console.log("CdAiTypeController::Update()/02");
      await this.svCdAiType.update(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:Update");
    }
  }
  // <<cd:method:Update:end>>

  // <<cd:method:Delete:start>>
  /**
    //  * curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "CdAiTypes",
        "c": "CdAiTypeRef",
        "a": "Delete",
        "dat": {
            "f_vals": [
            {
                "query": {
                "where": {
                    "cdAiTypeRefId": 114
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
      await this.svCdAiType.delete(req, res);
    } catch (e) {
      await this.b.serviceErr(req, res, e, "CdAiTypeController:Update");
    }
  }
  // <<cd:method:Delete:end>>

  // <<cd:method:PromptQuery:start>>
  async PromptQuery(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:PromptQuery:end>>

  // <<cd:method:CheckTokenBalance:start>>
  async CheckTokenBalance(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:CheckTokenBalance:end>>

  // <<cd:method:GetUserProfile:start>>
  async GetUserProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetUserProfile:end>>
}
